const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  channelName: String,
  channelLogoURL: String,
  viewsCount: Number,
  postedDate: Date,
  thumbnailImgURL: String,
  videoDuration: Number,
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
