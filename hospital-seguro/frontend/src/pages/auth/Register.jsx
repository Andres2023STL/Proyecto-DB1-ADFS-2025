import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  })
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMensaje('')
    setError('')
    console.log('Datos enviados:', formData)

    try {
      const res = await fetch('http://localhost/hospital_api/auth/register.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success) {
        setMensaje('✅ Registro exitoso. Redirigiendo al login...')
        setFormData({ nombre: '', email: '', password: '' }) // Limpiar campos
        setTimeout(() => navigate('/login'), 2000) // Redirigir tras 2 seg
      } else {
        setError(data.message || 'Ocurrió un error al registrarse.')
      }
    } catch (err) {
      setError('No se pudo conectar con el servidor.')
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} autoComplete="on">
        <fieldset>
          <legend>Registrarse</legend>

          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre completo"
            autoComplete="name"
            value={formData.nombre}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Crea una contraseña"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button type="submit">Registrarse</button>

          {mensaje && <p className="success">{mensaje}</p>}
          {error && <p className="error">{error}</p>}
        </fieldset>
      </form>
    </div>
  )
}

export default Register
