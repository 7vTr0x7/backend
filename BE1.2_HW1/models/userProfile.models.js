const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  fullName: String,
  username: String,
  bio: String,
  profilePicUrl: String,
  followingCount: Number,
  followerCount: Number,
  companyName: String,
  location: String,
  portfolioUrl: String,
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);

module.exports = UserProfile;
