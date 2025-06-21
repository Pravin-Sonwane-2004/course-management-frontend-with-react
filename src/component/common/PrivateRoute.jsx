import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  return localStorage.getItem('user')
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;
