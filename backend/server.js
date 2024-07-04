//Entry file for the backend application its where we are going to register the express app
const express = require("express");
require("dotenv").config(); //config method attaches envirnoment variables to process object
const mongoose = require("mongoose");

const workoutroutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

//express app
const app = express(); //or instead of writing 2 lines we can write single const app = require("express")();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  //req.path is the path portion of the URL requested by the client.
  //req.method is the HTTP method used in the request (e.g., GET, POST, etc.).
  next();
}); //invoke next function for going to next middleware i.e below code

//routes
app.use("/api/workouts", workoutroutes); //it grabs all the differnet routes that we attach to router in workouts.js and uses them on the app
app.use("/api/user", userRoutes);

//routes
// app.get("/", (req, res) => {
//   res.json({ mssg: "Welcome to the app" });
// }); //this is techinically middleware

//connect to db
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to db &listeneing on port ", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

//dot env is a package that loads envirnoment variables from a dot env file into process.env object avaible to us globally in a nodejs envirnoment
//middleware is any code that executes between us getting request on server and us sending response

//mongoose is an ODM library(object data modelling) it basicaly wraps mongodb with extra layer that allows us to use methods to read and write database documents and also to declare models and scehemas for structuring our data i.e for structuring what type of data to enter in our database
