const express = require("express");

const app = express();

const cars = [{ id: 1, make: "Toyota", model: "Camry", year: 2022 }];

app.get("/", (req, res) => {
  res.send("Hello, Express JS");
});

app.post("/cars", (req, res) => {
  const newCar = req.body;

  if (newCar.make && newCar.model && newCar.year) {
    cars.push(newCar);
    res.status(201).json({ message: "Car added successfully" });
  } else {
    res.status(400).json({ error: "make, model and year are required" });
  }
});

app.get("/cars", (req, res) => {
  res.send(cars);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on post: ${PORT}`);
});
