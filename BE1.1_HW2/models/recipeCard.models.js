const mongoose = require("mongoose");

const recipeCardSchema = new mongoose.Schema({
  imgURL: String,
  servings: Number,
  preppingTime: Number,
  cookingTime: Number,
  ingredients: [
    {
      type: String,
    },
  ],
  directions: [
    {
      type: String,
    },
  ],
  notes: String,
});

const RecipeCard = mongoose.model("RecipeCard", recipeCardSchema);

module.exports = RecipeCard;
