import React from "react";
import { Row, Col, Card } from "antd";
import { motion } from "framer-motion";

function SubHomeHospital() {
  // Lista de servicios del hospital
  const hospitalServices = [
    { title: "Consulta Médica", desc: "Atención por especialistas." },
    { title: "Exámenes de Laboratorio", desc: "Análisis de sangre, orina y otros." },
    { title: "Cirugías", desc: "Procedimientos quirúrgicos programados." },
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
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={20} md={16}>
            {/* Card principal para los servicios del hospital */}
            <Card style={{ borderRadius: 8 }}>
              <h1 className="card-main-title">Servicios del Hospital</h1>
              <p className="card-main-text">
                Gestiona los servicios médicos ofrecidos en nuestro hospital, incluyendo citas, procedimientos y exámenes.
              </p>
              <h2 className="card-section-title">Servicios Disponibles</h2>
              <Row gutter={[16, 16]}>
                {hospitalServices.map((service, i) => (
                  <Col xs={24} sm={12} md={8} key={i}>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      {/* Card individual para cada servicio */}
                      <Card hoverable style={{ borderRadius: 8 }}>
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

export default SubHomeHospital;
