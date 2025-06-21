import React, { useEffect, useState } from 'react';
import {
  getAllCourses,
  getCourse,
  getCourseInstances,
  getCourseInstance
} from './service/api';

function AssignmentDashboard() {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [instances, setInstances] = useState([]);
  const [selectedInstance, setSelectedInstance] = useState(null);

  // Fetch all courses with prerequisites
  useEffect(() => {
    getAllCourses()
      .then(res => setCourses(res.data))
      .catch(err => console.error('Courses fetch error:', err));
  }, []);

  // Fetch a single course (with prerequisites)
  const fetchCourse = (courseId) => {
    getCourse(courseId)
      .then(res => setSelectedCourse(res.data))
      .catch(err => console.error('Single course fetch error:', err));
  };

  // Fetch all course instances for a year and semester
  const fetchInstances = (year, semester) => {
    getCourseInstances(year, semester)
      .then(res => setInstances(res.data))
      .catch(err => console.error('Instances fetch error:', err));
  };

  // Fetch a single course instance
  const fetchInstance = (year, semester, courseId) => {
    getCourseInstance(year, semester, courseId)
      .then(res => setSelectedInstance(res.data))
      .catch(err => console.error('Instance fetch error:', err));
  };

  return (
    <div>
      <h2>All Courses</h2>
      <ul>
        {courses.map(c => (
          <li key={c.courseId}>
            {c.title} ({c.courseId})<br />
            Prerequisites: {c.prerequisites && c.prerequisites.length > 0
              ? c.prerequisites.map(p => p.courseId).join(', ')
              : 'None'}
            <button onClick={() => fetchCourse(c.courseId)}>View Details</button>
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div>
          <h3>Course Details</h3>
          <p>Title: {selectedCourse.title}</p>
          <p>ID: {selectedCourse.courseId}</p>
          <p>Description: {selectedCourse.description}</p>
          <p>Prerequisites: {selectedCourse.prerequisites && selectedCourse.prerequisites.length > 0
            ? selectedCourse.prerequisites.map(p => p.courseId).join(', ')
            : 'None'}
          </p>
        </div>
      )}

      <h2>Fetch Course Instances</h2>
      <button onClick={() => fetchInstances(2024, 1)}>Get 2024 Semester 1 Instances</button>
      <button onClick={() => fetchInstances(2025, 2)}>Get 2025 Semester 2 Instances</button>
      <ul>
        {instances.map(inst => (
          <li key={inst.id || `${inst.year}-${inst.semester}-${inst.courseId}`}>
            {inst.courseId} - {inst.year} S{inst.semester}
            <button onClick={() => fetchInstance(inst.year, inst.semester, inst.courseId)}>View Instance</button>
          </li>
        ))}
      </ul>

      {selectedInstance && (
        <div>
          <h3>Instance Details</h3>
          <p>Course ID: {selectedInstance.courseId}</p>
          <p>Year: {selectedInstance.year}</p>
          <p>Semester: {selectedInstance.semester}</p>
        </div>
      )}
    </div>
  );
}

export default AssignmentDashboard;
