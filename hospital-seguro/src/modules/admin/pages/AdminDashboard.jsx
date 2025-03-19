import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function AdminDashboard() {
  const [role, setRole] = useState(null);
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
        if (data.success) {
          setRole(data.role);
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

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!role) {
    return <p>Error: No se pudo obtener el rol.</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>¡Bienvenido, Administrador!</h1>
      <Link to="/admin/usersmanagement" className="dashboard-card">
        <h3>Gestión de Usuarios</h3>
        <p>Administra los usuarios del sistema.</p>
      </Link>
      <Link to="/admin/auditlogs" className="dashboard-card">
        <h3>Auditoría</h3>
        <p>Consulta los registros de cambios en el sistema.</p>
      </Link>
      <Link to="/admin/settings" className="dashboard-card">
        <h3>Configuraciones</h3>
        <p>Modifica las configuraciones generales del sistema.</p>
      </Link>
      <Link to="/admin/moderationpanel" className="dashboard-card">
        <h3>Panel de Moderación</h3>
        <p>Aprueba o rechaza cambios en el contenido.</p>
      </Link>
      <Link to="/admin/editarcontenido" className="dashboard-card">
        <h3>Editar Contenido</h3>
        <p>Modifica la información del portal.</p>
      </Link>
    </div>
  );
}

export default AdminDashboard;
