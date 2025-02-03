import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const role = localStorage.getItem('role');

  return (
    <header className="header">
      <h1>Plataforma de Gestión Médica</h1>
      <img src="/home-heart.png" alt="Logo" className='logo'/>
      <nav>
        <Link to="/" className="header-link">Inicio</Link>
        <Link to="/hospital" className="header-link">Hospital</Link>
        <Link to="/seguro" className="header-link">Seguro</Link>
        <Link to="/historia" className="header-link">Historia</Link>
        <Link to="/faq" className="header-link">FAQ</Link>
        <Link to="/contacto" className="header-link">Contacto</Link>
        {!role && <Link to="/login" className="header-link">Login</Link>}
        {role && <Link to="/dashboard" className="header-link">Dashboard</Link>}
      </nav>
    </header>
  );
}

export default Header;
