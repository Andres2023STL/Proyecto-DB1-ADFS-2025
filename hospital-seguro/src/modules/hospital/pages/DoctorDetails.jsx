import React from 'react';
import { useParams, Link } from 'react-router-dom';
import doctorsData from '../../../data/doctor.json'; // Asegúrate de tener este archivo

function DoctorDetails() {
  const { id } = useParams();
  const doctor = doctorsData.find((doc) => doc.id.toString() === id);

  if (!doctor) {
    return <h2>Doctor no encontrado</h2>;
  }

  return (
    <div className="doctor-details">
      <h1>{doctor.name}</h1>
      <p><strong>Especialidad:</strong> {doctor.specialty}</p>
      <p><strong>Número de colegiado:</strong> {doctor.licenseNumber}</p>
      <p><strong>Teléfono:</strong> {doctor.contact.phone}</p>
      <p><strong>Universidad de Graduación:</strong> {doctor.graduation.university} ({doctor.graduation.year})</p>
      
      {/* Foto del doctor */}
      <img src={doctor.photo} alt={doctor.name} width="150px" />

      {/* Sección de certificaciones/títulos */}
      <p><strong>Títulos y Certificaciones:</strong></p>
      <div>
        {doctor.certifications && doctor.certifications.length > 0 ? (
          doctor.certifications.map((cert, index) => (
            <img key={index} src={cert} alt={`Certificado ${index + 1}`} width="150px" />
          ))
        ) : (
          <p>No hay certificaciones disponibles.</p>
        )}
      </div>

      <Link to="/hospital/doctorcatalog" className="back-button">← Volver al catálogo</Link>
    </div>
  );
}

export default DoctorDetails;
