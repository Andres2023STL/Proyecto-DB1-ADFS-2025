import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Typography } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

function EditarContenido() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="private-page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="private-page-header">
        <Title level={2}>Editar Contenido</Title>
        <Button type="default" onClick={() => navigate(-1)} className="private-back-button">
          ⬅ Regresar
        </Button>
      </div>

      <div className="private-dashboard-container">
        <motion.div whileHover={{ scale: 1.02 }} className="private-dashboard-card">
          <Link to="/admin/adminpanel">
            <Card hoverable className="private-dashboard-card-ant">
              <Title level={4}>Editar Inicio</Title>
              <Paragraph>Modifica la información de la página principal.</Paragraph>
            </Card>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="private-dashboard-card">
          <Link to="/admin/edit/missionVision">
            <Card hoverable className="private-dashboard-card-ant">
              <Title level={4}>Editar Misión y Visión</Title>
              <Paragraph>Actualiza los valores y objetivos de la empresa.</Paragraph>
            </Card>
          </Link>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} className="private-dashboard-card">
          <Link to="/admin/edit/contact">
            <Card hoverable className="private-dashboard-card-ant">
              <Title level={4}>Editar Contacto</Title>
              <Paragraph>Modifica los datos de contacto de la empresa.</Paragraph>
            </Card>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default EditarContenido;
