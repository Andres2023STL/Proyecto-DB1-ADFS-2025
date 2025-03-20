import React from "react";
import { Row, Col, Card, Timeline, Avatar, Divider } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { motion } from "framer-motion"; 

function AboutUs() {
  const timelineEvents = [
    { year: "2010", description: "Fundación y primeros servicios de salud." },
    { year: "2013", description: "Expansión a seguros y atención en línea." },
    { year: "2018", description: "Incorporamos recetas digitales y farmacia online." },
    { year: "2022", description: "Implementamos nuestra plataforma unificada actual." },
  ];

  const teamMembers = [
    { name: "Dra. López", role: "Directora Médica" },
    { name: "Ing. García", role: "CTO" },
    { name: "Lic. Pérez", role: "Gerente de Seguros" },
  ];

  // Variants para el Card principal
  const mainCardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.7 },
    },
  };

  // Variants para los items de la Timeline
  const timelineItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <div className="aboutus-page page-container">
      <Row justify="center" gutter={[16, 16]}>
        <Col xs={24} sm={20} md={16}>
          {/* Card principal */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={mainCardVariants}
          >
            <Card className="aboutus-card">
              <h1 className="section-title">Nuestra Historia</h1>
              <p>
                Desde nuestra fundación, hemos trabajado para ofrecer servicios de salud,
                seguros y farmacia de calidad. Nuestra institución se basa en la integración
                de servicios para garantizar la mejor atención a nuestros clientes.
              </p>

              <Divider />

              <h2 className="section-subtitle">Línea de Tiempo</h2>
              <Timeline mode="left">
                {timelineEvents.map((event, idx) => (
                  <motion.div
                    key={idx}
                    custom={idx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={timelineItemVariants}
                  >
                    <Timeline.Item label={event.year}>
                      {event.description}
                    </Timeline.Item>
                  </motion.div>
                ))}
              </Timeline>

              <Divider />

              <h2 className="section-subtitle">Equipo y Valores</h2>
              <p>
                Nuestro equipo multidisciplinario está comprometido con la innovación y
                la atención personalizada. Los valores que nos guían son la ética, la integridad, 
                y el servicio constante hacia nuestros pacientes.
              </p>

              {/* Pequeña sección de equipo */}
              <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                {teamMembers.map((member, idx) => (
                  <Col xs={24} sm={12} md={8} key={idx}>
                    <motion.div
                      initial={{ y: 30, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.2, duration: 0.7 }}
                    >
                      <Card hoverable>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <h3 style={{ marginTop: 8 }}>{member.name}</h3>
                        <p>{member.role}</p>
                      </Card>
                    </motion.div>
                  </Col>
                ))}
              </Row>

              <Divider />

              <h2 className="section-subtitle">Misión</h2>
              <p>Brindar servicios de salud accesibles, confiables y eficientes.</p>

              <h2 className="section-subtitle">Visión</h2>
              <p>Ser un referente en la integración de servicios de salud y seguros en la región.</p>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
}

export default AboutUs;
