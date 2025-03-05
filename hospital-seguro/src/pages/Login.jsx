import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import usersData from '../data/users.json'; // Importamos JSON
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(usersData);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      if (user.active) {
        localStorage.setItem('token', 'fake-token');
        localStorage.setItem('role', user.role);
        navigate('/dashboard');
      } else {
        alert('Tu cuenta aún no ha sido activada por un administrador.');
      }
    } else {
      alert('Credenciales inválidas.');
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
      <button onClick={() => navigate('/Register')} className="register-btn">
        Registrarse
      </button>
    </div>
  );
}

export default Login;
