const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Recipes = require("./models/recipes.models");
const app = express();

app.use(express.json());

initializeDatabase();

const createRecipe = async (recipe) => {
  try {
    const newRecipe = new Recipes(recipe);
    const savedRecipe = newRecipe.save();
    return savedRecipe;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.post("/recipes", async (req, res) => {
  try {
    const savedData = await createRecipe(req.body);
    if (savedData) {
      res
        .status(200)
        .json({ message: "Recipe added Successfully", recipe: savedData });
    } else {
      res.status(404).json({ error: "Recipe not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to add Recipe ${error}` });
  }
});

const readAllRecipes = async () => {
  try {
    const allRecipes = await Recipes.find();
    return allRecipes;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.get("/recipes", async (req, res) => {
  try {
    const recipes = await readAllRecipes();
    if (recipes.length > 0) {
      res.status(200).json({ message: "Recipes", recipes: recipes });
    } else {
      res.status(404).json({ error: "Recipes not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get Recipes ${error}` });
  }
});

const getRecipeByTitle = async (title) => {
  try {
    const recipe = await Recipes.findOne({ title: title });
    return recipe;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.get("recipe/:title", async (req, res) => {
  try {
    const recipe = await getRecipeByTitle(req.params.title);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ error: "Recipe not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get recipe by title ${error}` });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
