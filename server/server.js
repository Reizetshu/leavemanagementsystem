const express = require('express');
const dotenv = require('dotenv').config();
const db = require('./config/db');

db();

const app = express();

// Middleware
app.use(express.json());

// Routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
