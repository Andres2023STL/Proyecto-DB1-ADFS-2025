import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ requiredRole }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data.success) {
          setRole(data.role.trim().toLowerCase()); // 🔥 Elimina espacios y normaliza mayúsculas
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

  useEffect(() => {
  }, [role]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (requiredRole.toLowerCase() !== role) {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#ff4d4d" }}>
        <h1>Acceso denegado</h1>
        <p>No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }
  return <Outlet />;
};

export default ProtectedRoute;
