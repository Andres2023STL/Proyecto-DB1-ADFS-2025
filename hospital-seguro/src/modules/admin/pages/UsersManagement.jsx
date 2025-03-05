import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/UsersManagement.css';
import { logAuditEvent } from './AuditLogs'; // Importando desde AuditLogs.jsx

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", active: false });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // ✅ Cargar usuarios desde localStorage al montar el componente
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
    setFilteredUsers(storedUsers);
  }, []);

  // ✅ Filtrar usuarios cada vez que cambian los filtros o los usuarios
  useEffect(() => {
    if (users.length === 0) return;

    let filtered = users.filter(user =>
      (searchEmail === "" || user.email.toLowerCase().includes(searchEmail.toLowerCase())) &&
      (searchRole === "" || user.role === searchRole) &&
      (searchDate === "" || (user.createdAt && user.createdAt.startsWith(searchDate)))
    );

    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchEmail, searchRole, searchDate, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // ✅ Manejo del formulario para agregar usuario (solo el Admin debería hacerlo)
  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("⚠ Debes llenar todos los campos.");
      return;
    }

    const newUserEntry = {
      ...newUser,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      active: false, // ✅ Los usuarios nuevos deben ser aprobados por el admin
    };

    const updatedUsers = [...users, newUserEntry];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    // 🔹 Registrar evento en la auditoría
    logAuditEvent("Administrador", "Creación de usuario", `Se creó el usuario ${newUser.email} con rol ${newUser.role}`);

    alert("✅ Usuario agregado correctamente.");
    setNewUser({ name: "", email: "", role: "", active: false });
  };

  // ✅ Activar/desactivar usuario
  const toggleUserStatus = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    const toggledUser = updatedUsers.find(user => user.id === id);
    const status = toggledUser.active ? "activado" : "desactivado";

    // 🔹 Registrar evento en la auditoría
    logAuditEvent("Administrador", "Cambio de estado", `Se ${status} la cuenta de ${toggledUser.email}`);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Usuarios</h1>
        <Link to="/dashboard" className="back-button">← Regresar</Link>
      </div>

      {/* 🔍 Filtros de búsqueda */}
      <div className="filters">
        <input 
          type="text" 
          placeholder="Buscar por correo..." 
          value={searchEmail} 
          onChange={(e) => setSearchEmail(e.target.value)} 
        />
        <select value={searchRole} onChange={(e) => setSearchRole(e.target.value)}>
          <option value="">Todos los roles</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>
        <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} />
      </div>

      {/* 📜 Tabla de usuarios */}
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name || "No asignado"}</td>
                <td>{user.email}</td>
                <td>{user.role || "Sin rol"}</td>
                <td>{user.active ? "🟢 Activo" : "🔴 Inactivo"}</td>
                <td>
                  <button onClick={() => toggleUserStatus(user.id)}>
                    {user.active ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="empty-row">No hay usuarios disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔢 Paginación */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredUsers.length / usersPerPage) }, (_, i) => (
          <button 
            key={i} 
            onClick={() => setCurrentPage(i + 1)} 
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* ➕ Agregar usuario */}
      <h2>Agregar Usuario</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Nombre completo" value={newUser.name} onChange={handleInputChange} />
        <input type="email" name="email" placeholder="Correo electrónico" value={newUser.email} onChange={handleInputChange} />
        <select name="role" value={newUser.role} onChange={handleInputChange}>
          <option value="">Selecciona un rol</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Administrador</option>
          <option value="empleado">Empleado</option>
        </select>
        <button type="submit">Guardar Usuario</button>
      </form>
    </div>
  );
}

export default UsersManagement;
