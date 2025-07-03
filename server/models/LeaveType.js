const mongoose = require('mongoose'); // Import Mongoose

//Define the LeaveType schema
const leaveTypeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // Ensures unique leave type names (e.g., cannot have "Sick Leave" entries)
      trim: true,
    },
    defaultAllowance: {
      // Default number of days for this leave type per year (e.g., 10 for Annual Leave)
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Created and export the LeaveType model
const LeaveType = mongoose.model('LeaveType', leaveTypeSchema);

module.exports = LeaveType;
