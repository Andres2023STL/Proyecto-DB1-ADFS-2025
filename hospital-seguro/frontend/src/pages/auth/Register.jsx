import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };

  return (
    <Container
      fluid
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Card
        className="shadow-sm"
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <Card.Body className="p-4">
          <Card.Title className="text-center mb-4 text-success">
            Registrarse
          </Card.Title>

          <Form autoComplete="on" onSubmit={handleSubmit}>
            <Form.Group controlId="nombre" className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre completo"
                autoComplete="name"
                required
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@correo.com"
                autoComplete="email"
                required
              />
            </Form.Group>

            <Form.Group controlId="password" className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Crea una contraseña"
                autoComplete="new-password"
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mb-3">
              Registrarse
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate('/login')}
              >
                ¿Ya tienes cuenta? Inicia Sesión
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Register;