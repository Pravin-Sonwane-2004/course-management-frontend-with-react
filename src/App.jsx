import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import CourseManagement from './components/CourseManagement';
import CourseInstanceManagement from './components/CourseInstanceManagement';
import CourseList from './components/CourseList.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<CourseManagement />} />
          <Route path="instances" element={<CourseInstanceManagement />} />
        <Route path="course-list" element={<CourseList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
