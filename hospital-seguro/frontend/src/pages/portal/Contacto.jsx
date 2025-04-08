import React from "react";
import { Row, Col, Card, Form, Input, Button } from "antd";
import { motion } from "framer-motion"; 

function Contacto() {
  // Variants de framer-motion para el contenedor y los campos
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };


  const onFinish = (values) => {
    alert(`Mensaje enviado por: ${values.nombre} (${values.email})`);
  };

  return (
    <div className="page-container contact-page">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={12}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Card de AntD para enmarcar el formulario */}
            <Card style={{ borderRadius: "8px" }}>
              <h1 className="section-title" style={{ textAlign: "center" }}>
                Contáctanos
              </h1>
              <p className="contact-info" style={{ marginBottom: "20px" }}>
                Estamos aquí para ayudarte. Completa el formulario o envíanos un correo a{" "}
                <a href="mailto:soporte@sistemaintegrado.com">soporte@sistemaintegrado.com</a>.
              </p>

              {/* Formulario */}
              <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                  label="Nombre"
                  name="nombre"
                  rules={[{ required: true, message: "Por favor ingresa tu nombre" }]}
                >
                  <Input placeholder="Tu nombre" />
                </Form.Item>

                <Form.Item
                  label="Correo Electrónico"
                  name="email"
                  rules={[
                    { required: true, message: "Por favor ingresa tu correo" },
                    { type: "email", message: "Formato de correo inválido" },
                  ]}
                >
                  <Input placeholder="Tu correo electrónico" />
                </Form.Item>

                <Form.Item
                  label="Mensaje"
                  name="mensaje"
                  rules={[{ required: true, message: "Por favor ingresa tu mensaje" }]}
                >
                  <Input.TextArea rows={4} placeholder="Escribe tu mensaje aquí..." />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}

export default Contacto;
