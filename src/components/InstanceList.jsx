import React from 'react';

export default function InstanceList({ instances, onView, onDelete, selectedYear, selectedSemester }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Course Instances</h3>
      {(!selectedYear || !selectedSemester) ? (
        <div className="text-gray-600">Select year and semester to view instances.</div>
      ) : (
        <table className="min-w-full border mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Instance ID</th>
              <th className="border px-2 py-1">Course ID</th>
              <th className="border px-2 py-1">Year</th>
              <th className="border px-2 py-1">Semester</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {instances.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-2">No instances found.</td></tr>
            ) : (
              instances.map(inst => (
                <tr key={inst.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{inst.id}</td>
                  <td className="border px-2 py-1">{inst.courseId}</td>
                  <td className="border px-2 py-1">{inst.year}</td>
                  <td className="border px-2 py-1">{inst.semester}</td>
                  <td className="border px-2 py-1 flex gap-2">
                    <button
                      className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                      onClick={() => onView(inst.year, inst.semester, inst.id)}
                    >
                      View
                    </button>
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                      onClick={() => onDelete(inst.year, inst.semester, inst.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
