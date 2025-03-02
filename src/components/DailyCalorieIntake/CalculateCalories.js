// src/components/DailyCalorieIntake/calculateCalories.js
const CalculateCalories = (currentWeight, height, age, gender) => {
    const bmr = 10 * currentWeight + 6.25 * height - 5 * age + (gender === 'female' ? 161 : 5);
    return bmr * 1.2; // Exemplu simplificat cu un factor de activitate de 1.2
  };
  
  module.exports = CalculateCalories;
  