const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// Clear console
process.stdout.write('\x1Bc')
process.stdout.write('Starting server...\n')

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mealRoutes = require('./routes/mealRoutes')

app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)
app.use('/api/meals', mealRoutes)

// MongoDB connection string from .env
const MONGO_URL = process.env.MONGO_URL
process.stdout.write(`Attempting to connect to MongoDB...\n`)

// Connect to MongoDB
mongoose.connect(MONGO_URL)
  .then(() => {
    process.stdout.write('db connected\n')
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
      process.stdout.write(`listening on port ${PORT}\n`)
    })
  })
  .catch(err => {
    process.stdout.write(`Database connection error: ${err.message}\n`)
    process.exit(1)
  })