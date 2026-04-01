-- Menu items for a category
SELECT id, name, description, price, image_url, is_best_seller, avg_rating, total_ratings, like_count
FROM dish_items
WHERE category_id = $1
  AND is_active = TRUE
ORDER BY name;
