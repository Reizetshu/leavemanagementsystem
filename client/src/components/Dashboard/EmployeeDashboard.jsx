import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth to display user info

const EmployeeDashboard = () => {
  const { user } = useAuth(); // Get user data from context
  return (
    <div className='container mx-auto px-4 py-8 md:px-6 lg:px-8'>
      <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 mb-8'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4 text-center'>
          Employee Dashboard
        </h1>{' '}
        {user && (
          <p className='text-xl text-gray-700 mb-8 text-center'>
            Hello,{' '}
            <span className='font-semibold text-indigo-700'>
              {user.firstName} {user.lastName}
            </span>
            ! You are logged in as an{' '}
            <span className='font-semibold text-indigo-700'>{user.role}</span>.
          </p>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {/* Leave Balance Card */}
          <div className='bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col'>
            <h2 className='text-2xl font-bold text-indigo-800 mb-4 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-7 h-7 mr-2 text-indigo-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              Leave Balance
            </h2>
            <p className='text-gray-700 text-md mb-4 flex-grow text-center'>
              Your current leave balances will appear here.
            </p>
            <ul className='mt-auto space-y-3 text-gray-800 text-lg'>
              {user && (user.leaveBalance || []).length > 0 ? (
                (user.leaveBalance || []).map((balance) => (
                  <li
                    key={balance.leaveType}
                    className='flex justify-between items-center border-b border-indigo-200 pb-2 last:border-b-0'
                  >
                    <span className='font-medium text-indigo-700'>
                      {balance.leaveType}:
                    </span>{' '}
                    {/* This will show ObjectId, needs population later */}
                    <span className='font-extrabold text-indigo-900 text-xl'>
                      {balance.days} days
                    </span>
                  </li>
                ))
              ) : (
                <li className='text-gray-600 italic text-center'>
                  No leave balances set yet.
                </li>
              )}
            </ul>
          </div>
          {/* Pending Requests Card */}
          <div className='bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col'>
            <h2 className='text-2xl font-bold text-green-800 mb-4 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-7 h-7 mr-2 text-green-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 9v3.75m-9.303 3.376c-.866 1.5.38 3.377 2.11 3.377H19.9c1.73 0 3.07-1.877 2.11-3.377L19.9 7.5c-.96-1.66-3.21-1.66-4.17 0L12 2.25 10.17 7.5c-.96 1.66-3.21 1.66-4.17 0L2.697 12.376Z'
                />
              </svg>
              Pending Requests
            </h2>
            <p className='text-gray-700 text-md mb-4 flex-grow text-center'>
              Overview of your pending leave requests.
            </p>
            <div className='mt-auto text-center'>
              <Link
                to='/my-requests'
                className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out'
              >
                View Pending
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
          </div>
          {/* Leave History Card */}
          <div className='bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 flex flex-col'>
            <h2 className='text-2xl font-bold text-blue-800 mb-4 flex items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='currentColor'
                className='w-7 h-7 mr-2 text-blue-600'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.25 4.5l-3.75 3.75m9.375-3.75L12.75 7.5M4.5 18.75h15M4.5 12.75h15m-1.5 6h-12a2.25 2.25 0 0 1-2.25-2.25V5.25a2.25 2.25 0 0 1 2.25-2.25h12a2.25 2.25 0 0 1 2.25 2.25v11.25a2.25 2.25 0 0 1-2.25 2.25Z'
                />
              </svg>
              Leave History
            </h2>
            <p className='text-gray-700 text-md mb-4 flex-grow text-center'>
              Your past approved and rejected leaves.
            </p>
            <div className='mt-auto text-center'>
              <Link
                to='/leave-history'
                className='inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out'
              >
                View History
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
          </div>
        </div>
        <div className='mt-10 text-center'>
          <button className='bg-indigo-700 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-800 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-200 ease-in-out transform hover:scale-105'>
            Request New Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
