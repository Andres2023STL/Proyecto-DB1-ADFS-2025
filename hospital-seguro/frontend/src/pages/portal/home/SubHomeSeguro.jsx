import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CardsDesplegables from '../../../components/reusable/CardsDesplegables';
import MisionVision from '../../../components/reusable/MisionVision';
import ListaTarjetas from '../../../components/reusable/ListaTarjetas';

import img1 from '../../../assets/public/images/img_asegurado.jpg';
import img2 from '../../../assets/public/images/img_medico.jpg';
import img3 from '../../../assets/public/images/img_receta.jpg';

const convenios = [
  {
    insurer: 'Aseguradora Vida',
    services: [
      { name: 'Consulta Médica', price: 150 },
      { name: 'Examen de Sangre', price: 50 },
    ],
  },
  {
    insurer: 'Seguros Salud',
    services: [
      { name: 'Consulta Médica', price: 180 },
      { name: 'Cirugía', price: 5000 },
    ],
  },
  {
    insurer: 'Cobertura Plus',
    services: [
      { name: 'Consulta General', price: 200 },
      { name: 'Examen de Orina', price: 70 },
    ],
  },
];

// Map de cada aseguradora a su imagen correspondiente
const insurerImages = {
  'Aseguradora Vida': img1,
  'Seguros Salud': img2,
  'Cobertura Plus': img3,
};

// Planes futuros de ejemplo
const planesFuturos = [
  { title: 'Telemedicina', text: 'Implementar consultas virtuales para pacientes en zonas remotas.' },
  { title: 'Integración de Farmacia', text: 'Gestión de recetas electrónicas y control de stock en tiempo real.' },
  { title: 'Chat de Soporte 24/7', text: 'Asistencia inmediata a pacientes y familiares en línea.' },
];

const SubHomeSeguro = () => {
  // Estado que indica qué convenio está abierto (null = ninguno)
  const [openInsurer, setOpenInsurer] = useState(null);

  /**
   * Alterna la apertura de un convenio:
   * si ya estaba abierto, lo cierra; de lo contrario lo abre.
   */
  const handleToggle = (insurer) => {
    setOpenInsurer(prev => (prev === insurer ? null : insurer));
  };

  return (
    <Container className="py-5">
      {/* Sección de Título y Descripción de Convenios */}
      <section className="py-5 text-center">
        <h2 className="text-success">Convenios</h2>
        <p className="lead">Nuestros acuerdos con aseguradoras y servicios incluidos</p>
      </section>

      {/* Sección de CardsDesplegables para cada convenio */}
      <section className="py-5">
        <Row className="gy-4">
          {convenios.map(({ insurer, services }) => {
            // Transformar servicios a formato para ListaTarjetas
            const items = services.map(svc => ({
              title: svc.name,
              text: `Precio: Q${svc.price}`,
            }));

            return (
              <Col key={insurer} xs={12} md={6} lg={4}>
                <CardsDesplegables
                  category={insurer}
                  items={items}
                  image={insurerImages[insurer]}
                  isOpen={openInsurer === insurer}
                  onToggle={handleToggle}
                />
              </Col>
            );
          })}
        </Row>
      </section>

      {/* Sección de Misión y Visión para aseguradoras */}
      <MisionVision
        mission="Garantizar transparencia y eficiencia en la validación de servicios médicos para todas las aseguradoras asociadas."
        vision="Consolidarnos como puente de confianza entre hospitales y aseguradoras, optimizando procesos y fortaleciendo alianzas estratégicas."
      />

      {/* Sección de Planes Futuros */}
      <section className="py-5">
        <h3 className="text-center text-success mb-4">Planes Futuros</h3>
        <ListaTarjetas items={planesFuturos} />
      </section>

      {/* Sección de Contacto */}
      <section className="py-5">
        <h3 className="text-center text-success mb-4">Contacto</h3>
        <Row className="justify-content-center">
          <Col md={4} className="text-center">
            <p className="mb-1"><strong>Email Aseguradora:</strong> seguros@clinisure.com</p>
            <p className="mb-1"><strong>Teléfono:</strong> +502 5566 7788</p>
            <p className="mb-0"><strong>Horario de atención:</strong> Lun-Vie 8 AM - 5 PM</p>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default SubHomeSeguro;
