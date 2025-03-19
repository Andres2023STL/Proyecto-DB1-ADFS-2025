import React from 'react';
import { Link } from 'react-router-dom';

function SubHomeSeguro() {
  return (
    <div className="page-container">
      <h1>Administración de Seguros</h1>
      <p>Consulta la cobertura de servicios, pólizas activas y gestión de clientes asegurados.</p>

      <h2>Servicios del Seguro</h2>
      <ul className="services-list">
        <li><strong>Validación de Cobertura:</strong> Verifica si un cliente tiene cobertura para un servicio.</li>
        <li><strong>Administración de Clientes:</strong> Gestión de información personal, historial de servicios y pólizas.</li>
        <li><strong>Autorización de Tratamientos:</strong> Aprobación de medicamentos y procedimientos médicos.</li>
      </ul>
    </div>
  );
}

export default SubHomeSeguro;
