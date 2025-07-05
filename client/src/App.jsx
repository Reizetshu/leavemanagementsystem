import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// PrivateRoute component to protect routes
const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg text-gray-700'>Loading application...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to='/dashboard' replace />;
  }

  return children;
};

function App() {
  return (
    <Router>
      {/* Wrap the entire application with AuthProvider */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          {/* Default redirect */}
          <Route path='/' element={<Navigate to='/login' replace />} />

          {/* Protected Routes (Example - will create DashboardPage later) */}
          {/* <Route
                path="/dashboard"
                element={
                  <PrivateRoute allowedRoles={['employee', 'admin']}>
                    <DashboardPage />
                  </PrivateRoute>
                }
              /> */}
          {/* Add more protected routes here as you build them */}

          {/* Fallback for unmatched routes */}

          <Route
            path='*'
            element={
              <h1 className='text-center text-2xl mt-20'>
                404 - Page Not Found
              </h1>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
