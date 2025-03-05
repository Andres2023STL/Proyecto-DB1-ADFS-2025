import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/PatientHistory.css';
import patientsData from '../../../data/patients.json';

function PatientHistory() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [replyingTo, setReplyingTo] = useState({});

  useEffect(() => {
    try {
      if (!patientsData || !Array.isArray(patientsData)) {
        throw new Error('El archivo JSON de pacientes no es válido.');
      }
      setPatients(patientsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddComment = (patientId, parentId = null) => {
    if (!commentText[patientId] || commentText[patientId].trim() === '') return;
  
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      if (!updatedComments[patientId]) {
        updatedComments[patientId] = [];
      }
      updatedComments[patientId] = [
        ...updatedComments[patientId], //Operador de propagación (nuevo array) en lugar de push, ya que causaba problemas
        { text: commentText[patientId], parentId }
      ];
  
      return updatedComments;
    });
  
    setCommentText((prev) => ({ ...prev, [patientId]: '' }));
    setReplyingTo((prev) => ({ ...prev, [patientId]: null }));
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
              {patient.photo && <img src={patient.photo} alt={patient.name} className="patient-photo" />}
              <strong>Nombre:</strong> {patient.name} <br />
              <strong>Fecha de Nacimiento:</strong> {patient.birthDate || 'No disponible'} <br />
              <strong>Documento de Identificación:</strong> {patient.documentId || 'No disponible'} <br />
              <strong>Número de Afiliación:</strong> {patient.insuranceNumber || 'No disponible'} <br />
              <strong>Código de Compañía de Seguro:</strong> {patient.insuranceCompany || 'No disponible'} <br />
              <strong>Última visita:</strong> {patient.lastVisit || 'No disponible'} <br />
              <strong>Diagnóstico:</strong> {patient.diagnosis || 'No disponible'} <br />
              <strong>Medicamentos Recetados:</strong> {(patient.medications && patient.medications.length > 0) ? patient.medications.join(', ') : 'Ninguno'} <br />
              <strong>Notas del Doctor:</strong> {patient.notes || 'No disponible'} <br />
              <strong>Historial de Servicios:</strong>
              <ul>
                {patient.services && patient.services.length > 0 ? (
                  patient.services.map((service, index) => <li key={index}>{service}</li>)
                ) : (
                  <li>No hay servicios registrados</li>
                )}
              </ul>

              {/* Sección de comentarios */}
              <div className="comments-section">
                <h3>Comentarios</h3>
                <ul>
                  {comments[patient.id]?.map((comment, index) => (
                    <li key={index} style={{ marginLeft: comment.parentId !== null ? '30px' : '0' }}>
                      {comment.text}
                      <button
                        onClick={() =>
                          setReplyingTo((prev) => ({
                            ...prev,
                            [patient.id]: prev[patient.id] === index ? null : index
                          }))
                        }
                      >
                        Responder
                      </button>
                      {replyingTo[patient.id] === index && (
                        <div className="reply-section">
                          <textarea
                            placeholder="Escribe tu respuesta..."
                            value={commentText[patient.id] || ''}
                            onChange={(e) =>
                              setCommentText((prev) => ({ ...prev, [patient.id]: e.target.value }))
                            }
                          ></textarea>
                          <button onClick={() => handleAddComment(patient.id, index)}>Añadir Respuesta</button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
                
                {/* Campo de nuevo comentario */}
                <textarea
                  placeholder="Agregar comentario..."
                  value={commentText[patient.id] || ''}
                  onChange={(e) => setCommentText((prev) => ({ ...prev, [patient.id]: e.target.value }))}
                ></textarea>
                <button onClick={() => handleAddComment(patient.id)}>Añadir Comentario</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PatientHistory;
