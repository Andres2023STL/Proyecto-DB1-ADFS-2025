import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

/*
  Timeline
  -------
  Muestra una lista vertical de eventos.
  Cada evento incluye año, título y descripción.
 */
const Timeline = ({ events }) => (
  <div className="timeline">
    {events.map((e, idx) => (
      <motion.div
        key={idx}
        className="timeline-event"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: idx * 0.2 }}
      >
        <Row className="mb-4 align-items-start">
          <Col xs={3} className="text-success">
            <strong>{e.year}</strong>
          </Col>
          <Col xs={9}>
            <h5>{e.title}</h5>
            <p>{e.description}</p>
          </Col>
        </Row>
      </motion.div>
    ))}
  </div>
);

export default Timeline;