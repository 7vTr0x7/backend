const mongoose = require("mongoose");

const mongoURI =
  process.env.MONGODB ||
  "mongodb+srv://neoGStudent:vTroxGAMING@neog.vf9x0bo.mongodb.net/?retryWrites=true&w=majority&appName=neoG";

const initializeDatabase = async () => {
  try {
    const connection = await mongoose.connect(mongoURI);
    if (connection) {
      console.log("Connected to mongoDB");
    }
  } catch (error) {
    console.log(`Failed to connect mongoDB`);
    throw error;
  }
};

module.exports = { initializeDatabase };
