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
router.route('/').get(verifyToken, authorizeRoles('admin'), getAllUsers); // GET /api/users (get all users)

router
  .route('/:id')
  .get(verifyToken, authorizeRoles('admin'), getUserById) // GET /api/users/:id (get single user)
  .put(verifyToken, authorizeRoles('admin'), updateUser) // PUT /api/users/:id (update user)
  .delete(verifyToken, authorizeRoles('admin'), deleteUser); // DELETE /api/users/:id (delete user)

module.exports = router;
