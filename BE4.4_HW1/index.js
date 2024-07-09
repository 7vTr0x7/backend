const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Restaurants = require("./models/restaurants.models");

const app = express();

app.use(express.json());

initializeDatabase();

const createRes = async (res) => {
  try {
    const newRes = new Restaurants(res);
    const savedRes = newRes.save();
    return savedRes;
  } catch (error) {
    throw error;
  }
};

app.post("/restaurants", async (req, res) => {
  try {
    const savedRes = await createRes(req.body);
    res.status(201).json({ message: "Restaurant saved", res: savedRes });
  } catch (error) {
    res.status.json({ error: "Failed to add restaurants" });
  }
});

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

const deleteRestaurant = async (resId) => {
  try {
    const deletedRes = await Restaurants.findByIdAndDelete(resId);
    return deletedRes;
  } catch (error) {
    throw error;
  }
};

app.delete("/restaurants/:resId", async (req, res) => {
  try {
    const deletedRes = await deleteRestaurant(req.params.resId);
    res.status(201).json({ message: "deleted", res: deletedRes });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

const updateRes = async (resId, dataToUpdate) => {
  try {
    const updatedRes = await Restaurants.findByIdAndUpdate(
      resId,
      dataToUpdate,
      {
        new: true,
      }
    );
    return updatedRes;
  } catch (error) {
    throw error;
  }
};

app.post("/restaurants/:resId", async (req, res) => {
  try {
    const updatedRes = await updateRes(req.params.resId, req.body);
    if (updatedRes) {
      res.status(200).json({
        message: "Updated",
        res: updatedRes,
      });
    } else {
      res.status(404).json({ error: "Restaurant not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update data" });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
