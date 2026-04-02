import { faker } from '@faker-js/faker';

async function loadDishPriceMap(client) {
  const res = await client.query(`SELECT id, price FROM dish_items`);
  const m = new Map();
  for (const r of res.rows) m.set(r.id, parseFloat(r.price));
  return m;
}

export const seedCarts = async (client, userIds, dishIds, cartItemsMax) => {
  const priceMap = await loadDishPriceMap(client);
  const cartIds = [];
  const maxItems = Math.min(cartItemsMax, dishIds.length);

  for (const userId of userIds) {
    const res = await client.query(
      `INSERT INTO carts (user_id) VALUES ($1) RETURNING id`,
      [userId]
    );
    const cartId = res.rows[0].id;
    cartIds.push(cartId);

    const numItems = faker.number.int({ min: 0, max: maxItems });
    const chosenDishes = faker.helpers.arrayElements(dishIds, numItems);

    if (chosenDishes.length === 0) continue;

    const parts = [];
    const params = [];
    let p = 1;
    for (const dishId of chosenDishes) {
      parts.push(`($${p++}, $${p++}, $${p++}, $${p++})`);
      params.push(
        cartId,
        dishId,
        faker.number.int({ min: 1, max: 3 }),
        priceMap.get(dishId)
      );
    }
    await client.query(
      `INSERT INTO cart_items (cart_id, dish_id, quantity, unit_price) VALUES ${parts.join(', ')}`,
      params
    );
  }

  console.log(`    ✓ ${cartIds.length} carts created`);
  return cartIds;
};

export const seedVouchers = async (client, extraRandomCount) => {
  const vouchers = [
    { code: 'SAVE500', type: 'fixed', value: 500, maxUses: 100, used: 12, active: true },
    { code: 'PERCENT10', type: 'percentage', value: 10, maxUses: 50, used: 5, active: true },
    { code: 'WELCOME', type: 'fixed', value: 1000, maxUses: null, used: 340, active: true },
    { code: 'EXPIRED25', type: 'percentage', value: 25, maxUses: 200, used: 198, active: false },
  ];

  const voucherIds = [];

  for (const v of vouchers) {
    const res = await client.query(
      `INSERT INTO vouchers (code, discount_type, discount_value, max_uses, usage_count, expiry, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        v.code,
        v.type,
        v.value,
        v.maxUses,
        v.used,
        v.active ? faker.date.future({ years: 1 }) : faker.date.past({ years: 1 }),
        v.active,
      ]
    );
    voucherIds.push(res.rows[0].id);
  }

  const randomRows = [];
  for (let i = 0; i < extraRandomCount; i++) {
    const code = `WC${i}_${faker.string.alphanumeric(6).toUpperCase()}`;
    const isFixed = faker.datatype.boolean();
    randomRows.push({
      code,
      discount_type: isFixed ? 'fixed' : 'percentage',
      discount_value: isFixed
        ? faker.number.float({ min: 100, max: 2000, multipleOf: 100 })
        : faker.number.float({ min: 5, max: 30, multipleOf: 5 }),
      max_uses: faker.number.int({ min: 10, max: 500 }),
      usage_count: 0,
      expiry: faker.date.future({ years: 1 }),
      is_active: true,
    });
  }

  const batchSize = 200;
  for (let i = 0; i < randomRows.length; i += batchSize) {
    const chunk = randomRows.slice(i, i + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of chunk) {
      parts.push(`($${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++})`);
      params.push(
        r.code,
        r.discount_type,
        r.discount_value,
        r.max_uses,
        r.usage_count,
        r.expiry,
        r.is_active
      );
    }
    const res = await client.query(
      `INSERT INTO vouchers (code, discount_type, discount_value, max_uses, usage_count, expiry, is_active)
       VALUES ${parts.join(', ')}
       RETURNING id`,
      params
    );
    for (const row of res.rows) voucherIds.push(row.id);
  }

  console.log(`    ✓ ${voucherIds.length} vouchers created`);
  return voucherIds;
};

export const seedDiscounts = async (client) => {
  const discountNames = ['Summer Sale', 'New User Discount', 'Weekend Special', 'Flash Sale', 'Holiday Deal', 'Back to School'];
  const discountIds = [];

  for (const name of discountNames) {
    const res = await client.query(
      `INSERT INTO discounts (name, description, discount_value, is_active)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        name,
        faker.commerce.productDescription(),
        faker.number.float({ min: 200, max: 1500, multipleOf: 50 }),
        faker.datatype.boolean(0.7),
      ]
    );
    discountIds.push(res.rows[0].id);
  }

  console.log(`    ✓ ${discountIds.length} discounts created`);
  return discountIds;
};

function effectiveOrdersPerUserMax(cfg) {
  const isPower = faker.datatype.boolean(cfg.powerUserRatio);
  const cap = 120;
  const boosted = Math.floor(cfg.ordersPerUserMax * cfg.powerUserOrdersMaxMultiplier);
  const maxO = isPower ? Math.min(boosted, cap) : cfg.ordersPerUserMax;
  return Math.max(cfg.ordersPerUserMin, maxO);
}

export const seedOrders = async (client, userIds, dishIds, userAddressMap, voucherIds, discountIds, cfg) => {
  const statuses = ['pending', 'confirmed', 'preparing', 'in_transit', 'delivered', 'cancelled'];
  const paymentMethods = ['VISA', 'Mastercard', 'Stripe', 'AMEX'];

  const priceMap = await loadDishPriceMap(client);
  const orderIds = [];

  const specs = [];

  for (const userId of userIds) {
    const addresses = userAddressMap[userId] || [];
    if (addresses.length === 0) continue;

    const maxO = effectiveOrdersPerUserMax(cfg);
    const numOrders = faker.number.int({ min: cfg.ordersPerUserMin, max: maxO });

    for (let i = 0; i < numOrders; i++) {
      const numItems = faker.number.int({ min: 1, max: Math.min(6, dishIds.length) });
      const chosenDishes = faker.helpers.arrayElements(dishIds, numItems);

      let purchaseTotal = 0;
      const lineItems = [];

      for (const dishId of chosenDishes) {
        const unitPrice = priceMap.get(dishId);
        const qty = faker.number.int({ min: 1, max: 3 });
        purchaseTotal += unitPrice * qty;
        lineItems.push({ dishId, qty, unitPrice });
      }

      const hasVoucher = faker.datatype.boolean(0.3);
      const hasDiscount = !hasVoucher && faker.datatype.boolean(0.2);
      const voucherId = hasVoucher ? faker.helpers.arrayElement(voucherIds) : null;
      const discountId = hasDiscount ? faker.helpers.arrayElement(discountIds) : null;
      const taxAmount = parseFloat((purchaseTotal * 0.05).toFixed(2));
      const total = parseFloat((purchaseTotal + taxAmount).toFixed(2));

      const status = faker.helpers.arrayElement(statuses);
      const createdAt = faker.date.recent({ days: 90 });
      const updatedAt = new Date(createdAt.getTime() + faker.number.int({ min: 600000, max: 7200000 }));

      specs.push({
        userId,
        addressId: faker.helpers.arrayElement(addresses),
        lineItems,
        purchaseTotal,
        voucherId,
        discountId,
        taxAmount,
        total,
        status,
        createdAt,
        updatedAt,
      });
    }
  }

  let orderItemCount = 0;
  let paymentCount = 0;
  const batchSize = cfg.orderBatchSize;

  for (let b = 0; b < specs.length; b += batchSize) {
    const chunk = specs.slice(b, b + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const s of chunk) {
      parts.push(
        `($${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++})`
      );
      params.push(
        s.userId,
        s.addressId,
        s.purchaseTotal,
        s.voucherId,
        s.discountId,
        s.taxAmount,
        s.total,
        s.status,
        s.createdAt,
        s.updatedAt
      );
    }

    const orderRes = await client.query(
      `INSERT INTO orders (user_id, address_id, purchase_total, voucher_id, discount_id, tax_amount, total, status, created_at, updated_at)
       VALUES ${parts.join(', ')}
       RETURNING id`,
      params
    );

    const insertedIds = orderRes.rows.map((r) => r.id);

    for (let i = 0; i < chunk.length; i++) {
      const s = chunk[i];
      const orderId = insertedIds[i];
      orderIds.push(orderId);

      const oiParts = [];
      const oiParams = [];
      let op = 1;
      for (const item of s.lineItems) {
        oiParts.push(`($${op++}, $${op++}, $${op++}, $${op++}, $${op++})`);
        oiParams.push(orderId, item.dishId, item.qty, item.unitPrice, s.createdAt);
      }
      await client.query(
        `INSERT INTO order_items (order_id, dish_id, quantity, unit_price, created_at)
         VALUES ${oiParts.join(', ')}`,
        oiParams
      );
      orderItemCount += s.lineItems.length;

      const payMethod = faker.helpers.arrayElement(paymentMethods);
      const payStatus =
        s.status === 'cancelled'
          ? 'failed'
          : s.status === 'delivered'
            ? 'successful'
            : faker.helpers.arrayElement(['pending', 'successful', 'failed']);

      await client.query(
        `INSERT INTO payments (order_id, amount, payment_method, transaction_id, client_secret, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          orderId,
          s.total,
          payMethod,
          payStatus !== 'pending' ? `txn_wc_${faker.string.alphanumeric(12)}` : null,
          `pi_${faker.string.alphanumeric(8)}_secret_${faker.string.alphanumeric(6)}`,
          payStatus,
          s.createdAt,
          new Date(s.createdAt.getTime() + 30000),
        ]
      );
      paymentCount++;
    }

    if (specs.length > batchSize * 5 && b > 0 && b % (batchSize * 25) === 0) {
      console.log(`    … orders ${Math.min(b + chunk.length, specs.length)}/${specs.length}`);
    }
  }

  console.log(`    ✓ ${orderIds.length} orders created`);
  console.log(`    ✓ ${orderItemCount} order items created`);
  console.log(`    ✓ ${paymentCount} payments created`);
  return orderIds;
};

export const seedReviews = async (client, userIds, dishIds, cfg) => {
  const maxR = Math.min(cfg.reviewsPerUserMax, dishIds.length);
  const batchSize = 400;
  let count = 0;
  const logEvery = cfg.engagementLogEvery;

  const rows = [];
  for (const userId of userIds) {
    const numReviews = faker.number.int({ min: 0, max: maxR });
    const reviewedDishes = faker.helpers.arrayElements(dishIds, Math.min(numReviews, dishIds.length));

    for (const dishId of reviewedDishes) {
      rows.push({
        user_id: userId,
        dish_id: dishId,
        rating: faker.number.int({ min: 1, max: 5 }),
        text: faker.lorem.sentence({ min: 5, max: 15 }),
        date: faker.date.recent({ days: 90 }),
      });
    }
  }

  for (let i = 0; i < rows.length; i += batchSize) {
    const chunk = rows.slice(i, i + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of chunk) {
      parts.push(`($${p++}, $${p++}, $${p++}, $${p++}, $${p++})`);
      params.push(r.user_id, r.dish_id, r.rating, r.text, r.date);
    }
    const res = await client.query(
      `INSERT INTO reviews (user_id, dish_id, rating, text, date)
       VALUES ${parts.join(', ')}
       ON CONFLICT (user_id, dish_id) DO NOTHING`,
      params
    );
    count += res.rowCount;
    if (rows.length > logEvery && i + batchSize < rows.length && (i + batchSize) % logEvery < batchSize) {
      console.log(`    … reviews ~${Math.min(i + batchSize, rows.length)}/${rows.length}`);
    }
  }

  console.log(`    ✓ ${count} reviews created (attempted ${rows.length}, conflicts reduce count)`);
};

export const seedWishlistAndLikes = async (client, userIds, dishIds, cfg) => {
  const wishMax = Math.min(cfg.wishlistMax, dishIds.length);
  const likeMax = Math.min(cfg.likesMax, dishIds.length);
  const batchSize = 500;
  let wishlistCount = 0;
  let likesCount = 0;

  const wishRows = [];
  const likeRows = [];

  for (const userId of userIds) {
    const wishlistDishes = faker.helpers.arrayElements(dishIds, faker.number.int({ min: 0, max: wishMax }));
    for (const dishId of wishlistDishes) {
      wishRows.push({ user_id: userId, dish_id: dishId });
    }

    const likedDishes = faker.helpers.arrayElements(dishIds, faker.number.int({ min: 0, max: likeMax }));
    for (const dishId of likedDishes) {
      likeRows.push({ user_id: userId, dish_id: dishId });
    }
  }

  for (let i = 0; i < wishRows.length; i += batchSize) {
    const chunk = wishRows.slice(i, i + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of chunk) {
      parts.push(`($${p++}, $${p++})`);
      params.push(r.user_id, r.dish_id);
    }
    const res = await client.query(
      `INSERT INTO wishlist (user_id, dish_id) VALUES ${parts.join(', ')}
       ON CONFLICT (user_id, dish_id) DO NOTHING`,
      params
    );
    wishlistCount += res.rowCount;
  }

  for (let i = 0; i < likeRows.length; i += batchSize) {
    const chunk = likeRows.slice(i, i + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of chunk) {
      parts.push(`($${p++}, $${p++})`);
      params.push(r.user_id, r.dish_id);
    }
    const res = await client.query(
      `INSERT INTO user_likes (user_id, dish_id) VALUES ${parts.join(', ')}
       ON CONFLICT (user_id, dish_id) DO NOTHING`,
      params
    );
    likesCount += res.rowCount;
  }

  console.log(`    ✓ ${wishlistCount} wishlist entries created`);
  console.log(`    ✓ ${likesCount} user likes created`);
};
