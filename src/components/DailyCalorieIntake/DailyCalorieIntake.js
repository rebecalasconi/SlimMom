const express = require('express');
const router = express.Router();
const CalculateCalories = require('./CalculateCalories');
const ForbiddenFood = require('./ForbiddenFoods'); // Importăm modelul ForbiddenFood

router.post('/', async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

  try {
    // Logica pentru calculul caloriilor
    const calories = CalculateCalories(currentWeight, height, age, 'female'); // Exemplu simplu

    // Căutăm alimentele interzise din MongoDB pe baza tipului de sânge
    const forbiddenFoods = [];

    // Căutăm alimente interzise pentru tipul de sânge din baza de date
    const foodEntries = await ForbiddenFood.find();

    console.log('Alimente găsite în MongoDB:', foodEntries);  // Adăugăm log pentru a verifica alimentele din DB

    foodEntries.forEach((food) => {
      // Obținem indexul tipului de sânge în array-ul groupBloodNotAllowed
      const bloodTypeIndex = getBloodTypeIndex(bloodType);

      console.log(`Verificăm alimentul: ${food.title} pentru tipul de sânge: ${bloodType}`); // Logăm numele alimentului și tipul de sânge

      // Dacă alimentul este interzis pentru tipul de sânge, îl adăugăm la lista de alimente interzise
      if (food.groupBloodNotAllowed[bloodTypeIndex] === true) {
        forbiddenFoods.push(food.title); // Adăugăm titlul alimentului
      }
    });

    res.json({ calories, forbiddenFoods });
  } catch (error) {
    console.error('Error calculating calories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

