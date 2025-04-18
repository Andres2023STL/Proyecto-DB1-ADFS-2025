import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

const ListaTarjetas = ({ items }) => {
  return (
    <Row className="gy-4">
      {items.map((item, idx) => (
        <Col key={idx} xs={12} md={6} lg={4}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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

export default ListaTarjetas;
