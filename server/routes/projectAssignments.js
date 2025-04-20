const express = require('express');
const router = express.Router();

const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectAssignment = require('../models/ProjectAssignment');

// GET: fetch all project assignments with employee/project info
router.get('/', async (req, res) => {
  try {
    const assignments = await ProjectAssignment.find()
      .populate('employee_id', 'employee_id full_name')
      .populate('project_code', 'project_name');
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch assignments' });
  }
});

// POST: create a new assignment
router.post('/', async (req, res) => {
  try {
    const { employee_id, project_code, start_date } = req.body;

    const assignment = new ProjectAssignment({ employee_id, project_code, start_date });
    await assignment.save();
    res.status(201).json({ message: 'Assignment created' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create assignment' });
  }
});

module.exports = router;
