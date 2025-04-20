import React from 'react';
import { Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';

/* Carrusel de frases cortas de pacientes */
const Carrusel2 = ({ feedback }) => (
  <Carousel variant="dark" indicators={false}>
    {feedback.map((t, idx) => (
      <Carousel.Item key={idx}>
        <motion.blockquote
          className="blockquote text-center mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: idx * 0.3 }}
        >
          <p className="mb-3">“{t.quote}”</p>
          <footer className="blockquote-footer text-muted">{t.author}</footer>
        </motion.blockquote>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default Carrusel2;