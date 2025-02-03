import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-page">
      {/* Sección de bienvenida */}
      <section className="hero">
        <h1 className="hero-title">¡Bienvenido al Sistema Integrado de Gestión!</h1>
        <p className="hero-description">
          Gestiona fácilmente tus servicios médicos, seguros y recetas en un solo lugar.
        </p>
        <img src="/assets/hero-image.jpg" alt="Sistema Integrado" className="hero-image" />
      </section>

      {/* Módulos del sistema */}
      <section className="services">
        <h2 className="section-title">Nuestros Módulos</h2>
        <div className="service-cards">
          <Link to="/hospital" className="service-card">
            <h3>Módulo Hospital</h3>
            <p>Consulta, agenda y gestión de servicios médicos.</p>
          </Link>
          <Link to="/seguro" className="service-card">
            <h3>Módulo Seguro</h3>
            <p>Administra clientes, pólizas y reportes del seguro.</p>
          </Link>
          <Link to="/farmacia" className="service-card">
            <h3>Módulo Farmacia</h3>
            <p>Gestiona recetas médicas y autorizaciones.</p>
          </Link>
        </div>
      </section>

      {/* Beneficios del sistema */}
      <section className="benefits">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="benefit-cards">
          <div className="benefit-card">
            <img src="/assets/icon-automation.png" alt="Automatización" className="benefit-icon" />
            <h3>Automatización Completa</h3>
            <p>Optimiza los procesos de gestión con herramientas digitales.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icon-centralized.png" alt="Centralización" className="benefit-icon" />
            <h3>Gestión Centralizada</h3>
            <p>Consulta toda la información en una única plataforma.</p>
          </div>
          <div className="benefit-card">
            <img src="/assets/icon-intuitive.png" alt="Interfaz Intuitiva" className="benefit-icon" />
            <h3>Fácil de Usar</h3>
            <p>Navega rápidamente gracias a una interfaz intuitiva.</p>
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
