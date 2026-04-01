-- Saved addresses for a user
SELECT id, user_id, house_no, street, city, phone, special_note, is_default
FROM addresses
WHERE user_id = $1
ORDER BY is_default DESC, id;
