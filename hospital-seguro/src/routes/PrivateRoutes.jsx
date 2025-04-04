// src/routes/PrivateRoutes.jsx
import React, { useState, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";
import AdminRoutes from "../modules/admin/AdminRoutes";
import HospitalRoutes from "../modules/hospital/HospitalRoutes";
import SeguroRoutes from "../modules/seguro/SeguroRoutes";
import PacienteRoutes from "../modules/hospital/PacienteRoutes";
import EmpleadoHospitalRoutes from "../modules/hospital/EmpleadoHospitalRoutes";

const PrivateRoutes = ({ allowedRole }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setUser(data);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/login" />;

  const role = user.role?.toLowerCase();

  if (role !== allowedRole) {
    return <Navigate to="/acceso-denegado" />;
  }

  return (
    <Routes>
      {allowedRole === "doctor" && <Route path="/*" element={<HospitalRoutes />} />}
      {allowedRole === "empleado_hospital" && <Route path="/*" element={<EmpleadoHospitalRoutes />} />}
      {allowedRole === "admin" && <Route path="/*" element={<AdminRoutes />} />}
      {allowedRole === "empleado_seguro" && <Route path="/*" element={<SeguroRoutes />} />}
      {allowedRole === "patient" && <Route path="/*" element={<PacienteRoutes />} />}
      <Route path="*" element={<Navigate to="/acceso-denegado" />} />
    </Routes>
  );
};

export default PrivateRoutes;
