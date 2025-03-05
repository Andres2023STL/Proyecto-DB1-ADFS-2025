import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../styles/Appointments.css';
import { DoctorContext } from '../../../context/DoctorContext';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', patient: '', reason: '', approved: false });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const { selectedDoctor } = useContext(DoctorContext);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const fakeAppointments = [];
      setAppointments(fakeAppointments);
    } catch (error) {
      console.error('Error al obtener citas:', error);
    } finally {
      setLoading(false);
    }
  };

  const isTimeSlotAvailable = (date, time) => {
    return !appointments.some(appointment => appointment.date === date && appointment.time === time);
  };

  const isWithinSchedule = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return (hours >= 8 && hours < 17) && (minutes === 0 || minutes === 30);
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    const { date, time, patient, reason } = newAppointment;

    if (!date || !time || !patient || !selectedDoctor || !reason) {
      alert('⚠ Completa todos los campos.');
      return;
    }

    if (!isWithinSchedule(time)) {
      alert('❌ El horario debe ser entre 08:00 y 16:30 en intervalos de 30 minutos.');
      return;
    }

    if (!isTimeSlotAvailable(date, time)) {
      alert('❌ Ya hay una cita programada en este horario.');
      return;
    }

    const newCita = { id: appointments.length + 1, date, time, patient, doctor: selectedDoctor.name, reason, status: "pending" };
    setAppointments([...appointments, newCita]);
    alert('✅ Cita agendada exitosamente.');
    setNewAppointment({ date: '', time: '', patient: '', reason: '' });
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Agenda de Consultas</h1>
        <Link to="/dashboard" className="back-button">← Regresar</Link>
      </div>

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
                  <strong>Estado:</strong> {appointment.status === 'pending' ? '⏳ Pendiente' : '✅ Aprobado'} <br />
                </li>
              ))
          )}
        </ul>
      )}

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
          {selectedDoctor ? (
            <p className="selected-doctor">
              {selectedDoctor.name} - {selectedDoctor.specialty}
              <Link to="/hospital/doctorcatalog" className="change-doctor"> (Cambiar)</Link>
            </p>
          ) : (
            <Link to="/hospital/doctorcatalog" className="select-doctor-link">Seleccionar Doctor</Link>
          )}
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
