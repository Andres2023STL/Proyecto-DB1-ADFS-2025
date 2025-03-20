import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Carousel } from "antd";
import { motion } from "framer-motion"; 

function Home() {
  // Datos por defecto que siempre estarán visibles en Home.jsx
  const defaultContent = {
    heroTitle: "¡Bienvenido a la Plataforma de Gestión Médica!",
    heroDescription: "Gestiona fácilmente tus servicios médicos, seguros y recetas en un solo lugar.",
    // Arreglo de objetos para tus slides
    heroSlides: [
      { src: "/img_medico.jpg", caption: "Atención médica a tu alcance" },
      { src: "/img_asegurado.jpg", caption: "Protección para los asegurados" },
      { src: "/img_receta.jpg", caption: "Recetas a un clic de distancia" },
    ],
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
    contactEmail: "contacto@sistemaintegrado.com",
  };

  const [content, setContent] = useState(defaultContent);

  // Cargar datos desde localStorage 
  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem("approvedContent"));
    if (savedContent) {
      setContent((prevContent) => ({ ...prevContent, ...savedContent }));
    }
  }, []);

  // Variants para animación del título 
  const heroTitleVariants = {
    hidden: { y: -30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  // Variants para animar las cards 
  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="home-page">
      {/* Sección de bienvenida */}
      <section className="hero">
        {/* Hero Title animado */}
        <motion.h1
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={heroTitleVariants}
          transition={{ duration: 0.8 }}
        >
          {content.heroTitle}
        </motion.h1>

        {/* Hero Description */}
        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {content.heroDescription}
        </motion.p>

        {/* Carrusel */}
        <div className="hero-carousel-container">
          <Carousel autoplay autoplaySpeed={4500} dots draggable className="hero-carousel">
            {content.heroSlides.map((slide, index) => (
              <div className="carousel-slide" key={index}>
                <img className="carousel-image" src={slide.src} alt={`Slide-${index}`} />
                {/* Texto superpuesto en la imagen */}
                <div className="carousel-text">{slide.caption}</div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Módulos del sistema */}
      <section className="services">
        <h2 className="section-title">Nuestros Módulos</h2>
        <Row gutter={[4, 4]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card className="service-card" bodyStyle={{ padding: "12px" }}>
                <Link to="/SubHomeHospital">
                  <h3>Módulo Hospital</h3>
                  <img src={content.automationIcon} alt="Automatización" className="module-icon" />
                  <p>{content.hospitalText}</p>
                </Link>
              </Card>
            </motion.div>
          </Col>

          <Col xs={24} sm={12} md={8}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card className="service-card" bodyStyle={{ padding: "12px" }}>
                <Link to="/SubHomeSeguro">
                  <h3>Módulo Seguro</h3>
                  <img src={content.automationIcon} alt="Automatización" className="module-icon" />
                  <p>{content.seguroText}</p>
                </Link>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </section>

      {/* Beneficios del sistema */}
      <section className="benefits">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <Row gutter={[4, 4]} justify="center">
          {[
            {
              icon: content.automationIcon,
              title: "Automatización Completa",
              desc: content.automationText,
            },
            {
              icon: content.centralizationIcon,
              title: "Gestión Centralizada",
              desc: content.centralizationText,
            },
            {
              icon: content.usabilityIcon,
              title: "Fácil de Usar",
              desc: content.usabilityText,
            },
          ].map((benefit, i) => (
            <Col xs={24} sm={12} md={8} key={i}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
              >
                <Card className="benefit-card" bodyStyle={{ padding: "12px" }}>
                  <img src={benefit.icon} alt={benefit.title} className="benefit-icon" />
                  <h3>{benefit.title}</h3>
                  <p>{benefit.desc}</p>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>

      {/* Contacto */}
      <section className="contact">
        <h2 className="section-title">Contáctanos</h2>
        <p>
          ¿Tienes dudas? Escríbenos a <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
        </p>
      </section>
    </div>
  );
}

export default Home;
