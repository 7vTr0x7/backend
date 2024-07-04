const mongoose = require("mongoose");

const xProfileSchema = new mongoose.Schema({
  fullName: String,
  userName: String,
  bio: String,
  profileImgURL: String,
  followersCount: Number,
  followingCount: Number,
  companyName: String,
  location: String,
  portfolioURL: String,
});

const Profile = mongoose.model("Profile", xProfileSchema);

module.exports = Profile;
