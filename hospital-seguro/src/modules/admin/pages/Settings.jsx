import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Settings.css';

function Settings() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Configuraciones</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>
      <p>Modifica las configuraciones generales del sistema.</p>

      {/* Formulario para modificar configuraciones */}
      <form className="settings-form">
        <label>
          Nombre de la Aplicación:
          <input type="text" placeholder="Nombre de la aplicación" />
        </label>
        <label>
          Correo de Soporte:
          <input type="email" placeholder="Correo de soporte" />
        </label>
        <label>
          Tema:
          <select>
            <option value="light">Claro</option>
            <option value="dark">Oscuro</option>
          </select>
        </label>
        <button type="submit">Guardar Configuraciones</button>
      </form>
    </div>
  );
}

export default Settings;

