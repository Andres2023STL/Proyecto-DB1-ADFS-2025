import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/Dashboard.css';

function Dashboard() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{`¡Bienvenido, ${role.charAt(0).toUpperCase() + role.slice(1)}!`}</h1>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </div>

      {role === 'doctor' && (
        <div className="dashboard-content">
          <h2>Panel del Doctor</h2>
          <div className="dashboard-cards">
            <Link to="/hospital/appointments" className="dashboard-card">
              <h3>Agenda de Consultas</h3>
              <p>Organiza y consulta tus citas médicas.</p>
            </Link>
            <Link to="/hospital/patient-history" className="dashboard-card">
              <h3>Historial de Pacientes</h3>
              <p>Consulta el historial clínico de los pacientes.</p>
            </Link>
            <Link to="/hospital/prescriptions" className="dashboard-card">
              <h3>Gestión de Recetas</h3>
              <p>Crea y administra las recetas médicas.</p>
            </Link>
          </div>
        </div>
      )}

      {role === 'admin' && (
        <div className="dashboard-content">
          <h2>Panel de Administración</h2>
          <div className="dashboard-cards">
            <Link to="/admin/users" className="dashboard-card">
              <h3>Gestión de Usuarios</h3>
              <p>Administra los usuarios del sistema.</p>
            </Link>
            <Link to="/admin/audit" className="dashboard-card">
              <h3>Auditoría</h3>
              <p>Consulta los registros de cambios en el sistema.</p>
            </Link>
            <Link to="/admin/settings" className="dashboard-card">
              <h3>Configuraciones</h3>
              <p>Modifica las configuraciones generales del sistema.</p>
            </Link>
          </div>
        </div>
      )}

      {role === 'empleado' && (
        <div className="dashboard-content">
          <h2>Panel de Empleado</h2>
          <div className="dashboard-cards">
            <Link to="/employee/appointments" className="dashboard-card">
              <h3>Control de Citas</h3>
              <p>Gestiona las citas y la atención de pacientes.</p>
            </Link>
            <Link to="/employee/reports" className="dashboard-card">
              <h3>Reportes Operativos</h3>
              <p>Genera reportes de actividad.</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
