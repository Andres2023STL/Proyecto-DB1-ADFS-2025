import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Link to="/">CliniSure</Link>
      </div>
      <ul className="navbar__links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/">SubhomeHospital</Link></li>
        <li><Link to="/">SubhomeSeguro</Link></li>
        <li><Link to="/login">Iniciar Sesión</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
