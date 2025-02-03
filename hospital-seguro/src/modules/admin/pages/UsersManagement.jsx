import React from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/UsersManagement.css';

function UsersManagement() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>
      <p>Administra los usuarios del sistema.</p>

      {/* Tabla para mostrar usuarios */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se rellenarán las filas desde el backend */}
          <tr>
            <td colSpan="5" className="empty-row">No hay usuarios disponibles.</td>
          </tr>
        </tbody>
      </table>

      {/* Formulario para agregar o editar usuarios */}
      <h2>Agregar/Editar Usuario</h2>
      <form className="user-form">
        <label>
          Nombre:
          <input type="text" placeholder="Nombre completo" />
        </label>
        <label>
          Correo:
          <input type="email" placeholder="Correo electrónico" />
        </label>
        <label>
          Rol:
          <select>
            <option value="doctor">Doctor</option>
            <option value="admin">Administrador</option>
            <option value="empleado">Empleado</option>
          </select>
        </label>
        <button type="submit">Guardar Usuario</button>
      </form>
    </div>
  );
}

export default UsersManagement;