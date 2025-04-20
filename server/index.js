const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const employeeRoutes = require('./routes/employees');

require('dotenv').config({ path: './server/.env' });

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


console.log("MONGO_URI:", process.env.MONGO_URI);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/projects', require('./routes/projects'));
app.use('/api/project_assignments', require('./routes/projectAssignments'));

app.get('/', (req, res) => res.send('Server is up!'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
