const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const Meal = require("../models/Meal");

// Debug middleware
router.use((req, res, next) => {
  console.log('Meal Route - Headers:', req.headers);
  console.log('Meal Route - Method:', req.method);
  console.log('Meal Route - Path:', req.path);
  console.log('Meal Route - Query:', req.query);
  next();
});

// Apply authentication middleware
router.use(requireAuth);

// GET all meals or meals for a specific date
router.get("/", async (req, res) => {
  try {
    console.log('User ID from auth:', req.user._id);
    const query = { userId: req.user._id };
    
    // If a specific date is requested, add it to the query
    if (req.query.date) {
      console.log('Filtering by date:', req.query.date);
      query.date = req.query.date;
    }
    
    console.log('Final query:', query);
    const meals = await Meal.find(query)
      .sort({ date: -1 })
      .exec();
      
    console.log('Found meals:', meals.length);
    console.log('Meals:', meals);
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(400).json({ error: error.message });
  }
});

// GET all meals
router.get("/all", async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(meals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST a new meal
router.post("/", async (req, res) => {
  const { date, mealType, foodItem, quantity, calories } = req.body;
  console.log('Creating meal:', { date, mealType, foodItem, quantity, calories });

  try {
    if (!date || !mealType || !foodItem || !quantity || !calories) {
      throw new Error('All fields are required');
    }

    const meal = new Meal({
      userId: req.user._id,
      date,
      mealType,
      foodItem,
      quantity: Number(quantity),
      calories: Number(calories)
    });

    await meal.save();
    console.log('Meal saved:', meal);
    res.status(201).json(meal);
  } catch (error) {
    console.error('Error creating meal:', error);
    res.status(400).json({ error: error.message });
  }
});

// DELETE a meal
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const meal = await Meal.findOneAndDelete({ 
      _id: id, 
      userId: req.user._id 
    });

    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    res.status(200).json(meal);
  } catch (error) {
    console.error('Error deleting meal:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;