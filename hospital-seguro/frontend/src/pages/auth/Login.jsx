import React from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  return (
    <div className="auth-container">
      <form className="auth-form" autoComplete="on">
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
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Tu contraseña"
            autoComplete="current-password"
            required
          />

          <button type="submit">Ingresar</button>

          <button type="button" onClick={() => navigate('/register')} style={{ marginTop: '1rem' }}>
            ¿No tienes cuenta? Regístrate
          </button>
        </fieldset>
      </form>
    </div>
  )
}

export default Login
