import React from 'react';
import PropTypes from 'prop-types';
import { Card, Collapse } from 'react-bootstrap';
import ListarDosTarjetas from './ListarDosTarjetas';

/**
 * Card desplegable que representa una categoría de servicios.
 * Muestra una imagen, un header clicable y las subcategorías colapsables.
 *
 * @param {string}  category   - Nombre de la categoría.
 * @param {Array}   items      - Subcategorías ya transformadas para ListarDosTarjetas.
 * @param {string}  image      - Ruta de la imagen representativa de la categoría.
 * @param {boolean} isOpen     - Indica si el colapso está abierto.
 * @param {Function} onToggle  - Callback para alternar la apertura.
 */
const CardsDesplegables = ({ category, items, image, isOpen, onToggle }) => (
  <Card className="mb-4 service-card" onClick={() => onToggle(category)} style={{ cursor: 'pointer' }}>
    {/* Imagen representativa de la categoría */}
    {image && (
      <Card.Img
        variant="top"
        src={image}
        alt={category}
        className="card-img-responsive"
      />
    )}

    {/* Header */}
    <Card.Header
      aria-controls={`${category}-collapse`}
      aria-expanded={isOpen}
      className="bg-light text-success"
      style={{ cursor: 'pointer' }}
    >
      <h5 className="mb-0">{category}</h5>
    </Card.Header>

    {/* Contenido colapsable con las subcategorías */}
    <Collapse in={isOpen}>
      <div id={`${category}-collapse`}>
        <Card.Body>
          {/* Reutiliza ListarDosTarjetas para renderizar subcategorías */}
          <ListarDosTarjetas items={items} />
        </Card.Body>
      </div>
    </Collapse>
  </Card>
);

CardsDesplegables.propTypes = {
  category: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  image: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default CardsDesplegables;
