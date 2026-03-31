import { query, getClient, end } from './db.js';
import { seedUsers, seedSocialAccounts, seedAddresses } from './seed-users.js';
import { seedCategories, seedIngredients, seedDishes, seedCombos, seedMealPlans } from './seed-menu.js';
import { seedCarts, seedVouchers, seedDiscounts, seedOrders, seedReviews, seedWishlistAndLikes } from './seed-orders.js';
import { seedLoyalty } from './seed-loyalty.js';

const main = async () => {
  console.log('🌱 WaraChow Faker.js Seeder');
  console.log('===========================\n');

  const client = await getClient();

  try {
    await client.query('BEGIN');

    console.log('[1/7] Cleaning existing Faker data...');
    await client.query(`
      TRUNCATE
        loyalty_transactions, loyalty_accounts, points_rules,
        user_likes, wishlist, reviews,
        payments, order_items, orders,
        discounts, vouchers,
        cart_items, carts,
        meal_plan_details, meal_plans,
        combo_items, combos,
        dish_ingredients, ingredients, dish_items,
        categories, addresses, social_accounts, users
      CASCADE
    `);

    console.log('[2/7] Seeding users & addresses...');
    const userIds = await seedUsers(client, 20);
    await seedSocialAccounts(client, userIds);
    const { userAddressMap } = await seedAddresses(client, userIds);

    console.log('[3/7] Seeding menu & catalog...');
    const categoryIds = await seedCategories(client);
    const ingredientIds = await seedIngredients(client);
    const dishIds = await seedDishes(client, categoryIds, ingredientIds);
    await seedCombos(client, dishIds);
    await seedMealPlans(client);

    console.log('[4/7] Seeding carts...');
    await seedCarts(client, userIds, dishIds);

    console.log('[5/7] Seeding vouchers, discounts & orders...');
    const voucherIds = await seedVouchers(client);
    const discountIds = await seedDiscounts(client);
    const orderIds = await seedOrders(client, userIds, dishIds, userAddressMap, voucherIds, discountIds);

    console.log('[6/7] Seeding reviews & engagement...');
    await seedReviews(client, userIds, dishIds);
    await seedWishlistAndLikes(client, userIds, dishIds);

    console.log('[7/7] Seeding loyalty program...');
    await seedLoyalty(client, userIds, orderIds);

    await client.query('COMMIT');

    console.log('\n===========================');
    console.log('✅ Seeding complete!\n');

    const counts = await query(`
      SELECT 'users' AS tbl, COUNT(*) AS cnt FROM users
      UNION ALL SELECT 'social_accounts', COUNT(*) FROM social_accounts
      UNION ALL SELECT 'addresses', COUNT(*) FROM addresses
      UNION ALL SELECT 'categories', COUNT(*) FROM categories
      UNION ALL SELECT 'dish_items', COUNT(*) FROM dish_items
      UNION ALL SELECT 'ingredients', COUNT(*) FROM ingredients
      UNION ALL SELECT 'combos', COUNT(*) FROM combos
      UNION ALL SELECT 'meal_plans', COUNT(*) FROM meal_plans
      UNION ALL SELECT 'carts', COUNT(*) FROM carts
      UNION ALL SELECT 'cart_items', COUNT(*) FROM cart_items
      UNION ALL SELECT 'vouchers', COUNT(*) FROM vouchers
      UNION ALL SELECT 'discounts', COUNT(*) FROM discounts
      UNION ALL SELECT 'orders', COUNT(*) FROM orders
      UNION ALL SELECT 'order_items', COUNT(*) FROM order_items
      UNION ALL SELECT 'payments', COUNT(*) FROM payments
      UNION ALL SELECT 'reviews', COUNT(*) FROM reviews
      UNION ALL SELECT 'wishlist', COUNT(*) FROM wishlist
      UNION ALL SELECT 'user_likes', COUNT(*) FROM user_likes
      UNION ALL SELECT 'loyalty_accounts', COUNT(*) FROM loyalty_accounts
      UNION ALL SELECT 'loyalty_transactions', COUNT(*) FROM loyalty_transactions
      UNION ALL SELECT 'points_rules', COUNT(*) FROM points_rules
      ORDER BY tbl
    `);

    console.log('📊 Final row counts:');
    for (const row of counts.rows) {
      console.log(`   ${row.tbl.padEnd(25)} ${row.cnt} rows`);
    }

  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  } finally {
    client.release();
    await end();
  }
};

main();
