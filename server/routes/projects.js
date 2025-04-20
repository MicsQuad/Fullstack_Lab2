const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// POST: Create a new project
router.post('/', async (req, res) => {
  try {
    const { project_code, project_name, project_description } = req.body;
    const newProj = new Project({ project_code, project_name, project_description });
    await newProj.save();
    res.status(201).json({ message: 'Project created' });
  } catch (err) {
    res.status(400).json({ error: 'Failed to create project' });
  }
});

module.exports = router;
