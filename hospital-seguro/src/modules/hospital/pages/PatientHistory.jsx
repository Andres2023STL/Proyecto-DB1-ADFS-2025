import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/PatientHistory.css';

function PatientHistory() {
  const [patients, setPatients] = useState([
    { id: 1, name: 'Juan Pérez', lastVisit: '2025-01-28', diagnosis: 'Hipertensión' },
    { id: 2, name: 'María López', lastVisit: '2025-01-15', diagnosis: 'Diabetes' },
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Historial de Pacientes</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>

      <p>Consulta el historial clínico de los pacientes.</p>
      <ul className="patient-list">
        {patients.map((patient) => (
          <li key={patient.id} className="patient-item">
            <strong>Nombre:</strong> {patient.name} <br />
            <strong>Última visita:</strong> {patient.lastVisit} <br />
            <strong>Diagnóstico:</strong> {patient.diagnosis}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PatientHistory;