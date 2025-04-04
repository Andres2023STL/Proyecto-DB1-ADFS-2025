import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../components/DashboardLayout.jsx";
import DashboardLinkCard from "../../../../components/DashboardLinkCard";

function HospitalEmpleadoDashboard() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setName(data.name);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <DashboardLayout title={`¡Bienvenido, ${name || "Empleado"}!`}>
      <div className="dashboard-link-container">
        <DashboardLinkCard title="Agendar Citas" link="/hospital-empleado/appointments" />
        <DashboardLinkCard title="Edición de contenido dentro del portal" link="/hospital-empleado/patientregister" />
      </div>
    </DashboardLayout>
  );
}

export default HospitalEmpleadoDashboard;
