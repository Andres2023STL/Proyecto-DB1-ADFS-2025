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

  const renderDashboardContent = () => {
    switch (role) {
      case 'doctor':
        return (
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
              <Link to="/hospital/recetas" className="dashboard-card">
                <h3>Gestión de Recetas</h3>
                <p>Crea y administra las recetas médicas.</p>
              </Link>
            </div>
          </div>
        );
        case 'admin':
          return (
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
                <Link to="/moderation" className="dashboard-card">
                  <h3>Panel de Moderación</h3>
                  <p>Aprueba o rechaza cambios en el contenido.</p>
                </Link>
                <Link to="/admin" className="dashboard-card">
                  <h3>Editar Contenido</h3>
                  <p>Modifica la información del portal.</p>
                </Link>
              </div>
            </div>
          );
        
          case 'empleado':
            return (
              <div className="dashboard-content">
                <h2>Panel de Empleado</h2>
                <div className="dashboard-cards">
                  <Link to="/empleado/AppointmentsControl" className="dashboard-card">
                    <h3>Control de Citas</h3>
                    <p>Gestiona las citas y la atención de pacientes.</p>
                  </Link>
                  <Link to="/admin" className="dashboard-card">
                    <h3>Editar Contenido</h3>
                    <p>Modifica la información del portal.</p>
                  </Link>
                </div>
              </div>
            );

            case 'empleado_Aseguradora':
              return (
                <div className="dashboard-content">
                  <h2>Panel de empleado de aseguradora</h2>
                  <div className="dashboard-cards">
                  <Link to="/empleado/Approvals" className="dashboard-card">
                    <h3>Aprobaciones</h3>
                    <p>Aquí los empleados del seguro pueden aprobar o rechazar servicios.</p>
                  </Link>
                  <Link to="/empleado/InsuranceClients" className="dashboard-card">
                    <h3>Clientes Seguro</h3>
                    <p>Aquí se pueden administrar los clientes asegurados.</p>
                  </Link>
                  <Link to="/empleado/Reports" className="dashboard-card">
                    <h3>Reportes Operativos</h3>
                    <p>Genera reportes de actividad.</p>
                  </Link>
                  </div>
                </div>
              );
          
          
      default:
        return <p>No tienes un rol asignado.</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>{`¡Bienvenido, ${role.charAt(0).toUpperCase() + role.slice(1)}!`}</h1>
        <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
      </div>
      {renderDashboardContent()}
    </div>
  );
}

export default Dashboard;
