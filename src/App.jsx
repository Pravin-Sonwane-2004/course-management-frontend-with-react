import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CourseManagementPage from './pages/CourseManagementPage';
import InstanceManagementPage from './pages/InstanceManagementPage';

function App() {
  return (
    <Router>
      <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<CourseManagementPage />} />
                <Route path="/instances" element={<InstanceManagementPage />} />
              </Routes>
    </Router>
  );
}

export default App;
