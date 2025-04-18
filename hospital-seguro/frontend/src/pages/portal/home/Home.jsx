import React from 'react';
import { Container } from 'react-bootstrap';
import Carrusel from '../../../components/Carrusel';
import ListaTarjetas from '../../../components/ListaTarjetas';

import img1 from '../../../assets/public/images/img_asegurado.jpg';
import img2 from '../../../assets/public/images/img_medico.jpg';
import img3 from '../../../assets/public/images/img_receta.jpg';

import imgCard1 from '../../../assets/public/images/imgCard1.png';
import imgCard2 from '../../../assets/public/images/imgCard2.png';
import imgCard3 from '../../../assets/public/images/imgCard3.png';

const slides = [
  {
    img:   img1,
    title: 'Primer slide',
    text:  'Esta es la descripción del primer slide.',
  },
  {
    img:   img2,
    title: 'Segundo slide',
    text:  'Aquí va el texto del segundo slide.',
  },
  {
    img:   img3,
    title: 'Tercer slide',
    text:  'Y este es el slide número tres.',
  },
];

const benefits = [
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
  }
];
const Home = () => (
  <>
    
    <Carrusel items={slides} />

    <Container className="py-5">
      <section className="mb-5 text-center">
        <h2 className="text-success">¿Qué es CliniSure?</h2>
        <p className="lead">
          CliniSure es una plataforma integral que une hospitales y aseguradoras
          para ofrecer una experiencia médica eficiente y coordinada.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-success mb-4 text-center">Beneficios</h2>
        <ListaTarjetas items={benefits} />
      </section>
    </Container>
  </>
);

export default Home;
