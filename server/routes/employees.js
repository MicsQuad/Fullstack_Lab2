const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

// POST: Create a new employee
router.post('/', async (req, res) => {
  try {
    const { employee_id, full_name, email, hashed_password } = req.body;
    const newEmp = new Employee({ employee_id, full_name, email, hashed_password });
    await newEmp.save();
    res.status(201).json({ message: 'Employee created' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create employee' });
  }
});

module.exports = router;
