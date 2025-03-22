import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, List, Button, Typography, Input } from "antd";
import { motion } from "framer-motion";
import patientsData from "../../../../data/patients.json";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function PatientHistory() {
  // Estado para almacenar la lista de pacientes
  const [patients, setPatients] = useState([]);
  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);
  // Estado para almacenar cualquier error ocurrido al cargar los datos
  const [error, setError] = useState(null);
  // Estado para almacenar los comentarios de cada paciente (clave: patient.id, valor: arreglo de comentarios)
  const [comments, setComments] = useState({});
  // Estado para almacenar el texto actual del comentario por paciente (clave: patient.id, valor: texto)
  const [commentText, setCommentText] = useState({});
  // Estado para controlar a cuál comentario se está respondiendo (clave: patient.id, valor: índice del comentario)
  const [replyingTo, setReplyingTo] = useState({});

  // useEffect para cargar los datos de pacientes desde el JSON
  useEffect(() => {
    try {
      // Verifica que patientsData exista y sea un arreglo
      if (!patientsData || !Array.isArray(patientsData)) {
        throw new Error("El archivo JSON de pacientes no es válido.");
      }
      // Guarda los datos en el estado 'patients'
      setPatients(patientsData);
    } catch (err) {
      // Si ocurre un error, se guarda el mensaje en el estado 'error'
      setError(err.message);
    } finally {
      // Se indica que ya finalizó la carga (exitosa o con error)
      setLoading(false);
    }
  }, []);

  // Función para agregar un comentario o respuesta a un paciente
  const handleAddComment = (patientId, parentId = null) => {
    // Verifica que el campo de texto tenga contenido
    if (!commentText[patientId] || commentText[patientId].trim() === "") return;

    // Actualiza el estado 'comments' para el paciente especificado
    setComments((prev) => {
      // Crea una copia del objeto previo de comentarios
      const updated = { ...prev };
      // Si aún no hay comentarios para este paciente, inicializa un arreglo vacío
      if (!updated[patientId]) {
        updated[patientId] = [];
      }
      // Agrega el nuevo comentario (con el texto y el id del comentario al que se responde, si aplica)
      updated[patientId] = [
        ...updated[patientId],
        { text: commentText[patientId], parentId },
      ];
      return updated;
    });
    // Reinicia el campo de texto para el paciente específico
    setCommentText((prev) => ({ ...prev, [patientId]: "" }));
    // Resetea el estado de respuesta para el paciente (oculta la sección de respuesta)
    setReplyingTo((prev) => ({ ...prev, [patientId]: null }));
  };

  // Función para alternar la visualización del campo de respuesta para un comentario específico
  const toggleReplyingTo = (patientId, index) => {
    setReplyingTo((prev) => ({
      ...prev,
      // Si el comentario actual ya está activo, lo desactiva; de lo contrario, lo activa
      [patientId]: prev[patientId] === index ? null : index,
    }));
  };

  return (
    <div className="private-page-container">
      {/* Encabezado de la página con el título y enlace de regreso */}
      <div className="private-page-header">
        <Title level={2}>Historial de Pacientes</Title>
        <Link to="/hospital/dashboard" className="private-back-button">
          ← Regresar
        </Link>
      </div>

      {/* Condición para mostrar contenido basado en el estado de carga, error o ausencia de datos */}
      {loading ? (
        // Si aún se están cargando los datos, muestra un mensaje de carga
        <Paragraph>Cargando historial de pacientes...</Paragraph>
      ) : error ? (
        // Si ocurrió un error, muestra el mensaje de error
        <Paragraph className="private-error-message">❌ Error: {error}</Paragraph>
      ) : patients.length === 0 ? (
        // Si no hay registros de pacientes, muestra un mensaje informativo
        <Paragraph>No hay registros de pacientes.</Paragraph>
      ) : (
        // Si los datos se cargaron correctamente, muestra la lista de pacientes
        <List
          dataSource={patients}
          renderItem={(patient) => (
            <List.Item>
              {/* Envuelve cada tarjeta de paciente en un contenedor animado */}
              <motion.div
                className="private-patient-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Tarjeta que muestra la información del paciente */}
                <Card hoverable className="private-patient-card-ant">
                  {/* Muestra la foto del paciente si está disponible */}
                  {patient.photo && (
                    <img
                      src={patient.photo}
                      alt={patient.name}
                      className="private-patient-photo"
                    />
                  )}
                  {/* Nombre del paciente */}
                  <Title level={4}>{patient.name}</Title>
                  {/* Información del paciente */}
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
                    {patient.medications && patient.medications.length > 0
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
                  {/* Lista de servicios registrados del paciente */}
                  <List
                    size="small"
                    dataSource={
                      patient.services && patient.services.length > 0
                        ? patient.services
                        : ["No hay servicios registrados"]
                    }
                    renderItem={(service) => <List.Item>{service}</List.Item>}
                  />

                  {/* Sección de comentarios para el paciente */}
                  <div className="private-comments-section">
                    <Title level={5}>Comentarios</Title>
                    {/* Lista de comentarios del paciente */}
                    <List
                      dataSource={comments[patient.id] || []}
                      renderItem={(comment, index) => (
                        <List.Item
                          style={{
                            // Indenta los comentarios de respuesta
                            marginLeft: comment.parentId !== null ? "30px" : "0",
                          }}
                        >
                          <span>{comment.text}</span>
                          {/* Botón para activar/desactivar el campo de respuesta */}
                          <Button
                            size="small"
                            onClick={() => toggleReplyingTo(patient.id, index)}
                          >
                            Responder
                          </Button>
                          {/* Si se está respondiendo a este comentario, muestra el campo de respuesta */}
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
                    {/* Si no hay comentarios o ninguna respuesta activa, muestra el campo para agregar un comentario nuevo */}
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
