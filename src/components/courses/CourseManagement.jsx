import React, { useEffect, useState } from 'react';
import { getAllCourses, createCourse, deleteCourse } from '../../api/CourseAPI';
import CourseForm from './CourseForm';
import CourseList from './CourseList';
import Notification from '../Notification';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: '', type: '' });

  // Fetch all courses
  const fetchCourses = () => {
    setLoading(true);
    getAllCourses()
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(err => {
        setNotification({ message: err.message, type: 'error' });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // Handle course creation
  const handleAddCourse = async (courseData) => {
    try {
      await createCourse(courseData);
      setNotification({ message: 'Course created successfully!', type: 'success' });
      fetchCourses();
    } catch (err) {
      setNotification({ message: err.message, type: 'error' });
    }
  };

  // Handle course deletion
  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      setNotification({ message: 'Course deleted successfully!', type: 'success' });
      fetchCourses();
    } catch (err) {
      setNotification({ message: err.message, type: 'error' });
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Course Management</h2>
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '' })}
      />
      <div className="mb-6">
        <CourseForm onSuccess={handleAddCourse} courses={courses} />
      </div>
      {loading ? (
        <div className="text-blue-600">Loading courses...</div>
      ) : (
        <CourseList courses={courses} onDelete={handleDeleteCourse} />
      )}
    </div>
  );
}
