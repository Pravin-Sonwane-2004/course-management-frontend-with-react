import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:8080/api/courses/combined';

export default function CourseDropdown({ onSelect, value, label = 'Select Course' }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError('Could not load courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <select disabled><option>Loading...</option></select>;
  if (error) return <select disabled><option>{error}</option></select>;

  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <select
        className="border rounded px-2 py-1 w-full"
        value={value || ''}
        onChange={e => onSelect && onSelect(e.target.value)}
      >
        <option value="" disabled>Select a course</option>
        {courses.map(course => (
          <option key={course.id || course.code || course.name || course.courseName} value={course.id || course.code || course.name || course.courseName}>
            {course.name || course.courseName || course.title || course.code}
          </option>
        ))}
      </select>
    </div>
  );
}
