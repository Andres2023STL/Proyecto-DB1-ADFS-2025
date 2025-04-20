import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // 🎯 Ruta dinámica según el rol
  const goToDashboard = () => {
    const dashboards = {
      admin: '/dashboard/admin',
      doctor: '/dashboard/doctor',
      paciente: '/dashboard/paciente',
      empleado: '/dashboard/empleado'
    }
    navigate(dashboards[user.rol] || '/unauthorized')
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">CliniSure</Link>
      </div>

      <ul className="navbar__links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/">SubhomeHospital</Link></li>
        <li><Link to="/">SubhomeSeguro</Link></li>

        {user ? (
          <>
            <li><span>👤 {user.nombre} ({user.rol})</span></li>
            <li>
              <button onClick={goToDashboard} className="navbar__button">
                Ir al Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={async () => {
                  await logout()
                  navigate('/login')
                }}
                className="navbar__button"
              >
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Iniciar Sesión</Link></li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
