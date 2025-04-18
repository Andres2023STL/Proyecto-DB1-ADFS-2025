import React, { useState } from 'react';
import { Card, Collapse } from 'react-bootstrap';
import ListaTarjetas from '../../../components/reusable/ListaTarjetas';

// Ejemplo de servicios
const servicios = [
  { id_servicio: 1, category: 'Consulta Médica', subcategory: 'Pediatra' },
  { id_servicio: 2, category: 'Examen de Laboratorio', subcategory: 'Sangre' },
  { id_servicio: 3, category: 'Cirugía', subcategory: 'Extirpar Vesícula'},
  { id_servicio: 4, category: 'Consulta Médica', subcategory: 'General' },
  { id_servicio: 5, category: 'Examen de Laboratorio', subcategory: 'Orina' },
];

const SubHomeHospital = () => {
  const [openCategory, setOpenCategory] = useState(null);

  // Agrupa subcategorías por categoría
  const serviciosPorCategoria = servicios.reduce((acc, svc) => {
    if (!acc[svc.category]) acc[svc.category] = [];
    acc[svc.category].push({ title: svc.subcategory, text: '' });
    return acc;
  }, {});

  const handleToggle = category => {
    setOpenCategory(prev => (prev === category ? null : category));
  };

  return (
    <div>
      {Object.entries(serviciosPorCategoria).map(([category, items]) => (
        <Card className="mb-3" key={category}>
          <Card.Header
            onClick={() => handleToggle(category)}
            aria-controls={`${category}-collapse`}
            aria-expanded={openCategory === category}
            style={{ cursor: 'pointer', backgroundColor: '#f8f9fa' }}
          >
            <h5 className="mb-0 text-success">{category}</h5>
          </Card.Header>

          <Collapse in={openCategory === category}>
            <div id={`${category}-collapse`}>  
              <Card.Body>
                <ListaTarjetas items={items} />
              </Card.Body>
            </div>
          </Collapse>
        </Card>
      ))}
    </div>
  );
};

export default SubHomeHospital;
