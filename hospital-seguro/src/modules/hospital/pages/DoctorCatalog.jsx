import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../../styles/DoctorCatalog.css'
import { DoctorContext } from "../../../context/DoctorContext";

function DoctorCatalog() {
  const { doctors, setSelectedDoctor } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor); // Guardar selección en estado
    navigate("/hospital/appointments"); // Redirigir a la agenda
  };

  return (
    <div className="doctor-catalog">
      <h1>Catálogo de Doctores</h1>
      <ul className="doctor-list">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p><strong>Especialidad:</strong> {doctor.specialty}</p>
            <Link to={`/hospital/doctordetails/${doctor.id}`} className="details-link">
              Ver detalles
            </Link>
            <button className="select-button" onClick={() => handleSelectDoctor(doctor)}>
              Seleccionar Doctor
            </button>
          </li>
        ))}
      </ul>
      <Link to="/hospital/appointments" className="back-button">← Volver a citas</Link>
    </div>
  );
}

export default DoctorCatalog;
