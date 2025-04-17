import React from 'react'

const Register = () => {
  return (
    <div className="auth-container">
      <form className="auth-form" autoComplete="on">
        <fieldset>
          <legend>Registrarse</legend>

          <label htmlFor="nombre">Nombre Completo:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre completo"
            autoComplete="name"
            required
          />

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
            placeholder="Crea una contraseña"
            autoComplete="new-password"
            required
          />

          <button type="submit">Registrarse</button>
        </fieldset>
      </form>
    </div>
  )
}

export default Register
