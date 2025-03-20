import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardRedirect = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success && data.role) {
          // Se normaliza el rol para hacer la comparación
          const role = data.role.trim().toLowerCase();
          if (role === "doctor") {
            navigate("/hospital/dashboard");
          } else if (role === "admin") {
            navigate("/admin/admindashboard");
          } else if (role === "empleado_seguro") {
            navigate("/seguro/SeguroEmpleadoDashboard");
          } else {
            navigate("/acceso-denegado");
          }
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

  if (loading) return <p>Cargando...</p>;
  return null;
};

export default DashboardRedirect;
