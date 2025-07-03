const { Mongoose } = require('mongoose');
const LeaveType = require('../models/LeaveType'); // Import the LeaveType model

// @desc Create a new leave type
// @route POST /api/leave-types
// @access Private/Admin
const createLeaveType = async (req, res) => {
  const { name, defaultAllowance, description } = req.body;

  // Basic validation for required fields
  if (!name || defaultAllowance === undefined || defaultAllowance === null) {
    return res
      .status(400)
      .json({ message: 'Please enter leave type name and default allowance' });
  }

  try {
    // Check if a leave type with the same name already exists
    const leaveTypeExist = await LeaveType.findOne({ name });

    if (leaveTypeExist) {
      return res
        .status(400)
        .json({ message: 'Leave type with this name already exists' });
    }

    // Create a new leave type instance
    const leaveType = new LeaveType({
      name,
      defaultAllowance,
      description: description || '',
    });

    // Save the new leave type to the database
    const createdLeaveType = await leaveType.save();
    res.status(201).json(createLeaveType); // Respond with the created leave type
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error: Could not create leave type' });
  }
};

// @desc Get all leave types
// @route GET /api/leave-types
// @access Private/Admin (can also be public for employees to see available type, but admin for full list)
const getAllLeaveTypes = async (req, res) => {
  try {
    // Fetch all leave types from database
    const leaveTypes = await LeaveType.find({});
    res.json(leaveTypes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error: Could not fetch leave types' });
  }
};

// @desc Get a single leave type by ID
// @route GET /api/leave-types/:id
// @access Private Admin
const getLeaveTypeById = async (req, res) => {
  try {
    // Find a leave type by its ID
    const leaveType = await LeaveType.findById(req.params.id);

    if (leaveType) {
      res.json(leaveType);
    } else {
      res.status(404).json({ message: 'Leave type not found' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error: Could not fetch leave type' });
  }
};

// @desc Update a leave type by ID
// @route PUT /api/leave-types/:id
// @access Private/Admin
const updateLeaveType = async (req, res) => {
  const { name, defaultAllowance, description } = req.body;

  try {
    // Find the leave type by ID
    const leaveType = await LeaveType.findById(req.params.id);

    if (leaveType) {
      // Check if the new name clashes with an existing leave type (excluding itself
      if (name && name !== leaveType.name) {
        const nameExists = await LeaveType.findOne({ name });
        if (nameExists) {
          return res.status(400).json({
            message: 'Another leave type with this name already exists',
          });
        }
      }

      // Update fields if provided in the request body
      leaveType.name = name || leaveType.name;
      leaveType.defaultAllowance =
        defaultAllowance !== undefined && defaultAllowance !== null
          ? defaultAllowance
          : leaveType.defaultAllowance;
      leaveType.description =
        description !== undefined ? description : leaveType.description;

      // Save the updated leave type
      const updatedLeaveType = await leaveType.save();
      res.json(updatedLeaveType); // Respond with the updated leave type
    } else {
      res.status(404).json({ message: 'Leave type not found' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error: Could not update leave type' });
  }
};

// @desc Delete a leave type by ID
// @route DELETE /api/leave-types/:id
// @access Private/Admin
const deleteLeaveType = async (req, res) => {
  try {
    // Find the leave type by ID
    const leaveType = await LeaveType.findById(req.params.id);

    if (leaveType) {
      // Delete the leave type by ID
      await leaveType.deleteOne(); // Use deleteOne for Mongoose 6+
      res.json({ message: 'Leave type removed' });
    } else {
      res.status(404).json({ message: 'Leave type not found' });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Server Error: Could not delete leave type' });
  }
};

module.exports = {
  createLeaveType,
  getAllLeaveTypes,
  getLeaveTypeById,
  updateLeaveType,
  deleteLeaveType,
};
