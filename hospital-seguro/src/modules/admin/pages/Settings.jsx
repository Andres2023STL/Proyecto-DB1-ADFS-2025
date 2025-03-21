import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Typography, Card } from 'antd';
import { motion } from 'framer-motion';

const { Title, Paragraph } = Typography;

function Settings() {
  // Función para manejar el envío del formulario
  const onFinish = (values) => {
    console.log("Configuraciones guardadas:", values);
    alert("Configuraciones guardadas");
  };

  return (
    <motion.div 
      className="private-page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="private-page-header">
        <Title level={2}>Configuraciones</Title>
        <Link to="/admin/admindashboard" className="private-back-button">
          ← Regresar al Dashboard
        </Link>
      </div>
      <Paragraph>
        Modifica las configuraciones generales del sistema.
      </Paragraph>

      <Card className="private-panel" style={{ maxWidth: 600, margin: "0 auto" }}>
        <Form layout="vertical" onFinish={onFinish} className="private-settings-form">
          <Form.Item
            label="Nombre de la Aplicación:"
            name="appName"
            rules={[{ required: true, message: "Ingrese el nombre de la aplicación" }]}
            className="private-form-item"
          >
            <Input placeholder="Nombre de la aplicación" className="private-input" />
          </Form.Item>
          <Form.Item
            label="Correo de Soporte:"
            name="supportEmail"
            rules={[{ required: true, type: "email", message: "Ingrese un correo válido" }]}
            className="private-form-item"
          >
            <Input placeholder="Correo de soporte" className="private-input" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block className="private-btn">
              Guardar Configuraciones
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </motion.div>
  );
}

export default Settings;
