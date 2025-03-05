import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function DraftEditor() {
  const [draftContent, setDraftContent] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedDraft = JSON.parse(localStorage.getItem('draftContent'));
    if (storedDraft) {
      setDraftContent(storedDraft);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDraftContent(prev => ({ ...prev, [name]: value }));
  };

  const handleResubmit = () => {
    if (!draftContent) return;
    
    localStorage.setItem('pendingChanges', JSON.stringify(draftContent));
    localStorage.removeItem('draftContent');
    setMessage("✅ Tu contenido ha sido enviado nuevamente para moderación.");
  };

  return (
    <div className="draft-editor">
      <h1>Edición de Contenido Rechazado</h1>
      
      {draftContent ? (
        <>
          <p><strong>Motivo del rechazo:</strong> {draftContent.rejectedComment}</p>

          <label>Título Principal:</label>
          <input type="text" name="heroTitle" value={draftContent.heroTitle} onChange={handleChange} />

          <label>Descripción Principal:</label>
          <textarea name="heroDescription" value={draftContent.heroDescription} onChange={handleChange}></textarea>

          <label>Texto Módulo Hospital:</label>
          <input type="text" name="hospitalText" value={draftContent.hospitalText} onChange={handleChange} />

          <label>Texto Módulo Seguro:</label>
          <input type="text" name="seguroText" value={draftContent.seguroText} onChange={handleChange} />

          <button onClick={handleResubmit}>Enviar nuevamente</button>

          {message && <p className="success-message">{message}</p>}
        </>
      ) : (
        <p>No tienes contenido en borrador.</p>
      )}

      <button onClick={() => navigate(-1)} className="back-button">⬅ Regresar</button>
    </div>
  );
}

export default DraftEditor;
