const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const dailyCalorieRouter = require('./src/components/DailyCalorieIntake/DailyCalorieIntake');

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});


app.use(cors());
app.use(express.json());
app.use('/dailycalorieintake', dailyCalorieRouter);

const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');

dotenv.config();
app.use(express.json());

app.use('/users', authRoutes);