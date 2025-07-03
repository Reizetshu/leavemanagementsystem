const mongoose = require('mongoose'); // Import

// Define the Leave Request schema
const leaveSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User who requested the leave
      required: true,
    },
    leaveType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LeaveType', // Reference to the type of leave (e.g., Annual, Sick)
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'], // Possible statuses
      default: 'pending', // Default status for new requests
    },
    // This array explicitly stores each individual calendar day included in the leave period.
    // Each entry represents a single day, allowing for granular tracking, reporting,
    // and accurate calculation of leave days
    leaveDays: [
      {
        date: {
          type: Date,
          required: true,
        },
        isHalfDay: {
          // Optional: to indicate if it's a half-day leave
          type: Boolean,
          default: false,
        },
        dayType: {
          // Optional: for AM/PM half-day leave
          type: String,
          enum: ['full', 'half-am', 'half-pm'],
          default: 'full',
        },
      },
    ],
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the Admin who approved/rejected the leave
      default: null,
    },
    rejectionReason: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields automatically
  }
);

// Created and export the Leave model
const Leave = mongoose.model('Leave', leaveSchema);

module.exports = Leave;
