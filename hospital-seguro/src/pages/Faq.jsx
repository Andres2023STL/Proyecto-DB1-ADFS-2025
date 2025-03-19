function Faq() {
  return (
    <div className="page-container">
      <h1>Preguntas Frecuentes</h1>
      <div className="faq-item">
        <h3>¿Cómo puedo agendar una cita?</h3>
        <p>Puedes agendar una cita accediendo a la sección de hospital y seleccionando "Agendar Cita".</p>
      </div>
      <div className="faq-item">
        <h3>¿Qué servicios cubre mi seguro?</h3>
        <p>Depende del tipo de póliza contratada. Puedes verificar tus coberturas en la sección "Seguro".</p>
      </div>
      <div className="faq-item">
        <h3>¿Cómo puedo contactar al soporte?</h3>
        <p>Escríbenos a <a href="mailto:soporte@sistemaintegrado.com">soporte@sistemaintegrado.com</a>.</p>
      </div>
    </div>
  );
}

export default Faq;
