import React from 'react';
import { Container } from 'react-bootstrap';

const Header = () => (
  <header className="bg-success text-white py-5 mb-5">
    <Container className="text-center">
      <h1 className="display-4 fw-bold mb-3">Bienvenido a CliniSure</h1>
      <p className="lead">Integrando Salud y Seguro en un solo sistema.</p>
    </Container>
  </header>
);

export default Header;