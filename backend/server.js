const express = require("express");
require("dotenv").config(); // Load environment variables
const mongoose = require("mongoose");

const workoutroutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// Create an express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`Path: ${req.path}`);
  console.log(`Method: ${req.method}`);
  console.log(`Body: ${JSON.stringify(req.body)}`);
  next();
});

// Register routes
app.use("/api/workouts", workoutroutes); // Attach workout routes
app.use("/api/user", userRoutes); // Attach user routes

// Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    // Start listening for requests
    app.listen(process.env.PORT, () => {
      console.log(`Connected to DB & listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
