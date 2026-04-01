-- Current points balance
SELECT user_id, current_points, updated_at
FROM loyalty_accounts
WHERE user_id = $1;
