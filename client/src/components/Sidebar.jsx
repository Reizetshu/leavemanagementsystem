import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

// Sidebar component props:
// isOpen: boolean - controls whether the sidebar is visible
// setIsOpen: function - to toggle the sidebar's visibility
const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth(); // Get user and logout function from AuthContext
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from context
    setIsOpen(false); // Close sidebar on logout
    navigate('/login'); // Redirect to login page after logout
  };
  return (
    <>
      {/* Overlay for mobile view when sidebar is open */}
      {/* This overlay is only for screens smaller than 'md' breakpoint */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/25 z-30 md:hidden' // md:hidden ensures it's only on mobile
          onClick={() => setIsOpen(false)} // Close sidebar when clicking outside
        ></div>
      )}

      {/* Sidebar container */}
      <aside
        // The sidebar is now always fixed and its translation controls visibility.
        className={`fixed top-0 left-0 h-full bg-indigo-600 text-white w-64 p-4 shadow-lg z-40
                   transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                   transition-transform duration-300 ease-in-out`}
      >
        <div className='flex justify-between items-center mb-6'>
          <h2 className='text-2xl font-bold'>Menu</h2>
          {/* Close button for sidebar (visible on all sizes) */}
          <button
            onClick={() => setIsOpen(false)}
            className='text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md p-1 cursor-pointer'
            aria-label='Close menu'
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
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>

        <nav className='flex flex-col space-y-4'>
          <Link
            to={user ? '/dashboard' : '/'}
            onClick={() => setIsOpen(false)} // Close sidebar on link click
            className='text-white text-xl font-bold rounded-md px-3 py-2 hover:bg-indigo-700 transition duration-150 ease-in-out'
          >
            LeaveApp
          </Link>
          {user ? (
            <>
              <span className='text-white text-md mt-4 px-3 py-2'>
                Welcome, {user.firstName} {user.lastName} ({user.role})
              </span>
              <Link
                to='/dashboard'
                onClick={() => setIsOpen(false)} // Close sidebar on link click
                className='text-white text-lg font-medium rounded-md px-3 py-2 hover:bg-indigo-700 transition duration-150 ease-in-out cursor-pointer'
              >
                Dashboard
              </Link>
              {/* Future: Add more protected links here */}
              <button
                onClick={handleLogout}
                className='bg-red-500 text-white text-lg font-medium py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out cursor-pointer'
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to='/login'
                onClick={() => setIsOpen(false)} // Close sidebar on link click
                className='text-white text-lg font-medium rounded-md px-3 py-2 hover:bg-indigo-700 transition duration-150 ease-in-out cursor-pointer'
              >
                Login
              </Link>
              <Link
                to='/register'
                onClick={() => setIsOpen(false)} // Close sidebar on link click
                className='text-white text-lg font-medium rounded-md px-3 py-2 hover:bg-indigo-700 transition duration-150 ease-in-out cursor-pointer'
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
