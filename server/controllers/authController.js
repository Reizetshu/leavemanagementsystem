const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
const User = require('../models/User'); // Import the User model
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const dotenv = require('dotenv'); // Import and dotenv to load environment variables
const { validatePassword } = require('../utils/validation'); // NEW: Import password validation utility

// Load environment variables from .env file
dotenv.config();

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    // Basic validation if fields left empty
    if (!firstName || !lastName || !email || !password || !role) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // Use the external password validation utility
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      return res.status(400).json({ message: passwordValidationError });
    }

    // Check if user with provided email already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: 'User with this email is already exists' });
    }

    // Middleware to hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'employee', // Default role to 'employee' if not provided
    });

    await user.save();
    res.status(201).json({ message: 'User is successfully created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc Authenticate user and get token
// @route POST /api/auth/login
// @access Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Validation for user's email
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Password is incorrect' });
    }

    // Function to generate a JSON Web Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h', // Token expires in 1 hour
      }
    );
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private (requires authentication)
const getMe = async (req, res) => {
  // req.user is populated by the verifyToken middleware
  // We ensure the user exist and send back their data, excluding the password field
  if (req.user) {
    res.json({
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      role: req.user.role,
      leaveBalance: req.user.leaveBalance,
    });
  } else {
    // This case should ideally not be reached if 'verifyToken' middleware works correctly
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { registerUser, loginUser, getMe };
