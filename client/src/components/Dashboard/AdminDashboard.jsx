import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className='container mx-auto px-4 py-8 md:px-6 lg:px-8'>
      <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 mb-8'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4 text-center'>
          Admin Dashboard
        </h1>
        {user && (
          <p className='text-xl text-gray-700 mb-8 text-center'>
            Welcome,{' '}
            <span className='font-semibold text-purple-700'>
              {user.firstName} {user.lastName}
            </span>
            ! You are logged in as an{' '}
            <span className='font-semibold text-purple-700'>{user.role}</span>.
          </p>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Pending Leave Approvals Card */}
          <div className='bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col'>
            <h2 className='text-2xl font-bold text-red-800 mb-4 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-7 h-7 mr-2 text-red-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              Pending Leave Approvals
            </h2>
            <p className='text-gray-700 text-md mb-4 flex-grow text-center'>
              Review and approve/reject leave requests from all employees.
            </p>
            <div className='mt-auto text-center'>
              <Link
                to='/admin/leave-approvals'
                className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out'
              >
                Review Requests
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 ml-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                  />
                </svg>
              </Link>
            </div>
            {/* Future: Link to pending approvals list */}
          </div>
          {/* User Management Card */}
          <div className='bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col'>
            <h2 className='text-2xl font-bold text-purple-800 mb-4 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-7 h-7 mr-2 text-purple-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
              User Management
            </h2>
            <p className='text-gray-700 text-md mb-4 flex-grow text-center'>
              Manage employee and admin accounts.
            </p>
            <div className='mt-auto text-center'>
              <Link
                to='/admin/users'
                className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out'
              >
                Manage Users
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 ml-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                  />
                </svg>
              </Link>
            </div>
            {/* Future: Link to user management page */}
          </div>
          {/* Leave Type Configuration Card */}
          <div className='bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col'>
            <h2 className='text-2xl font-bold text-yellow-800 mb-4 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-7 h-7 mr-2 text-yellow-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75ZM3.75 12h.007v.008H3.75V12ZM3.75 17.25h.007v.008H3.75V17.25Z'
                />
              </svg>
              Leave Type Configuration
            </h2>
            <p className='text-gray-700 text-md mb-4 flex-grow text-center'>
              Define and modify different types of leave.
            </p>
            <div className='mt-auto text-center'>
              <Link
                to='/admin/leave-types'
                className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-150 ease-in-out'
              >
                Configure Types
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={2}
                  stroke='currentColor'
                  className='w-5 h-5 ml-2'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
                  />
                </svg>
              </Link>
            </div>
            {/* Future: Link to leave type management page */}
          </div>
        </div>
        <div className='mt-10 text-center'>
          <Link
            to='/admin/reports'
            className='inline-flex items-center bg-indigo-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105'
          >
            View All Leaves & Reports
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='w-6 h-6 ml-3'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M3 13.125l4.5 4.5 9-9m-1.5-2.25h.007v.008H21a3 3 0 013 3v11.25a3 3 0 01-3 3H3a3 3 0 01-3-3V5.25a3 3 0 013-3h11.25a.75.75 0 01.75.75v.007H12A2.25 2.25 0 009.75 6h-6a.75.75 0 00-.75.75v6.75a.75.75 0 00.75.75h6.75a.75.75 0 00.75-.75v-6.75a.75.75 0 00-.75-.75H3.75'
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
