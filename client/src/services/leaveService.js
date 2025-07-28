import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base API URL

// Function to get config with authorization header
const getConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Fetch all leave types
const getLeaveTypes = async (token) => {
  const response = await axios.get(`${API_URL}/leave-types`, getConfig(token));
  return response.data;
};

// Submit a new leave request
const requestLeave = async (leaveData, token) => {
  const response = await axios.post(
    `${API_URL}/leave`,
    leaveData,
    getConfig(token)
  );
  return response.data;
};

// Get an employee's leave history
const getMyLeaveRequests = async (token) => {
  const response = await axios.get(
    `${API_URL}/leave/my-requests`,
    getConfig(token)
  );
  return response.data;
};

// Admin: Get all leave requests (will be used later)
const getAllLeaveRequests = async (token) => {
  const response = await axios.get(`${API_URL}/leave, getConfig(token)`);
  return response.data;
};

const leaveService = {
  getLeaveTypes,
  requestLeave,
  getMyLeaveRequests,
  getAllLeaveRequests,
};

export default leaveService;
