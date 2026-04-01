-- Search menu items by name
SELECT id, name, description, price, image_url, avg_rating
FROM dish_items
WHERE name ILIKE $1
  AND is_active = TRUE
ORDER BY name;
