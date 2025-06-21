const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const dotenv = require('dotenv'); // Import and dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Function to generate a JSON Web Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token expires in 30 days
  });
};

module.exports = generateToken; // Export the generateToken function
