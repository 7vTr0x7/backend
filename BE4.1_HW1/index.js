const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Restaurants = require("./models/restaurants.models");

const app = express();

app.use(express.json());

initializeDatabase();

const readAllRestaurants = async () => {
  try {
    const allRes = await Restaurants.find();
    return allRes;
  } catch (error) {
    throw error;
  }
};

app.get("/restaurants", async (req, res) => {
  try {
    const restaurants = await readAllRestaurants();
    if (restaurants) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: "Restaurant not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get restaurants" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
