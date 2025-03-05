import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => !!localStorage.getItem('token');
const getUserRole = () => localStorage.getItem('role');

function ProtectedRoute({ children, requiredRole }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }

  const userRole = getUserRole();

  // Si requiredRole es un string, lo convertimos en un array para comparar con múltiples roles
  const rolesPermitidos = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

  if (requiredRole && !rolesPermitidos.includes(userRole)) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#ff4d4d' }}>
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;
