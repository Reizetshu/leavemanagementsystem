const express = require('express');
const router = express.Router();
const { requestLeave } = require('../controllers/leaveController'); // Import requestLeave function
const verifyToken = require('../middlewares/authMiddleware'); // Import verifyToken middleware
// const { authorizeRoles } = require('../middlewares/roleMiddleware'); // Not needed for employee submission

// Route for employees to submit a new leave request
// It is protected by verifyToken to ensure only authenticated user can submit.
router.post('/', verifyToken, requestLeave);

module.exports = router;
