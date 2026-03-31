import { faker } from '@faker-js/faker';

export const seedLoyalty = async (client, userIds, orderIds) => {
  const ruleRows = [
    { points: 500, value: 400 },
    { points: 1000, value: 1000 },
    { points: 2000, value: 2500 },
    { points: 5000, value: 7000 },
  ];
  const ruleIds = [];

  for (const rule of ruleRows) {
    const res = await client.query(
      `INSERT INTO points_rules (points_required, discount_value, is_active)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [rule.points, rule.value, true]
    );
    ruleIds.push(res.rows[0].id);
  }

  console.log(`    ✓ ${ruleIds.length} points rules created`);

  let accountCount = 0;
  let txnCount = 0;

  const deliveredOrders = await client.query(
    `SELECT id, user_id, total FROM orders WHERE status = 'delivered'`
  );

  const pointsByUser = {};
  for (const order of deliveredOrders.rows) {
    const userId = order.user_id;
    const earnedPoints = Math.floor(parseFloat(order.total) / 10);

    if (!pointsByUser[userId]) pointsByUser[userId] = 0;
    pointsByUser[userId] += earnedPoints;

    await client.query(
      `INSERT INTO loyalty_transactions (user_id, type, points_amount, order_id)
       VALUES ($1, 'earn', $2, $3)`,
      [userId, earnedPoints, order.id]
    );
    txnCount++;
  }

  for (const userId of userIds) {
    const currentPoints = pointsByUser[userId] || 0;
    await client.query(
      `INSERT INTO loyalty_accounts (user_id, current_points)
       VALUES ($1, $2)`,
      [userId, currentPoints]
    );
    accountCount++;
  }

  console.log(`    ✓ ${accountCount} loyalty accounts created`);
  console.log(`    ✓ ${txnCount} loyalty transactions created`);

  return { ruleIds };
};
