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
    console.error(error);
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
    console.error(error);
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

      // Update worksOnMonday to worksOnFriday
      if (typeof req.body.worksOnMonday === 'boolean') {
        user.worksOnMonday = req.body.worksOnMonday;
      }
      if (typeof req.body.worksOnTuesday === 'boolean') {
        user.worksOnTuesday = req.body.worksOnTuesday;
      }
      if (typeof req.body.worksOnWednesday === 'boolean') {
        user.worksOnWednesday = req.body.worksOnWednesday;
      }
      if (typeof req.body.worksOnThursday === 'boolean') {
        user.worksOnThursday = req.body.worksOnThursday;
      }
      if (typeof req.body.worksOnFriday === 'boolean') {
        user.worksOnFriday = req.body.worksOnFriday;
      }
      // Update worksOnSaturday and worksOnSunday
      if (typeof req.body.worksOnSaturday === 'boolean') {
        user.worksOnSaturday = req.body.worksOnSaturday;
      }
      if (typeof req.body.worksOnSunday === 'boolean') {
        user.worksOnSunday = req.body.worksOnSunday;
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
        worksOnMonday: updatedUser.worksOnMonday,
        worksOnTuesday: updatedUser.worksOnTuesday,
        worksOnWednesday: updatedUser.worksOnWednesday,
        worksOnThursday: updatedUser.worksOnThursday,
        worksOnFriday: updatedUser.worksOnFriday,
        worksOnSaturday: updatedUser.worksOnSaturday,
        worksOnSunday: updatedUser.worksOnSunday,
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

// @desc    Reset user password to a default value (Admin only)
// @route   PUT /api/users/:id/reset-password
// @access  Private/Admin
const resetUserPassword = async (req, res) => {
  try {
    // Find the user by ID and ensure they are active
    const user = await User.findOne({ _id: req.params.id, isActive: true });

    if (user) {
      // Define a default password
      const defaultPassword = 'Password1234.'; // Make this configurable or generate a random one
      // Hash the default password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(defaultPassword, salt);

      await user.save(); // Save the user with the new hashed password
      res.json({
        message: `Password for user ${user.email} has been reset to default.`,
      });
    } else {
      res.status(404).json({ message: 'User not found or is inactive' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error: Could not rer user password' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  resetUserPassword,
};
