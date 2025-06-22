import React, { useEffect, useState } from 'react';
import InstanceForm from './InstanceForm';
import Notification from '../Notification';
import { getInstances, createInstance as apiCreateInstance, deleteInstance as apiDeleteInstance, getAllCourses } from '../../service/api';

export default function InstanceManagementPage() {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [instances, setInstances] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [viewInstance, setViewInstance] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    getAllCourses()
      .then(res => setCourses(res.data))
      .catch(() => setCourses([]));
  }, []);

  const handleFetchInstances = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ message: '', type: '' });
    try {
      const res = await getInstances(year, semester);
      const data = res.data;
      setInstances(Array.isArray(data) ? data : []);
    } catch (err) {
      setNotification({ message: err.message, type: 'danger' });
      setInstances([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInstance = async (data) => {
    setLoading(true);
    setNotification({ message: '', type: '' });
    try {
      await apiCreateInstance(data);
      setNotification({ message: 'Instance created successfully!', type: 'success' });
      if (year && semester) handleFetchInstances({ preventDefault: () => {} });
    } catch (err) {
      setNotification({ message: err.message, type: 'danger' });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (instance) => {
    if (!window.confirm('Are you sure you want to delete this instance?')) return;
    setDeletingId(instance.id);
    setNotification({ message: '', type: '' });
    try {
      await apiDeleteInstance(instance.year, instance.semester, instance.id);
      setNotification({ message: 'Instance deleted successfully!', type: 'success' });
      setInstances(instances.filter(i => i.id !== instance.id));
    } catch (err) {
      setNotification({ message: err.message, type: 'danger' });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="container">
      <h2>Instance Management</h2>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <InstanceForm onSuccess={handleCreateInstance} courses={courses} />
      <form onSubmit={handleFetchInstances} className="my-4 flex gap-2">
        <select value={year} onChange={e => setYear(e.target.value)} required className="border rounded px-2">
          <option value="">Select Year</option>
          {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <select value={semester} onChange={e => setSemester(e.target.value)} required className="border rounded px-2">
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Instances'}
        </button>
      </form>
      <ul className="list-group">
        {instances.map(instance => (
          <li key={instance.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{courses.find(c => c.courseId === instance.courseId)?.name || instance.courseId}</strong>
              {' '}({instance.year}, Semester {instance.semester})
            </div>
            <div>
              <button className="btn btn-info btn-sm me-2" onClick={() => setViewInstance(instance)}>
                View
              </button>
              <button
                className="btn btn-danger btn-sm"
                disabled={deletingId === instance.id}
                onClick={() => handleDelete(instance)}
              >
                {deletingId === instance.id ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
      {viewInstance && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Instance Details</h5>
                <button type="button" className="close" onClick={() => setViewInstance(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p><strong>Course:</strong> {courses.find(c => c.courseId === viewInstance.courseId)?.name || viewInstance.courseId}</p>
                <p><strong>Year:</strong> {viewInstance.year}</p>
                <p><strong>Semester:</strong> {viewInstance.semester}</p>
                <p><strong>ID:</strong> {viewInstance.id}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
