const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Hotels = require("./models/hotels.models");

const app = express();

app.use(express.json());

initializeDatabase();

const readAllHotels = async () => {
  try {
    const allHotels = await Hotels.find();
    return allHotels;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await readAllHotels();
    if (hotels) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotel not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get hotels" });
  }
});

const readHotelByName = async (hotelName) => {
  try {
    const hotelByName = await Hotels.findOne({ name: hotelName });
    return hotelByName;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/:hotelName", async (req, res) => {
  try {
    console.log(req);
    const hotels = await readHotelByName(req.params.hotelName);
    if (hotels) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotel not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get data" });
  }
});

const readHotelByPhoneNumber = async (number) => {
  try {
    const hotelByNumber = await Hotels.findOne({ phoneNumber: number });
    return hotelByNumber;
  } catch (error) {
    throw error;
  }
};

app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await readHotelByPhoneNumber(req.params.phoneNumber);
    if (hotel) {
      res.json(hotel);
    } else {
      res.status(404).json({ error: "Hotel not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to get hotel" });
  }
});

const allHotelsByCategory = async (category) => {
  try {
    const allHotelsByCategory = await Hotels.find({ category: category });
    console.log("All Hotels By Category:", allHotelsByCategory);
  } catch (error) {
    throw error;
  }
};

const readHotelsWithRating = async (rating) => {
  try {
    const hotelWithRating = await Hotels.findOne({ rating: rating });
    console.log("Hotel With Rating:", hotelWithRating);
  } catch (error) {
    throw error;
  }
};

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
