const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoPath: { type: String, required: true },
  thumbnailPath: { type: String, required: true },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
