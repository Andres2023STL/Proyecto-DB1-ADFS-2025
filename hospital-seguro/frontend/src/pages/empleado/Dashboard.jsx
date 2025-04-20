import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const EmpleadoDashboard = () => {
  const { user } = useAuth()

  if (!user) return null

  const esAdmin = user.rol === 'admin'

  // Si es admin, le damos opción de ver hospital o seguro
  const [modoAdmin, setModoAdmin] = useState('hospital') // valor inicial

  const tipo = esAdmin ? modoAdmin : user.tipo_empleado

  return (
    <div>
      <h1>Bienvenido {user.nombre}</h1>

      {esAdmin && (
        <div style={{ marginBottom: '1rem', padding: '0.5rem', border: '1px dashed gray' }}>
          <p style={{ fontStyle: 'italic', marginBottom: '0.5rem' }}>
            Estás en vista de empleado como administrador. Selecciona el módulo a visualizar:
          </p>
          <select value={modoAdmin} onChange={e => setModoAdmin(e.target.value)}>
            <option value="hospital">Hospital</option>
            <option value="seguro">Seguro</option>
          </select>
        </div>
      )}

      {tipo === 'hospital' && (
        <>
          <h3>🏥 Funciones del Hospital:</h3>
          <ul>
            <li>Gestionar agenda hospitalaria</li>
            <li>Acceder a pacientes</li>
            <li>Ver historial médico</li>
          </ul>
        </>
      )}

      {tipo === 'seguro' && (
        <>
          <h3>🛡️ Funciones del Seguro:</h3>
          <ul>
            <li>Revisar aprobaciones</li>
            <li>Editar contenido informativo</li>
            <li>Administrar reportes del seguro</li>
          </ul>
        </>
      )}
    </div>
  )
}

export default EmpleadoDashboard
