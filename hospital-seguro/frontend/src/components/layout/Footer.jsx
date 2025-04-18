import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-success text-white py-4 footer">
    <Container>
      <Row className="align-items-center">
        <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
          <p className="mb-0">© 2025 CliniSure. Todos los derechos reservados.</p>
        </Col>
        <Col md={6} className="text-center text-md-end">
          <a href="mailto:contacto@clinisure.com" className="footer-link me-3">
            contacto@clinisure.com
          </a>
          <a href="tel:+50212345678" className="footer-link">
            +502 1234 5678
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
