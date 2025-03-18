import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenExpired = (token) => {
  const { exp } = JSON.parse(atob(token.split('.')[1]));
  return exp * 1000 < Date.now();
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
