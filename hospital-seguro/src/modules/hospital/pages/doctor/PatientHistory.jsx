import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, List, Button, Typography, Input, message } from "antd";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function PatientHistory() {
  const [patients, setPatients] = useState([]);
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});
  const [replyingTo, setReplyingTo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.user_id;
  const userRole = decoded?.role;

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost/hospital_api/getPatientHistory.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setPatients(data.patients);
        fetchComments();
      } else {
        setError(data.message || "Error al cargar pacientes");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch("http://localhost/hospital_api/getPatientComments.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setComments(data.comments);
      }
    } catch {
      message.error("Error al cargar comentarios");
    }
  };

  const handleAddComment = async (patientId, parentId = null) => {
    const text = commentText[patientId];
    if (!text || text.trim() === "") return;

    try {
      const res = await fetch("http://localhost/hospital_api/addPatientComment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          paciente_id: patientId,
          user_id: userId,
          role: userRole,
          comentario: text,
          parent_id: parentId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        message.success("Comentario guardado");
        setCommentText((prev) => ({ ...prev, [patientId]: "" }));
        setReplyingTo((prev) => ({ ...prev, [patientId]: null }));
        fetchComments();
      } else {
        message.error(data.message || "Error al comentar");
      }
    } catch {
      message.error("Error al guardar comentario");
    }
  };

  const toggleReplyingTo = (patientId, index) => {
    setReplyingTo((prev) => ({
      ...prev,
      [patientId]: prev[patientId] === index ? null : index,
    }));
  };

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2}>Historial de Pacientes</Title>
      <Link to="/hospital/dashboard">← Volver</Link>

      {loading ? (
        <Paragraph>Cargando...</Paragraph>
      ) : error ? (
        <Paragraph type="danger">❌ {error}</Paragraph>
      ) : patients.length === 0 ? (
        <Paragraph type="secondary">
          No hay pacientes que hayas atendido aún.
        </Paragraph>
      ) : (
        <List
          dataSource={patients}
          renderItem={(patient) => (
            <List.Item key={patient.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card title={patient.nombre}>
                  {patient.foto && (
                    <img
                      src={patient.foto}
                      alt={patient.nombre}
                      style={{ width: "100px", marginBottom: "1rem" }}
                    />
                  )}
                  <Paragraph><strong>Documento:</strong> {patient.documento}</Paragraph>
                  <Paragraph><strong>Fecha de Nacimiento:</strong> {patient.fecha_nacimiento}</Paragraph>
                  <Paragraph><strong>Asegurado:</strong> {patient.seguro}</Paragraph>
                  <Paragraph><strong>Código Seguro:</strong> {patient.codigo_seguro || "No aplica"}</Paragraph>
                  <Paragraph><strong>Última Visita:</strong> {patient.ultima_visita || "No disponible"}</Paragraph>
                  <Paragraph><strong>Diagnóstico:</strong> {patient.diagnostico || "No disponible"}</Paragraph>
                  <Paragraph>
                    <strong>Medicamentos:</strong>{" "}
                    {patient.medicamentos && patient.medicamentos.length > 0
                      ? patient.medicamentos.join(", ")
                      : "Ninguno"}
                  </Paragraph>
                  <Paragraph><strong>Historial de Servicios:</strong></Paragraph>
                  <List
                    size="small"
                    dataSource={patient.citas}
                    renderItem={(service) => (
                      <List.Item>
                        {service.fecha} - {service.hora} - {service.motivo || "Sin motivo"}
                      </List.Item>
                    )}
                  />

                  <Title level={5}>Comentarios</Title>
                  <List
                    dataSource={comments[patient.id] || []}
                    renderItem={(comment, index) => (
                      <List.Item style={{ marginLeft: comment.parent_id ? 30 : 0 }}>
                        <div>
                          <Paragraph>
                            <strong>{comment.rol}</strong>: {comment.comentario}
                          </Paragraph>
                          <Button
                            size="small"
                            onClick={() => toggleReplyingTo(patient.id, index)}
                          >
                            Responder
                          </Button>
                          {replyingTo[patient.id] === index && (
                            <div style={{ marginTop: 8 }}>
                              <TextArea
                                rows={2}
                                placeholder="Respuesta..."
                                value={commentText[patient.id] || ""}
                                onChange={(e) =>
                                  setCommentText((prev) => ({
                                    ...prev,
                                    [patient.id]: e.target.value,
                                  }))
                                }
                              />
                              <Button
                                type="primary"
                                size="small"
                                onClick={() =>
                                  handleAddComment(patient.id, comment.id)
                                }
                              >
                                Enviar
                              </Button>
                            </div>
                          )}
                        </div>
                      </List.Item>
                    )}
                  />

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
                    type="primary"
                    size="small"
                    onClick={() => handleAddComment(patient.id)}
                    style={{ marginTop: 8 }}
                  >
                    Comentar
                  </Button>
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
