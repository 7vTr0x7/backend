const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    tile: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    difficulty: [
      {
        type: String,
        enum: ["Easy", "Intermediate", "Difficult"],
      },
    ],
    prepTime: {
      type: Number,
      required: true,
    },
    cookTime: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        type: String,
        required: true,
      },
    ],
    instructions: [
      {
        type: String,
        required: true,
      },
    ],
    imageUrl: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
