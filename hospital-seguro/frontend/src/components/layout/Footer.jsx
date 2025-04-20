import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import facebookIcon from '../../assets/public/images/facebook.png';
import instagramIcon from '../../assets/public/images/instagram.png';
import xIcon from '../../assets/public/images/x.png';

const Footer = () => (
  <footer className="bg-success text-white py-4">
    <Container>
      <Row className="align-items-center">
        {/* Copyright */}
        <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
          <small>© 2025 CliniSure. Todos los derechos reservados.</small>
        </Col>

        {/* Contact Info */}
        <Col md={4} className="text-center mb-3 mb-md-0">
          <small>
            Disponibles de 8 AM a 5 PM |{' '}
            <b>
            <a href="mailto:sistemahospital7@gmail.com" className="footer-link">
              sistemahospital7@gmail.com
            </a>
            </b>
          </small>
        </Col>

        {/* Social Icons */}
        <Col md={4} className="text-center text-md-end">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="me-3">
            <img src={facebookIcon} alt="Facebook" width="24" height="24" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="me-3">
            <img src={instagramIcon} alt="Instagram" width="24" height="24" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <img src={xIcon} alt="Twitter" width="24" height="24" />
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
