const Leave = require('../models/Leave'); // Import the Leave model
const User = require('../models/User'); // Import the User model (to get user ID)
const LeaveType = require('../models/LeaveType'); // Import LeaveType model (to validate leave type)

/**
 * Helper function to get all working days between two dates for a specific user.
 * Considers user's individual working day preferences (Monday-Sunday).
 * @param {Date} startDate
 * @param {Date} endDate
 * @param {Object} userWorkPreferences Object containing boolean flags for worksOnMonday, ..., worksOnSunday.
 * @returns {Array<Object>} Array of objects, each containing a { date: Date, dayType: 'full' }
 */
const getWorkingDays = (startDate, endDate, userWorkPreferences) => {
  const days = [];
  let currentDate = new Date(startDate);
  currentDate.setHours(0, 0, 0, 0); // Normalize to start of day

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0); // Normalize to start of day

  while (currentDate <= end) {
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let isWorkingDay = false;
    switch (dayOfWeek) {
      case 0: // Sunday
        isWorkingDay = userWorkPreferences.worksOnSunday;
        break;
      case 1: // Monday
        isWorkingDay = userWorkPreferences.worksOnMonday;
        break;
      case 2: // Tuesday
        isWorkingDay = userWorkPreferences.worksOnTuesday;
        break;
      case 3: // Wednesday
        isWorkingDay = userWorkPreferences.worksOnWednesday;
        break;
      case 4: // Thursday
        isWorkingDay = userWorkPreferences.worksOnThursday;
        break;
      case 5: // Friday
        isWorkingDay = userWorkPreferences.worksOnFriday;
        break;
      case 6: // Saturday
        isWorkingDay = userWorkPreferences.worksOnSaturday;
        break;
      default:
        isWorkingDay = false; // Should not happen
    }
    if (isWorkingDay) {
      days.push({
        date: new Date(currentDate), // Push a new Date object to avoid reference issues
        isHalfDay: false,
        dayType: 'full',
      });
    }
    currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
  }
  return days;
};

// @desc Submit a new leave request
// @route POST /api/leave
// @access Private (Employee)
const requestLeave = async (req, res) => {
  // req.user is populated by the verifyToken middleware
  const {
    _id: userId,
    worksOnMonday,
    worksOnTuesday,
    worksOnWednesday,
    worksOnThursday,
    worksOnFriday,
    worksOnSaturday,
    worksOnSunday,
  } = req.user; // Get user ID and all working day preferences

  const { leaveType: leaveTypeById, startDate, endDate, reason } = req.body;

  // Basic validation
  if (!leaveTypeById || !startDate || !endDate || !reason) {
    return res.status(400).json({
      message: 'Please provide leave type, start date, end date, and reason',
    });
  }

  // Convert date strings to Date objects
  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  // Validate date range
  if (parsedStartDate > parsedEndDate) {
    return res
      .status(400)
      .json({ message: 'Start date cannot be after end date' });
  }

  try {
    // Verify if the leaveType exists
    const existingLeaveType = await LeaveType.findById(leaveTypeById);
    if (!existingLeaveType) {
      return res.status(404).json({ message: 'Invalid Leave Type specified' });
    }

    // Prepare user's work preferences object
    const userWorkPreferences = {
      worksOnMonday,
      worksOnTuesday,
      worksOnWednesday,
      worksOnThursday,
      worksOnFriday,
      worksOnSaturday,
      worksOnSunday,
    };

    // Calculate working days for the leave request, passing user's work preferences
    const leaveDays = getWorkingDays(
      parsedStartDate,
      parsedEndDate,
      userWorkPreferences
    );

    if (leaveDays.length === 0) {
      return res.status(400).json({
        message:
          'No working days found in the selected date range. Please select valid working days.',
      });
    }

    // Create a new leave request instance
    const leaveRequest = new Leave({
      user: userId,
      leaveType: leaveTypeById,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      reason,
      status: 'pending', // Default status
      leaveDays: leaveDays, // Populate the day-by-day array
    });

    // Save the leave request to the database
    const createdLeaveRequest = await leaveRequest.save();

    // Respond with the created leave request
    res.status(201).json({
      message: 'Leave request submitted successfully',
      leaveRequest: createdLeaveRequest,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error: Could not submit leave request' });
  }
};

// Export the controller functions
module.exports = {
  requestLeave,
  //Other leave- related functions (e.g.,  get my requests, approved/reject) will be added later
};
