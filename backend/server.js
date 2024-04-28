// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost/leave-entry-boys', { useNewUrlParser: true, useUnifiedTopology: true });

// Define mongoose schema
const leaveEntrySchema = new mongoose.Schema({
    registrationNumber: String,
    name: String,
    yearOfStudy: Number,
    hostelLeavingDate: Date,
    hostelReturningDate: Date,
    warden: String // Add warden field
  });
  
// Define mongoose model
const LeaveEntry = mongoose.model('LeaveEntry', leaveEntrySchema);

// Define routes
app.post('/leave-entry', async (req, res) => {
  try {
    const newEntry = new LeaveEntry(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// server.js

// server.js

///students-returning-today

app.get('/students-returning-today', async (req, res) => {
    try {
      const today = new Date();
      // Extract only the date portion of the current date
      const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
      // Check if warden query parameter is provided
      const warden = req.query.warden;
  
      let query = { hostelReturningDate: { $lt: todayDate } };
      // If warden query parameter is provided, add it to the query
      if (warden) {
        query.warden = warden;
      }
  
      const studentsLeaveOver = await LeaveEntry.find(query);
      res.json(studentsLeaveOver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  // server.js

app.delete('/delete-student/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await LeaveEntry.findByIdAndDelete(id);
      res.status(204).send(); // No content response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/students-on-leave', async (req, res) => {
    try {
      // Check if warden query parameter is provided
      const warden = req.query.warden;
  
      let query = {};
      // If warden query parameter is provided, add it to the query
      if (warden) {
        query.warden = warden;
      }
  
      const studentsOnLeave = await LeaveEntry.find(query);
      res.json(studentsOnLeave);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if username and password match the expected credentials
    if (username === 'admin' && password === 'password') {
      // Return success response if authenticated
      res.json({ success: true });
    } else {
      // Return error response if authentication fails
      res.status(401).json({ success: false });
    }
  });
  
  
  

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
