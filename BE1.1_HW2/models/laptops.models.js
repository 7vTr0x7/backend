const mongoose = require("mongoose");

const laptopsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  processor: {
    type: String,
  },
  ramSizeGB: {
    type: Number,
  },
  ramSizeGB: {
    type: Number,
  },
  screenSizeInches: {
    type: Number,
  },
  isTouchscreen: {
    type: Boolean,
    default: false,
  },
  hasSSD: {
    type: Boolean,
    default: false,
  },
  isSaleActive: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

const Laptops = mongoose.model("Laptops", laptopsSchema);

module.exports = Laptops;
