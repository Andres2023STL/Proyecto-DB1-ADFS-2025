import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Card, Button, Typography, Input } from "antd";
import { motion } from "framer-motion";
import { logAuditEvent } from "./AuditLogs";

const { Title, Paragraph } = Typography;

function ModerationPanel() {
  const [pendingChanges, setPendingChanges] = useState(null);
  const [comment, setComment] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedChanges = JSON.parse(localStorage.getItem("pendingChanges"));
    setPendingChanges(storedChanges);
  }, []);

  // Aprobar los cambios pendientes
  const handleApprove = () => {
    localStorage.setItem("approvedContent", JSON.stringify(pendingChanges));
    localStorage.removeItem("pendingChanges");
    setPendingChanges(null);
    logAuditEvent("Administrador", "Aprobación de cambios", "Se aprobó un contenido editado.");
    alert("✅ Cambios aprobados y publicados.");
  };

  const handleShowRejectBox = () => {
    setShowCommentBox(true);
  };

  const handleCancelReject = () => {
    setShowCommentBox(false);
    setComment("");
  };

  const handleReject = () => {
    if (!comment.trim()) {
      alert("⚠ Debes escribir un motivo para el rechazo.");
      return;
    }
    const draftContent = { ...pendingChanges, rejectedComment: comment, status: "draft" };
    localStorage.setItem("draftContent", JSON.stringify(draftContent));
    localStorage.removeItem("pendingChanges");
    logAuditEvent("Administrador", "Rechazo de cambios", `Se rechazó un cambio con motivo: ${comment}`);
    alert("❌ Cambios rechazados. Se notificará al usuario con el motivo.");
    sendRejectionEmail(draftContent);
    setPendingChanges(null);
    setComment("");
    setShowCommentBox(false);
  };

  const sendRejectionEmail = (draft) => {
    const templateParams = {
      user_email: "empleado@example.com",
      rejection_reason: draft.rejectedComment,
      draft_link: "http://localhost:5173/draft",
    };

    emailjs
      .send("service_id", "template_id", templateParams, "user_api_key")
      .then(() => alert("📩 Correo de rechazo enviado al usuario."));
  };

  return (
    <motion.div 
      className="private-page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="private-page-header">
        <Title level={2}>Panel de Moderación</Title>
      </div>

      { !pendingChanges ? (
        <Paragraph>No hay cambios pendientes.</Paragraph>
      ) : (
        <Card className="private-panel">
          <Title level={4}>Propuesta de cambio</Title>
          <Paragraph>
            <strong>Título Principal:</strong> {pendingChanges.heroTitle}
          </Paragraph>
          <Paragraph>
            <strong>Descripción:</strong> {pendingChanges.heroDescription}
          </Paragraph>
          <Paragraph>
            <strong>Texto Hospital:</strong> {pendingChanges.hospitalText}
          </Paragraph>
          <Paragraph>
            <strong>Texto Seguro:</strong> {pendingChanges.seguroText}
          </Paragraph>
          {pendingChanges.heroImage && (
            <img src={pendingChanges.heroImage} alt="Hero Preview" className="private-preview-image" />
          )}
          {pendingChanges.hospitalIcon && (
            <img src={pendingChanges.hospitalIcon} alt="Hospital Icon Preview" className="private-preview-icon" />
          )}
          {pendingChanges.seguroIcon && (
            <img src={pendingChanges.seguroIcon} alt="Seguro Icon Preview" className="private-preview-icon" />
          )}
          {showCommentBox ? (
            <div className="private-reject-box">
              <Input.TextArea
                rows={3}
                placeholder="Escribe el motivo del rechazo..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="private-reject-textarea"
              />
              <div className="private-reject-buttons" style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Button onClick={handleReject} className="private-reject-confirm-button" danger>
                  ❌ Confirmar Rechazo
                </Button>
                <Button onClick={handleCancelReject} className="private-reject-cancel-button">
                  ✖ Cancelar Rechazo
                </Button>
              </div>
            </div>
          ) : (
            <div className="private-approval-buttons" style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <Button onClick={handleApprove} className="private-approve-button" type="primary">
                ✅ Aprobar
              </Button>
              <Button onClick={handleShowRejectBox} className="private-reject-button" danger>
                ❌ Rechazar
              </Button>
            </div>
          )}
        </Card>
      )}

      <Button onClick={() => navigate(-1)} className="private-back-button" style={{ marginTop: "20px" }}>
        ⬅ Regresar
      </Button>
    </motion.div>
  );
}

export default ModerationPanel;
