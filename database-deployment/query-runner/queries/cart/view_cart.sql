-- View cart
SELECT ci.id,
       di.name,
       di.image_url,
       ci.quantity,
       ci.unit_price,
       (ci.quantity * ci.unit_price) AS line_total
FROM cart_items ci
JOIN carts c ON ci.cart_id = c.id
JOIN dish_items di ON ci.dish_id = di.id
WHERE c.user_id = $1
ORDER BY ci.id;
