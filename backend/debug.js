try {
  console.log('Starting debug script...');
  console.log('Current working directory:', process.cwd());
  console.log('Loading dependencies...');
  
  const express = require('express');
  console.log('✓ Express loaded');
  
  const mongoose = require('mongoose');
  console.log('✓ Mongoose loaded');
  
  require('dotenv').config();
  console.log('Environment variables:', {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL ? 'Set' : 'Not set',
    SECRET: process.env.SECRET ? 'Set' : 'Not set'
  });

  console.log('Attempting MongoDB connection...');
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  });
} catch (error) {
  console.error('Debug script error:', error);
  process.exit(1);
}