const mongoose = require("mongoose");

const carsSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
    },
    mileage: {
      type: Number,
    },

    fuelType: [
      {
        type: String,
        enum: ["Gasoline", "Diesel", "Electric", "Hybrid"],
      },
    ],

    transmission: [
      {
        type: String,
        enum: ["Automatic", "Manual"],
      },
    ],
    bodyStyle: {
      type: String,
    },
    color: {
      type: String,
    },
    isCertifiedPreOwned: {
      type: Boolean,
      default: false,
    },
    isFourWheelDrive: {
      type: Boolean,
      default: false,
    },
    isLuxury: {
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
  },
  { timestamps: true }
);

const Cars = mongoose.model("Cars", carsSchema);

module.exports = Cars;
