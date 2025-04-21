# 📚 Lab 2: Fullstack Assignment

A modern fullstack application built using:
- 💻 React + Vite for the frontend
- 🌱 Express.js for the backend API
- ☁️ MongoDB Atlas as the cloud database

This app displays live project assignments with auto-refresh and sortable columns.

---

## ✅ Features

- 📦 MongoDB Atlas integration via Mongoose
- 🔄 Live project assignment table (auto-refresh every 60 seconds)
- 🧑‍💻 Employees and Projects stored in collections with ObjectId references
- 📊 Table shows: Employee ID, Name, Project Name, Start Date
- 🔍 Clickable column headers for sorting
- ⚙️ Modular backend and frontend folders

---

## 📁 Project Structure

```
lab2/
├── client/               # React frontend
│   ├── src/
│   │   └── components/
│   │       └── AssignmentTable.jsx
│   └── ...
├── server/               # Express backend
│   ├── models/
│   ├── routes/
│   ├── index.js
│   └── .env
├── package.json
└── README.md
```

---

## 🧪 API Endpoints

| Method | Route                          | Description                     |
|--------|--------------------------------|---------------------------------|
| POST   | /api/employees                | Add a new employee              |
| POST   | /api/projects                 | Add a new project               |
| POST   | /api/project_assignments      | Assign an employee to project   |
| GET    | /api/project_assignments      | Get all assignments (populated) |

---

## 🚀 Running the App

From the root lab2 folder:

```bash
npm install
cd client && npm install
cd ..
npm run dev
```

This will start both frontend and backend concurrently.

Frontend: http://localhost:5173  
Backend:  http://localhost:5000

---

## 🔐 .env Configuration (in /server)

```
MONGO_URI=mongodb+srv://<your_credentials>@<your_cluster>/<your_db>
```

---

## 💡 Reflection

Throughout Lab 2, I gained practical experience building a fullstack app using React, Express.js, and MongoDB Atlas. 
While the final result is a smooth, data-driven interface, the process involved debugging across all layers of the stack.
    Early challenges included configuring the development scripts and environment variables.
The backend initially failed to read the MongoDB URI from .env, and my routes returned 404s due to misconfigurations. These were resolved by inspecting logs, confirming file structure, and refining routing logic.
    One of the most valuable lessons came from managing Mongoose references.
I ran into casting issues when assigning projects to employees because I passed string IDs instead of ObjectIds. Fixing this required cleaning up the database and ensuring proper usage of populate() to render related data in the UI.

The frontend component uses hooks like useEffect to auto-refresh and display updated data in a styled, sortable table. Implementing sort logic and filtering rows with null references helped polish the user experience.

Finally, populating the database with realistic data and building a live connection between the backend and frontend gave me a solid understanding of how fullstack systems come together. Despite initial issues, I feel more confident building and debugging real-world apps from scratch.
