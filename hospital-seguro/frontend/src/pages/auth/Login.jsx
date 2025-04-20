// src/pages/auth/Login.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  Form,
  Button
} from 'react-bootstrap';

const Login = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light"
    >
      <Card 
        className="shadow-sm" 
        style={{ maxWidth: '450px', width: '100%' }}
      >
        <Card.Body className="p-4">
          <Card.Title className="text-center mb-4 text-success">
            Iniciar Sesión
          </Card.Title>
          <Form autoComplete="on">
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
                placeholder="Tu contraseña"
                autoComplete="current-password"
                required
              />
            </Form.Group>

            <Button variant="success" type="submit" className="w-100 mb-3">
              Ingresar
            </Button>

            <div className="text-center">
              <Button
                variant="link"
                onClick={() => navigate('/register')}
              >
                ¿No tienes cuenta? Regístrate
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
