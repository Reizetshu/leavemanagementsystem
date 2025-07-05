import React from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook
import EmployeeDashboard from '../components/Dashboard/EmployeeDashboard';
import AdminDashboard from '../components/Dashboard/AdminDashboard';

const DashboardPage = () => {
  const { user, loading } = useAuth(); // Get user and loading state from AuthContext

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg text-gray-700'>Loading dashboard...</p>
      </div>
    );
  }

  if (!user) {
    // This case should ideally be handled by PrivateRoute, but good for fallback
    return (
      <div className='text-center mt-20 text-red-500'>
        Access Denied: Please log in.
      </div>
    );
  }

  // Render dashboard based on user role
  if (user.role === 'admin') {
    return <AdminDashboard />;
  } else if (user.role === 'employee') {
    return <EmployeeDashboard />;
  } else {
    // Fallback for unexpected roles
    return (
      <div className='text-center mt-20 text-red-500'>Unknown user role.</div>
    );
  }
};

export default DashboardPage;
