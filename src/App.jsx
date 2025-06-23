import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import CourseManagement from "./components/courses/CourseManagement";
import InstanceList from "./components/instances/InstanceList";

function App() {
  return (
    <Router>
      <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/courses" element={<CourseManagement />} />
                <Route path="/instances" element={<InstanceList />} />
              </Routes>
    </Router>
  );
}

export default App;
