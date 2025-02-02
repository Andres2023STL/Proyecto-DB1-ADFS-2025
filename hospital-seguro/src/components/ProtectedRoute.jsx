import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('token');
const getUserRole = () => localStorage.getItem('role');

function ProtectedRoute({ component: Component, requiredRole }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const userRole = getUserRole();

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" />;
  }

  return <Component />;
}

export default ProtectedRoute;
