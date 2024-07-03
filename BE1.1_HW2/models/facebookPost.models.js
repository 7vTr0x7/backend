const mongoose = require("mongoose");

const facebookPostSchema = new mongoose.Schema({
  userProfileImgURL: String,
  username: String,
  verified: Boolean,
  postedDate: String,
  postedTime: Number,
  postDescription: String,
  postImgURL: String,
  reactionCount: Number,
  commentsCount: Number,
  sharesCount: Number,
});

const FacebookPost = mongoose.model("FacebookPost", facebookPostSchema);

module.exports = FacebookPost;
