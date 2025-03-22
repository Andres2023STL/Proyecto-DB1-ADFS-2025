import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Row, Col, Typography } from 'antd';
import { motion } from 'framer-motion';
import recetasData from '../../../../data/recetas.json';

const { Title, Paragraph } = Typography;

function Recetas() {
  // Estado para almacenar la lista de recetas y la receta en edición
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [form] = Form.useForm();

  // Carga inicial de recetas desde el archivo JSON
  useEffect(() => {
    setPrescriptions(recetasData);
  }, []);

  // Función que maneja el envío del formulario para agregar o actualizar una receta
  const handleFinish = (values) => {
    if (editingPrescription) {
      // Actualiza la receta existente:
      setPrescriptions((prev) =>
        // Para cada receta en el array previo:
        prev.map((p) =>
          // Comprueba si el ID de la receta actual coincide con el de la receta en edición
          p.id === editingPrescription.id
            // Si coincide, devuelve un nuevo objeto combinando los valores actualizados (values)
            // y mantiene el ID original para esa receta.
            ? { ...values, id: p.id }
            // Si no coincide, retorna la receta sin modificar.
            : p
        )
      );
      // Limpia el estado de edición después de actualizar
      setEditingPrescription(null);
    } else {
      // Agrega una nueva receta:
      // Calcula un nuevo ID: si existen recetas, toma el ID de la última y suma 1; de lo contrario, usa 1.
      const newId = prescriptions.length > 0 ? prescriptions[prescriptions.length - 1].id + 1 : 1;
      // Añade la nueva receta al array existente, combinando los valores del formulario con el nuevo ID.
      setPrescriptions((prev) => [...prev, { ...values, id: newId }]);
    }
    // Reinicia los campos del formulario
    form.resetFields();
  };

  // Función que prepara una receta para ser editada
  const handleEditPrescription = (prescription) => {
    // Carga los valores de la receta seleccionada en el formulario
    form.setFieldsValue(prescription);
    // Marca la receta actual como la receta en edición
    setEditingPrescription(prescription);
  };

  // Función que elimina una receta de la lista
  const handleDeletePrescription = (id) => {
    // Filtra la lista de recetas, removiendo la receta cuyo ID coincide con el proporcionado
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="private-page-container">
      {/* Encabezado con título y enlace de regreso */}
      <div className="private-page-header">
        <Title level={2}>Gestión de Recetas</Title>
        <Link to="/hospital/dashboard" className="private-back-button">← Regresar</Link>
      </div>

      <Paragraph className="private-description">
        Crea, edita y administra las recetas médicas.
      </Paragraph>

      {/* Formulario de receta con animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="private-prescription-form-card">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFinish}
            className="private-prescription-form"
          >
            <Form.Item
              label="Paciente"
              name="patient"
              rules={[{ required: true, message: 'Ingrese el nombre del paciente' }]}
              className="private-form-item"
            >
              <Input className="private-input" />
            </Form.Item>
            <Form.Item
              label="Fecha"
              name="date"
              rules={[{ required: true, message: 'Seleccione la fecha' }]}
              className="private-form-item"
            >
              <Input type="date" className="private-input" />
            </Form.Item>
            <Form.Item
              label="Medicamento"
              name="medicine"
              rules={[{ required: true, message: 'Ingrese el medicamento' }]}
              className="private-form-item"
            >
              <Input className="private-input" />
            </Form.Item>
            <Form.Item
              label="Dosis"
              name="dosage"
              rules={[{ required: true, message: 'Ingrese la dosis' }]}
              className="private-form-item"
            >
              <Input className="private-input" />
            </Form.Item>
            <Form.Item
              label="Duración"
              name="duration"
              rules={[{ required: true, message: 'Ingrese la duración' }]}
              className="private-form-item"
            >
              <Input className="private-input" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className="private-btn">
                {editingPrescription ? 'Actualizar Receta' : 'Agregar Receta'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>

      {/* Muestra la lista de recetas en tarjetas con animación */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Row gutter={[16, 16]}>
          {prescriptions.map((prescription) => (
            <Col xs={24} sm={12} md={8} key={prescription.id}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Card
                  title={prescription.patient}
                  className="private-prescription-card"
                  extra={<span>{prescription.date}</span>}
                  hoverable
                >
                  <Paragraph>
                    <strong>Medicamento:</strong> {prescription.medicine}
                  </Paragraph>
                  <Paragraph>
                    <strong>Dosis:</strong> {prescription.dosage}
                  </Paragraph>
                  <Paragraph>
                    <strong>Duración:</strong> {prescription.duration}
                  </Paragraph>
                  <div className="private-card-actions">
                    <Button
                      size="small"
                      onClick={() => handleEditPrescription(prescription)}
                      className="private-edit-btn"
                    >
                      Editar
                    </Button>
                    <Button
                      size="small"
                      danger
                      onClick={() => handleDeletePrescription(prescription.id)}
                      className="private-delete-btn"
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  );
}

export default Recetas;
