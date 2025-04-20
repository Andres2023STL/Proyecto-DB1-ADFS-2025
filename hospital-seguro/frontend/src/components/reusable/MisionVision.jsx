import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

/**
 * Componente reutilizable para las secciones de Misión y Visión.
 * @param {string} mission - Texto de la misión.
 * @param {string} vision  - Texto de la visión.
 */
const MisionVision = ({ mission, vision }) => (
  <section className="py-5">
    <Row>
      <Col md={6} className="text-center mb-4 mb-md-0">
        <h3 className="text-success">Misión</h3>
        <p>{mission}</p>
      </Col>
      <Col md={6} className="text-center">
        <h3 className="text-success">Visión</h3>
        <p>{vision}</p>
      </Col>
    </Row>
  </section>
);

MisionVision.propTypes = {
  mission: PropTypes.string.isRequired,
  vision: PropTypes.string.isRequired,
};

export default MisionVision;