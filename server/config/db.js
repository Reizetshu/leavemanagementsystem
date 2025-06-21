const mongoose = require('mongoose'); // Import Mongoose for MongoDB connection
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Define the asynchronous function to connect to the database
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `Database connected: ${connect.connection.host}, ${connect.connection.name}`
    );
  } catch (error) {
    // Log any errors that occur during connection
    console.log(`Error: ${error.message}`);
    // Exit the process with a failure code
    process.exit(1);
  }
};

module.exports = connectDB;
