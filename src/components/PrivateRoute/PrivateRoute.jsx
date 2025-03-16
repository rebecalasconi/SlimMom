import React from 'react';
import { Navigate } from 'react-router-dom';

const isTokenExpired = (token) => {
  const { exp } = JSON.parse(atob(token.split('.')[1])); // Decodificăm payload-ul și obținem expirația
  return exp * 1000 < Date.now(); // Comparăm cu timpul curent
};

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  console.log('Token din localStorage:', token);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
