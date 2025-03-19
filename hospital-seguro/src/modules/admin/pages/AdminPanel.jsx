import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function AdminPanel() {
  // Contenido predeterminado del Home
  const defaultContent = {
    heroTitle: "¡Bienvenido a la Plataforma de Gestión Médica!",
    heroDescription: "Gestiona fácilmente tus servicios médicos, seguros y recetas en un solo lugar.",
    heroImage: "/hero-image.png",
    hospitalText: "Consulta, agenda y gestión de servicios médicos.",
    hospitalIcon: "/hospital_icon.png",
    seguroText: "Administra clientes, pólizas y reportes del seguro.",
    seguroIcon: "/seguro_icon.png",
    farmaciaText: "Gestiona recetas médicas y autorizaciones.",
    farmaciaIcon: "/farmacia_icon.png",
    automationText: "Optimiza los procesos de gestión con herramientas digitales.",
    automationIcon: "/robot_1.png",
    centralizationText: "Consulta toda la información en una única plataforma.",
    centralizationIcon: "/centralization_1.png",
    usabilityText: "Navega rápidamente gracias a una interfaz intuitiva.",
    usabilityIcon: "/dispositivos.png",
    contactEmail: "contacto@sistemaintegrado.com"
  };

  const [content, setContent] = useState(defaultContent);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Cargar datos guardados en localStorage
  useEffect(() => {
    const approvedContent = JSON.parse(localStorage.getItem('approvedContent'));
    if (approvedContent) {
      setContent(prevContent => ({ ...prevContent, ...approvedContent }));
    }
  }, []);

  // Manejar cambios en los inputs de texto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  // Manejar la subida de imágenes y convertirlas en base64 para previsualización
  const handleImageUpload = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent(prev => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Guardar cambios pendientes en localStorage
  const handleSubmit = () => {
    localStorage.setItem('pendingChanges', JSON.stringify(content));
    setMessage("✅ Tus cambios han sido enviados para aprobación.");
  };

  // Aprobar cambios y publicarlos en Home.jsx
  const approveChanges = () => {
    const pending = JSON.parse(localStorage.getItem('pendingChanges'));
    if (pending) {
      localStorage.setItem('approvedContent', JSON.stringify(pending));
      setMessage("✅ Cambios aprobados y publicados.");
    } else {
      setMessage("⚠ No hay cambios pendientes.");
    }
  };

  return (
    <div className="admin-panel">
      <h1>Panel de Administración</h1>

      {/* Edición del Título Principal */}
      <label>Título Principal:</label>
      <input type="text" name="heroTitle" value={content.heroTitle} onChange={handleChange} />

      {/* Edición de la Descripción Principal */}
      <label>Descripción Principal:</label>
      <textarea name="heroDescription" value={content.heroDescription} onChange={handleChange}></textarea>

      {/* Edición de los Módulos */}
      <label>Texto Módulo Hospital:</label>
      <input type="text" name="hospitalText" value={content.hospitalText} onChange={handleChange} />

      <label>Texto Módulo Seguro:</label>
      <input type="text" name="seguroText" value={content.seguroText} onChange={handleChange} />

      <label>Texto Módulo Farmacia:</label>
      <input type="text" name="farmaciaText" value={content.farmaciaText} onChange={handleChange} />

      {/* Edición de los Íconos de Hospital y Seguro */}
      <label>Ícono Módulo Hospital:</label>
      <input type="file" name="hospitalIcon" accept="image/*" onChange={handleImageUpload} />
      {content.hospitalIcon && <img src={content.hospitalIcon} alt="Preview" className="preview-icon" />}

      <label>Ícono Módulo Seguro:</label>
      <input type="file" name="seguroIcon" accept="image/*" onChange={handleImageUpload} />
      {content.seguroIcon && <img src={content.seguroIcon} alt="Preview" className="preview-icon" />}

      {/* Íconos extra en Módulos */}
      <label>Ícono Extra en Hospital:</label>
      <input type="file" name="automationIcon" accept="image/*" onChange={handleImageUpload} />
      {content.automationIcon && <img src={content.automationIcon} alt="Preview" className="preview-icon" />}

      <label>Ícono Extra en Seguro:</label>
      <input type="file" name="centralizationIcon" accept="image/*" onChange={handleImageUpload} />
      {content.centralizationIcon && <img src={content.centralizationIcon} alt="Preview" className="preview-icon" />}

      {/* Edición de Beneficios */}
      <label>Ícono Beneficio Automatización:</label>
      <input type="file" name="automationIcon" accept="image/*" onChange={handleImageUpload} />
      {content.automationIcon && <img src={content.automationIcon} alt="Preview" className="preview-icon" />}

      <label>Texto Beneficio Automatización:</label>
      <input type="text" name="automationText" value={content.automationText} onChange={handleChange} />

      <label>Ícono Beneficio Centralización:</label>
      <input type="file" name="centralizationIcon" accept="image/*" onChange={handleImageUpload} />
      {content.centralizationIcon && <img src={content.centralizationIcon} alt="Preview" className="preview-icon" />}

      <label>Texto Beneficio Centralización:</label>
      <input type="text" name="centralizationText" value={content.centralizationText} onChange={handleChange} />

      <label>Ícono Beneficio Facilidad de Uso:</label>
      <input type="file" name="usabilityIcon" accept="image/*" onChange={handleImageUpload} />
      {content.usabilityIcon && <img src={content.usabilityIcon} alt="Preview" className="preview-icon" />}

      <label>Texto Beneficio Facilidad de Uso:</label>
      <input type="text" name="usabilityText" value={content.usabilityText} onChange={handleChange} />

      {/* Edición del Contacto */}
      <label>Correo de Contacto:</label>
      <input type="text" name="contactEmail" value={content.contactEmail} onChange={handleChange} />

      {/* Botones para Guardar y Aprobar Cambios */}
      <button onClick={handleSubmit}>Enviar para Aprobación</button>

      {/* Mensaje de Confirmación */}
      {message && <p className="success-message">{message}</p>}

      {/* Botón para regresar */}
      <button onClick={() => navigate(-1)} className="back-button">⬅ Regresar</button>
    </div>
  );
}

export default AdminPanel;
