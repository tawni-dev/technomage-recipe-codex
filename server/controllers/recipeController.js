// Mock data - will be replaced with database operations
let recipes = [
  {
    id: "oat-green-roti",
    title: "Oat-Based Green Roti",
    calories: "~180 per roti",
    makes: "4-6 rotis",
    time: "25 minutes",
    tags: ["bread", "vegetarian", "gluten-free", "anti-inflammatory", "greens", "quick-meal"],
    ingredients: [
      { icon: "🥬", item: "1 cup super greens or spinach" },
      { icon: "🌿", item: "1/4 cup fresh cilantro" },
      { icon: "🧄", item: "1 clove garlic" },
      { icon: "🥣", item: "3/4 cup rolled oats" },
      { icon: "💧", item: "1/4 - 1/2 cup water" },
      { icon: "🌶️", item: "1/2 tsp cumin", badge: "Anti-inflammatory" }
    ],
    instructions: [
      { step: 1, instruction: "Blend greens: Add spinach, cilantro, garlic, and 1/4 cup water to blender. Blend until smooth green paste forms." },
      { step: 2, instruction: "Grind oats: In food processor, pulse oats until they form fine flour consistency." },
      { step: 3, instruction: "Make dough: Mix oat flour, green paste, and cumin. Add water gradually until soft, pliable dough forms." },
      { step: 4, instruction: "Rest: Let dough rest 10 minutes covered with damp cloth." },
      { step: 5, instruction: "Roll & cook: Divide into 4-6 balls. Roll thin, cook in hot pan 1-2 minutes per side until spotted." }
    ]
  },
  {
    id: "creamy-chicken-soup",
    title: "Creamy Chicken Soup",
    calories: "~250 per cup",
    makes: "3 cups (3 servings)",
    time: "20 minutes",
    tags: ["soup", "chicken", "protein", "anti-inflammatory", "freezer-friendly", "quick-meal"],
    ingredients: [
      { icon: "🫒", item: "1 tbsp olive oil" },
      { icon: "🧅", item: "1/2 large onion, diced" },
      { icon: "🥕", item: "1 carrot, diced" },
      { icon: "🥬", item: "1 celery stalk, diced" },
      { icon: "🧄", item: "2 cloves garlic, minced" },
      { icon: "🍲", item: "3 cups chicken broth" },
      { icon: "🍗", item: "1 cup rotisserie chicken, shredded" },
      { icon: "🥛", item: "1/2 cup Fairlife milk", badge: "Lighter" },
      { icon: "🧈", item: "1 tbsp light cream cheese" },
      { icon: "🌶️", item: "1/2 tsp turmeric", badge: "Anti-inflammatory" },
      { icon: "🥬", item: "1 cup fresh spinach", badge: "Nutrient boost" }
    ],
    tips: [
      { icon: "❄️", item: "Freezes perfectly! Portion in mason jars, leave 1\" headspace" },
      { icon: "🔥", item: "Reheat tip: Microwave from frozen or thaw overnight" },
      { icon: "💡", item: "Beginner tip: Don't let garlic burn - just 30 seconds!" }
    ],
    instructions: [
      { step: 1, instruction: "Heat oil: In large pot, heat olive oil over medium heat for 1 minute." },
      { step: 2, instruction: "Cook vegetables: Add onion, carrots, celery. Cook 5-7 minutes until onion looks clear." },
      { step: 3, instruction: "Add garlic: Add minced garlic, cook 30 seconds until fragrant (don't burn!)." },
      { step: 4, instruction: "Add broth & chicken: Pour in broth, bring to boil. Add chicken and seasonings." },
      { step: 5, instruction: "Make creamy: Whisk milk with cream cheese, slowly stir into soup." },
      { step: 6, instruction: "Add greens: Stir in spinach, cook 2 minutes until wilted. Taste and adjust seasoning." }
    ]
  },
  {
    id: "cranberry-salsa",
    title: "Cranberry Salsa (TECHNOMAGE SIGNATURE!)",
    calories: "~35 per 1/4 cup",
    makes: "2 cups (8 servings)",
    time: "15 minutes",
    tags: ["salsa", "cranberry", "signature", "sweet", "spicy", "low-calorie", "pre-workout"],
    ingredients: [
      { icon: "🫐", item: "1 cup fresh cranberries" },
      { icon: "🧅", item: "1/4 cup red onion, finely diced" },
      { icon: "🌶️", item: "1 jalapeño, seeded and minced" },
      { icon: "🍋", item: "1 lime, juiced" },
      { icon: "🍯", item: "1 tbsp honey" },
      { icon: "🌿", item: "1/4 cup fresh cilantro, chopped" },
      { icon: "🧂", item: "1/4 tsp salt" }
    ],
    instructions: [
      { step: 1, instruction: "Pulse cranberries: In food processor, pulse cranberries until coarsely chopped." },
      { step: 2, instruction: "Mix ingredients: Transfer to bowl, add onion, jalapeño, lime juice, honey, cilantro, and salt." },
      { step: 3, instruction: "Rest: Let sit 10 minutes for flavors to meld." },
      { step: 4, instruction: "Serve: Enjoy with chips, on tacos, or as a condiment!" }
    ]
  }
];

// Generate unique ID
const generateId = (title) => {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
};

// Get all recipes
const getAllRecipes = (req, res) => {
  try {
    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes', message: error.message });
  }
};

// Get recipe by ID
const getRecipeById = (req, res) => {
  try {
    const { id } = req.params;
    const recipe = recipes.find(r => r.id === id);
    
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipe', message: error.message });
  }
};

// Create new recipe
const createRecipe = (req, res) => {
  try {
    const { title, calories, makes, time, tags, ingredients, instructions, tips, storage } = req.body;
    
    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ 
        error: 'Missing required fields', 
        required: ['title', 'ingredients', 'instructions'] 
      });
    }
    
    const newRecipe = {
      id: generateId(title),
      title,
      calories,
      makes,
      time,
      tags: tags || [],
      ingredients,
      instructions,
      tips,
      storage
    };
    
    // Check if ID already exists
    if (recipes.find(r => r.id === newRecipe.id)) {
      newRecipe.id = `${newRecipe.id}-${Date.now()}`;
    }
    
    recipes.push(newRecipe);
    
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe', message: error.message });
  }
};

// Update recipe
const updateRecipe = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const recipeIndex = recipes.findIndex(r => r.id === id);
    
    if (recipeIndex === -1) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    // Preserve the ID
    updateData.id = id;
    
    recipes[recipeIndex] = { ...recipes[recipeIndex], ...updateData };
    
    res.json(recipes[recipeIndex]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe', message: error.message });
  }
};

// Delete recipe
const deleteRecipe = (req, res) => {
  try {
    const { id } = req.params;
    
    const recipeIndex = recipes.findIndex(r => r.id === id);
    
    if (recipeIndex === -1) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    
    const deletedRecipe = recipes.splice(recipeIndex, 1)[0];
    
    res.json({ message: 'Recipe deleted successfully', recipe: deletedRecipe });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe', message: error.message });
  }
};

// Seed recipes (for development)
const seedRecipes = (req, res) => {
  try {
    // Reset to original data
    recipes = [
      {
        id: "oat-green-roti",
        title: "Oat-Based Green Roti",
        calories: "~180 per roti",
        makes: "4-6 rotis",
        time: "25 minutes",
        tags: ["bread", "vegetarian", "gluten-free", "anti-inflammatory", "greens", "quick-meal"],
        ingredients: [
          { icon: "🥬", item: "1 cup super greens or spinach" },
          { icon: "🌿", item: "1/4 cup fresh cilantro" },
          { icon: "🧄", item: "1 clove garlic" },
          { icon: "🥣", item: "3/4 cup rolled oats" },
          { icon: "💧", item: "1/4 - 1/2 cup water" },
          { icon: "🌶️", item: "1/2 tsp cumin", badge: "Anti-inflammatory" }
        ],
        instructions: [
          { step: 1, instruction: "Blend greens: Add spinach, cilantro, garlic, and 1/4 cup water to blender. Blend until smooth green paste forms." },
          { step: 2, instruction: "Grind oats: In food processor, pulse oats until they form fine flour consistency." },
          { step: 3, instruction: "Make dough: Mix oat flour, green paste, and cumin. Add water gradually until soft, pliable dough forms." },
          { step: 4, instruction: "Rest: Let dough rest 10 minutes covered with damp cloth." },
          { step: 5, instruction: "Roll & cook: Divide into 4-6 balls. Roll thin, cook in hot pan 1-2 minutes per side until spotted." }
        ]
      },
      {
        id: "creamy-chicken-soup",
        title: "Creamy Chicken Soup",
        calories: "~250 per cup",
        makes: "3 cups (3 servings)",
        time: "20 minutes",
        tags: ["soup", "chicken", "protein", "anti-inflammatory", "freezer-friendly", "quick-meal"],
        ingredients: [
          { icon: "🫒", item: "1 tbsp olive oil" },
          { icon: "🧅", item: "1/2 large onion, diced" },
          { icon: "🥕", item: "1 carrot, diced" },
          { icon: "🥬", item: "1 celery stalk, diced" },
          { icon: "🧄", item: "2 cloves garlic, minced" },
          { icon: "🍲", item: "3 cups chicken broth" },
          { icon: "🍗", item: "1 cup rotisserie chicken, shredded" },
          { icon: "🥛", item: "1/2 cup Fairlife milk", badge: "Lighter" },
          { icon: "🧈", item: "1 tbsp light cream cheese" },
          { icon: "🌶️", item: "1/2 tsp turmeric", badge: "Anti-inflammatory" },
          { icon: "🥬", item: "1 cup fresh spinach", badge: "Nutrient boost" }
        ],
        tips: [
          { icon: "❄️", item: "Freezes perfectly! Portion in mason jars, leave 1\" headspace" },
          { icon: "🔥", item: "Reheat tip: Microwave from frozen or thaw overnight" },
          { icon: "💡", item: "Beginner tip: Don't let garlic burn - just 30 seconds!" }
        ],
        instructions: [
          { step: 1, instruction: "Heat oil: In large pot, heat olive oil over medium heat for 1 minute." },
          { step: 2, instruction: "Cook vegetables: Add onion, carrots, celery. Cook 5-7 minutes until onion looks clear." },
          { step: 3, instruction: "Add garlic: Add minced garlic, cook 30 seconds until fragrant (don't burn!)." },
          { step: 4, instruction: "Add broth & chicken: Pour in broth, bring to boil. Add chicken and seasonings." },
          { step: 5, instruction: "Make creamy: Whisk milk with cream cheese, slowly stir into soup." },
          { step: 6, instruction: "Add greens: Stir in spinach, cook 2 minutes until wilted. Taste and adjust seasoning." }
        ]
      },
      {
        id: "cranberry-salsa",
        title: "Cranberry Salsa (TECHNOMAGE SIGNATURE!)",
        calories: "~35 per 1/4 cup",
        makes: "2 cups (8 servings)",
        time: "15 minutes",
        tags: ["salsa", "cranberry", "signature", "sweet", "spicy", "low-calorie", "pre-workout"],
        ingredients: [
          { icon: "🫐", item: "1 cup fresh cranberries" },
          { icon: "🧅", item: "1/4 cup red onion, finely diced" },
          { icon: "🌶️", item: "1 jalapeño, seeded and minced" },
          { icon: "🍋", item: "1 lime, juiced" },
          { icon: "🍯", item: "1 tbsp honey" },
          { icon: "🌿", item: "1/4 cup fresh cilantro, chopped" },
          { icon: "🧂", item: "1/4 tsp salt" }
        ],
        instructions: [
          { step: 1, instruction: "Pulse cranberries: In food processor, pulse cranberries until coarsely chopped." },
          { step: 2, instruction: "Mix ingredients: Transfer to bowl, add onion, jalapeño, lime juice, honey, cilantro, and salt." },
          { step: 3, instruction: "Rest: Let sit 10 minutes for flavors to meld." },
          { step: 4, instruction: "Serve: Enjoy with chips, on tacos, or as a condiment!" }
        ]
      }
    ];
    
    res.json({ 
      message: 'Recipes seeded successfully', 
      count: recipes.length,
      recipes 
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to seed recipes', message: error.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  seedRecipes
}; 