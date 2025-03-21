import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar as AntdCalendar, Input, Button, Checkbox, TimePicker } from "antd";
import { motion } from "framer-motion";
import Calendar from "react-calendar"; 
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: null, 
    patient: "",
    reason: "",
    insured: false,
  });
  const [insuranceMessage, setInsuranceMessage] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const navigate = useNavigate();

  // Carga inicial
  useEffect(() => {
    const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    setAppointments(storedAppointments);

    const storedDoctor = localStorage.getItem("selectedDoctor");
    if (storedDoctor) {
      setSelectedDoctor(JSON.parse(storedDoctor));
    }
  }, []);

  // Guardado local
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const formatDate = (dateObj) => dateObj.toISOString().split("T")[0];

  // Filtrar las citas del día seleccionado
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.date === formatDate(selectedDate)
  );

  // Verificar si está disponible la hora elegida
  const isTimeSlotAvailable = (date, time) => {
    return !appointments.some(
      (appointment) => appointment.date === date && appointment.time === time
    );
  };

  // Validar que la hora esté entre 08:00 y 16:30 y en intervalos de 30 min
  const isValidAppointmentTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const appointmentTime = hours * 60 + minutes;
    return (
      appointmentTime >= 480 && 
      appointmentTime <= 990 && 
      minutes % 30 === 0
    );
  };

  // Navegar al catálogo de doctores
  const handleSelectDoctor = () => {
    navigate("/hospital/doctorcatalog");
  };

  // Manejar cambio de checkbox de seguro
  const handleInsuranceCheck = (e) => {
    setNewAppointment((prev) => ({
      ...prev,
      insured: e.target.checked,
    }));
  };

  // Agregar nueva cita
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

    // Convertimos el objeto dayjs a string "HH:mm"
    const timeString = time.format("HH:mm");

    if (!isValidAppointmentTime(timeString)) {
      alert("⚠ La hora de la cita debe estar entre 08:00 y 16:30 en intervalos de 30 minutos.");
      return;
    }

    if (!isTimeSlotAvailable(date, timeString)) {
      alert("⚠ Ya existe una cita en esta fecha y hora. Elige otra.");
      return;
    }

    const newCita = {
      id: Date.now(),
      date,
      time: timeString,
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
      time: null,
      patient: "",
      reason: "",
      insured: false,
    });
  };

  // Borrar todas las citas
  const handleClearAppointments = () => {
    localStorage.removeItem("appointments");
    setAppointments([]);
  };

  return (
    <div className="private-page-container">
      <header className="private-page-header">
        <h1>Agenda de Consultas</h1>
        <Link to="/hospital/dashboard" className="private-back-button">
          ← Regresar
        </Link>
      </header>

      <div className="private-dashboard-container">
        {/* Panel de Calendario (react-calendar) */}
        <motion.div
          className="private-panel private-calendar-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Calendario</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </motion.div>

        {/* Panel para agendar cita */}
        <motion.div
          className="private-panel private-form-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Agendar Nueva Cita</h2>

          <div className="private-form-group">
            <label>Doctor:</label>
            {selectedDoctor ? (
              <p>
                {selectedDoctor.name} - {selectedDoctor.specialty}{" "}
                <Button onClick={handleSelectDoctor} style={{ marginLeft: "10px" }}>
                  Cambiar
                </Button>
              </p>
            ) : (
              <Button onClick={handleSelectDoctor} type="primary">
                Seleccionar Doctor
              </Button>
            )}
          </div>

          <form onSubmit={handleAddAppointment}>
            <div className="private-form-group">
              <label>Fecha:</label>
              <Input
                type="date"
                value={newAppointment.date}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, date: e.target.value })
                }
                required
                className="private-input"
              />
            </div>

            <div className="private-form-group">
              <label>Hora:</label>
              <TimePicker
                format="HH:mm"
                minuteStep={30}
                value={newAppointment.time}
                onChange={(timeVal) => {
                  setNewAppointment({ ...newAppointment, time: timeVal });
                }}
                className="private-input"
              />
            </div>

            <div className="private-form-group">
              <label>Paciente:</label>
              <Input
                placeholder="Nombre del paciente"
                value={newAppointment.patient}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, patient: e.target.value })
                }
                required
                className="private-input"
              />
            </div>

            <div className="private-form-group private-checkbox-group">
              <Checkbox
                checked={newAppointment.insured}
                onChange={handleInsuranceCheck}
              >
                Paciente asegurado
              </Checkbox>
              {insuranceMessage && (
                <p className="private-insurance-message">{insuranceMessage}</p>
              )}
            </div>

            <div className="private-form-group">
              <label>Motivo:</label>
              <Input
                placeholder="Motivo de la consulta"
                value={newAppointment.reason}
                onChange={(e) =>
                  setNewAppointment({ ...newAppointment, reason: e.target.value })
                }
                required
                className="private-input"
              />
            </div>

            <Button htmlType="submit" type="primary" block style={{ marginTop: "10px" }}>
              Agendar Cita
            </Button>
          </form>
        </motion.div>

        {/* Panel de citas agendadas */}
        <motion.div
          className="private-panel private-appointments-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Citas para el {formatDate(selectedDate)}</h2>
          {filteredAppointments.length === 0 ? (
            <p className="private-no-appointments">No hay citas para este día.</p>
          ) : (
            <ul className="private-appointments-list">
              {filteredAppointments.map((appointment) => (
                <li key={appointment.id} className="private-appointment-item">
                  <span>
                    {appointment.time} - {appointment.patient} con {appointment.doctor}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>

        <div className="private-clear-appointments">
          <Button danger onClick={handleClearAppointments}>
            Borrar Todas las Citas
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Appointments;
