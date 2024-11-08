const Audio = require('../models/audio.model');

exports.uploadAudio = async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const { originalname, path } = req.file;
    const { userId, passage } = req.body;
    // console.log(req.body);

    try {
      const newAudio = new Audio({
        originalName: originalname,
        path: path,
        userID: userId,
        passage: passage,
      });
  
      await newAudio.save();
      res.status(201).json({ message: 'Audio uploaded successfully!', audio: newAudio });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error while saving audio' });
    }
  };
// Fetch all audio files
exports.getAllAudios = async (req, res) => {
  try {
    const audios = await Audio.find();
    res.status(200).json(audios);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching audio files' });
  }
};
