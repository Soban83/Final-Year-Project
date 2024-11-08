const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const bodyParser = require('body-parser')
const videoRoutes = require('./routes/videos.route')
const userRoutes = require('./routes/users.routes')
const path = require('path');
const Report = require('./models/report.model')
const audioRoutes = require('./routes/audio.routes');


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/video', videoRoutes);
app.use('/user', userRoutes)
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use audio routes
app.use('/audio', audioRoutes);

mongoose.connect("mongodb+srv://rehnuma:1234@cluster0.lij4z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', (req, res) => {
    res.send(`Server is running on NodeJS:${port}`);
});

app.post('/reports', async (req, res) => {
  const { userID, testNumber, pointsScored, totalScore } = req.body;
  console.log(req.body);

  try {
    // Check if a report with the same userID and testNumber already exists
    const existingReport = await Report.findOne({ userID, testNumber });

    if (existingReport) {
      // If the report exists, update the pointsScored and totalScore
      existingReport.pointsScored = pointsScored;
      existingReport.totalScore = totalScore;
      await existingReport.save();
      return res.status(200).send({ message: 'Report updated!', report: existingReport });
    } else {
      // If the report does not exist, create a new one
      const newReport = new Report({ userID, testNumber, pointsScored, totalScore });
      await newReport.save();
      return res.status(201).send({ message: 'Report saved!', report: newReport });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: error.message });
  }
});


// Replace the existing /reports route with the following
app.get('/reports/:userID', async (req, res) => {
  const { userID } = req.params; // Get userID from the request parameters

  try {
    const reports = await Report.find({ userID }); // Filter reports by userID
    res.status(200).send(reports);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
