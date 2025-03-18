const CalculateCalories = (currentWeight, height, age, desiredWeight) => {
  const calories = 10 * currentWeight + 6.25 * height - 5 * age - 161 - 10 * (currentWeight - desiredWeight);
  return Math.round(calories);
};

module.exports = CalculateCalories;
