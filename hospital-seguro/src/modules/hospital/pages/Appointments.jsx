import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Appointments.css';

const initialAppointments = [
  { id: 1, date: '2025-02-01', time: '10:00 AM', patient: 'Juan Pérez', reason: 'Consulta general' },
  { id: 2, date: '2025-02-02', time: '02:00 PM', patient: 'María López', reason: 'Control de presión arterial' },
];

function Appointments() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', patient: '', reason: '' });

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (newAppointment.date && newAppointment.time && newAppointment.patient && newAppointment.reason) {
      setAppointments([...appointments, { ...newAppointment, id: appointments.length + 1 }]);
      setNewAppointment({ date: '', time: '', patient: '', reason: '' });
      alert('Cita creada exitosamente.');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h1>Agenda de Consultas</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>

      {/* Listado de citas */}
      <h2>Citas Programadas</h2>
      <ul className="appointments-list">
        {appointments.length === 0 ? (
          <p>No hay citas programadas.</p>
        ) : (
          appointments.map((appointment) => (
            <li key={appointment.id} className="appointment-item">
              <strong>Fecha:</strong> {appointment.date} <br />
              <strong>Hora:</strong> {appointment.time} <br />
              <strong>Paciente:</strong> {appointment.patient} <br />
              <strong>Motivo:</strong> {appointment.reason}
            </li>
          ))
        )}
      </ul>

      {/* Formulario para agregar nueva cita */}
      <h2>Agendar Nueva Cita</h2>
      <form className="appointment-form" onSubmit={handleAddAppointment}>
        <label>
          Fecha:
          <input
            type="date"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
          />
        </label>
        <label>
          Hora:
          <input
            type="time"
            value={newAppointment.time}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
          />
        </label>
        <label>
          Paciente:
          <input
            type="text"
            placeholder="Nombre del paciente"
            value={newAppointment.patient}
            onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
          />
        </label>
        <label>
          Motivo:
          <input
            type="text"
            placeholder="Motivo de la consulta"
            value={newAppointment.reason}
            onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
          />
        </label>
        <button type="submit">Agendar Cita</button>
      </form>
    </div>
  );
}

export default Appointments;
