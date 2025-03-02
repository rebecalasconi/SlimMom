const express = require('express');
const router = express.Router();
const CalculateCalories = require('./CalculateCalories'); // Importă funcția calculateCalories

router.post('/', (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

  // Logica pentru calculul caloriilor
  const calories = CalculateCalories(currentWeight, height, age, 'female'); // Exemplu simplu
  const forbiddenFoods = ['Apples', 'Bananas']; // Exemplu de alimente interzise

  res.json({ calories, forbiddenFoods });
});

module.exports = router;
