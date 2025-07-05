import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authServices'; // Import the auth service

// Create the AuthContext
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider component
export const AuthProvider = ({ children }) => {
  // State to hold the user data and token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Get token from localStorage
  const [loading, setLoading] = useState(true); // Loading state for initial auth check

  // Effect to check user's authentication status on component mount
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Attempt to get user profile using the stored token
          const userData = await authService.getMe(token);
          setUser(userData);
        } catch (error) {
          console.error('Failed to load user from token', error);
          localStorage.removeItem('token'); // Clear invalid token
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false); // Authentication check is complete
    };
    loadUser();
  }, [token]); // Re-run if token changes

  // Login function
  const login = async (email, password) => {
    try {
      const res = await authService.login(email, password);
      localStorage.setItem('token', res.token); // Storage token in localStorage
      setToken(res.token); // Update token state
      const userData = await authService.getMe(res.token); // Fetch user data with new token
      setUser(userData); // Update user state
      return true; // Indicate success
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Re-throw to allow component to handle
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      const res = await authService.register(userData);
      // For registration, we just confirm success; login happens separately
      return res;
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setToken(null);
    setUser(null);
  };

  // Value provided by the context to its consumers
  const authContextValue = {
    user,
    token,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
