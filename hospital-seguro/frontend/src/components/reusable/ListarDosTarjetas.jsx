import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

/*
 ListaDosTarjetas

  Variante de ListaTarjetas que solo muestra los primeros dos elementos del array.
 */
const ListarDosTarjetas = ({ items }) => {
  // Mostrar hasta dos elementos
  const visibles = items.slice(0, 2);
  // Si solo hay uno, ocupa todo el ancho (md=12), si no, mitad (md=6)
  const colSize = visibles.length === 1 ? 12 : 6;

  return (
    <Row className="gy-4">
      {visibles.map((item, idx) => (
        <Col key={idx} xs={12} md={colSize}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="h-100 shadow-sm border-0">
              {item.img && (
                <Card.Img
                  variant="top"
                  src={item.img}
                  alt={item.title}
                  className="card-img-responsive"
                />
              )}
              <Card.Body>
                <Card.Title className="text-success">{item.title}</Card.Title>
                <Card.Text>{item.text}</Card.Text>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

ListarDosTarjetas.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      img: PropTypes.string,
    })
  ).isRequired,
};

export default ListarDosTarjetas;