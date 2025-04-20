// src/pages/admin/Dashboard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AdminDashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>Bienvenido, {user?.nombre}</h1>
      <p>Este es el panel de administración.</p>

      <ul>
        <li><Link to="/dashboard/admin/usuarios">🔧 Gestionar usuarios</Link></li>
        <li><Link to="/dashboard/doctor">🩺 Ver dashboard de doctor</Link></li>
        <li><Link to="/dashboard/empleado">🏥 Ver dashboard de empleado</Link></li>
        <li><Link to="/dashboard/paciente">🧑‍⚕️ Ver dashboard de paciente</Link></li>
      </ul>

      <hr />

      <p style={{ fontStyle: 'italic', color: 'gray' }}>
        Accesos solo disponibles para administrador con override activo.
      </p>
    </div>
  )
}

export default AdminDashboard
