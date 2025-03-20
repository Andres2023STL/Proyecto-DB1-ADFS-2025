import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Carousel } from 'antd'; 
import '../../assets/home.css';

function Home() {
  // Datos por defecto que siempre estarán visibles en Home.jsx
  const defaultContent = {
    heroTitle: "¡Bienvenido a la Plataforma de Gestión Médica!",
    heroDescription: "Gestiona fácilmente tus servicios médicos, seguros y recetas en un solo lugar.",
    
    // Arreglo de objetos para tus slides
    heroSlides: [
      { src: "/img_medico.jpg", caption: "Atención médica a tú alcance" },
      { src: "/img_asegurado.jpg", caption: "Protección para los asegurados" },
      { src: "/img_receta.jpg", caption: "Recetas a un clic de distancia" }
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
    contactEmail: "contacto@sistemaintegrado.com"
  };

  const [content, setContent] = useState(defaultContent);

  // Cargar datos desde localStorage (si fueron modificados en AdminPanel)
  useEffect(() => {
    const savedContent = JSON.parse(localStorage.getItem('approvedContent'));
    if (savedContent) {
      setContent(prevContent => ({ ...prevContent, ...savedContent }));
    }
  }, []);

  return (
    <div className="home-page">
      
      {/* Sección de bienvenida */}
      <section className="hero">
        <h1 className="hero-title">{content.heroTitle}</h1>
        <p className="hero-description">{content.heroDescription}</p>
        
        {/* Carrusel con bordes redondeados y texto */}
        <div className="hero-carousel-container">
          <Carousel 
            autoplay 
            autoplaySpeed={4500} 
            dots 
            draggable
            className="hero-carousel"
          >
            {content.heroSlides.map((slide, index) => (
              <div className="carousel-slide" key={index}>
                <img 
                  className="carousel-image"
                  src={slide.src} 
                  alt={`Slide-${index}`} 
                />
                {/* Texto superpuesto en la imagen */}
                <div className="carousel-text">
                  {slide.caption}
                </div>
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
            <Card 
              className="service-card"
              bodyStyle={{ padding: '12px' }}
            >
              <Link to="/SubHomeHospital">
                <h3>Módulo Hospital</h3>
                <img src={content.automationIcon} alt="Automatización" className="module-icon" />
                <p>{content.hospitalText}</p>
              </Link>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              className="service-card"
              bodyStyle={{ padding: '12px' }}
            >
              <Link to="/SubHomeSeguro">
                <h3>Módulo Seguro</h3>
                <img src={content.automationIcon} alt="Automatización" className="module-icon" />
                <p>{content.seguroText}</p>
              </Link>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Beneficios del sistema */}
      <section className="benefits">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <Row gutter={[4, 4]} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card 
              className="benefit-card"
              bodyStyle={{ padding: '12px' }}
            >
              <img src={content.automationIcon} alt="Automatización" className="benefit-icon" />
              <h3>Automatización Completa</h3>
              <p>{content.automationText}</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              className="benefit-card"
              bodyStyle={{ padding: '12px' }}
            >
              <img src={content.centralizationIcon} alt="Centralización" className="benefit-icon" />
              <h3>Gestión Centralizada</h3>
              <p>{content.centralizationText}</p>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card 
              className="benefit-card"
              bodyStyle={{ padding: '12px' }}
            >
              <img src={content.usabilityIcon} alt="Interfaz Intuitiva" className="benefit-icon" />
              <h3>Fácil de Usar</h3>
              <p>{content.usabilityText}</p>
            </Card>
          </Col>
        </Row>
      </section>

      {/* Contacto */}
      <section className="contact">
        <h2 className="section-title">Contáctanos</h2>
        <p>
          ¿Tienes dudas? Escríbenos a{' '}
          <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a>
        </p>
      </section>
    </div>
  );
}

export default Home;
