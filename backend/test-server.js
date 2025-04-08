const fs = require('fs');
const path = require('path');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const logFile = path.join(__dirname, 'server.log');
const log = (message) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp}: ${message}\n`;
    console.log(message);
    fs.appendFileSync(logFile, logMessage);
};

const app = express();

log('Test script started');
log(`Environment: ${JSON.stringify({
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGO_URL: 'mongodb+srv://karthikakashsv:karthik@cluster0.ocytz.mongodb.net/gym'
}, null, 2)}`);

mongoose.connect('mongodb+srv://karthikakashsv:karthik@cluster0.ocytz.mongodb.net/gym', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    log('MongoDB Connected Successfully');
})
.catch(err => {
    log(`MongoDB connection error: ${err.message}`);
    log(`Full error: ${JSON.stringify(err, null, 2)}`);
});

app.get('/', (req, res) => {
    res.json({ message: 'Test server running' });
});

const port = 4000; // Using a different port
app.listen(port, () => {
    log(`Test server running on port ${port}`);
});