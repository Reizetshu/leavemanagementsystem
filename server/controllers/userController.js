const User = require('../models/User'); // Import User model
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing (if updating password)
const { validatePassword } = require('../utils/validation'); // Import password validation utility

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    // Find all users and select specific fields (exclude password for security)
    // Added { isActive: true } to filter only active users
    const users = await User.find({ isActive: true }).select('-password');
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error: Could not fetch users' });
  }
};

// @desc    Get single user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = async (req, res) => {
  try {
    //Find a user by their ID and ensure they are active. Select specific fields (exclude password)
    const user = await User.findOne({
      _id: req.params.id,
      isActive: true,
    }).select('-password');

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found or is inactive' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server Error: Could not fetch user' });
  }
};

// @desc    Update user (Admin only)
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = async (req, res) => {
  try {
    // Find user by ID and ensure they are active before updating
    const user = await User.findOne({ _id: req.params.id, isActive: true });

    if (user) {
      // Update basic user information
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.firstName || user.lastName;
      user.email = req.body.email || user.email;

      // Only allow admin to change role
      if (req.body.role) {
        if (['employee', 'admin'].includes(req.body.role)) {
          user.role = req.body.role;
        } else {
          return res.status(400).json({ message: 'Invalid role specified' });
        }
      }

      // If password is provided, validate and then hash and update it
      if (req.body.password) {
        const passwordValidationError = validatePassword(req.body.password);
        if (passwordValidationError) {
          return res.status(400).json({ message: passwordValidationError });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      // isActive can also be updated here if an admin explicitly want to active/deactivate
      // For general updates, we assume isActive is maintained.
      if (typeof req.body.isActive === 'boolean') {
        user.isActive = req.body.isActive;
      }

      // Note: leaveBalance should ideally be managed through leave request approvals,
      // not directly via this update endpoint. For now, we won't directly update it here.
      // If direct balance adjustment is needed, a separate dedicated endpoint should be considered.

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        role: updatedUser.role,
        isActive: updatedUser.isActive,
      });
    } else {
      res.status(404).json({ message: 'User not found or is inactive' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not update user' });
  }
};

// @desc    Soft delete user (Admin only) by setting isActive to false
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    // Find the user by ID and ensure they are currently active
    const user = await User.findById(req.params.id);

    if (user) {
      // Instead of deleting, set isActive to false for soft deletion
      user.isActive = false;
      await user.save();
      res.json({ message: 'User deactivated successfully (soft deleted)' });
    } else {
      res.status(404).json({ message: 'User not found or already inactive' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error: Could not delete user' });
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
