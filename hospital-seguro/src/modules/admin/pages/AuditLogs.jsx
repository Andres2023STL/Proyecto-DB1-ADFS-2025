import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/AuditLogs.css';

function AuditLogs() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Auditoría</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>
      <p>Consulta los registros de cambios en el sistema.</p>

      {/* Tabla para mostrar los logs de auditoría */}
      <table className="audit-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se rellenarán las filas desde el backend */}
          <tr>
            <td colSpan="4" className="empty-row">No hay registros disponibles.</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

<<<<<<< HEAD
export default AuditLogs;
=======
export default AuditLogs;
>>>>>>> f0cb69c (Agregar más los de mas requerimientos)
