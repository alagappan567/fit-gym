const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

// Clear previous log
fs.writeFileSync('status.log', '');

function log(msg) {
  fs.appendFileSync('status.log', msg + '\n');
}

log('Starting status check...');
log(`Port configured: ${process.env.PORT}`);
log(`MongoDB URL configured: ${process.env.MONGO_URL ? 'Yes' : 'No'}`);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    log('Database connected successfully');
    log('MongoDB connection status: Connected');
    process.exit(0);
  })
  .catch(error => {
    log(`Database connection error: ${error.message}`);
    process.exit(1);
  });