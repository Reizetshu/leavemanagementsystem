const mongoose = require('mongoose'); // Import Mongoose
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing

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
    timestamps: true, // Adds createdAt amd updatedAt fields automatically
  }
);

// Middleware to hash password before saving a new user or when password is modified
userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) {
    next(); // Only run if password was actually modified
  }
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hast(this.password, salt); // Hash password
  next();
});

// Method to compare entered password with hashed password in the database
userSchema.methods.matchPassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
