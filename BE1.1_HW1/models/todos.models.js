const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    priority: [
      {
        type: String,
        enum: ["Low", "Medium", "High"],
      },
    ],
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false,
    },
    tags: [
      {
        type: String,
      },
    ],
    createdAt: {
      type: Date,
    },
    updatedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Todos = mongoose.model("Todos", todosSchema);

module.exports = Todos;
