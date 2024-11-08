const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
  originalName: { type: String, required: true },
  path: { type: String, required: true },
  userID: { type: String, required: true }, // Add userID field
  passage: { type: String, required: true }, // Add passage field
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Audio', audioSchema);
