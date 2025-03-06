import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appointmentsData from '../../../data/appointmentsC.json';
import '../../../styles/AppointmentsControl.css'

function AppointmentsControl() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(appointmentsData);
  }, []);

  return (
    <div>
      <h1>Gestión de Citas</h1>
      <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      <ul>
        {appointments.map((cita) => (
          <li key={cita.id}>
            {cita.date} - {cita.time} | {cita.patient} - <strong>{cita.status}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentsControl;
