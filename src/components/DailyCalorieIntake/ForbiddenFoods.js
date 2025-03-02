const mongoose = require('mongoose');

const forbiddenFoodSchema = new mongoose.Schema({
  bloodType: { type: String, required: true },
  foods: [String], // Listă de alimente interzise
});

const ForbiddenFood = mongoose.model('ForbiddenFood', forbiddenFoodSchema);

module.exports = ForbiddenFood;
