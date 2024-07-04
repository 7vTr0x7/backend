const { initializeDatabase } = require("./db/db.connect");
const Restaurants = require("./models/restaurants.models");

initializeDatabase();

const newRestaurant = {
  name: "Somi",
  cuisine: ["Greek"],
  location: "11 Main Road, Gem",
  rating: 4.3,
  reviews: [],
  website: "https://somi-example.com",
  phoneNumber: "+1234997390",
  openHours: "Tue-Sun: 11:00 AM - 10:00 PM",
  priceRange: "$$ (11-30)",
  reservationsNeeded: false,
  isDeliveryAvailable: true,
  menuUrl: "https://somi-example.com/menu",
  photos: [
    "https://example.com/somi-photo1.jpg",
    "https://example.com/somi-photo2.jpg",
  ],
};

const createRes = async (newRes) => {
  try {
    const res = new Restaurants(newRes);
    const savedRes = await res.save();
    console.log("Saved Res:", savedRes);
  } catch (error) {
    throw error;
  }
};

createRes(newRestaurant);
