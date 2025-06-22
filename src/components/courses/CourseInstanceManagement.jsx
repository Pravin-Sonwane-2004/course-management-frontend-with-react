import React, { useEffect, useState } from 'react';
import { getAllCourses } from '../../api/CourseAPI';
import { getInstancesByYearSemester, createInstance, deleteInstance, getInstanceById } from '../../api/CourseInstanceAPI';
import InstanceForm from './InstanceForm';
import InstanceList from './InstanceList';
import InstanceDetails from './InstanceDetails';
import Notification from '../Notification';

export default function CourseInstanceManagement() {
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [viewInstance, setViewInstance] = useState(null);

  // Fetch all courses for dropdown
  useEffect(() => {
    getAllCourses().then(setCourses);
  }, []);

  // Fetch instances for selected year/semester
  const fetchInstances = () => {
    if (!selectedYear || !selectedSemester) return;
    setLoading(true);
    getInstancesByYearSemester(selectedYear, selectedSemester)
      .then(data => {
        setInstances(data);
        setLoading(false);
      })
      .catch(err => {
        setNotification({ message: err.message, type: 'error' });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInstances();
    // eslint-disable-next-line
  }, [selectedYear, selectedSemester]);

  // Handle add instance
  const handleAddInstance = async (instanceData) => {
    try {
      await createInstance(instanceData);
      setNotification({ message: 'Instance created successfully!', type: 'success' });
      fetchInstances();
    } catch (err) {
      setNotification({ message: err.message, type: 'error' });
    }
  };

  // Handle delete instance
  const handleDeleteInstance = async (year, semester, id) => {
    try {
      await deleteInstance(year, semester, id);
      setNotification({ message: 'Instance deleted successfully!', type: 'success' });
      fetchInstances();
    } catch (err) {
      setNotification({ message: err.message, type: 'error' });
    }
  };

  // Handle view instance details
  const handleViewInstance = async (year, semester, id) => {
    try {
      const data = await getInstanceById(year, semester, id);
      setViewInstance(data);
    } catch (err) {
      setNotification({ message: err.message, type: 'error' });
    }
  };

  // Year and semester options (simple example)
  const yearOptions = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const semesterOptions = ['Spring', 'Summer', 'Fall', 'Winter'];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Instance Management</h2>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="mb-4">
        <InstanceForm onSuccess={handleAddInstance} courses={courses} />
      </div>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block font-medium">Year</label>
          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Year</option>
            {yearOptions.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Semester</label>
          <select
            value={selectedSemester}
            onChange={e => setSelectedSemester(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select Semester</option>
            {semesterOptions.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div className="text-blue-600">Loading instances...</div>
      ) : (
        <InstanceList
          instances={instances}
          onView={handleViewInstance}
          onDelete={handleDeleteInstance}
          selectedYear={selectedYear}
          selectedSemester={selectedSemester}
        />
      )}
      {viewInstance && (
        <div className="mt-6">
          <InstanceDetails instance={viewInstance} />
          <button className="mt-2 text-blue-600 underline" onClick={() => setViewInstance(null)}>
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}
