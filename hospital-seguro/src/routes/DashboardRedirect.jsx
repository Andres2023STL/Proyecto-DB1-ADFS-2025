// src/routes/DashboardRedirect.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardRedirect = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const redirectUser = async () => {
      try {
        const res = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();

        if (data.success && data.role) {
          const role = data.role.toLowerCase();


          if (role === "doctor") {
            const profileRes = await fetch("http://localhost/hospital_api/getProfileStatus.php", {
              method: "GET",
              credentials: "include",
            });
            const profile = await profileRes.json();
            if (profile.success && profile.filled) {
              navigate("/hospital/dashboard");
            } else {
              navigate("/hospital/DoctorProfileForm");
            }
            return;
          }


          // 🔽 Paciente
          if (role === "paciente") {
            const profileRes = await fetch("http://localhost/hospital_api/getProfileStatus.php", {
              method: "GET",
              credentials: "include",
            });
            const profile = await profileRes.json();
          
            if (profile.success && profile.filled) {
              navigate("/paciente/dashboardpaciente");
            } else {
              navigate("/paciente/PacienteProfileForm");
            }
            return;
          }
          
          if (role === "admin") {
            navigate("/admin/admindashboard");
          } else if (role === "empleado_hospital") {
            navigate("/hospital-empleado/HospitalEmpleadoDashboard");
          } else if (role === "empleado_seguro") {
            navigate("/seguro/SeguroEmpleadoDashboard");
          } else {
            navigate("/acceso-denegado");
          }

        } else {
          navigate("/login");
        }
      } catch (err) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    redirectUser();
  }, [navigate]);

  return loading ? <p>Cargando...</p> : null;
};

export default DashboardRedirect;
