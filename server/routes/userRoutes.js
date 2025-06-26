const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');
const router = express.Router();

// Admin Route
router.get('/admin', verifyToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

// All can Access Route
router.get(
  '/user',
  verifyToken,
  authorizeRoles('admin', 'user'),
  (req, res) => {
    res.json({ message: 'Welcome User' });
  }
);

module.exports = router;
