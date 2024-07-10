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

app.post("./recipes", async (req, res) => {
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
    res.status(500).json({ error: `Failed to add Recipe` });
  }
});
