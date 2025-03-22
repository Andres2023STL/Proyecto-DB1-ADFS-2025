import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  // Estado para el rol del usuario y para saber si se está cargando la verificación
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al montar el componente, se obtiene el rol del usuario desde la API
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setRole(data.role.trim().toLowerCase());
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Error verificando sesión en ProtectedRoute:", error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Muestra un mensaje mientras se carga la verificación
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no se obtiene un rol, redirige a la página de login
  if (!role) {
    return <Navigate to="/login" />;
  }

  // Si el rol del usuario no coincide con el requerido, muestra un mensaje de acceso denegado
  if (requiredRole.toLowerCase() !== role) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#ff4d4d" }}>
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  // Si el usuario está autorizado, renderiza los componentes hijos
  return <Outlet />;
};

export default ProtectedRoute;
