import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: "",
    patient: "",
    reason: "",
    insured: false,
  });
  const [insuranceMessage, setInsuranceMessage] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);

    const storedDoctor = localStorage.getItem("selectedDoctor");
    if (storedDoctor) {
      setSelectedDoctor(JSON.parse(storedDoctor));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const formatDate = (dateObj) => dateObj.toISOString().split("T")[0];

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === formatDate(selectedDate)
  );

  const isTimeSlotAvailable = (date, time) => {
    return !appointments.some(
      (appointment) => appointment.date === date && appointment.time === time
    );
  };

  const isValidAppointmentTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const appointmentTime = hours * 60 + minutes;
    return (
      appointmentTime >= 480 && appointmentTime <= 990 && minutes % 30 === 0
    );
  };

  const handleSelectDoctor = () => {
    navigate("/hospital/doctorcatalog");
  };

  const handleInsuranceCheck = (e) => {
    setNewAppointment((prev) => ({
      ...prev,
      insured: e.target.checked,
    }));
  };

  const handleAddAppointment = (e) => {
    e.preventDefault();
    const { date, time, patient, reason, insured } = newAppointment;

    if (!date || !time || !patient || !reason) {
      alert("⚠ Completa todos los campos.");
      return;
    }

    if (!selectedDoctor) {
      alert("⚠ Debes seleccionar un doctor.");
      navigate("/hospital/doctorcatalog");
      return;
    }

    if (!isValidAppointmentTime(time)) {
      alert("⚠ La hora de la cita debe estar entre 08:00 y 16:30 en intervalos de 30 minutos.");
      return;
    }

    if (!isTimeSlotAvailable(date, time)) {
      alert("⚠ Ya existe una cita en esta fecha y hora. Elige otra.");
      return;
    }

    const newCita = {
      id: Date.now(),
      date,
      time,
      patient,
      doctor: selectedDoctor.name,
      reason,
      insured,
      status: "pending",
      approved: false,
      authorization: null,
      copay: insured ? "Q50" : "N/A",
      description: "",
    };

    const updatedAppointments = [...appointments, newCita];
    setAppointments(updatedAppointments);
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

    alert("✅ Cita agendada exitosamente.");
    setNewAppointment({
      date: "",
      time: "",
      patient: "",
      reason: "",
      insured: false,
    });
  };

  const handleClearAppointments = () => {
    localStorage.removeItem("appointments");
    setAppointments([]);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Agenda de Consultas</h1>
        <Link to="/hospital/dashboard" className="back-button">← Regresar</Link>
      </header>

      <div className="dashboard-container">
        {/* Panel del Calendario */}
        <div className="panel calendar-panel">
          <h2>Calendario</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>

        {/* Panel de Agendar Cita */}
        <div className="panel form-panel">
          <h2>Agendar Nueva Cita</h2>

          {/* 🔥 SELECCIÓN DE DOCTOR */}
          <div className="form-group">
            <label>Doctor:</label>
            {selectedDoctor ? (
              <p className="selected-doctor">
                {selectedDoctor.name} - {selectedDoctor.specialty}
                <button onClick={handleSelectDoctor} className="change-doctor">
                  Cambiar
                </button>
              </p>
            ) : (
              <button onClick={handleSelectDoctor} className="select-doctor">
                Seleccionar Doctor
              </button>
            )}
          </div>

          <form onSubmit={handleAddAppointment} className="appointment-form">
            <div className="form-group">
              <label>Fecha:</label>
              <input
                type="date"
                value={newAppointment.date}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, date: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Hora:</label>
              <input
                type="time"
                step="1800"
                value={newAppointment.time}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, time: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Paciente:</label>
              <input
                type="text"
                placeholder="Nombre del paciente"
                value={newAppointment.patient}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    patient: e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={newAppointment.insured}
                  onChange={handleInsuranceCheck}
                />
                Paciente asegurado
              </label>
              {insuranceMessage && (
                <p className="insurance-message">{insuranceMessage}</p>
              )}
            </div>

            <div className="form-group">
              <label>Motivo:</label>
              <input
                type="text"
                placeholder="Motivo de la consulta"
                value={newAppointment.reason}
                onChange={(e) =>
                  setNewAppointment({
                    ...newAppointment,
                    reason: e.target.value,
                  })
                }
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Agendar Cita
            </button>
          </form>
        </div>

        {/* 🔥 Panel de Citas Agendadas */}
        <div className="panel appointments-panel">
          <h2>Citas para el {formatDate(selectedDate)}</h2>
          {filteredAppointments.length === 0 ? (
            <p className="no-appointments">No hay citas para este día.</p>
          ) : (
            <ul className="appointments-list">
              {filteredAppointments.map((appointment) => (
                <li key={appointment.id} className="appointment-item">
                  <span>
                    {appointment.time} - {appointment.patient} con{" "}
                    {appointment.doctor}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 🔥 Botón para limpiar citas */}
        <div className="clear-appointments">
          <button onClick={handleClearAppointments}>Borrar Todas las Citas</button>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
