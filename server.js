const express = require('express');
const cors = require('cors');
const app = express();
const dailyCalorieRouter = require('./src/components/DailyCalorieIntake/DailyCalorieIntake'); // Verifică că calea este corectă

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://rebecavoicilas:testinggoit@cluster0.n9vph.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB connection error:', err);
});


app.use(cors()); // Permite toate cererile CORS
app.use(express.json()); // Permite serverului să înțeleagă JSON-ul
app.use('/dailycalorieintake', dailyCalorieRouter); // Endpoint disponibil la http://localhost:5000/dailycalorieintake

app.listen(5000, () => {
  console.log('Serverul rulează pe http://localhost:5000');
});
