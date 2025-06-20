const express = require('express'); // Import the Express.js framework
const dotenv = require('dotenv').config(); // Import dotenv to load environment variables from .env file
const connectDB = require('./config/db'); // Import the database connection function

// Connect to the MongoDB database
connectDB();

// Initialize the Express Application
const app = express();

// Middleware to parse JSON request (for handling incoming request bodies)
app.use(express.json());

// Basic route to test if the server is running
app.get('/', (req, res) => {
  res.send('App is running...');
});

// Define the port the server will listen on.
// Use the PORT from environment variables, or default to 5000 if not set.
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
