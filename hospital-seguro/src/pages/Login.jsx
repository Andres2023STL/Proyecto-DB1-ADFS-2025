import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = [
      { email: 'doctor@example.com', password: 'password', role: 'doctor' },
      { email: 'admin@example.com', password: 'password', role: 'admin' },
      { email: 'empleado@example.com', password: 'password', role: 'empleado' },
    ];

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('token', 'fake-token');
      localStorage.setItem('role', user.role);
      navigate('/dashboard');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
