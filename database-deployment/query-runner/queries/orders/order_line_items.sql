-- Order line items with dish info
SELECT oi.id,
       di.name,
       di.image_url,
       oi.quantity,
       oi.unit_price,
       (oi.quantity * oi.unit_price) AS line_total
FROM order_items oi
JOIN dish_items di ON oi.dish_id = di.id
WHERE oi.order_id = $1
ORDER BY oi.id;
