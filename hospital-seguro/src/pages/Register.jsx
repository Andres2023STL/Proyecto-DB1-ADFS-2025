import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    fechaNacimiento: '',
    documento: '',
    afiliacionSeguro: '',
    foto: null
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Registro enviado. Espera aprobación de un administrador.');
    navigate('/login');
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h1>Registro de Usuario</h1>

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          required
          value={formData.nombre}
          onChange={handleChange}
        />
        <input
          type="date"
          name="fechaNacimiento"
          required
          value={formData.fechaNacimiento}
          onChange={handleChange}
        />
        <input
          type="text"
          name="documento"
          placeholder="Documento de Identificación"
          required
          value={formData.documento}
          onChange={handleChange}
        />
        <input
          type="text"
          name="afiliacionSeguro"
          placeholder="Número de afiliación del seguro (opcional)"
          value={formData.afiliacionSeguro}
          onChange={handleChange}
        />
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleChange}
        />

        <button type="submit">Registrarse</button>
      </form>
      <button onClick={() => navigate('/login')} className="back-btn">
        Volver al Login
      </button>
    </div>
  );
}

export default Register;
