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

readAllHotelsWithParking();
