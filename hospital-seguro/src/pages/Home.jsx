import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  // Datos por defecto que siempre estarán visibles en Home.jsx
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
        <img src={content.heroImage} alt="Plataforma" className="hero-image" />
      </section>

      {/* Módulos del sistema */}
      <section className="services">
        <h2 className="section-title">Nuestros Módulos prueba xdd</h2>
        <div className="service-cards">
          <Link to="/hospital" className="service-card">
            <h3>Módulo Hospital</h3>
            <img src={content.automationIcon} alt="Automatización" className="module-icon" />
            <p>{content.hospitalText}</p>
          </Link>

          <Link to="/seguro" className="service-card">
            <h3>Módulo Seguro</h3>
            <img src={content.automationIcon} alt="Automatización" className="module-icon" />
            <p>{content.seguroText}</p>
          </Link>
        </div>
      </section>

      {/* Beneficios del sistema */}
      <section className="benefits">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="benefit-cards">
          <div className="benefit-card">
            <img src={content.automationIcon} alt="Automatización" className="benefit-icon" />
            <h3>Automatización Completa</h3>
            <p>{content.automationText}</p>
          </div>
          <div className="benefit-card">
            <img src={content.centralizationIcon} alt="Centralización" className="benefit-icon" />
            <h3>Gestión Centralizada</h3>
            <p>{content.centralizationText}</p>
          </div>
          <div className="benefit-card">
            <img src={content.usabilityIcon} alt="Interfaz Intuitiva" className="benefit-icon" />
            <h3>Fácil de Usar</h3>
            <p>{content.usabilityText}</p>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="contact">
        <h2 className="section-title">Contáctanos</h2>
        <p>¿Tienes dudas? Escríbenos a <a href={`mailto:${content.contactEmail}`}>{content.contactEmail}</a></p>
      </section>
    </div>
  );
}

export default Home;
