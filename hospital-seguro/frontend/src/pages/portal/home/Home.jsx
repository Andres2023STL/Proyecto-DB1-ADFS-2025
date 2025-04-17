import React from 'react'

const Home = () => {
  return (
    <div className="home__container">
      <main className="home__main">
        <section className="home__section">
          <h2>¿Qué es CliniSure?</h2>
          <p>
            CliniSure es una plataforma integral que une hospitales y aseguradoras
            para ofrecer una experiencia médica eficiente y coordinada.
          </p>
        </section>
        <section className="home__section">
          <h2>Beneficios</h2>
          <ul>
            <li>Gestión de pacientes, doctores y empleados</li>
            <li>Sincronización con aseguradoras</li>
            <li>Acceso seguro y por rol</li>
          </ul>
        </section>
      </main>

      <footer className="home__footer">
        <p>© 2025 CliniSure. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}

export default Home
