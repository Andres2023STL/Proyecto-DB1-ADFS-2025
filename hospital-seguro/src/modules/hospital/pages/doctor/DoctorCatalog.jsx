import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button, Spin, Alert } from "antd";
import { motion } from "framer-motion";

function DoctorCatalog() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost/hospital_api/getDoctors.php")
      .then((res) => res.json())
      .then((data) => {
        setDoctors(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar los doctores.");
        setLoading(false);
      });
  }, []);

  const handleSelectDoctor = (doctor) => {
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    navigate("/hospital-empleado/appointments");
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message={error} type="error" showIcon />;

  return (
    <div className="private-doctor-catalog-container">
      <h1 className="private-doctor-catalog-title">Catálogo de Doctores</h1>
      <div className="private-doctor-catalog-grid">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            whileHover={{ scale: 1.02 }}
            className="private-doctor-card"
          >
            <Card
              title={doctor.name}
              bordered
              extra={
                <Link
                  to={`/hospital-empleado/doctordetails/${doctor.id}`}
                  className="private-doctor-details-link"
                >
                  Ver Detalles
                </Link>
              }
              className="private-doctor-card-ant"
            >
              <p>
                <strong>Especialidad:</strong> {doctor.specialty}
              </p>
              <Button
                type="primary"
                onClick={() => handleSelectDoctor(doctor)}
                className="private-doctor-select-btn"
              >
                Seleccionar Doctor
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
      <div className="private-doctor-catalog-back">
        <Link to="/hospital-empleado/appointments" className="private-back-button">
          ← Volver a citas
        </Link>
      </div>
    </div>
  );
}

export default DoctorCatalog;
