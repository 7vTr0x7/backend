require("dotenv").config();
const mongoose = require("mongoose");

const { MongoClient } = require("mongodb");

// Access your MongoDB connection string from secrets
const mongoURI =
  process.env.MONGODB_URL ||
  "mongodb+srv://neoGStudent:vTroxGAMING@neog.vf9x0bo.mongodb.net/?retryWrites=true&w=majority&appName=neoG";

// Use mongoose to connect
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

console.log("MongoDB URI:", process.env.MONGODB);
