-- Ingredients linked to a dish
SELECT i.id, i.name, i.image_url
FROM ingredients i
JOIN dish_ingredients di ON i.id = di.ingredient_id
WHERE di.dish_id = $1
ORDER BY i.name;
