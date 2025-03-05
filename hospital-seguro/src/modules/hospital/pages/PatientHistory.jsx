import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/PatientHistory.css';

function PatientHistory() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // Para mostrar un mensaje mientras carga
  const [error, setError] = useState(null); // Para manejar errores

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('/api/patients'); // URL de la API
        if (!response.ok) throw new Error('Error al obtener los datos');
        
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Historial de Pacientes</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>

      {loading ? (
        <p>Cargando historial de pacientes...</p>
      ) : error ? (
        <p className="error-message">❌ Error: {error}</p>
      ) : patients.length === 0 ? (
        <p>No hay registros de pacientes.</p>
      ) : (
        <ul className="patient-list">
          {patients.map((patient) => (
            <li key={patient.id} className="patient-item">
              <strong>Nombre:</strong> {patient.name} <br />
              <strong>Última visita:</strong> {patient.lastVisit} <br />
              <strong>Diagnóstico:</strong> {patient.diagnosis}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientHistory;
