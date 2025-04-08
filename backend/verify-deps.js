const fs = require('fs');
const path = require('path');

// Function to log to both console and file
const log = (msg) => {
  console.log(msg);
  fs.appendFileSync('verify.log', msg + '\n');
};

try {
  log('Starting dependency verification...');
  
  // Check required modules
  const modules = ['express', 'mongoose', 'cors', 'dotenv', 'jsonwebtoken', 'bcrypt', 'validator'];
  modules.forEach(module => {
    try {
      require(module);
      log(`✅ ${module} is properly installed`);
    } catch (err) {
      log(`❌ ${module} is missing or has issues: ${err.message}`);
    }
  });

  // Check MongoDB connection
  const mongoose = require('mongoose');
  log('\nTesting MongoDB connection...');
  mongoose.connect('mongodb+srv://karthikakashsv:karthik@cluster0.ocytz.mongodb.net/gym', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    log('✅ MongoDB connection successful');
    process.exit(0);
  })
  .catch(err => {
    log(`❌ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  });

} catch (err) {
  log(`❌ Verification script error: ${err.message}`);
  process.exit(1);
}