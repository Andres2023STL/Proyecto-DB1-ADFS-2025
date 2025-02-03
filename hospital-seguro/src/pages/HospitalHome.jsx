import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HospitalHome.css';  // Import correcto del CSS

function HospitalHome() {
  return (
    <div className="page-container">
      <h1>Servicios del Hospital</h1>
      <p>Gestiona los servicios médicos ofrecidos en nuestro hospital, incluyendo citas, procedimientos y exámenes.</p>

      <h2>Servicios Disponibles</h2>
      <ul className="services-list">
        <li><strong>Consulta Médica:</strong> Atención por especialistas.</li>
        <li><strong>Exámenes de Laboratorio:</strong> Análisis de sangre, orina y otros.</li>
        <li><strong>Cirugías:</strong> Procedimientos quirúrgicos programados.</li>
      </ul>

      <Link to="/hospital/appointments" className="button-link">Agendar una Cita</Link>
    </div>
  );
}

export default HospitalHome;
