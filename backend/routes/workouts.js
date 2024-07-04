const express = require("express");
const {
  createWorkout,
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workOutController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();
//require auth for all workout routes
router.use(requireAuth);
// const Workout = require("../models/workoutModel");

//GET all workouts
router.get("/", getWorkouts);
// (req, res) => {
//   res.json({ mssg: "GET all workouts" });
// }); //routes that we attach to router
// router.get("/hello", () => {}); hello function fires the callback function when we go into path /api/workouts/hello

//Get a single workout

router.get("/:id", getWorkout);
// (req, res) => {
//   res.json({ mssg: "GET a single workout" }); //or res.send for plain data
// });

//POST a new workout
router.post("/", createWorkout);
//  async (req, res) => {
//   //   res.json({ mssg: "POST a new workout" });
// });

//DELETE a workout
router.delete("/:id", deleteWorkout);
// (req, res) => {
//   res.json({ mssg: "DELELTE a  workout" });
// });

//UPDATE a workout
router.patch("/:id", updateWorkout);
//  (req, res) => {
//   res.json({ mssg: "UPDATE a  workout" });
// });

module.exports = router;
