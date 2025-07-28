// client/src/pages/LeaveRequestPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import leaveService from '../services/leaveService'; // Import leave service

const LeaveRequestPage = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch leave types on component mount
  useEffect(() => {
    const fetchLeaveTypes = async () => {
      if (token) {
        try {
          const data = await leaveService.getLeaveTypes(token);
          setLeaveTypes(data);
          // Set default leave type if available
          if (data.length > 0) {
            setFormData((prev) => ({ ...prev, leaveType: data[0]._id }));
          }
        } catch (err) {
          console.error('Failed to fetch leave types:', err);
          setError('Failed to load leave types. Please try again.');
        }
      }
    };
    fetchLeaveTypes();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!user || !token) {
      setError('You must be logged in to submit a leave request.');
      setLoading(false);
      return;
    }

    // Basic client-side validation
    if (
      !formData.leaveType ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.reason
    ) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const parsedStartDate = new Date(formData.startDate);
    const parsedEndDate = new Date(formData.endDate);

    if (parsedStartDate < today) {
      setError('Start date cannot be in the past.');
      setLoading(false);
      return;
    }

    if (parsedStartDate > parsedEndDate) {
      setError('Start date cannot be after end date.');
      setLoading(false);
      return;
    }

    try {
      const res = await leaveService.requestLeave(formData, token);
      setSuccess(res.message || 'Leave request submitted successfully!');
      // Optionally clear form or redirect
      setFormData({
        leaveType: leaveTypes.length > 0 ? leaveTypes[0]._id : '', // Reset to first type or empty
        startDate: '',
        endDate: '',
        reason: '',
      });
      setTimeout(() => navigate('/dashboard'), 2000); // Redirect to dashboard after success
    } catch (err) {
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Failed to submit leave request. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8 md:px-6 lg:px-8'>
      <div className='bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-6 text-center'>
          Request New Leave
        </h1>

        {error && (
          <div
            className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4'
            role='alert'
          >
            <span className='block sm:inline'>{error}</span>
          </div>
        )}
        {success && (
          <div
            className='bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4'
            role='alert'
          >
            <span className='block sm:inline'>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='leaveType'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Leave Type
            </label>
            <select
              id='leaveType'
              name='leaveType'
              value={formData.leaveType}
              onChange={handleChange}
              required
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            >
              {leaveTypes.length > 0 ? (
                leaveTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))
              ) : (
                <option value=''>Loading leave types...</option>
              )}
            </select>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div>
              <label
                htmlFor='startDate'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                Start Date
              </label>
              <input
                type='date'
                id='startDate'
                name='startDate'
                value={formData.startDate}
                onChange={handleChange}
                required
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div>
              <label
                htmlFor='endDate'
                className='block text-sm font-medium text-gray-700 mb-1'
              >
                End Date
              </label>
              <input
                type='date'
                id='endDate'
                name='endDate'
                value={formData.endDate}
                onChange={handleChange}
                required
                className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
          </div>

          <div>
            <label
              htmlFor='reason'
              className='block text-sm font-medium text-gray-700 mb-1'
            >
              Reason for Leave
            </label>
            <textarea
              id='reason'
              name='reason'
              rows='4'
              value={formData.reason}
              onChange={handleChange}
              required
              className='mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='e.g., Annual vacation, sick leave, personal emergency...'
            ></textarea>
          </div>

          <button
            type='submit'
            className='w-full bg-indigo-600 text-white py-3 px-6 rounded-md text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out'
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Leave Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequestPage;
