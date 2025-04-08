import React from "react";
import { Row, Col, Card } from "antd";
import { motion } from "framer-motion";

function SubHomeSeguro() {
  // Lista de servicios de seguros
  const insuranceServices = [
    { title: "Validación de Cobertura", desc: "Revisa si cada cliente cuenta con una póliza adecuada para su servicio." },
    { title: "Administración de Clientes", desc: "Gestiona información personal, historial de servicios y datos de contacto." },
    { title: "Autorización de Tratamientos", desc: "Aprueba medicamentos y procedimientos con cobertura total o parcial." },
  ];

  // Variantes para la animación con Framer Motion
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="page-container">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Row justify="center" gutter={[32, 32]} style={{ marginBottom: 40 }}>
          <Col xs={24} sm={20} md={16}>
            {/* Card principal para la administración de seguros */}
            <Card style={{ borderRadius: 8 }}>
              <h1 className="card-main-title">Administración de Seguros</h1>
              <p className="card-main-text">
                Consulta la cobertura de servicios, pólizas activas y gestión de clientes asegurados para llevar un mejor control.
              </p>

              <h2 className="card-section-title">Servicios del Seguro</h2>
              <Row gutter={[24, 24]}>
                {insuranceServices.map((service, i) => (
                  <Col xs={24} sm={12} md={8} key={i}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      {/* Card individual para cada servicio */}
                      <Card hoverable style={{ borderRadius: 8, padding: "1rem" }}>
                        <h3 className="card-service-title card-title-blue">
                          {service.title}
                        </h3>
                        <p className="card-service-text">{service.desc}</p>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
}

export default SubHomeSeguro;
