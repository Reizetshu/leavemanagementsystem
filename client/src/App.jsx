import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import Sidebar from './components/Sidebar';

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

  // If user is not logged in, redirect to login page
  if (!user) {
    return <Navigate to='/login' replace />;
  }

  // If user is logged in but their role is not allowed, redirect to a forbidden page or dashboard
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // You might want a specific "Access Denied" page here
    return <Navigate to='/dashboard' replace />; // Redirect to dashboard if not authorized for specific route
  }

  return children; // Render the protected component
};

// PublicRoute component to redirect logged-in users from login/register pages
const PublicRoute = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <p className='text-lg text-gray-700'>Loading...</p>
      </div>
    );
  }

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to='/dashboard' replace />;
  }

  return children; // Otherwise, render the public component (Login/Register)
};
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar visibility. 768px is Tailwind's 'md' breakpoint

  // // Effect to handle sidebar state on window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     // Set sidebar open if screen is 'md' or larger, otherwise close it
  //     setIsSidebarOpen(window.innerWidth >= 768);
  //   };

  //   window.addEventListener('resize', handleResize);

  //   // Cleanup the event listener on component unmount
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <Router>
      <AuthProvider>
        <div className='flex min-h-screen bg-gray-100'>
          {' '}
          {/* Main layout container */}
          {/* Sidebar Component */}
          <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
          {/* Main Content Area */}
          <div
            className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
              isSidebarOpen ? 'ml-64' : 'ml-0'
            }`}
          >
            {/* Header with Toggle Button (visible on all screen sizes) */}
            <header className='bg-white shadow-sm p-4 flex justify-between items-center'>
              <button
                onClick={toggleSidebar}
                // Conditionally hide the button when sidebar is open
                className={`text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md p-1 cursor-pointer
                           ${
                             isSidebarOpen
                               ? 'opacity-0 pointer-events-none'
                               : 'opacity-100'
                           }`}
                aria-label='Open menu'
                disabled={isSidebarOpen} // Disable button when sidebar is open to prevent multiple clicks
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-6 h-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                  />
                </svg>
              </button>
              <h1 className='text-xl font-bold text-gray-800'>LeaveApp</h1>
            </header>

            {/* Page Content */}
            <main className='flex-1 p-4'>
              <Routes>
                {/* Public Routes */}
                <Route
                  path='/login'
                  element={
                    <PublicRoute>
                      <LoginPage />
                    </PublicRoute>
                  }
                />
                <Route
                  path='/register'
                  element={
                    <PublicRoute>
                      <RegisterPage />
                    </PublicRoute>
                  }
                />
                <Route path='/' element={<Navigate to='/login' replace />} />

                {/* Protected Routes */}
                <Route
                  path='/dashboard'
                  element={
                    <PrivateRoute allowedRoles={['employee', 'admin']}>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
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
            </main>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
