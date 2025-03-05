// src/modules/hospital/pages/Appointments.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Appointments.css';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', patient: '', reason: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  //  Obtener citas desde el backend
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/appointments'); 
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Agregar nueva cita (POST a API)
  const handleAddAppointment = async (e) => {
    e.preventDefault();
    if (!newAppointment.date || !newAppointment.time || !newAppointment.patient || !newAppointment.reason) {
      alert('⚠ Completa todos los campos.');
      return;
    }
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment),
      });
      if (response.ok) {
        alert('✅ Cita agendada exitosamente.');
        fetchAppointments(); // Recargar citas
        setNewAppointment({ date: '', time: '', patient: '', reason: '' });
      } else {
        alert('❌ Error al agendar la cita.');
      }
    } catch (error) {
      console.error('Error al enviar cita:', error);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Agenda de Consultas</h1>
        <Link to="/dashboard" className="back-button">← Regresar</Link>
      </div>

      {/* Listado de citas */}
      <h2>Citas Programadas</h2>
      {loading ? <p>Cargando citas...</p> : (
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
      )}

      {/* Formulario para agregar nueva cita */}
      <h2>Agendar Nueva Cita</h2>
      <form className="appointment-form" onSubmit={handleAddAppointment}>
        <label>
          Fecha:
          <input
            type="date"
            value={newAppointment.date}
            onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
            required
          />
        </label>
        <label>
          Hora:
          <input
            type="time"
            value={newAppointment.time}
            onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
            required
          />
        </label>
        <label>
          Paciente:
          <input
            type="text"
            placeholder="Nombre del paciente"
            value={newAppointment.patient}
            onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })}
            required
          />
        </label>
        <label>
          Motivo:
          <input
            type="text"
            placeholder="Motivo de la consulta"
            value={newAppointment.reason}
            onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
            required
          />
        </label>
        <button type="submit">Agendar Cita</button>
      </form>
    </div>
  );
}

export default Appointments;
