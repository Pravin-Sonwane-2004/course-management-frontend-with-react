import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CourseList from './CourseList';
import CreateCourseForm from './CreateCourseForm';
import CourseDetails from './CourseDetails';
import CreateInstanceForm from './CreateInstanceForm';
import InstanceList from './InstanceList';
import InstanceDetails from './InstanceDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/courses/new" element={<CreateCourseForm />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/instances/new" element={<CreateInstanceForm />} />
        <Route path="/instances/:year/:sem" element={<InstanceList />} />
        <Route path="/instances/:year/:sem/:id" element={<InstanceDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
