import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, Button } from "antd";
import { motion } from "framer-motion";
import doctorsData from "../../../../data/doctor.json";

function DoctorCatalog() {
  const navigate = useNavigate();

  const handleSelectDoctor = (doctor) => {
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    navigate("/hospital/appointments");
  };

  return (
    <div className="private-doctor-catalog-container">
      <h1 className="private-doctor-catalog-title">Catálogo de Doctores</h1>
      <div className="private-doctor-catalog-grid">
        {doctorsData.map((doctor) => (
          <motion.div
            key={doctor.id}
            whileHover={{ scale: 1.02 }}
            className="private-doctor-card"
          >
            <Card
              title={doctor.name}
              bordered
              extra={
                <Link to={`/hospital/doctordetails/${doctor.id}`} className="private-doctor-details-link">
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
        <Link to="/hospital/appointments" className="private-back-button">
          ← Volver a citas
        </Link>
      </div>
    </div>
  );
}

export default DoctorCatalog;
