import { useEffect, useState } from "react";
import dayjs from "dayjs";

const AssignmentTable = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("start_date");
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 60000); // refresh every 60s

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/project_assignments");
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error("Failed to fetch assignments:", err);
    } finally {
      setLoading(false);
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

  const filtered = assignments.filter(a => a.project_code); // hide broken rows

  const sortedAssignments = [...filtered].sort((a, b) => {
    const aVal = a[sortKey]?.toString().toLowerCase();
    const bVal = b[sortKey]?.toString().toLowerCase();

    if (aVal < bVal) return sortAsc ? -1 : 1;
    if (aVal > bVal) return sortAsc ? 1 : -1;
    return 0;
  });

  const latest5 = sortedAssignments.slice(-5).reverse();

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Project Assignments</h2>
        <button
          onClick={fetchData}
          className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 py-8">Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("employee_id")}
              >
                Employee ID {sortKey === "employee_id" && (sortAsc ? "▲" : "▼")}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("employee_name")}
              >
                Employee Name {sortKey === "employee_name" && (sortAsc ? "▲" : "▼")}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("project_name")}
              >
                Project Name {sortKey === "project_name" && (sortAsc ? "▲" : "▼")}
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => handleSort("start_date")}
              >
                Start Date {sortKey === "start_date" && (sortAsc ? "▲" : "▼")}
              </th>
            </tr>
          </thead>
          <tbody>
            {latest5.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="py-6 text-center text-gray-500 italic"
                >
                  No assignments available.
                </td>
              </tr>
            ) : (
              latest5.map((a) => (
                <tr key={a._id} className="text-center border-t border-gray-200">
                  <td className="px-4 py-2">{a.employee_id?.employee_id}</td>
                  <td className="px-4 py-2">{a.employee_id?.full_name}</td>
                  <td className="px-4 py-2">{a.project_code?.project_name}</td>
                  <td className="px-4 py-2">
                    {dayjs(a.start_date).format("MMM D, YYYY")}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignmentTable;
