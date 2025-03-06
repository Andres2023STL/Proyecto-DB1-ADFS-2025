import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Reports.css'

function Reports() {
  return (
    <div>
      <h1>Reportes Operativos</h1>
      <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      <p>Aquí se generarán los reportes de actividad del sistema.</p>
    </div>
  );
}

export default Reports;
