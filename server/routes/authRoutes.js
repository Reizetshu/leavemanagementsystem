const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/authController');
const verifyToken = require('../middlewares/authMiddleware');

// Define the authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/me', verifyToken, getMe);

module.exports = router; // Exports the router
