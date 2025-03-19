import React from "react";
import { Link, useNavigate } from "react-router-dom";
import doctorsData from "../../../../data/doctor.json"; // ✅ Importa el JSON de doctores

function DoctorCatalog() {
  const navigate = useNavigate();

  const handleSelectDoctor = (doctor) => {
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor)); // ✅ Guarda en LocalStorage
    navigate("/hospital/appointments"); // ✅ Redirige a la agenda
  };

  return (
    <div className="doctor-catalog">
      <h1>Catálogo de Doctores</h1>
      <ul className="doctor-list">
        {doctorsData.map((doctor) => (
          <li key={doctor.id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p><strong>Especialidad:</strong> {doctor.specialty}</p>

            {/* 🔥 Botón para Ver Detalles */}
            <Link to={`/hospital/doctordetails/${doctor.id}`} className="details-link">
              Ver Detalles
            </Link>

            {/* 🔥 Botón para Seleccionar Doctor */}
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
