const { initializeDatabase } = require("./db/db.connect");
const Hotels = require("./models/hotels.models");

initializeDatabase();

const newHotel = {
  name: "Lake View",
  category: "Mid-Range",
  location: "124 Main Street, Anytown",
  rating: 3.2,
  reviews: [],
  website: "https://lake-view-example.com",
  phoneNumber: "+1234555890",
  checkInTime: "2:00 PM",
  checkOutTime: "12:00 PM",
  amenities: ["Laundry", "Boating"],
  priceRange: "$$$ (31-60)",
  reservationsNeeded: true,
  isParkingAvailable: false,
  isWifiAvailable: true,
  isPoolAvailable: false,
  isSpaAvailable: false,
  isRestaurantAvailable: false,
  photos: [
    "https://example.com/hotel1-photo1.jpg",
    "https://example.com/hotel1-photo2.jpg",
  ],
};

const newHotel1 = {
  name: "Sunset Resort",
  category: "Resort",
  location: "12 Main Road, Anytown",
  rating: 4.0,
  reviews: [],
  website: "https://sunset-example.com",
  phoneNumber: "+1299655890",
  checkInTime: "2:00 PM",
  checkOutTime: "11:00 AM",
  amenities: [
    "Room Service",
    "Horse riding",
    "Boating",
    "Kids Play Area",
    "Bar",
  ],
  priceRange: "$$$$ (61+)",
  reservationsNeeded: true,
  isParkingAvailable: true,
  isWifiAvailable: true,
  isPoolAvailable: true,
  isSpaAvailable: true,
  isRestaurantAvailable: true,
  photos: [
    "https://example.com/hotel2-photo1.jpg",
    "https://example.com/hotel2-photo2.jpg",
  ],
};

const createHotel = async (newHotel) => {
  try {
    const hotel = new Hotels(newHotel);
    const savedHotel = await hotel.save();
    console.log("Saved Hotel:", savedHotel);
  } catch (error) {
    throw error;
  }
};

// createHotel(newHotel);
// createHotel(newHotel1);

const readAllHotels = async () => {
  try {
    const allHotels = await Hotels.find();
    console.log("All Hotels:", allHotels);
  } catch (error) {
    throw error;
  }
};

// readAllHotels();

const readHotelByName = async (hotelName) => {
  try {
    const hotelByName = await Hotels.findOne({ name: hotelName });
    console.log("Hotel By Name:", hotelByName);
  } catch (error) {
    throw error;
  }
};

// readHotelByName("Lake View");

const readAllHotelsWithParking = async () => {
  try {
    const hotelsWithParking = await Hotels.find({ isParkingAvailable: true });
    console.log("Hotels With Parking:", hotelsWithParking);
  } catch (error) {
    throw error;
  }
};

// readAllHotelsWithParking();

const readAllHotelsWithRes = async () => {
  try {
    const allHotelsWithRes = await Hotels.find({ isRestaurantAvailable: true });
    console.log("All Hotels With Restaurants:", allHotelsWithRes);
  } catch (error) {
    throw error;
  }
};

// readAllHotelsWithRes();

const allHotelsByCategory = async (category) => {
  try {
    const allHotelsByCategory = await Hotels.find({ category: category });
    console.log("All Hotels By Category:", allHotelsByCategory);
  } catch (error) {
    throw error;
  }
};

// allHotelsByCategory("Mid-Range");

const readAllHotelByPriceRange = async (priceRange) => {
  try {
    const allHotelsByPrice = await Hotels.find({ priceRange: priceRange });
    console.log("All Hotels By Price Range:", allHotelsByPrice);
  } catch (error) {
    throw error;
  }
};

// readAllHotelByPriceRange("$$$$ (61+)");

const readHotelsWithRating = async (rating) => {
  try {
    const hotelWithRating = await Hotels.findOne({ rating: rating });
    console.log("Hotel With Rating:", hotelWithRating);
  } catch (error) {
    throw error;
  }
};

// readHotelsWithRating(4.0);

const readHotelByPhoneNumber = async (number) => {
  try {
    const hotelByNumber = await Hotels.findOne({ phoneNumber: number });
    console.log("Hotel By Number:", hotelByNumber);
  } catch (error) {
    throw error;
  }
};

// readHotelByPhoneNumber("+1299655890");

const updateHotelCheckoutTime = async (hotelId, dataToUpdate) => {
  try {
    const updatedHotel = await Hotels.findByIdAndUpdate(hotelId, dataToUpdate, {
      new: true,
    });
    console.log("Updated Checkout time:", updatedHotel);
  } catch (error) {
    console.log("Error occurred while updating checkout time", error);
  }
};

// updateHotelCheckoutTime("66867e2c571392433699132b", { checkOutTime: "11 AM" });

const updateHotelRating = async (hotelName, dataToUpdate) => {
  try {
    const updatedHotel = await Hotels.findOneAndUpdate(
      hotelName,
      dataToUpdate,
      { new: true }
    );

    console.log("Updated rating:", updatedHotel);
  } catch (error) {
    console.log("Error occurred while updating rating", error);
  }
};

updateHotelRating({ name: "Sunset Resort" }, { rating: 4.2 });
