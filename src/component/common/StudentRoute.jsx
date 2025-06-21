import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const StudentRoute = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem('user');
  const isStudent = user && JSON.parse(user).role === "ROLE_STUDENT";
  return isStudent
    ? children
    : <Navigate to="/" replace state={{ from: location }} />;
};

export default StudentRoute;
