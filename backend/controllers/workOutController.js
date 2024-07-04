// Controllers | NestJS - A progressive Node.js framework
// Controllers are responsible for handling incoming requests and returning responses to the client

const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;
  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};

//get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: error.message }); //if we dont write return here it will fire the full code
  }
  res.status(200).json(workout);
};

//create new workout

const createWorkout = async (req, res) => {
  const { workoutType, duration, intensity, date } = req.body; //extracting workoutType, duration, intensity, date from request body
  let emptyFields = [];
  if (!workoutType) {
    emptyFields.push("workoutType");
  }
  if (!duration) {
    emptyFields.push("duration");
  }
  if (!intensity) {
    emptyFields.push("intensity");
  }
  if (!date) {
    emptyFields.push("date");
  }
  // if (emptyFields.length > 0) {
  //   return res
  //     .status(400)
  //     .json({ error: "Please fill in all the fields", emptyFields });
  // }
  //add doc to db
  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ workoutType, duration, intensity, date, user_id }); //creating a new document/workout
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (!workout) {
    //If there is no workout
    return res.status(404).json({ error: error.message }); //if we dont write return here it will fire the full code
  }
  res.status(200).json(workout);
};

//update a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }
  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!workout) {
    //If there is no workout
    return res.status(404).json({ error: error.message }); //if we dont write return here it will fire the full code
  }
  res.status(200).json(workout);
};

module.exports = {
  getWorkout,
  getWorkouts,
  createWorkout,
  deleteWorkout,
  updateWorkout,
};
