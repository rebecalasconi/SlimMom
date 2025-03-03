const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const dailyCalorieRouter = require('./src/components/DailyCalorieIntake/DailyCalorieIntake'); // Verifică că calea este corectă

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


app.use(cors()); // Permite toate cererile CORS
app.use(express.json()); // Permite serverului să înțeleagă JSON-ul
app.use('/dailycalorieintake', dailyCalorieRouter); // Endpoint disponibil la http://localhost:5000/dailycalorieintake

const dotenv = require('dotenv');
const authRoutes = require('./src/routes/auth');

dotenv.config();
app.use(express.json());

app.use('/users', authRoutes);

// app.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use.' });
//     }

//     const newUser = new User({ name, email, password });
//     await newUser.save();

//     res.status(201).json({ success: true, message: 'User registered successfully.' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error.' });
//   }
// }); 

// app.listen(5000, () => {
//   console.log('Serverul rulează pe http://localhost:5000');

// });
