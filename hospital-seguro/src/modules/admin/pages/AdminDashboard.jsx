import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from"../../../components/DashboardLayout.jsx";
import DashboardLinkCard from "../../../components/DashboardLinkCard";

function AdminDashboard() {
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
  if (!role) return <p>Error: No se pudo obtener el rol.</p>;

  return (
    <DashboardLayout title={`¡Bienvenido, Admin. ${name || "Usuario"}!`}>
      <div className="dashboard-link-container">
        <DashboardLinkCard 
          title="Gestión de Usuarios" 
          description="Administra los usuarios del sistema." 
          link="/admin/usersmanagement" 
        />
        <DashboardLinkCard 
          title="Auditoría" 
          description="Consulta los registros de cambios en el sistema." 
          link="/admin/auditlogs" 
        />
        <DashboardLinkCard 
          title="Configuraciones" 
          description="Modifica las configuraciones generales del sistema." 
          link="/admin/settings" 
        />
        <DashboardLinkCard 
          title="Panel de Moderación" 
          description="Aprueba o rechaza cambios en el contenido." 
          link="/admin/moderationpanel" 
        />
        <DashboardLinkCard 
          title="Editar Contenido" 
          description="Modifica la información del portal." 
          link="/admin/editarcontenido" 
        />
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboard;
