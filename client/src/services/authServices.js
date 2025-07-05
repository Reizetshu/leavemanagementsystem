import axios from 'axios'; // Import Axios for making HTTP requests

// Define your backend API base URL
// IMPORTANT: Make sure this matches your Node.js server's address and port
const API_URL = 'http://localhost:5000/api/auth';

// Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  // The backend currently returns {message: 'User is successfully created'}
  return response.data;
};

// Login user
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Getting user profile (requires token)
const getMe = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Attach the JWT token to the Authorization header
    },
  };
  const response = await axios.get(`${API_URL}/me`, config);
  // The backend returns user details (firstName, lastName, email, role, etc.)
  return response.data;
};

const authService = { register, login, getMe };

export default authService;
