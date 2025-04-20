import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';
import CardsDesplegables from '../../components/reusable/CardsDesplegables';

// Preguntas frecuentes y sus respuestas
const faqs = [
  {
    question: '¿Cómo puedo ver mis citas?',
    answer: 'Puedes ver tu cita ingresando a la sección de portal y seleccionando la fecha de tu cita.',
  },
  {
    question: '¿Qué documentos necesito llevar?',
    answer: 'Debes traer tu identificación oficial, tarjeta de seguro y cualquier estudio previo relevante.',
  },
  {
    question: '¿Tienen atención de urgencias 24/7?',
    answer: 'Sí, nuestro servicio de urgencias opera las 24 horas todos los días del año.',
  },
  {
    question: '¿Puedo ver mis resultados en línea?',
    answer: 'Sí, todos los resultados de estudios se suben a tu perfil en un plazo de 24 horas.',
  },
  {
    question: '¿Cómo puedo pagar mis facturas?',
    answer: 'Aceptamos pagos en efectivo o transferencia bancaria.',
  },
];

/*
 * Página FAQ

 * Muestra preguntas en CardsDesplegables 
 */
const FAQ = () => {
  // Estado para saber qué pregunta está abierta (null = ninguna)
  const [openQ, setOpenQ] = useState(null);

  /**
   * Alterna apertura/cierre de la pregunta seleccionada
   */
  const handleToggle = (question) => {
    setOpenQ(prev => (prev === question ? null : question));
  };

  return (
    <Container className="py-5">
      {/* Título de la sección */}
      <motion.section
        className="text-center mb-5"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-success">Preguntas Frecuentes</h2>
        <p className="lead">Encuentra respuestas a las dudas más comunes</p>
      </motion.section>

      {/* Listado de FAQs en un grid de hasta 3 por fila */}
      <section>
        <Row className="gy-4">
          {faqs.map((faq, idx) => (
            <Col key={idx} xs={12} md={6} lg={4}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                {/* Card desplegable para cada FAQ */}
                <CardsDesplegables
                  category={faq.question}
                  items={[{ title: '', text: faq.answer }]}
                  isOpen={openQ === faq.question}
                  onToggle={handleToggle}
                />
              </motion.div>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
};

export default FAQ;