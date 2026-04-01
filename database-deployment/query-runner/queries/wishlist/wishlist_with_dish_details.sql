-- Wishlist with dish info
SELECT w.dish_id,
       di.name,
       di.description,
       di.image_url,
       di.price
FROM wishlist w
JOIN dish_items di ON di.id = w.dish_id
WHERE w.user_id = $1
ORDER BY di.name;
