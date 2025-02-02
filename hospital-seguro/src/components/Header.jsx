import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const role = localStorage.getItem('role');

  return (
    <header className="header">
      <h1>Sistema Integrado</h1>
      <nav>
        <Link to="/" className="header-link">Inicio</Link>
        {!role && <Link to="/login" className="header-link">Login</Link>}
        {role && <Link to="/dashboard" className="header-link">Dashboard</Link>}
      </nav>
    </header>
  );
}

export default Header;
