import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/PatientHistory.css';
import patientsData from '../../../data/patients.json'; // Importar JSON de pacientes

function PatientHistory() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({ patientId: null, text: '', parentId: null });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      setPatients(patientsData);
    } catch (err) {
      setError('Error al obtener los datos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = (patientId, parentId = null) => {
    if (!newComment.text.trim()) return;
    const updatedComments = { ...comments };
    if (!updatedComments[patientId]) {
      updatedComments[patientId] = [];
    }
    updatedComments[patientId].push({ text: newComment.text, parentId });
    setComments(updatedComments);
    setNewComment({ patientId: null, text: '', parentId: null });
  };

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
              <img src={patient.photo} alt={patient.name} className="patient-photo" />
              <strong>Nombre:</strong> {patient.name} <br />
              <strong>Fecha de Nacimiento:</strong> {patient.birthDate} <br />
              <strong>Documento de Identificación:</strong> {patient.documentId} <br />
              <strong>Número de Afiliación:</strong> {patient.insuranceNumber} <br />
              <strong>Código de Compañía de Seguro:</strong> {patient.insuranceCompany} <br />
              <strong>Última visita:</strong> {patient.lastVisit} <br />
              <strong>Diagnóstico:</strong> {patient.diagnosis} <br />
              <strong>Medicamentos Recetados:</strong> {patient.medications.join(', ')} <br />
              <strong>Notas del Doctor:</strong> {patient.notes} <br />
              <strong>Historial de Servicios:</strong>
              <ul>
                {patient.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
              
              <div className="comments-section">
                <h3>Comentarios</h3>
                <ul>
                  {comments[patient.id]?.map((comment, index) => (
                    <li key={index}>
                      {comment.text}
                      <button onClick={() => setNewComment({ patientId: patient.id, text: '', parentId: index })}>Responder</button>
                    </li>
                  ))}
                </ul>
                <textarea
                  placeholder="Agregar comentario..."
                  value={newComment.patientId === patient.id ? newComment.text : ''}
                  onChange={(e) => setNewComment({ ...newComment, text: e.target.value })}
                ></textarea>
                <button onClick={() => handleAddComment(patient.id, newComment.parentId)}>Añadir Comentario</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientHistory;