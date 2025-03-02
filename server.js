const express = require('express');
const cors = require('cors');
const app = express();
const dailyCalorieRouter = require('./src/components/DailyCalorieIntake/DailyCalorieIntake'); // Verifică că calea este corectă

app.use(cors()); // Permite toate cererile CORS
app.use(express.json()); // Permite serverului să înțeleagă JSON-ul
app.use('/dailycalorieintake', dailyCalorieRouter); // Endpoint disponibil la http://localhost:5000/dailycalorieintake

app.listen(5000, () => {
  console.log('Serverul rulează pe http://localhost:5000');
});
