import React from "react";
import { Card } from "antd";
import { motion } from "framer-motion";

function Faq() {
  // Datos de preguntas frecuentes
  const faqData = [
    {
      question: "¿Cómo puedo agendar una cita?",
      answer: 'Puedes agendar una cita accediendo a la sección de hospital y seleccionando "Agendar Cita".'
    },
    {
      question: "¿Qué servicios cubre mi seguro?",
      answer: "Depende del tipo de póliza contratada. Puedes verificar tus coberturas en la sección 'Seguro'."
    },
    {
      question: "¿Cómo puedo contactar al soporte?",
      answer: 'Escríbenos a <a href="mailto:soporte@sistemaintegrado.com">soporte@sistemaintegrado.com</a>.'
    }
  ];

  // Variantes de animación para los ítems
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="page-container" style={{ padding: "20px" }}>
      {/* Título de la sección reutilizando estilos existentes */}
      <h1 className="section-title">Preguntas Frecuentes</h1>
      {faqData.map((faq, index) => (
        <motion.div
          key={index}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          style={{ marginBottom: "20px" }}
        >
          <Card hoverable style={{ borderRadius: 8 }}>
            <h3 className="card-title-blue">{faq.question}</h3>
            {/* Uso de dangerouslySetInnerHTML para permitir enlaces en el contenido */}
            <p dangerouslySetInnerHTML={{ __html: faq.answer }} />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

export default Faq;
