-- Orders with customer identity (recent first)
SELECT o.id, o.status, o.total, o.created_at, u.name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC
LIMIT $1::int;
