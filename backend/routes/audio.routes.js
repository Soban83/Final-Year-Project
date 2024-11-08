const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const audioController = require('../controllers/audio.controller');

// Multer configuration for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route to handle audio file upload
router.post('/upload', upload.single('audio'), audioController.uploadAudio);

// Route to get all audio files
router.get('/', audioController.getAllAudios);

module.exports = router;
