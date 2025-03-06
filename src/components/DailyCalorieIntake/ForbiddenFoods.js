const mongoose = require('mongoose');

const forbiddenFoodSchema = new mongoose.Schema({
  categories: { type: String, required: true },
  weight: { type: Number, required: true },
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  groupBloodNotAllowed: [Boolean],
});

const ForbiddenFood = mongoose.model('ForbiddenFood', forbiddenFoodSchema, 'SlimMom'); // Specifică numele colecției
module.exports = ForbiddenFood;

