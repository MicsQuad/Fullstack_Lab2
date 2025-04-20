import { useEffect, useState } from "react";

const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [sortKey, setSortKey] = useState("start_date");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // Refresh every 60s

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/project_assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortedAssignments = [...assignments].sort((a, b) => {
    const aVal = a[sortKey]?.toString().toLowerCase();
    const bVal = b[sortKey]?.toString().toLowerCase();

    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Project Assignments</h2>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("employee_id")}>Employee ID</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("employee_name")}>Employee Name</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("project_name")}>Project Name</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort("start_date")}>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedAssignments.map((a) => (
            <tr key={a._id} className="text-center border-t border-gray-200">
              <td className="px-4 py-2">{a.employee_id?.employee_id}</td>
              <td className="px-4 py-2">{a.employee_id?.full_name}</td>
              <td className="px-4 py-2">{a.project_code?.project_name}</td>
              <td className="px-4 py-2">{new Date(a.start_date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AssignmentTable;
