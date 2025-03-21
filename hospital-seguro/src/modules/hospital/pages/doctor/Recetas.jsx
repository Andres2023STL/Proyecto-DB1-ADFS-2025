import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button, Card, Row, Col, Typography } from 'antd';
import { motion } from 'framer-motion';
import recetasData from '../../../../data/recetas.json';

const { Title, Paragraph } = Typography;

function Recetas() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [editingPrescription, setEditingPrescription] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setPrescriptions(recetasData);
  }, []);

  const handleFinish = (values) => {
    if (editingPrescription) {
      setPrescriptions((prev) =>
        prev.map((p) => (p.id === editingPrescription.id ? { ...values, id: p.id } : p))
      );
      setEditingPrescription(null);
    } else {
      const newId = prescriptions.length > 0 ? prescriptions[prescriptions.length - 1].id + 1 : 1;
      setPrescriptions((prev) => [...prev, { ...values, id: newId }]);
    }
    form.resetFields();
  };

  const handleEditPrescription = (prescription) => {
    form.setFieldsValue(prescription);
    setEditingPrescription(prescription);
  };

  const handleDeletePrescription = (id) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="private-page-container">
      <div className="private-page-header">
        <Title level={2}>Gestión de Recetas</Title>
        <Link to="/hospital/dashboard" className="private-back-button">← Regresar</Link>
      </div>

      <Paragraph className="private-description">
        Crea, edita y administra las recetas médicas.
      </Paragraph>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="private-prescription-form-card">
          <Form form={form} layout="vertical" onFinish={handleFinish} className="private-prescription-form">
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
