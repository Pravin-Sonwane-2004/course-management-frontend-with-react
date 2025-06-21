import React, { useEffect, useState } from 'react';
import {
  getUsers,
  getAllCourses,
  getInstructors
  // Add your course instance fetch function here if available
} from './service/api';

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);
  // const [instances, setInstances] = useState([]);

  useEffect(() => {
    // Fetch users
    getUsers()
      .then(res => setUsers(res.data))
      .catch(err => console.error('Users fetch error:', err));

    // Fetch courses
    getAllCourses()
      .then(res => setCourses(res.data))
      .catch(err => console.error('Courses fetch error:', err));

    // Fetch instructors
    getInstructors()
      .then(res => setInstructors(res.data))
      .catch(err => console.error('Instructors fetch error:', err));

    // Fetch course instances (example, adjust as needed)
    // getCourseInstances(year, semester)
    //   .then(res => setInstances(res.data))
    //   .catch(err => console.error('Instances fetch error:', err));
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(u => (
          <li key={u.id || u.username}>{u.username || u.email}</li>
        ))}
      </ul>

      <h2>Courses</h2>
      <ul>
        {courses.map(c => (
          <li key={c.courseId}>{c.title} ({c.courseId})</li>
        ))}
      </ul>

      <h2>Instructors</h2>
      <ul>
        {instructors.map(i => (
          <li key={i.id || i.email}>{i.name || i.email}</li>
        ))}
      </ul>

      {/* <h2>Course Instances</h2>
      <ul>
        {instances.map(inst => (
          <li key={inst.id}>{inst.courseId} - {inst.year} S{inst.semester}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Dashboard;
