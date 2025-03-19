function Contacto() {
  return (
    <div className="page-container">
      <h1>Contáctanos</h1>
      <p className="contact-info">
        Estamos aquí para ayudarte. Completa el formulario o envíanos un correo a 
        <a href="mailto:soporte@sistemaintegrado.com"> soporte@sistemaintegrado.com</a>.
      </p>
      <form className="contact-form">
        <label>
          Nombre:
          <input type="text" placeholder="Tu nombre" />
        </label>
        <label>
          Correo Electrónico:
          <input type="email" placeholder="Tu correo electrónico" />
        </label>
        <label>
          Mensaje:
          <textarea placeholder="Escribe tu mensaje aquí..."></textarea>
        </label>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default Contacto;
