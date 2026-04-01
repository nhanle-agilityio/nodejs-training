-- Resolve user from provider + provider user id (client_id)
SELECT u.id, u.name, u.email
FROM users u
JOIN social_accounts s ON u.id = s.user_id
WHERE s.provider = $1
  AND s.client_id = $2;
