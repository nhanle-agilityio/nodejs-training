-- Active discounts for display / checkout
SELECT id, name, description, discount_value, is_active
FROM discounts
WHERE is_active = TRUE
ORDER BY name;
