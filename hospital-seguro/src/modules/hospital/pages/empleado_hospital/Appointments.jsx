import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar as AntdCalendar, Select, Button, Checkbox, TimePicker, Input, message } from "antd";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import dayjs from "dayjs";

const { Option } = Select;

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]); // ✅ Inicializado como arreglo vacío
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    date: "",
    time: null,
    paciente_id: undefined,
    reason: "",
    insured: false,
  });

  const navigate = useNavigate();
  const formatDate = (dateObj) => dateObj.toISOString().split("T")[0];

  useEffect(() => {
    fetchAppointments();
    fetchPatients();

    const storedDoctor = localStorage.getItem("selectedDoctor");
    if (storedDoctor) {
      setSelectedDoctor(JSON.parse(storedDoctor));
    }
  }, [selectedDate]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost/hospital_api/getAppointments.php?date=" + formatDate(selectedDate), {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        message.error("Error al cargar citas: " + data.message);
      }
    } catch {
      message.error("Error de conexión al obtener citas");
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await fetch("http://localhost/hospital_api/getPacientes.php", {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.patients)) {
        setPatients(data.patients);
      } else {
        setPatients([]); // fallback seguro
        message.error("Error al cargar pacientes");
      }
    } catch {
      setPatients([]); // fallback ante error de conexión
      message.error("Error de conexión al obtener pacientes");
    }
  };

  const isValidAppointmentTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    const appointmentTime = hours * 60 + minutes;
    return appointmentTime >= 480 && appointmentTime <= 990 && minutes % 30 === 0;
  };

  const handleAddAppointment = async (e) => {
    e.preventDefault();
    const { date, time, paciente_id, reason, insured } = newAppointment;

    if (!date || !time || !paciente_id || !reason || !selectedDoctor) {
      message.warning("Completa todos los campos y selecciona un doctor");
      return;
    }

    const timeString = time.format("HH:mm");
    if (!isValidAppointmentTime(timeString)) {
      message.warning("La hora debe estar entre 08:00 y 16:30 en intervalos de 30 minutos");
      return;
    }

    const body = {
      fecha: date,
      hora: timeString,
      paciente_id,
      motivo: reason,
      asegurado: insured,
      doctor_id: selectedDoctor.id,
    };

    try {
      const res = await fetch("http://localhost/hospital_api/createAppointment.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (data.success) {
        message.success("✅ Cita agendada correctamente");
        setNewAppointment({
          date: "",
          time: null,
          paciente_id: null,
          reason: "",
          insured: false,
        });
        fetchAppointments();
      } else {
        message.error("❌ " + data.message);
      }
    } catch {
      message.error("Error al guardar la cita");
    }
  };

  return (
    <div className="private-page-container">
      <header className="private-page-header">
        <h1>Agenda de Consultas</h1>
        <Link to="/hospital-empleado/HospitalEmpleadoDashboard" className="private-back-button">
          ← Regresar
        </Link>
      </header>

      <div className="private-dashboard-container">
        {/* Calendario */}
        <motion.div className="private-panel private-calendar-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Calendario</h2>
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </motion.div>

        {/* Formulario */}
        <motion.div className="private-panel private-form-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Agendar Nueva Cita</h2>

          <div className="private-form-group">
            <label>Doctor:</label>
            {selectedDoctor ? (
              <p>{selectedDoctor.name} - {selectedDoctor.specialty} <Button onClick={() => navigate("/hospital-empleado/doctorcatalog")}>Cambiar</Button></p>
            ) : (
              <Button onClick={() => navigate("/hospital-empleado/doctorcatalog")} type="primary">Seleccionar Doctor</Button>
            )}
          </div>

          <form onSubmit={handleAddAppointment}>
            <div className="private-form-group">
              <label>Fecha:</label>
              <Input type="date" value={newAppointment.date}
                onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })}
              />
            </div>

            <div className="private-form-group">
              <label>Hora:</label>
              <TimePicker
                format="HH:mm"
                minuteStep={30}
                value={newAppointment.time}
                onChange={(timeVal) => setNewAppointment({ ...newAppointment, time: timeVal })}
              />
            </div>

            <div className="private-form-group">
              <label>Paciente:</label>
              <Select
                showSearch
                placeholder="Selecciona un paciente"
                value={newAppointment.paciente_id}
                onChange={(value) => setNewAppointment({ ...newAppointment, paciente_id: value })}
                filterOption={(input, option) =>
                  (option?.children ?? "").toLowerCase().includes(input.toLowerCase())
                }
              >
                {patients.length > 0 ? (
                  patients.map((p) => (
                    <Option key={p.id} value={p.id}>
                      {p.nombre}
                    </Option>
                  ))
                ) : (
                  <Option disabled value="none">No hay pacientes disponibles</Option>

                )}
              </Select>
            </div>

            <div className="private-form-group">
              <Checkbox
                checked={newAppointment.insured}
                onChange={(e) => setNewAppointment({ ...newAppointment, insured: e.target.checked })}
              >
                Paciente asegurado
              </Checkbox>
            </div>

            <div className="private-form-group">
              <label>Motivo:</label>
              <Input
                value={newAppointment.reason}
                onChange={(e) => setNewAppointment({ ...newAppointment, reason: e.target.value })}
              />
            </div>

            <Button htmlType="submit" type="primary" block style={{ marginTop: "10px" }}>
              Agendar Cita
            </Button>
          </form>
        </motion.div>

        {/* Citas del día */}
        <motion.div className="private-panel private-appointments-panel"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2>Citas para el {formatDate(selectedDate)}</h2>
          {appointments.length === 0 ? (
            <p className="private-no-appointments">No hay citas para este día.</p>
          ) : (
            <ul className="private-appointments-list">
              {appointments.map((appointment) => (
                <li key={appointment.id} className="private-appointment-item">
                  <span>{appointment.hora} - {appointment.paciente} con {appointment.doctor_name}</span>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default Appointments;
