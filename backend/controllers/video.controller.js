const path = require('path');
const Video = require('../models/videos.model');

exports.uploadVideo = async (req, res) => {
  try {
    const { title } = req.body;
    const videoFile = req.files.video[0];
    const thumbnailFile = req.files.thumbnail[0];

    const video = new Video({
      title,
      videoPath: videoFile.filename,
      thumbnailPath: thumbnailFile.filename,
    });

    await video.save();

    res.status(201).json({ message: 'Video uploaded successfully!', video });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading video', error });
  }
};

exports.getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all videos from the database
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching videos', error });
  }
};
