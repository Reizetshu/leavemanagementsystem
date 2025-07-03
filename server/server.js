const express = require('express'); // Import the Express.js framework
const dotenv = require('dotenv'); // Import dotenv to load environment variables
const connectDB = require('./config/db'); // Import the database connection function
const authRoutes = require('./routes/authRoutes'); // Import the authentication routes
const userRoutes = require('./routes/userRoutes'); // Import the role-based routes
const leaveTypeRoutes = require('./routes/leaveTypeRoutes'); // Import the leave type routes

// Load environment variables
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Initialize the Express Application
const app = express();

// Middleware to parse JSON request (for handling incoming request bodies)
app.use(express.json());

// Basic route to test if the server is running
app.get('/', (req, res) => {
  res.send('App is running...');
});

// Mount authentication routes
app.use('/api/auth', authRoutes);

// Mount role-based routes
app.use('/api/users', userRoutes);

// Mount leave type routes
app.use('/api/leave-types', leaveTypeRoutes);

// Define the port the server will listen on.
// Use the PORT from environment variables, or default to 5000 if not set.
const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
