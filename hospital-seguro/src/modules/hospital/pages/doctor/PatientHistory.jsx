import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, List, Button, Typography, Input } from "antd";
import { motion } from "framer-motion";
import patientsData from "../../../../data/patients.json";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

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
        throw new Error("El archivo JSON de pacientes no es válido.");
      }
      setPatients(patientsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddComment = (patientId, parentId = null) => {
    if (!commentText[patientId] || commentText[patientId].trim() === "") return;
    setComments((prev) => {
      const updated = { ...prev };
      if (!updated[patientId]) {
        updated[patientId] = [];
      }
      updated[patientId] = [
        ...updated[patientId],
        { text: commentText[patientId], parentId },
      ];
      return updated;
    });
    setCommentText((prev) => ({ ...prev, [patientId]: "" }));
    setReplyingTo((prev) => ({ ...prev, [patientId]: null }));
  };

  const toggleReplyingTo = (patientId, index) => {
    setReplyingTo((prev) => ({
      ...prev,
      [patientId]: prev[patientId] === index ? null : index,
    }));
  };

  return (
    <div className="private-page-container">
      <div className="private-page-header">
        <Title level={2}>Historial de Pacientes</Title>
        <Link to="/hospital/dashboard" className="private-back-button">
          ← Regresar
        </Link>
      </div>
      {loading ? (
        <Paragraph>Cargando historial de pacientes...</Paragraph>
      ) : error ? (
        <Paragraph className="private-error-message">❌ Error: {error}</Paragraph>
      ) : patients.length === 0 ? (
        <Paragraph>No hay registros de pacientes.</Paragraph>
      ) : (
        <List
          dataSource={patients}
          renderItem={(patient) => (
            <List.Item>
              <motion.div
                className="private-patient-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card hoverable className="private-patient-card-ant">
                  {patient.photo && (
                    <img
                      src={patient.photo}
                      alt={patient.name}
                      className="private-patient-photo"
                    />
                  )}
                  <Title level={4}>{patient.name}</Title>
                  <Paragraph>
                    <strong>Fecha de Nacimiento:</strong>{" "}
                    {patient.birthDate || "No disponible"}
                  </Paragraph>
                  <Paragraph>
                    <strong>Documento:</strong>{" "}
                    {patient.documentId || "No disponible"}
                  </Paragraph>
                  <Paragraph>
                    <strong>N° Afiliación:</strong>{" "}
                    {patient.insuranceNumber || "No disponible"}
                  </Paragraph>
                  <Paragraph>
                    <strong>Compañía de Seguro:</strong>{" "}
                    {patient.insuranceCompany || "No disponible"}
                  </Paragraph>
                  <Paragraph>
                    <strong>Última visita:</strong>{" "}
                    {patient.lastVisit || "No disponible"}
                  </Paragraph>
                  <Paragraph>
                    <strong>Diagnóstico:</strong>{" "}
                    {patient.diagnosis || "No disponible"}
                  </Paragraph>
                  <Paragraph>
                    <strong>Medicamentos:</strong>{" "}
                    {(patient.medications && patient.medications.length > 0)
                      ? patient.medications.join(", ")
                      : "Ninguno"}
                  </Paragraph>
                  <Paragraph>
                    <strong>Notas del Doctor:</strong>{" "}
                    {patient.notes || "No disponible"}
                  </Paragraph>
                  <Paragraph>
                    <strong>Historial de Servicios:</strong>
                  </Paragraph>
                  <List
                    size="small"
                    dataSource={
                      patient.services && patient.services.length > 0
                        ? patient.services
                        : ["No hay servicios registrados"]
                    }
                    renderItem={(service) => <List.Item>{service}</List.Item>}
                  />

                  {/* Sección de comentarios */}
                  <div className="private-comments-section">
                    <Title level={5}>Comentarios</Title>
                    <List
                      dataSource={comments[patient.id] || []}
                      renderItem={(comment, index) => (
                        <List.Item
                          style={{
                            marginLeft: comment.parentId !== null ? "30px" : "0",
                          }}
                        >
                          <span>{comment.text}</span>
                          <Button
                            size="small"
                            onClick={() => toggleReplyingTo(patient.id, index)}
                          >
                            Responder
                          </Button>
                          {replyingTo[patient.id] === index && (
                            <div className="private-reply-section">
                              <TextArea
                                rows={2}
                                placeholder="Escribe tu respuesta..."
                                value={commentText[patient.id] || ""}
                                onChange={(e) =>
                                  setCommentText((prev) => ({
                                    ...prev,
                                    [patient.id]: e.target.value,
                                  }))
                                }
                              />
                              <Button
                                size="small"
                                onClick={() => handleAddComment(patient.id, index)}
                              >
                                Añadir Respuesta
                              </Button>
                            </div>
                          )}
                        </List.Item>
                      )}
                    />
                    {(!comments[patient.id] ||
                      comments[patient.id].length === 0 ||
                      Object.values(replyingTo).every((val) => val === null)) && (
                      <>
                        <TextArea
                          rows={2}
                          placeholder="Agregar comentario..."
                          value={commentText[patient.id] || ""}
                          onChange={(e) =>
                            setCommentText((prev) => ({
                              ...prev,
                              [patient.id]: e.target.value,
                            }))
                          }
                        />
                        <Button
                          size="small"
                          onClick={() => handleAddComment(patient.id)}
                        >
                          Añadir Comentario
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              </motion.div>
            </List.Item>
          )}
        />
      )}
    </div>
  );
}

export default PatientHistory;
