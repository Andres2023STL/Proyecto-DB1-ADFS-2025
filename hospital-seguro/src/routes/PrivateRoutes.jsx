import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AdminRoutes from "../modules/admin/AdminRoutes";
import HospitalRoutes from "../modules/hospital/hospitalRoutes";

const PrivateRoutes = ({ allowedRole }) => {
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

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role !== allowedRole) {
    return <Navigate to="/acceso-denegado" />;
  }

  return (
    <Routes>
      {allowedRole === "doctor" && <Route path="/*" element={<HospitalRoutes />} />}
      {allowedRole === "admin" && <Route path="/*" element={<AdminRoutes />} />}
      <Route path="*" element={<Navigate to="/acceso-denegado" />} />
    </Routes>
  );
};

export default PrivateRoutes;
