const express = require('express');
const multer = require('multer');
const videoController = require('../controllers/video.controller');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads');
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/upload', upload.fields([{ name: 'video' }, { name: 'thumbnail' }]), videoController.uploadVideo);
router.get('/getvideos', videoController.getAllVideos);

module.exports = router;
