import { faker } from '@faker-js/faker';

const CATEGORIES = [
  { name: 'Main Dishes', description: 'Hearty main course meals' },
  { name: 'Best Sellers', description: 'Our most popular dishes' },
  { name: 'Desserts', description: 'Sweet treats and pastries' },
  { name: 'Beverages', description: 'Fresh drinks and smoothies' },
  { name: 'Side Dishes', description: 'Perfect companions for your meal' },
  { name: 'Appetizers', description: 'Start your meal right' },
];

const DISH_NAMES = [
  'Jollof Rice', 'Grilled Chicken', 'Fried Plantain', 'Egusi Soup',
  'Pounded Yam', 'Suya', 'Chapman', 'Chin Chin', 'Pepper Soup',
  'Meat Pie', 'Zobo Drink', 'Ofada Rice & Sauce', 'Moi Moi',
  'Akara', 'Puff Puff', 'Efo Riro', 'Amala', 'Ogbono Soup',
  'Fried Rice', 'Asun', 'Banga Soup', 'Dodo', 'Gizdodo',
  'Nkwobi', 'Kilishi', 'Shawarma', 'Spring Roll', 'Samosa',
  'Fruit Smoothie', 'Ginger Ale', 'Palm Wine', 'Kunun Aya',
];

const INGREDIENT_NAMES = [
  'Rice', 'Tomato', 'Chicken', 'Pepper', 'Onion', 'Beef', 'Plantain',
  'Melon Seed', 'Spinach', 'Yam', 'Flour', 'Sugar', 'Ginger', 'Garlic',
  'Palm Oil', 'Crayfish', 'Stockfish', 'Beans', 'Egg', 'Butter',
];

export const seedCategories = async (client) => {
  const categoryIds = [];

  for (const cat of CATEGORIES) {
    const res = await client.query(
      `INSERT INTO categories (name, description, image_url)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [
        cat.name,
        cat.description,
        `https://cdn.warachow.com/categories/${cat.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      ]
    );
    categoryIds.push(res.rows[0].id);
  }

  console.log(`    ✓ ${categoryIds.length} categories created`);
  return categoryIds;
};

export const seedIngredients = async (client) => {
  const ingredientIds = [];

  for (const name of INGREDIENT_NAMES) {
    const res = await client.query(
      `INSERT INTO ingredients (name, image_url)
       VALUES ($1, $2)
       RETURNING id`,
      [name, `https://cdn.warachow.com/ingredients/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`]
    );
    ingredientIds.push(res.rows[0].id);
  }

  console.log(`    ✓ ${ingredientIds.length} ingredients created`);
  return ingredientIds;
};

const slug = (s) => s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

export const seedDishes = async (client, categoryIds, ingredientIds, extraCount = 0) => {
  const dishIds = [];
  const names = [...DISH_NAMES];

  for (let k = 0; k < extraCount; k++) {
    const base = faker.helpers.arrayElement(DISH_NAMES);
    const suffix = faker.string.alphanumeric({ length: 6, casing: 'lower' });
    names.push(`${base} (${suffix})`);
  }

  const batchSize = 80;
  for (let i = 0; i < names.length; i += batchSize) {
    const chunk = names.slice(i, i + batchSize);
    const parts = [];
    const params = [];
    let p = 1;
    for (const dishName of chunk) {
      parts.push(`($${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++}, $${p++})`);
      params.push(
        dishName,
        faker.food.description(),
        `https://cdn.warachow.com/dishes/${slug(dishName)}.jpg`,
        faker.number.float({ min: 300, max: 5000, multipleOf: 50 }),
        faker.helpers.arrayElement(categoryIds),
        faker.datatype.boolean(0.25),
        faker.number.float({ min: 3.0, max: 5.0, multipleOf: 0.1 }),
        faker.number.int({ min: 10, max: 500 }),
        faker.number.int({ min: 5, max: 300 })
      );
    }
    const res = await client.query(
      `INSERT INTO dish_items (name, description, image_url, price, category_id, is_best_seller, avg_rating, total_ratings, like_count)
       VALUES ${parts.join(', ')}
       RETURNING id`,
      params
    );
    for (const row of res.rows) dishIds.push(row.id);
  }

  console.log(`    ✓ ${dishIds.length} dishes created (${DISH_NAMES.length} named + ${extraCount} extra)`);

  let linkCount = 0;
  for (const dishId of dishIds) {
    const numIngredients = faker.number.int({ min: 1, max: 5 });
    const chosen = faker.helpers.arrayElements(ingredientIds, numIngredients);

    for (const ingId of chosen) {
      await client.query(
        `INSERT INTO dish_ingredients (dish_id, ingredient_id)
         VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [dishId, ingId]
      );
      linkCount++;
    }
  }

  console.log(`    ✓ ${linkCount} dish-ingredient links created`);
  return dishIds;
};

export const seedCombos = async (client, dishIds) => {
  const comboNames = ['Family Feast', 'Lunch Special', 'Date Night', 'Party Pack', 'Office Lunch'];
  const comboIds = [];

  for (const name of comboNames) {
    const res = await client.query(
      `INSERT INTO combos (name, description, price, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        name,
        faker.commerce.productDescription(),
        faker.number.float({ min: 3000, max: 15000, multipleOf: 100 }),
        `https://cdn.warachow.com/combos/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      ]
    );
    comboIds.push(res.rows[0].id);

    const numItems = faker.number.int({ min: 2, max: 4 });
    const comboDishIds = faker.helpers.arrayElements(dishIds, numItems);
    for (const dishId of comboDishIds) {
      await client.query(
        `INSERT INTO combo_items (combo_id, dish_id, quantity)
         VALUES ($1, $2, $3)
         ON CONFLICT DO NOTHING`,
        [res.rows[0].id, dishId, faker.number.int({ min: 1, max: 4 })]
      );
    }
  }

  console.log(`    ✓ ${comboIds.length} combos created`);
  return comboIds;
};

export const seedMealPlans = async (client) => {
  const plans = [
    { name: 'WaraEenie', desc: 'Basic weekly plan — 3 deliveries' },
    { name: 'WaraMeenie', desc: 'Standard weekly plan — 5 deliveries + free drink' },
    { name: 'WaraMiny', desc: 'Premium plan — daily deliveries + free dessert' },
    { name: 'WaraMoe', desc: 'Ultimate plan — daily + birthday cake + priority support' },
  ];

  const planIds = [];
  for (const plan of plans) {
    const res = await client.query(
      `INSERT INTO meal_plans (name, description, price)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [plan.name, plan.desc, faker.number.float({ min: 10000, max: 80000, multipleOf: 1000 })]
    );
    planIds.push(res.rows[0].id);

    const details = faker.helpers.arrayElements([
      '3 food deliveries weekly', '5 food deliveries weekly', 'Daily food delivery',
      'Free drink with every order', 'Free dessert with every order',
      'Free birthday cake', 'Priority customer support',
      'Free delivery on all orders', 'Access to exclusive menu',
      '10% discount on all orders',
    ], faker.number.int({ min: 2, max: 4 }));

    for (const detail of details) {
      await client.query(
        `INSERT INTO meal_plan_details (meal_plan_id, description) VALUES ($1, $2)`,
        [res.rows[0].id, detail]
      );
    }
  }

  console.log(`    ✓ ${planIds.length} meal plans created`);
  return planIds;
};
