const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 8000

// Test route
app.get('/test', (req, res) => {
  res.json({ status: 'Server is running' })
})

console.log('Attempting database connection...')

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('\x1b[32m%s\x1b[0m', 'db connected')  // Green text
    app.listen(PORT, () => {
      console.log('\x1b[36m%s\x1b[0m', `Server running on port ${PORT}`) // Cyan text
    })
  })
  .catch(error => {
    console.log('\x1b[31m%s\x1b[0m', `MongoDB error: ${error.message}`) // Red text
    process.exit(1)
  })