import React, { useState, useEffect } from 'react';
import { getInstancesByYearSemester, deleteInstance } from '../../api/CourseInstanceAPI';

const InstanceList = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchInstances = async () => {
    if (!year || !semester || isNaN(parseInt(year)) || isNaN(parseInt(semester))) {
      setError('Please select a valid year and semester');
      setInstances([]);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await getInstancesByYearSemester(parseInt(year), parseInt(semester));
      if (response && Array.isArray(response)) {
        setInstances(response);
      } else if (response === undefined || response === null) {
        setInstances([]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      if (error.code === 'ERR_NETWORK') {
        setError('Backend server is not running. Please start the Spring Boot server.');
      } else {
        setError(error.message || 'Failed to fetch instances');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (year, semester, courseId) => {
    const instanceId = `${courseId}-${year}-${semester}`;
    const inUseMessage = 'Cannot delete course instance as it is still in use';
    
    if (!window.confirm(
      `Are you sure you want to delete this instance?
      ID: ${instanceId}
      Course: ${courseId}
      Year: ${year}
      Semester: ${semester}
      
      Warning: This instance may be in use by students or other courses.`
    )) return;

    try {
      const success = await deleteInstance(year, semester, courseId);
      if (success) {
        setInstances(prev =>
          prev.filter(
            inst =>
              inst.year !== year ||
              inst.semester !== semester ||
              inst.courseId !== courseId
          )
        );
      } else {
        throw new Error('Failed to delete instance');
      }
    } catch (error) {
      if (error.message === inUseMessage) {
        alert(`Cannot delete this instance because it's still in use.\n\n` +
              `Please check if this instance is associated with any:\n` +
              `- Student enrollments\n` +
              `- Course prerequisites\n` +
              `- Course schedules\n\n` +
              `Remove these associations first before deleting.`);
      } else {
        setError(error.message || 'Failed to delete instance');
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (year && semester && !isNaN(parseInt(year)) && !isNaN(parseInt(semester))) {
      fetchInstances();
    }
  }, [year, semester]);

  return (
    <>
      <div className="card">
        <h2>Course Instances</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label htmlFor="year" className="block text-sm font-medium">Year</label>
            <input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="semester" className="block text-sm font-medium">Semester</label>
            <select
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select semester</option>
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
          <button
            onClick={fetchInstances}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>

        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : instances.length === 0 ? (
          <div className="text-center py-4 text-gray-500">
            No course instances found for the selected year and semester
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instance ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {instances.map((instance) => (
                  <tr key={instance.instanceId}>
                    <td className="px-6 py-4 whitespace-nowrap">{instance.instanceId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{instance.courseId}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{instance.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{instance.semester}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(instance.year, instance.semester, instance.courseId)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default InstanceList;
