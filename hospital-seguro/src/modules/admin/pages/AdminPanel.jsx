import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

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

  // Se carga el contenido aprobado desde localStorage, si existe
  useEffect(() => {
    const approvedContent = JSON.parse(localStorage.getItem('approvedContent'));
    if (approvedContent) {
      setContent(prevContent => ({ ...prevContent, ...approvedContent }));
    }
  }, []);

  // Actualiza los campos de texto conforme el usuario edita el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContent(prev => ({ ...prev, [name]: value }));
  };

  // Función para procesar la imagen y convertirla a base64
  const customUpload = (file, fieldName) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setContent(prev => ({ ...prev, [fieldName]: reader.result }));
    };
    reader.readAsDataURL(file);
    return false; // Evita la carga automática
  };

  // Guarda los cambios pendientes en localStorage
  const handleSubmit = () => {
    localStorage.setItem('pendingChanges', JSON.stringify(content));
    setMessage("✅ Tus cambios han sido enviados para aprobación.");
  };

  // Publica los cambios aprobados para que se reflejen en Home.jsx
  const approveChanges = () => {
    const pending = JSON.parse(localStorage.getItem('pendingChanges'));
    if (pending) {
      localStorage.setItem('approvedContent', JSON.stringify(pending));
      setMessage("✅ Cambios aprobados y publicados.");
    } else {
      setMessage("⚠ No hay cambios pendientes.");
    }
  };

  // Variantes de animación para la entrada del panel
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="admin-panel">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Card title="Panel de Administración" className="admin-card">
          <Form layout="vertical" className="admin-form">
            <Form.Item label="Título Principal">
              <Input name="heroTitle" value={content.heroTitle} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Descripción Principal">
              <Input.TextArea
                name="heroDescription"
                value={content.heroDescription}
                onChange={handleChange}
                rows={4}
              />
            </Form.Item>
            <Form.Item label="Texto Módulo Hospital">
              <Input name="hospitalText" value={content.hospitalText} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Texto Módulo Seguro">
              <Input name="seguroText" value={content.seguroText} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Texto Módulo Farmacia">
              <Input name="farmaciaText" value={content.farmaciaText} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Ícono Módulo Hospital">
              <Upload
                beforeUpload={(file) => customUpload(file, 'hospitalIcon')}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
              </Upload>
              {content.hospitalIcon && (
                <img src={content.hospitalIcon} alt="Preview" className="preview-icon" />
              )}
            </Form.Item>
            <Form.Item label="Ícono Módulo Seguro">
              <Upload
                beforeUpload={(file) => customUpload(file, 'seguroIcon')}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
              </Upload>
              {content.seguroIcon && (
                <img src={content.seguroIcon} alt="Preview" className="preview-icon" />
              )}
            </Form.Item>
            <Form.Item label="Ícono Extra en Hospital">
              <Upload
                beforeUpload={(file) => customUpload(file, 'automationIcon')}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
              </Upload>
              {content.automationIcon && (
                <img src={content.automationIcon} alt="Preview" className="preview-icon" />
              )}
            </Form.Item>
            <Form.Item label="Ícono Extra en Seguro">
              <Upload
                beforeUpload={(file) => customUpload(file, 'centralizationIcon')}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
              </Upload>
              {content.centralizationIcon && (
                <img src={content.centralizationIcon} alt="Preview" className="preview-icon" />
              )}
            </Form.Item>
            <Form.Item label="Texto Beneficio Automatización">
              <Input name="automationText" value={content.automationText} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Ícono Beneficio Centralización">
              <Upload
                beforeUpload={(file) => customUpload(file, 'centralizationIcon')}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
              </Upload>
              {content.centralizationIcon && (
                <img src={content.centralizationIcon} alt="Preview" className="preview-icon" />
              )}
            </Form.Item>
            <Form.Item label="Texto Beneficio Centralización">
              <Input name="centralizationText" value={content.centralizationText} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Ícono Beneficio Facilidad de Uso">
              <Upload
                beforeUpload={(file) => customUpload(file, 'usabilityIcon')}
                showUploadList={false}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Subir Imagen</Button>
              </Upload>
              {content.usabilityIcon && (
                <img src={content.usabilityIcon} alt="Preview" className="preview-icon" />
              )}
            </Form.Item>
            <Form.Item label="Texto Beneficio Facilidad de Uso">
              <Input name="usabilityText" value={content.usabilityText} onChange={handleChange} />
            </Form.Item>
            <Form.Item label="Correo de Contacto">
              <Input name="contactEmail" value={content.contactEmail} onChange={handleChange} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleSubmit} style={{ marginRight: '10px' }}>
                Enviar para Aprobación
              </Button>
              <Button onClick={approveChanges} style={{ marginRight: '10px' }}>
                Aprobar Cambios
              </Button>
              <Button onClick={() => navigate(-1)} className="back-button">
                ⬅ Regresar
              </Button>
            </Form.Item>
            {message && <p className="success-message">{message}</p>}
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}

export default AdminPanel;
