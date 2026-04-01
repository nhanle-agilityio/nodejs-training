-- Conversion rules
SELECT id, points_required, discount_value, is_active
FROM points_rules
WHERE is_active = TRUE
ORDER BY points_required;
