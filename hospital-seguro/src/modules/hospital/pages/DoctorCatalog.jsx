import React from 'react';
import { Link } from 'react-router-dom';
import doctorsData from '../../../data/doctor.json'; // Asegúrate de tener este archivo

function DoctorCatalog() {
  return (
    <div className="doctor-catalog">
      <h1>Catálogo de Doctores</h1>
      <ul>
        {doctorsData.map((doctor) => (
          <li key={doctor.id}>
            <Link to={`/hospital/doctordetails/${doctor.id}`}>
              {doctor.name} - {doctor.specialty}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/hospital/appointments" className="back-button">← Volver a citas</Link>
    </div>
  );
}

export default DoctorCatalog;
