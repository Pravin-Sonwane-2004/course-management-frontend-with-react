import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem('user');
  const isAdmin = user && JSON.parse(user).role === "ROLE_ADMIN";
  return isAdmin
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />;
};

export default AdminRoute;
