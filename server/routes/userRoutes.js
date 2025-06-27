const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

// Route for Admin user management
// Apply 'verifyToken' first, then 'authorizeRoles('admin')' for these routes
router.route('/').get(verifyToken, authorizeRoles('admin'), getAllUsers);

router
  .route('/:id')
  .get(verifyToken, authorizeRoles('admin'), getUserById)
  .put(verifyToken, authorizeRoles('admin'), updateUser)
  .delete(verifyToken, authorizeRoles('admin'), deleteUser);

module.exports = router;
