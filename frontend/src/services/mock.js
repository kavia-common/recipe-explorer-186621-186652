/**
 * Mock recipe service to be used when backend isn't configured or reachable.
 */

const baseImgs = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1461009209120-103fedeb0783?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1400&auto=format&fit=crop',
];

const TAGS = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Quick', 'Dessert', 'Dinner', 'Spicy', 'Healthy'];

function makeRecipe(i) {
  const id = `r-${i}`;
  const title = [
    'Herb Roasted Chicken',
    'Creamy Mushroom Pasta',
    'Spicy Tofu Stir-fry',
    'Mediterranean Salad Bowl',
    'Citrus Glazed Salmon',
    'Classic Beef Tacos',
    'Avocado Toast Deluxe',
    'Berry Oat Smoothie',
    'Garlic Shrimp Skillet',
    'Chocolate Lava Cake',
  ][i % 10];
  const img = baseImgs[i % baseImgs.length];
  const rating = (Math.round((3.8 + (i % 12) * 0.1) * 10) / 10).toFixed(1);
  const time = 15 + (i % 7) * 10;
  const tags = [TAGS[i % TAGS.length], TAGS[(i + 3) % TAGS.length]].filter(Boolean);
  const servings = 2 + (i % 4);
  const ingredients = [
    '2 tbsp olive oil',
    '1 tsp sea salt',
    '1/2 tsp black pepper',
    '2 cloves garlic, minced',
    '1 tsp paprika',
    '1 cup cherry tomatoes',
    'Fresh basil leaves',
  ];
  const steps = [
    'Preheat oven or pan to medium-high.',
    'Season main ingredient generously.',
    'Cook until golden and cooked through.',
    'Add aromatics and toss for 1 minute.',
    'Serve with fresh herbs and a squeeze of lemon.',
  ];
  const description = 'A delightful, modern take on a classic favorite with bright, balanced flavors.';

  return { id, title, image: img, rating: Number(rating), time, tags, servings, ingredients, steps, description };
}

const ALL = Array.from({ length: 48 }, (_, i) => makeRecipe(i + 1));

function filterRecipes(q) {
  if (!q) return ALL;
  const s = q.toLowerCase();
  return ALL.filter(
    (r) =>
      r.title.toLowerCase().includes(s) ||
      r.description.toLowerCase().includes(s) ||
      r.tags.some((t) => t.toLowerCase().includes(s))
  );
}

// PUBLIC_INTERFACE
export async function mockGetRecipes({ q = '', page = 1, limit = 12 } = {}) {
  /** Returns paginated mock recipes matching optional query. */
  const filtered = filterRecipes(q);
  const total = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);
  await new Promise((r) => setTimeout(r, 200)); // tiny delay to simulate network
  return { items, total, page, limit };
}

// PUBLIC_INTERFACE
export async function mockGetRecipeById(id) {
  /** Returns a single mock recipe by id. */
  const recipe = ALL.find((r) => r.id === id) || ALL[0];
  await new Promise((r) => setTimeout(r, 150));
  return recipe;
}
