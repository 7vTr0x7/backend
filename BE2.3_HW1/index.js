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

const newRestaurant1 = {
  name: "Yo China",
  cuisine: ["Chinese", "Italian"],
  location: "MG Road, Bangalore",
  rating: 3.9,
  reviews: [],
  website: "https://yo-example.com",
  phoneNumber: "+1288997392",
  openHours: "Tue-Sun: 10:00 AM - 11:00 PM",
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isDeliveryAvailable: false,
  menuUrl: "https://yo-example.com/menu",
  photos: [
    "https://example.com/yo-photo1.jpg",
    "https://example.com/yo-photo2.jpg",
    "https://example.com/yo-photo3.jpg",
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

// createRes(newRestaurant);
// createRes(newRestaurant1);

const readAllRestaurants = async () => {
  try {
    const allRes = await Restaurants.find();
    console.log("All Restaurants:", allRes);
  } catch (error) {
    throw error;
  }
};

// readAllRestaurants();

const readRestaurantsByName = async (resName) => {
  try {
    const restaurantByName = await Restaurants.findOne({ name: resName });
    console.log("Restaurant By Name:", restaurantByName);
  } catch (error) {
    throw error;
  }
};

readRestaurantsByName("New Restaurant");

const readAllRestaurantByReservation = async () => {
  try {
    const allResWithReservation = await Restaurants.find({
      reservationsNeeded: true,
    });

    console.log("All Restaurants with Reservation:", allResWithReservation);
  } catch (error) {
    throw error;
  }
};

// readAllRestaurantByReservation();

const readAllResWithDelivery = async () => {
  try {
    const allResWithDelivery = await Restaurants.find({
      isDeliveryAvailable: true,
    });

    console.log("All Restaurants with Delivery:", allResWithDelivery);
  } catch (error) {
    throw error;
  }
};

// readAllResWithDelivery();

const readResByPhoneNumber = async (number) => {
  try {
    const resByNumber = await Restaurants.findOne({ phoneNumber: number });
    console.log("Restaurant By Phone Number:", resByNumber);
  } catch (error) {
    throw error;
  }
};

// readResByPhoneNumber("+1288997392");

const readAllResByCuisine = async (cuisine) => {
  try {
    const allResByCuisine = await Restaurants.find({ cuisine: cuisine });
    console.log(allResByCuisine);
  } catch (error) {
    throw error;
  }
};

// readAllResByCuisine("Italian");

const updateRestaurant = async (resId, dataToUpdate) => {
  try {
    const updatedRes = await Restaurants.findByIdAndUpdate(
      resId,
      dataToUpdate,
      {new:true}
    );
    console.log("Updated Restaurant:", updatedRes);
  } catch (error) {
    console.log("Error occurred while updating data.", error);
  }
};

updateRestaurant("668671cdea70ab19f9d23f1f", { rating: 4.1 });
