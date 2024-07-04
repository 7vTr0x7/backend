const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    cuisine: [
      {
        type: String,
        enum: [
          "American",
          "Italian",
          "Chinese",
          "Indian",
          "Japanese",
          "Mexican",
          "Thai",
          "French",
          "Mediterranean",
          "Greek",
          "Spanish",
          "Other",
        ],
        required: true,
      },
    ],
    location: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    reviews: [
      {
        type: String,
      },
    ],
    website: {
      type: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    openHours: {
      type: String,
    },
    priceRange: [
      {
        type: String,
        enum: ["$ (0-10)", "$$ (11-30)", "$$$ (31-60)", "$$$$ (61+)", "Other"],
      },
    ],
    reservationsNeeded: {
      type: Boolean,
      default: false,
    },
    isDeliveryAvailable: {
      type: Boolean,
      default: false,
    },
    menuUrl: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const Restaurants = mongoose.model("Restaurants", restaurantSchema);

module.exports = Restaurants;
