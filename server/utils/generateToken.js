const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const dotenv = require('dotenv').config(); // Import and Load dotenv to load environment variables

// Function to generate a JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken; // Export the generateToken function
