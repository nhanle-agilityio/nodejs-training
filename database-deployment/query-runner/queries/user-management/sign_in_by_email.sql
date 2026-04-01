-- Load user by email for password verification
SELECT id, name, email, password
FROM users
WHERE email = $1;
