import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import doctorsData from '../../../data/doctor.json'; // Importa el JSON estático
import '../../../styles/Appointments.css';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', patient: '', doctor: '', reason: '' });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]); // Lista de doctores

  useEffect(() => {
    fetchAppointments();
    loadDoctors(); // Cargar doctores desde JSON
  }, []);

  // Obtener citas desde el backend (simulado por ahora)
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      // Aquí iría el fetch real si hubiera backend
      const fakeAppointments = []; // Puedes agregar citas de prueba si lo necesitas
      setAppointments(fakeAppointments);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar doctores desde JSON
  const loadDoctors = () => {
    setDoctors(doctorsData);
  };

  // Validar que la cita no tenga conflictos de horario
  const isTimeSlotAvailable = (date, time) => {
    return !appointments.some(appointment => appointment.date === date && appointment.time === time);
  };

  // Agregar nueva cita
  const handleAddAppointment = async (e) => {
    e.preventDefault();
    const { date, time, patient, doctor, reason } = newAppointment;

    if (!date || !time || !patient || !doctor || !reason) {
      alert('⚠ Completa todos los campos.');
      return;
    }

    if (!isTimeSlotAvailable(date, time)) {
      alert('❌ Ya hay una cita programada en este horario.');
      return;
    }

    // Simulación de guardado de cita
    const newCita = { id: appointments.length + 1, date, time, patient, doctor, reason, status: "pending" };
    setAppointments([...appointments, newCita]);
    alert('✅ Cita agendada exitosamente.');

    // Reset formulario
    setNewAppointment({ date: '', time: '', patient: '', doctor: '', reason: '' });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Agenda de Consultas</h1>
        <Link to="/dashboard" className="back-button">← Regresar</Link>
      </div>

      {/* Calendario para ver citas */}
      <h2>Calendario de Citas</h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) => 
          appointments.some(appointment => appointment.date === date.toISOString().split('T')[0]) 
          ? 'appointment-day' 
          : ''
        }
      />

      {/* Listado de citas del día seleccionado */}
      <h2>Citas para el {selectedDate.toISOString().split('T')[0]}</h2>
      {loading ? <p>Cargando citas...</p> : (
        <ul className="appointments-list">
          {appointments.filter(a => a.date === selectedDate.toISOString().split('T')[0]).length === 0 ? (
            <p>No hay citas programadas.</p>
          ) : (
            appointments
              .filter(a => a.date === selectedDate.toISOString().split('T')[0])
              .map(appointment => (
                <li key={appointment.id} className="appointment-item">
                  <strong>Hora:</strong> {appointment.time} <br />
                  <strong>Paciente:</strong> {appointment.patient} <br />
                  <strong>Doctor:</strong> {appointment.doctor} <br />
                  <strong>Motivo:</strong> {appointment.reason} <br />
                </li>
              ))
          )}
        </ul>
      )}

      {/* Formulario para agendar nueva cita */}
      <h2>Agendar Nueva Cita</h2>
      <form className="appointment-form" onSubmit={handleAddAppointment}>
        <label>
          Fecha:
          <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} required />
        </label>
        <label>
          Hora:
          <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} required />
        </label>
        <label>
          Paciente:
          <input type="text" placeholder="Nombre del paciente" value={newAppointment.patient} onChange={(e) => setNewAppointment({ ...newAppointment, patient: e.target.value })} required />
        </label>
        <label>
          Doctor:
          <select value={newAppointment.doctor} onChange={(e) => setNewAppointment({ ...newAppointment, doctor: e.target.value })} required>
            <option value="">Selecciona un doctor</option>
            {doctors.map(doc => <option key={doc.id} value={doc.name}>{doc.name} - {doc.specialty}</option>)}
          </select>
        </label>
        <label>
          Motivo:
          <input type="text" placeholder="Motivo de la consulta" value={newAppointment.reason} onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })} required />
        </label>
        <button type="submit">Agendar Cita</button>
      </form>
    </div>
  );
}

export default Appointments;
