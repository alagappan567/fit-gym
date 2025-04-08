const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: String, required: true },
  mealType: { type: String, required: true },
  foodItem: { type: String, required: true },
  quantity: { type: Number, required: true },
  calories: { type: Number, required: true },
});

module.exports = mongoose.model("Meal", mealSchema);