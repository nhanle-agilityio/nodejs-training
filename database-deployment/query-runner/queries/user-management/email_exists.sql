-- Check whether an email is already registered
SELECT EXISTS (
  SELECT 1 FROM users WHERE email = $1
) AS exists;
