// PacienteDashboard.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../components/DashboardLayout.jsx";
import DashboardLinkCard from "../../../../components/DashboardLinkCard";

function PacienteDashboard() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.success) {
          setRole(data.role);
          setName(data.name);
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
  if (!role || role !== "patient") return <p>Error: No autorizado.</p>;

  return (
    <DashboardLayout title={`¡Bienvenido, ${name || "Paciente"}!`}>
      <div className="dashboard-link-container">
        <DashboardLinkCard title="Mis Citas" link="/paciente/PacienteCitas" />
        <DashboardLinkCard title="Historial Médico" link="/paciente/PacienteHistorial" />
      </div>
    </DashboardLayout>
  );
}

export default PacienteDashboard;
