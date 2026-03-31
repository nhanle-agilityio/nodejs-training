import { faker } from '@faker-js/faker';

export const seedCarts = async (client, userIds, dishIds) => {
  const cartIds = [];

  for (const userId of userIds) {
    const res = await client.query(
      `INSERT INTO carts (user_id) VALUES ($1) RETURNING id`,
      [userId]
    );
    const cartId = res.rows[0].id;
    cartIds.push(cartId);

    const numItems = faker.number.int({ min: 0, max: 4 });
    const chosenDishes = faker.helpers.arrayElements(dishIds, numItems);

    for (const dishId of chosenDishes) {
      const priceRes = await client.query(
        `SELECT price FROM dish_items WHERE id = $1`,
        [dishId]
      );
      await client.query(
        `INSERT INTO cart_items (cart_id, dish_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4)`,
        [
          cartId,
          dishId,
          faker.number.int({ min: 1, max: 3 }),
          priceRes.rows[0].price,
        ]
      );
    }
  }

  console.log(`    ✓ ${cartIds.length} carts created`);
  return cartIds;
};

export const seedVouchers = async (client) => {
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

  for (let i = 0; i < 6; i++) {
    const code = `FAKER${faker.string.alphanumeric(5).toUpperCase()}`;
    const isFixed = faker.datatype.boolean();
    const res = await client.query(
      `INSERT INTO vouchers (code, discount_type, discount_value, max_uses, usage_count, expiry, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        code,
        isFixed ? 'fixed' : 'percentage',
        isFixed
          ? faker.number.float({ min: 100, max: 2000, multipleOf: 100 })
          : faker.number.float({ min: 5, max: 30, multipleOf: 5 }),
        faker.number.int({ min: 10, max: 500 }),
        0,
        faker.date.future({ years: 1 }),
        true,
      ]
    );
    voucherIds.push(res.rows[0].id);
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

export const seedOrders = async (client, userIds, dishIds, userAddressMap, voucherIds, discountIds) => {
  const statuses = ['pending', 'confirmed', 'preparing', 'in_transit', 'delivered', 'cancelled'];
  const paymentMethods = ['VISA', 'Mastercard', 'Stripe', 'AMEX'];

  const orderIds = [];
  let orderItemCount = 0;
  let paymentCount = 0;

  for (const userId of userIds) {
    const numOrders = faker.number.int({ min: 0, max: 5 });
    const addresses = userAddressMap[userId] || [];
    if (addresses.length === 0) continue;

    for (let i = 0; i < numOrders; i++) {
      const numItems = faker.number.int({ min: 1, max: 4 });
      const chosenDishes = faker.helpers.arrayElements(dishIds, numItems);

      let purchaseTotal = 0;
      const lineItems = [];

      for (const dishId of chosenDishes) {
        const priceRes = await client.query(`SELECT price FROM dish_items WHERE id = $1`, [dishId]);
        const unitPrice = parseFloat(priceRes.rows[0].price);
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
      const createdAt = faker.date.recent({ days: 30 });

      const orderRes = await client.query(
        `INSERT INTO orders (user_id, address_id, purchase_total, voucher_id, discount_id, tax_amount, total, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         RETURNING id`,
        [
          userId,
          faker.helpers.arrayElement(addresses),
          purchaseTotal,
          voucherId,
          discountId,
          taxAmount,
          total,
          status,
          createdAt,
          new Date(createdAt.getTime() + faker.number.int({ min: 600000, max: 7200000 })),
        ]
      );
      const orderId = orderRes.rows[0].id;
      orderIds.push(orderId);

      for (const item of lineItems) {
        await client.query(
          `INSERT INTO order_items (order_id, dish_id, quantity, unit_price)
           VALUES ($1, $2, $3, $4)`,
          [orderId, item.dishId, item.qty, item.unitPrice]
        );
        orderItemCount++;
      }

      const payMethod = faker.helpers.arrayElement(paymentMethods);
      const payStatus = status === 'cancelled' ? 'failed'
        : status === 'delivered' ? 'successful'
        : faker.helpers.arrayElement(['pending', 'successful', 'failed']);

      await client.query(
        `INSERT INTO payments (order_id, amount, payment_method, transaction_id, client_secret, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          orderId,
          total,
          payMethod,
          payStatus !== 'pending' ? `txn_wc_${faker.string.alphanumeric(12)}` : null,
          `pi_${faker.string.alphanumeric(8)}_secret_${faker.string.alphanumeric(6)}`,
          payStatus,
          createdAt,
          new Date(createdAt.getTime() + 30000),
        ]
      );
      paymentCount++;
    }
  }

  console.log(`    ✓ ${orderIds.length} orders created`);
  console.log(`    ✓ ${orderItemCount} order items created`);
  console.log(`    ✓ ${paymentCount} payments created`);
  return orderIds;
};

export const seedReviews = async (client, userIds, dishIds) => {
  let count = 0;

  for (const userId of userIds) {
    const numReviews = faker.number.int({ min: 0, max: 4 });
    const reviewedDishes = faker.helpers.arrayElements(dishIds, Math.min(numReviews, dishIds.length));

    for (const dishId of reviewedDishes) {
      await client.query(
        `INSERT INTO reviews (user_id, dish_id, rating, text, date)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id, dish_id) DO NOTHING`,
        [
          userId,
          dishId,
          faker.number.int({ min: 1, max: 5 }),
          faker.lorem.sentence({ min: 5, max: 15 }),
          faker.date.recent({ days: 30 }),
        ]
      );
      count++;
    }
  }

  console.log(`    ✓ ${count} reviews created`);
};

export const seedWishlistAndLikes = async (client, userIds, dishIds) => {
  let wishlistCount = 0;
  let likesCount = 0;

  for (const userId of userIds) {
    const wishlistDishes = faker.helpers.arrayElements(dishIds, faker.number.int({ min: 0, max: 5 }));
    for (const dishId of wishlistDishes) {
      await client.query(
        `INSERT INTO wishlist (user_id, dish_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [userId, dishId]
      );
      wishlistCount++;
    }

    const likedDishes = faker.helpers.arrayElements(dishIds, faker.number.int({ min: 0, max: 5 }));
    for (const dishId of likedDishes) {
      await client.query(
        `INSERT INTO user_likes (user_id, dish_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`,
        [userId, dishId]
      );
      likesCount++;
    }
  }

  console.log(`    ✓ ${wishlistCount} wishlist entries created`);
  console.log(`    ✓ ${likesCount} user likes created`);
};
