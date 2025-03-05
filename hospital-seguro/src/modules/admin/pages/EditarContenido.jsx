import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../../styles/EditarContenido.css";

function EditarContenido() {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>Editar Contenido</h1>
      
      {/* Botón de Regreso */}
      <button className="back-button" onClick={() => navigate(-1)}>
        ⬅ Regresar
      </button>

      <div className="dashboard-cards">
        <Link to="/adminpanel" className="dashboard-card">
          <h3>Editar Inicio</h3>
          <p>Modifica la información de la página principal.</p>
        </Link>
        <Link to="/admin/edit/missionVision" className="dashboard-card">
          <h3>Editar Misión y Visión</h3>
          <p>Actualiza los valores y objetivos de la empresa.</p>
        </Link>
        <Link to="/admin/edit/contact" className="dashboard-card">
          <h3>Editar Contacto</h3>
          <p>Modifica los datos de contacto de la empresa.</p>
        </Link>
      </div>
    </div>
  );
}

export default EditarContenido;
