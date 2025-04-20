import React from 'react'
import { useAuth } from '../../context/AuthContext'

const PacienteDashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>Hola {user?.nombre}</h1>
      <p>Este es tu portal de paciente. Aquí puedes:</p>
      <ul>
        <li>Ver tu historial médico</li>
        <li>Consultar recetas</li>
        <li>Agendar citas</li>
      </ul>
    </div>
  )
}

export default PacienteDashboard
