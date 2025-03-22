import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AdminRoutes from "../modules/admin/AdminRoutes";
import HospitalRoutes from "../modules/hospital/HospitalRoutes";
import SeguroRoutes from "../modules/seguro/SeguroRoutes";

const PrivateRoutes = ({ allowedRole }) => {
  // Estado para almacenar el rol del usuario y para indicar si la carga está en proceso
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Se ejecuta al montar el componente para obtener el rol del usuario
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success && data.role) {
          setRole(data.role.trim().toLowerCase());
        } else {
          setRole(null);
        }
      } catch (error) {
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  // Muestra un mensaje de carga mientras se obtiene la información del usuario
  if (loading) {
    return <p>Cargando...</p>;
  }

  // Si no se obtiene un rol, redirige al usuario al inicio de sesión
  if (!role) {
    return <Navigate to="/login" />;
  }

  // Si el rol del usuario no coincide con el rol permitido, redirige al acceso denegado
  if (role !== allowedRole) {
    return <Navigate to="/acceso-denegado" />;
  }

  // Define las rutas privadas según el rol permitido
  return (
    <Routes>
      {allowedRole === "doctor" && <Route path="/*" element={<HospitalRoutes />} />}
      {allowedRole === "admin" && <Route path="/*" element={<AdminRoutes />} />}
      {allowedRole === "empleado_seguro" && <Route path="/*" element={<SeguroRoutes />} />}
      <Route path="*" element={<Navigate to="/acceso-denegado" />} />
    </Routes>
  );
};

export default PrivateRoutes;
