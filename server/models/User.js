const mongoose = require('mongoose'); // Import Mongoose

// Define the User schema
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Ensures unique emails
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['employee', 'admin'], // Allowed roles: employee and admin only
      default: 'employee', // Default role for new users
    },

    leaveBalance: [
      // Array to store leave balance for different leave types
      {
        leaveType: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'LeaveType', // This will reference the LeaveType model
        },
        days: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
