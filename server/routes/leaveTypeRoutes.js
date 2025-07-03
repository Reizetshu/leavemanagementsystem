const express = require('express');
const router = express.Router();
const {
  createLeaveType,
  getAllLeaveTypes,
  getLeaveTypeById,
  updateLeaveType,
  deleteLeaveType,
} = require('../controllers/leaveTypeController');
const { verifyToken } = require('../middlewares/authMiddleware'); // Import verifyToken middleware
const { authorizeRoles } = require('../middlewares/roleMiddleware'); // Import authorizeRoles middleware

// Routes for Admin Leave type management
// Apply 'verifyToken' and 'authorizeRoles' to all these routes
router
  .route('/')
  .post(verifyToken, authorizeRoles('admin'), createLeaveType) // POST /api/leave-types (create new)
  .get(verifyToken, authorizeRoles('admin'), getAllLeaveTypes); // GET /api/leave-types (get all)

router
  .route('/:id')
  .get(verifyToken, authorizeRoles('admin'), getLeaveTypeById) // GET /api/leave-types/:id (get single)
  .put(verifyToken, authorizeRoles('admin'), updateLeaveType) // PUT /api/leave-types/:id (update)
  .put(verifyToken, authorizeRoles('admin'), deleteLeaveType); // DELETE /api/leave-types/:id (delete)

module.exports = router;
