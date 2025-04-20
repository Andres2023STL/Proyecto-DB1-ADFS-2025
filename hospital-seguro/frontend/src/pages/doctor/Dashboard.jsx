import React from 'react'
import { useAuth } from '../../context/AuthContext'

const DoctorDashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      <h1>Bienvenido Dr. {user?.nombre}</h1>
      <p>Este es tu panel médico. Aquí puedes:</p>
      <ul>
        <li>Ver tus citas</li>
        <li>Generar recetas</li>
        <li>Comentar en historiales</li>
      </ul>
    </div>
  )
}

export default DoctorDashboard
