import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Row, Col, Typography, Spin, Alert } from "antd";
import { motion } from "framer-motion";

const { Title, Paragraph } = Typography;

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/hospital_api/getDoctorById.php?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setDoctor(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al obtener datos del doctor.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <motion.div
      className="private-doctor-details-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="private-doctor-details-card">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <motion.img
              src={doctor.photo}
              alt={doctor.name}
              className="private-doctor-photo"
              whileHover={{ scale: 1.05 }}
            />
          </Col>
          <Col xs={24} md={16}>
            <Title level={2} className="private-doctor-name">
              {doctor.name}
            </Title>
            <Paragraph>
              <strong>Especialidad:</strong> {doctor.specialty}
            </Paragraph>
            <Paragraph>
              <strong>Número de colegiado:</strong> {doctor.licenseNumber}
            </Paragraph>
            <Paragraph>
              <strong>Teléfono:</strong> {doctor.contact.phone}
            </Paragraph>
            <Paragraph>
              <strong>Universidad de Graduación:</strong>{" "}
              {doctor.graduation.university} ({doctor.graduation.year})
            </Paragraph>
            <Title level={4}>Títulos y Certificaciones:</Title>
            <div className="private-doctor-certifications">
              {doctor.certifications && doctor.certifications.length > 0 ? (
                doctor.certifications.map((cert, index) => (
                  <motion.img
                    key={index}
                    src={cert}
                    alt={`Certificado ${index + 1}`}
                    className="private-certification-img"
                    whileHover={{ scale: 1.05 }}
                  />
                ))
              ) : (
                <Paragraph>No hay certificaciones disponibles.</Paragraph>
              )}
            </div>
          </Col>
        </Row>
      </Card>
      <div className="private-doctor-details-back">
        <Link to="/hospital-empleado/doctorcatalog" className="private-back-button">
          ← Volver al catálogo
        </Link>
      </div>
    </motion.div>
  );
}

export default DoctorDetails;
