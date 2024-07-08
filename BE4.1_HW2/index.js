const express = require("express");
const { initializeDatabase } = require("./db/db.connect");
const Hotels = require("./models/hotels.models");

const app = express();

app.use(express.json());

initializeDatabase();

const readAllHotels = async () => {
  try {
    const allHotels = await Hotels.find();
    console.log("All Hotels:", allHotels);
  } catch (error) {
    throw error;
  }
};

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

// updateHotelRating({ name: "Sunset Resort" }, { rating: 4.2 });

const updateHotelPhoneNumber = async (number, dataToUpdate) => {
  try {
    const updatedHotel = await Hotels.findOneAndUpdate(number, dataToUpdate, {
      new: true,
    });
    console.log("Updated Hotel Phone Number:", updatedHotel);
  } catch (error) {
    console.log("Error occurred while updating phone number", error);
  }
};

// updateHotelPhoneNumber(
//   { phoneNumber: "+1299655890" },
//   { phoneNumber: "+1997687392" }
// );

const deleteHotelById = async (id) => {
  try {
    const deletedHotel = await Hotels.findByIdAndDelete(id);
    console.log("Deleted Hotel:", deletedHotel);
  } catch (error) {
    console.log("Error occurred while deleting hotel by id", error);
  }
};

// deleteHotelById("66864cbfcfe961190085d95b");

const deleteHotelByPhoneNumber = async (number) => {
  try {
    const deletedHotel = await Hotels.findOneAndDelete({
      phoneNumber: number,
    });
    console.log("Deleted Hotel:", deletedHotel);
  } catch (error) {
    console.log("Error occurred while deleting hotel by phone number", error);
  }
};

deleteHotelByPhoneNumber("+1234567890");
