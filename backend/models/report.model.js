const mongoose = require('mongoose');
const { type } = require('os');

const reportSchema = new mongoose.Schema({
  userID: { 
    type: String, 
    required: true,
  },
  testNumber: {
    type: Number,
    required: true,
  },
  pointsScored: {
    type: Number,
    required: true,
  },
  totalScore: {
    type: Number,
    required: true,
  }
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;