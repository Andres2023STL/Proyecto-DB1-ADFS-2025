import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { logAuditEvent } from './AuditLogs'; // Importando desde AuditLogs.jsx
import '../../../styles/ModerationPanel.css';

function ModerationPanel() {
  const [pendingChanges, setPendingChanges] = useState(null);
  const [comment, setComment] = useState(""); 
  const [showCommentBox, setShowCommentBox] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedChanges = JSON.parse(localStorage.getItem('pendingChanges'));
    setPendingChanges(storedChanges);
  }, []);

  const handleApprove = () => {
    localStorage.setItem('approvedContent', JSON.stringify(pendingChanges));
    localStorage.removeItem('pendingChanges');
    setPendingChanges(null);

    // 🔹 Registrar evento en la auditoría
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
    localStorage.setItem('draftContent', JSON.stringify(draftContent));
    localStorage.removeItem('pendingChanges');

    // 🔹 Registrar evento en la auditoría
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
      draft_link: "http://localhost:5173/draft"
    };

    emailjs.send("service_id", "template_id", templateParams, "user_api_key")
      .then(() => alert("📩 Correo de rechazo enviado al usuario."));
  };

  return (
    <div className="moderation-panel">
      <h1>Panel de Moderación</h1>
      {!pendingChanges ? <p>No hay cambios pendientes.</p> : (
        <div className="pending-change">
          <h3>Propuesta de cambio</h3>
          <p><strong>Título Principal:</strong> {pendingChanges.heroTitle}</p>
          <p><strong>Descripción:</strong> {pendingChanges.heroDescription}</p>
          <p><strong>Texto Hospital:</strong> {pendingChanges.hospitalText}</p>
          <p><strong>Texto Seguro:</strong> {pendingChanges.seguroText}</p>

          {pendingChanges.heroImage && <img src={pendingChanges.heroImage} alt="Hero Preview" className="preview-image" />}
          {pendingChanges.hospitalIcon && <img src={pendingChanges.hospitalIcon} alt="Hospital Icon Preview" className="preview-icon" />}
          {pendingChanges.seguroIcon && <img src={pendingChanges.seguroIcon} alt="Seguro Icon Preview" className="preview-icon" />}

          {showCommentBox ? (
            <div className="reject-box">
              <textarea 
                className="reject-textarea"
                placeholder="Escribe el motivo del rechazo..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <div className="reject-buttons">
                <button onClick={handleReject} className="reject-confirm-button">❌ Confirmar Rechazo</button>
                <button onClick={handleCancelReject} className="reject-cancel-button">✖ Cancelar Rechazo</button>
              </div>
            </div>
          ) : (
            <>
              <button onClick={handleApprove} className="approve-button">✅ Aprobar</button>
              <button onClick={handleShowRejectBox} className="reject-button">❌ Rechazar</button>
            </>
          )}
        </div>
      )}

      <button onClick={() => navigate(-1)} className="back-button">⬅ Regresar</button>
    </div>
  );
}

export default ModerationPanel;
