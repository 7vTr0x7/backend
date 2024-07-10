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
    if (recipe) {
      return recipe;
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.get("/recipes/:title", async (req, res) => {
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

const getRecipesByAuthor = async (author) => {
  try {
    const recipes = await Recipes.find({ author: author });
    if (recipes) {
      return recipes;
    } else {
      console.log("not found");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.get("/recipes/authors/:authorName", async (req, res) => {
  try {
    const recipes = await getRecipesByAuthor(req.params.authorName);
    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(200).json({ error: "Recipe not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get recipes error: ${error} ` });
  }
});

const getAllRecipesByDifficulty = async (level) => {
  try {
    const recipes = await Recipes.find({ difficulty: level });
    if (recipes) {
      return recipes;
    } else {
      console.log("Not Found");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.get("/recipes/difficulty/:level", async (req, res) => {
  try {
    const recipes = await getAllRecipesByDifficulty(req.params.level);

    if (recipes.length > 0) {
      res.json(recipes);
    } else {
      res.status(404).json({ error: "recipes not found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to get recipes error: ${error}` });
  }
});

const updateRecipeById = async (recipeId, dataToUpdate) => {
  try {
    const recipe = await Recipes.findByIdAndUpdate(recipeId, dataToUpdate, {
      new: true,
    });
    if (recipe) {
      return recipe;
    } else {
      console.log("Not Found");
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

app.post("/recipes/recipe/:id", async (req, res) => {
  try {
    const recipe = await updateRecipeById(req.params.id, req.body);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(500).json({ error: "Recipe not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: `Failed to update recipe error: ${error}` });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
