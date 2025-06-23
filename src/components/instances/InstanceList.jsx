import React, { useState, useEffect } from 'react';
import { api } from '../../api/api';
import InstanceForm from './InstanceForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InstanceList = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editInstance, setEditInstance] = useState(null);
  const [saving, setSaving] = useState(false);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api.getAllCourses().then(setCourses).catch(() => setCourses([]));
  }, []);

  const handleAdd = () => {
    setEditInstance(null);
    setShowModal(true);
  };
  const handleEdit = (instance) => {
    setEditInstance(instance);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setEditInstance(null);
  };
  const handleSave = async (form) => {
    setSaving(true);
    try {
      // Always send only the required fields
      const instanceData = {
        courseId: form.courseId,
        year: parseInt(form.year),
        semester: parseInt(form.semester)
      };
      await api.createInstance(instanceData);
      toast.success(editInstance ? 'Instance updated successfully' : 'Instance added successfully');
      handleModalClose();
      fetchInstances();
    } catch (e) {
      toast.error(e.message || 'Failed to save instance');
    } finally {
      setSaving(false);
    }
  };


  const fetchInstances = async () => {
    if (!year || !semester || isNaN(parseInt(year)) || isNaN(parseInt(semester))) {
      setError('Please enter valid year (1900-2100) and semester (1 or 2)');
      setInstances([]);
      return;
    }
    
    if (parseInt(year) < 1900 || parseInt(year) > 2100 || parseInt(semester) < 1 || parseInt(semester) > 2) {
      setError('Invalid year or semester. Year must be between 1900-2100 and semester must be 1 or 2');
      setInstances([]);
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await api.getInstancesByYearSem(year, semester);
      if (response && Array.isArray(response)) {
        setInstances(response);
      } else if (response === undefined || response === null) {
        setInstances([]);
      } else {
        throw new Error('Invalid response format from server');
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
    
    if (!window.confirm(
      `Are you sure you want to delete this instance?
      ID: ${instanceId}
      Course: ${courseId}
      Year: ${year}
      Semester: ${semester}
      
      This action cannot be undone. Proceed?`
    )) {
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await api.deleteInstance(year, semester, courseId);
      if (response === true) {
        // Remove the deleted instance from the list
        setInstances(prev => prev.filter(inst => 
          inst.courseId !== courseId || inst.year !== year || inst.semester !== semester
        ));
        toast.success('Instance deleted successfully');
      } else {
        throw new Error('Failed to delete instance');
      }
    } catch (error) {
      console.error('Error deleting instance:', error);
      if (error.response) {
        if (error.response.status === 409) {
          alert(`Cannot delete this instance because it's still in use.\n\n` +
                `Please check if this instance is associated with any:\n` +
                `- Student enrollments\n` +
                `- Course prerequisites\n` +
                `- Course schedules\n\n` +
                `Remove these associations first before deleting.`);
        } else {
          setError(error.response.data?.message || error.response.statusText || 'Failed to delete instance');
        }
      } else {
        setError(error.message || 'Failed to delete instance');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (year && semester && !isNaN(parseInt(year)) && !isNaN(parseInt(semester))) {
      fetchInstances();
    }
  }, [year, semester]);

  return (
    <div className="w-full px-8 py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex-1">
          <label htmlFor="year" className="block text-sm font-medium">Year</label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter year"
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
        <button
          onClick={handleAdd}
          className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Add Instance
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

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
                  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                    <button
                      onClick={() => handleEdit(instance)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >Edit</button>
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
    {/* Modal for Add/Edit Instance */}
    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 min-w-[400px] relative">
          <button className="absolute top-2 right-2 text-gray-500 hover:text-black" onClick={handleModalClose}>&times;</button>
          <InstanceForm
            onSuccess={handleSave}
            courses={courses}
            initial={editInstance || {}}
            loading={saving}
          />
        </div>
      </div>
    )}
  </div>
  );
};

export default InstanceList;
