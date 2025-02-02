import React from 'react';
import '../styles/Home.css';  // Estilos mejorados

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">Bienvenido al Sistema Integrado</h1>
        <p className="hero-description">
          Gestiona fácilmente tus servicios médicos y seguros en una sola plataforma.
        </p>
        <img src="/assets/hero-image.jpg" alt="Servicios Integrados" className="hero-image" />
      </section>

      {/* Servicios Disponibles */}
      <section className="services">
        <h2 className="section-title">Nuestros Servicios</h2>
        <div className="service-cards">
          <div className="service-card">
            <h3>Módulo Hospital</h3>
            <p>Gestiona las citas, pacientes y servicios médicos.</p>
          </div>
          <div className="service-card">
            <h3>Módulo Seguro</h3>
            <p>Administra las pólizas, clientes y reportes del seguro.</p>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="benefits">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="benefit-cards">
          <div className="benefit-card">
            <img src="/assets/icon-automation.png" alt="Automatización" className="benefit-icon" />
            <h3>Automatización Completa</h3>
            <p>Optimiza los procesos médicos con herramientas digitales.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icon-centralized.png" alt="Gestión Centralizada" className="benefit-icon" />
            <h3>Gestión Centralizada</h3>
            <p>Consulta toda la información desde un solo lugar.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icon-easy.png" alt="Fácil de Usar" className="benefit-icon" />
            <h3>Interfaz Intuitiva</h3>
            <p>Navega de manera rápida y sencilla por la plataforma.</p>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="contact">
        <h2 className="section-title">Contáctanos</h2>
        <p>¿Tienes dudas? Escríbenos a <a href="mailto:contacto@sistemaintegrado.com">contacto@sistemaintegrado.com</a></p>
      </section>
    </div>
  );
}

export default Home;
