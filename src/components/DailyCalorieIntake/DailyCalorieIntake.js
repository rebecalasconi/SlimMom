const express = require('express');
const router = express.Router();
const CalculateCalories = require('./CalculateCalories');
const ForbiddenFood = require('./ForbiddenFoods');
const getBloodTypeIndex = (bloodType) => parseInt(bloodType);
  
router.post('/', async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

  try {
    const calories = CalculateCalories(currentWeight, height, age, desiredWeight);
    const foodEntries = await ForbiddenFood.find();
    const bloodTypeIndex = getBloodTypeIndex(bloodType);
    
    const forbiddenFoods = foodEntries
      .filter((food) => {
        const foodBloodType = food.groupBloodNotAllowed[bloodTypeIndex];
        return foodBloodType === true;
      })
      .map((food) => food.title);

      const getRandomFoods = (foods, count) => {
      const shuffled = foods.sort(() => 0.5 - Math.random()); // Amestecă lista aleatoriu
      return shuffled.slice(0, count); // Selectează primele 4 alimente
    };

    const randomForbiddenFoods = getRandomFoods(forbiddenFoods, 4);
    const numberedFoods = randomForbiddenFoods.map((food, index) => `${index + 1}. ${food}`);

    router.get('/forbiddenFoods', async (req, res) => {
      try {
        const allFoods = await ForbiddenFood.find();
        res.json(allFoods); // Trimite toate obiectele complete
      } catch (error) {
        console.error('Error fetching forbidden foods:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  
    res.json({ 
      calories, 
      forbiddenFoods: numberedFoods, 
      allForbiddenFoods: forbiddenFoods
    });
    
  } catch (error) {
    console.error('Error calculating calories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
