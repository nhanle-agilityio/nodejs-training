export const seedLoyalty = async (client, userIds) => {
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

  const deliveredOrders = await client.query(
    `SELECT id, user_id, total FROM orders WHERE status = 'delivered'`
  );

  const pointsByUser = {};
  const txnBatchSize = 800;
  const txnRows = [];

  for (const order of deliveredOrders.rows) {
    const userId = order.user_id;
    const earnedPoints = Math.floor(parseFloat(order.total) / 10);

    if (!pointsByUser[userId]) pointsByUser[userId] = 0;
    pointsByUser[userId] += earnedPoints;

    txnRows.push({
      user_id: userId,
      points_amount: earnedPoints,
      order_id: order.id,
    });
  }

  for (let i = 0; i < txnRows.length; i += txnBatchSize) {
    const chunk = txnRows.slice(i, i + txnBatchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const r of chunk) {
      parts.push(`($${p++}, 'earn', $${p++}, $${p++})`);
      params.push(r.user_id, r.points_amount, r.order_id);
    }
    await client.query(
      `INSERT INTO loyalty_transactions (user_id, type, points_amount, order_id)
       VALUES ${parts.join(', ')}`,
      params
    );
    if (txnRows.length > txnBatchSize * 3 && i + txnBatchSize < txnRows.length && i % (txnBatchSize * 20) === 0) {
      console.log(`    … loyalty txns ~${Math.min(i + txnBatchSize, txnRows.length)}/${txnRows.length}`);
    }
  }

  let accountCount = 0;
  const accBatchSize = 500;
  for (let i = 0; i < userIds.length; i += accBatchSize) {
    const chunk = userIds.slice(i, i + accBatchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const userId of chunk) {
      const currentPoints = pointsByUser[userId] || 0;
      parts.push(`($${p++}, $${p++})`);
      params.push(userId, currentPoints);
    }
    await client.query(
      `INSERT INTO loyalty_accounts (user_id, current_points) VALUES ${parts.join(', ')}`,
      params
    );
    accountCount += chunk.length;
  }

  console.log(`    ✓ ${accountCount} loyalty accounts created`);
  console.log(`    ✓ ${txnRows.length} loyalty transactions created`);

  return { ruleIds };
};
