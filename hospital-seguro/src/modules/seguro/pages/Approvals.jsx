import React, { useEffect, useState } from "react";
import { Button, Card, List, message, Modal } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Approvals() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/hospital_api/getPendingApprovals.php", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAppointments(data.pending_approvals); // 🔧 cambio aquí
        } else {
          message.error(data.message || "Error al cargar citas");
        }
      })
      .catch(() => {
        message.error("Error de conexión");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAction = (id, approved) => {
    Modal.confirm({
      title: approved ? "¿Aprobar esta cita?" : "¿Rechazar esta cita?",
      content: approved
        ? "Confirma que deseas aprobar la cita médica."
        : "Confirma que deseas rechazar la cita médica.",
      onOk: async () => {
        const res = await fetch("http://localhost/hospital_api/updateApprovalStatus.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ id, aprobado: approved ? 1 : 0 })
        });
        const data = await res.json();
        if (data.success) {
          message.success(data.message);
          setAppointments((prev) => prev.filter((a) => a.id !== id));
        } else {
          message.error(data.message || "Error al actualizar estado");
        }
      }
    });
  };

  return (
    <div className="private-page-container">
      <h1>Aprobaciones</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="private-back-button">
        ← Regresar al Dashboard
      </Link>
      <List
        loading={loading}
        dataSource={appointments}
        renderItem={(item) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="blue-theme" style={{ marginBottom: 10 }}>
              <p><strong>Paciente:</strong> {item.paciente}</p>
              <p><strong>Doctor:</strong> {item.doctor}</p>
              <p><strong>Motivo:</strong> {item.motivo}</p>
              <p><strong>Fecha:</strong> {item.fecha} - {item.hora}</p>
              <div style={{ display: "flex", gap: "10px" }}>
                <Button type="primary" onClick={() => handleAction(item.id, true)}>Aprobar</Button>
                <Button danger onClick={() => handleAction(item.id, false)}>Rechazar</Button>
              </div>
            </Card>
          </motion.div>
        )}
      />
    </div>
  );
}

export default Approvals;
