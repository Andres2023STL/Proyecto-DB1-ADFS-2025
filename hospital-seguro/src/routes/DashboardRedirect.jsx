import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardRedirect = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (data.success && data.role) {
          const role = data.role.trim().toLowerCase();

          // 🚨 Si es doctor, verificar si ya llenó perfil
          if (role === "doctor") {
            const profileResponse = await fetch("http://localhost/hospital_api/getDoctorProfileStatus.php", {
              method: "GET",
              credentials: "include"
            });
            const profileData = await profileResponse.json();

            if (profileData.success && profileData.profileCompleted) {
              navigate("/hospital/dashboard");
            } else {
              navigate("/DoctorProfileForm");
            }
            return;
          }

          // 🔁 Resto de roles
          if (role === "admin") {
            navigate("/admin/admindashboard");
          } else if (role === "empleado_seguro") {
            navigate("/seguro/SeguroEmpleadoDashboard");
          } else if (role === "empleado_hospital") {
            navigate("/hospital-empleado/HospitalEmpleadoDashboard");
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

    fetchUserData();
  }, [navigate]);

  if (loading) return <p>Cargando...</p>;
  return null;
};

export default DashboardRedirect;
