import React from 'react';
import { Container } from 'react-bootstrap';
import Timeline from '../../components/reusable/Timeline';
import Carrusel2 from '../../components/reusable/Carrusel2';
import { motion } from 'framer-motion';

const events = [
  { year: '2000', title: 'Fundación', description: 'Se inaugura el Hospital CliniSure, ofreciendo atención primaria de calidad.' },
  { year: '2005', title: 'Expansión Pediátrica', description: 'Se abre un nuevo ala de Pediatría con 50 camas adicionales.' },
  { year: '2010', title: 'Digitalización', description: 'Implementación de historias clínicas electrónicas en todo el hospital.' },
  { year: '2020', title: 'Lanzamiento de CliniSure Platform', description: 'Presentación de la plataforma integral médico-seguro para usuarios y profesionales.' }
];

const feedback = [
  { quote: 'Excelente atención y profesionalismo en todo momento.', author: 'Juan Pérez' },
  { quote: 'El personal me hizo sentir muy cuidado y seguro.', author: 'María Gómez' },
  { quote: 'La plataforma es intuitiva y facilita mis trámites.', author: 'Carlos López' }
];

/**
 * Página de Historia
 * 
 * Combina Timeline y Carrusel de testimonios
 */
const Historia = () => (
  <Container className="py-5">
    {/* Título animado */}
    <motion.section
      className="text-center mb-5"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-success">Nuestra Historia</h2>
      <p className="lead">Recorrido por los hitos más importantes de nuestra institución.</p>
    </motion.section>

    {/* Timeline de eventos */}
    <section className="mb-5">
      <Timeline events={events} />
    </section>

    {/* Carrusel de testimonios */}
    <section className="text-center mb-5">
      <h3 className="text-success mb-4">Testimonios de Pacientes</h3>
      <Carrusel2 feedback={feedback} />
    </section>
  </Container>
);

export default Historia;
