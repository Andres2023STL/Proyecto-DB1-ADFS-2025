import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Prescriptions.css';

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, patient: 'Juan Pérez', date: '2025-01-28', medicine: 'Lisinopril', dosage: '10mg', duration: '30 días' },
    { id: 2, patient: 'María López', date: '2025-01-15', medicine: 'Metformina', dosage: '500mg', duration: '60 días' },
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Recetas</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>

      <p>Crea y administra las recetas médicas.</p>
      <ul className="prescription-list">
        {prescriptions.map((prescription) => (
          <li key={prescription.id} className="prescription-item">
            <strong>Paciente:</strong> {prescription.patient} <br />
            <strong>Fecha:</strong> {prescription.date} <br />
            <strong>Medicamento:</strong> {prescription.medicine} <br />
            <strong>Dosis:</strong> {prescription.dosage} <br />
            <strong>Duración:</strong> {prescription.duration}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Prescriptions;