// src/pages/portal/home/SubHomeHospital.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Collapse } from 'react-bootstrap';
import ListaTarjetas from '../../../components/reusable/ListaTarjetas';
import MisionVision from '../../../components/reusable/MisionVision';
import CardsDesplegables from '../../../components/reusable/CardsDesplegables';


// Imágenes de categorías (provisorias, se usan las del carrusel)
import img1 from '../../../assets/public/images/img_asegurado.jpg';
import img2 from '../../../assets/public/images/img_medico.jpg';
import img3 from '../../../assets/public/images/img_receta.jpg';

// Mapeo de categoría a su imagen correspondiente
const categoryImages = {
  'Consulta Médica': img1,
  'Examen de Laboratorio': img2,
  'Cirugía': img3,
};

// Ejemplo de servicios
const servicios = [
  { id_servicio: 1, category: 'Consulta Médica', subcategory: 'Pediatra' },
  { id_servicio: 2, category: 'Examen de Laboratorio', subcategory: 'Sangre' },
  { id_servicio: 3, category: 'Cirugía', subcategory: 'Extirpar Vesícula' },
  { id_servicio: 4, category: 'Consulta Médica', subcategory: 'General' },
  { id_servicio: 5, category: 'Examen de Laboratorio', subcategory: 'Orina' },
];

// Planes futuros para ListaTarjetas
const planesFuturos = [
  {
    title: 'Telemedicina',
    text: 'Implementar consultas virtuales para pacientes en zonas remotas.',
  },
  {
    title: 'Integración de Farmacia',
    text: 'Gestión de recetas electrónicas y control de stock en tiempo real.',
  },
  {
    title: 'Chat de Soporte 24/7',
    text: 'Asistencia inmediata a pacientes y familiares en línea.',
  },
];

const SubHomeHospital = () => {
  // Estado que indica qué categoría está actualmente expandida (null = ninguna)
  const [openCategory, setOpenCategory] = useState(null);

  /** Agrupa servicios por categoría */
  const serviciosPorCategoria = servicios.reduce((acc, svc) => {
    if (!acc[svc.category]) acc[svc.category] = [];
    acc[svc.category].push({ title: svc.subcategory, text: '' });
    return acc;
  }, {});

  /** Alterna apertura/cierre de la categoría clicada */
  const handleToggle = (category) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <Container className="py-5">
      {/* Sección de Título y Descripción de Servicios */}
      <section className="py-5 text-center">
        <h2 className="text-success">Servicios</h2>
        <p className="lead">Los servicios que ofrecemos</p>
      </section>

      {/* Sección de Cards desplegables por categoría (máx 3 por fila) */}
      <section className="py-5">
      <Row className="gy-4">
          {Object.entries(serviciosPorCategoria).map(([category, items]) => (
            <Col key={category} xs={12} md={6} lg={4}>
              <CardsDesplegables
                category={category}
                items={items}
                image={categoryImages[category]}
                isOpen={openCategory === category}
                onToggle={handleToggle}
              />
            </Col>
          ))}
        </Row>
      </section>

      {/* Sección de Misión y Visión del Hospital */}
      <MisionVision
        mission="Brindar atención médica de calidad, accesible y humanizada, enfocada en la prevención y el bienestar de nuestros pacientes y sus familias."
        vision="Ser el hospital de referencia en la región, reconocido por nuestra excelencia clínica, innovación y compromiso con la salud integral."
      />

      {/* Sección de Planes Futuros */}
      <section className="py-5">
        <h3 className="text-center text-success mb-4">Planes Futuros</h3>
        <ListaTarjetas items={planesFuturos} />
      </section>

      {/* Sección de Contacto del Hospital */}
      <section className="py-5">
        <h3 className="text-center text-success mb-4">Contacto</h3>
        <Row className="justify-content-center">
          <Col md={4} className="text-center">
            <p className="mb-1"><strong>Dirección:</strong> Avenida Salud 456, Zona 2, Guatemala</p>
            <p className="mb-1"><strong>Teléfono:</strong> +502 2233 4455</p>
            <p className="mb-0"><strong>Email:</strong> contacto@hospitalclinisure.com</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default SubHomeHospital;
