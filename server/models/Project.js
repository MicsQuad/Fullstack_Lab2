const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_code: { type: String, unique: true },
  project_name: String,
  project_description: String
});

module.exports = mongoose.model('Project', projectSchema);
