import React from 'react';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

function Carrusel({ items }) {
  return (
    <Carousel className="carousel-custom">
      {items.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img
            className="d-block w-100"
            src={item.img}
            alt={item.alt || item.title}
          />
          <Carousel.Caption>
            {item.title && <h3>{item.title}</h3>}
            {item.text  && <p>{item.text}</p>}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

Carrusel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    img:    PropTypes.string.isRequired,
    title:  PropTypes.string,
    text:   PropTypes.string,
    alt:    PropTypes.string,
  })).isRequired,
};

export default Carrusel;
