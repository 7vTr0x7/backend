const { initializeDatabase } = require("./db/db.connect");
const fs = require("fs");
const Cars = require("./models/cars.models");

initializeDatabase();

const carData = {
  brand: "Ford",
  model: "Mustang",
  year: 2019,
  bodyStyle: "Convertible",
  fuelType: "Gasoline",
  transmission: "Automatic",
  engine: "5.0L V8",
  mileage: 25000,
  color: "Red",
  price: 3500000,
  condition: "Used",
  description: "Exciting Ford Mustang convertible with powerful V8 engine.",
  photos: [
    "https://example.com/mustang-photo1.jpg",
    "https://example.com/mustang-photo2.jpg",
    "https://example.com/mustang-photo3.jpg",
  ],
};

const carData2 = {
  brand: "Honda",
  model: "Civic",
  year: 2018,
  bodyStyle: "Coupe",
  fuelType: "Gasoline",
  transmission: "Manual",
  engine: "1.5L Turbocharged Inline-4",
  mileage: 40000,
  color: "Black",
  price: 1800000,
  condition: "Used",
  description: "Sporty Civic coupe with low mileage and manual transmission.",
  photos: [
    "https://example.com/civic-photo1.jpg",
    "https://example.com/civic-photo2.jpg",
    "https://example.com/civic-photo3.jpg",
  ],
};

const createCar = async (newCar) => {
  try {
    const car = new Cars(newCar);
    const savedCar = await car.save();
    console.log("Saved Car:", savedCar);
  } catch (error) {
    console.log("Error while saving car data", error);
  }
};

// createCar(carData);
// createCar(carData2);

const readAllCars = async () => {
  try {
    const allCars = await Cars.find();
    console.log("All Cars:", allCars);
  } catch (error) {
    console.log("Error occurred while reading all car data.", error);
  }
};

// readAllCars();

const readCarsByBrand = async (brand) => {
  try {
    const carsByBrand = await Cars.find({ brand: brand });
    console.log("Cars by Brand:", carsByBrand);
  } catch (error) {
    console.log("Error while reading car brand data.", error);
  }
};

// readCarsByBrand("Ford");

const readCarsByColor = async (color) => {
  try {
    const carsByColor = await Cars.find({ color: color });
    console.log("Cars By color:", carsByColor);
  } catch (error) {
    console.log("Error while reading cars data by color", error);
  }
};

// readCarsByColor("Black");

const updateCarPrice = async (model, price) => {
  try {
    const updatedCar = await Cars.findOneAndUpdate(
      { model: model },
      { price: price },
      { new: true }
    );
    console.log("Updated Car:", updatedCar);
  } catch (error) {
    console.log("Error occurred while updating car price", error);
  }
};

// updateCarPrice("Corolla", 2300000);

const updateCarCondition = async (model, condition) => {
  try {
    const updatedCar = await Cars.findOneAndUpdate(
      { model: model },
      { condition: condition },
      { new: true }
    );
    console.log("Updated Car:", updatedCar);
  } catch (error) {
    console.log("Error occurred while updating car condition", error);
  }
};

// updateCarCondition("Model S", "Used");

const deleteCarById = async (id) => {
  try {
    const deletedCar = await Cars.findByIdAndDelete(id);
    console.log("Deleted Car:", deletedCar);
  } catch (error) {
    console.log("Error occurred while deleting car by id:", error);
  }
};

// deleteCarById("668639ca2fafe37e1ea6d185");

const deleteCarByBodyStyle = async (style) => {
  try {
    const deletedCar = await Cars.findOneAndDelete({ bodyStyle: style });
    console.log("Deleted Car:", deletedCar);
  } catch (error) {
    console.log("Error occurred while deleting car by body style:", error);
  }
};
deleteCarByBodyStyle("Coupe");
