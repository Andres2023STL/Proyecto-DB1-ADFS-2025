import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../../../components/layout/Header'
import Carrusel from '../../../components/reusable/Carrusel';
import ListaTarjetas from '../../../components/reusable/ListaTarjetas';
import MisionVision from '../../../components/reusable/MisionVision';

import img1       from '../../../assets/public/images/img_asegurado.jpg';
import img2       from '../../../assets/public/images/img_medico.jpg';
import img3       from '../../../assets/public/images/img_receta.jpg';
import imgCard1   from '../../../assets/public/images/imgCard1.png';
import imgCard2   from '../../../assets/public/images/imgCard2.png';
import imgCard3   from '../../../assets/public/images/imgCard3.png';
import addressImg from '../../../assets/public/images/mapa.png';

const slides = [
  { img: img1, title: 'Primer slide', text: 'Esta es la descripción del primer slide.' },
  { img: img2, title: 'Segundo slide', text: 'Aquí va el texto del segundo slide.' },
  { img: img3, title: 'Tercer slide', text: 'Y este es el slide número tres.' },
];

const beneficios = [
  {
    title: 'Gestión integral',
    text: 'Administra pacientes, doctores y empleados desde un solo sitio.',
    img: imgCard1,
  },
  {
    title: 'Sincronización con aseguradoras',
    text: 'Valida coberturas en tiempo real y agiliza autorizaciones.',
    img: imgCard2,
  },
  {
    title: 'Control de acceso',
    text: 'Roles y permisos para garantizar seguridad y privacidad.',
    img: imgCard3,
  },
];

const Home = () => (
  <>

  <Header />

    {/* Carrusel independiente */}
    <Carrusel items={slides} />

    <Container>
      {/* ¿Qué es CliniSure? */}
      <section className="text-center py-5">
        <h2 className="text-success">¿Qué es CliniSure?</h2>
        <p className="lead">
          CliniSure es una plataforma integral que une hospitales y aseguradoras
          para ofrecer una experiencia médica eficiente y coordinada.
        </p>
      </section>

      {/* Beneficios */}
      <section className="py-5">
        <h2 className="text-success mb-4 text-center">Beneficios</h2>
        <ListaTarjetas items={beneficios} />
      </section>

      {/* Nuestra Dirección */}
      <section className="py-5">
        <h2 className="text-success mb-4 text-center">Nuestra Dirección</h2>
        <Row className="align-items-center justify-content-center">
          <Col md={6} className="mb-4 mb-md-0">
            <img
              src={addressImg}
              alt="Ubicación de CliniSure"
              className="img-fluid rounded shadow mx-auto d-block"
            />
          </Col>
          <Col md={6} className="text-center text-md-start">
            <p className="lead mb-0">
              <strong>Avenida Principal 123</strong><br/>
              Zona 1, Ciudad de Guatemala<br/>
              Guatemala, C.A.
            </p>
          </Col>
        </Row>
      </section>

      {/* Misión & Visión */}
      <section className="py-5">
        <h2 className="text-success mb-4 text-center">Sobre nosotros</h2>
        <MisionVision
          mission="Proveer un sistema integrado que facilite la gestión hospitalaria
              y la validación de seguros, garantizando eficiencia, seguridad
              y calidad en la atención al paciente."
          vision="Ser reconocidos como la plataforma líder en Latinoamérica para
              la coordinación entre hospitales y aseguradoras, mejorando
              constantemente la experiencia de todos los usuarios."
        />
      </section>
    </Container>
  </>
);

export default Home;
