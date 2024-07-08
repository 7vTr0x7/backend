const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Restaurants = require("./models/restaurants.models");

const app = express();

app.use(express.json());

initializeDatabase();

// {

//   name: "Yo China",
//   cuisine: ["Chinese", "Italian"],
//   location: "MG Road, Bangalore",
//   rating: 3.9,
//   reviews: [],
//   website: "https://yo-example.com",
//   phoneNumber: "+1288997392",
//   openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isDeliveryAvailable: false,
//   menuUrl: "https://yo-example.com/menu",
//   photos: [
//     "https://example.com/yo-photo1.jpg",
//     "https://example.com/yo-photo2.jpg",
//     "https://example.com/yo-photo3.jpg",
//   ],
// };

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

const readRestaurantByName = async (name) => {
  try {
    const restaurantsByName = await Restaurants.findOne({ name: name });
    return restaurantsByName;
  } catch (error) {
    throw error;
  }
};

app.get("/restaurants/:resName", async (req, res) => {
  try {
    const restaurants = await readRestaurantByName(req.params.resName);
    if (restaurants) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: "Restaurant not Found" });
    }
  } catch (error) {
    res.status(5000).json({ error: "Failed to get restaurants" });
  }
});

const readRestaurantsByNumber = async (number) => {
  try {
    const restaurantsByNumber = await Restaurants.findOne({
      phoneNumber: number,
    });
    return restaurantsByNumber;
  } catch (error) {
    throw error;
  }
};

app.get("/restaurants/directory/:phoneNumber", async (req, res) => {
  try {
    const restaurant = await readRestaurantsByNumber(req.params.phoneNumber);
    if (restaurant) {
      res.json(restaurant);
    } else {
      res.status(404).json({ error: "Restaurant not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get Restaurants" });
  }
});

const readRestaurantsByCuisine = async (name) => {
  try {
    const restaurantsByCuisine = await Restaurants.find({ cuisine: name });
    return restaurantsByCuisine;
  } catch (error) {
    throw error;
  }
};

app.get("/restaurants/cuisine/:cuisineName", async (req, res) => {
  try {
    const restaurants = await readRestaurantsByCuisine(req.params.cuisineName);
    if (restaurants) {
      res.json(restaurants);
    } else {
      res.status(404).json({ error: "Restaurants not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get restaurant" });
  }
});

const readRestaurantByLocation = async (location) => {
  try {
    const restaurant = await Restaurants.find({ location: location });
    return restaurant;
  } catch (error) {
    throw error;
  }
};

app.get("/restaurants/location/:restaurantLocation", async (req, res) => {
  try {
    const restaurants = await readRestaurantByLocation(
      req.params.restaurantLocation
    );
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
