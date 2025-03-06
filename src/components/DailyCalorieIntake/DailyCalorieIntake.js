// const express = require('express');
// const router = express.Router();
// const CalculateCalories = require('./CalculateCalories');
// const ForbiddenFood = require('./ForbiddenFoods');

// const getBloodTypeIndex = (bloodType) => {
//   return parseInt(bloodType); // Convertim în număr și mapăm corect la indexul array-ului
// };

// router.post('/', async (req, res) => {
//   const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

//   try {
//     const calories = CalculateCalories(currentWeight, height, age, 'female');

//     // Preluăm toate alimentele și filtrăm pe baza tipului de sânge
//     const foodEntries = await ForbiddenFood.find();
//     const bloodTypeIndex = getBloodTypeIndex(bloodType);

//     const forbiddenFoods = foodEntries
//     .filter((food) => {
//       const foodBloodType = food.groupBloodNotAllowed[bloodTypeIndex];
//       return foodBloodType === true;
//     })
//     .map((food) => food.title);
  
//   // Selectează 4 alimente random din lista de alimente interzise
//   const getRandomFoods = (foods, count) => {
//     const shuffled = foods.sort(() => 0.5 - Math.random()); // Amestecă lista aleatoriu
//     return shuffled.slice(0, count); // Selectează primele 4 alimente
//   };
  
//   const randomForbiddenFoods = getRandomFoods(forbiddenFoods, 4);
  
//   // Numerotare alimente interzise
//   const numberedFoods = randomForbiddenFoods.map((food, index) => `${index + 1}. ${food}`);
  
//   res.json({ calories, forbiddenFoods: numberedFoods });
  
//   } catch (error) {
//     console.error('Error calculating calories:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const CalculateCalories = require('./CalculateCalories');
const ForbiddenFood = require('./ForbiddenFoods');
// const { default: DiaryPage } = require('../../pages/DiaryPage/DiaryPage');

const getBloodTypeIndex = (bloodType) => parseInt(bloodType);
  
router.post('/', async (req, res) => {
  const { height, age, currentWeight, desiredWeight, bloodType } = req.body;

  try {
    const calories = CalculateCalories(currentWeight, height, age, desiredWeight);

    // Obține toate alimentele interzise
    const foodEntries = await ForbiddenFood.find();
    const bloodTypeIndex = getBloodTypeIndex(bloodType);
    
    const forbiddenFoods = foodEntries
      .filter((food) => {
        const foodBloodType = food.groupBloodNotAllowed[bloodTypeIndex];
        return foodBloodType === true;
      })
      .map((food) => food.title);


      // const forbiddenData = foodEntries
      // .map((food) => food);
      // console.log(forbiddenData)

    // Selectează primele 4 alimente interzise aleatorii
    const getRandomFoods = (foods, count) => {
      const shuffled = foods.sort(() => 0.5 - Math.random()); // Amestecă lista aleatoriu
      return shuffled.slice(0, count); // Selectează primele 4 alimente
    };

    const randomForbiddenFoods = getRandomFoods(forbiddenFoods, 4);

    // Numerotează alimentele interzise
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
    
    
    // Returnează atât forbiddenFoods (alimente aleatorii) cât și allForbiddenFoods (toate alimentele interzise)
    res.json({ 
      calories, 
      forbiddenFoods: numberedFoods, 
      allForbiddenFoods: forbiddenFoods // Adăugăm toate alimentele interzise în răspuns
    });
    
  } catch (error) {
    console.error('Error calculating calories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
