const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    workoutType: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    intensity: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    caloriesBurned: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Workout", workoutSchema);
