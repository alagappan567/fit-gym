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
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Workout", workoutSchema); //creating a model and exporting
// a schema defines a structure of a particular document or type of document inside our database
// a model applies that schema to a particular model and we use that model to interact with collection of that name
