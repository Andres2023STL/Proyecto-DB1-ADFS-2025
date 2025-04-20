import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { login } from '../../services/authService'

const Login = () => {
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')
  
    console.log('📤 Enviando login:', formData.email, formData.password)
  
    const res = await login(formData.email, formData.password)
  
    console.log('📩 Respuesta login:', res)
  
    if (res.success) {
      setUser(res.user)
  
      const rolePath = {
        admin: '/dashboard/admin',
        doctor: '/dashboard/doctor',
        paciente: '/dashboard/paciente',
        empleado: '/dashboard/empleado'
      }
  
      navigate(rolePath[res.user.rol] || '/unauthorized')
    } else {
      setError(res.message || 'Credenciales incorrectas')
    }
  }
  

  return (
    <div className="auth-container">
      <form className="auth-form" autoComplete="on" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Iniciar Sesión</legend>

          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="ejemplo@correo.com"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Tu contraseña"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <button type="submit">Ingresar</button>

          <button
            type="button"
            onClick={() => navigate('/register')}
            style={{ marginTop: '1rem' }}
          >
            ¿No tienes cuenta? Regístrate
          </button>

          {mensaje && <p className="success">{mensaje}</p>}
          {error && <p className="error">{error}</p>}
        </fieldset>
      </form>
    </div>
  )
}

export default Login
