import React, { useEffect, useState } from "react";
import { Card, Button, Form, Input, message } from "antd";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("auth_token="))
    ?.split("=")[1];

  const decoded = token ? jwtDecode(token) : null;
  const doctorId = decoded?.user_id;

  const fetchAppointments = async () => {
    try {
      const res = await fetch("http://localhost/hospital_api/getDoctorAppointments.php", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        message.error(data.message || "No se pudieron cargar las citas.");
      }
    } catch {
      message.error("Error de conexión");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleToggleAppointment = (appointment) => {
    if (selectedAppointment?.id === appointment.id) {
      setSelectedAppointment(null); // Ocultar formulario
    } else {
      setSelectedAppointment(appointment);
      form.resetFields();
    }
  };

  const onFinish = async (values) => {
    const body = {
      hospital_code: "00256", // Código fijo
      appointment_id: selectedAppointment.id,
      fecha: dayjs().format("YYYY-MM-DD"),
      paciente_id: selectedAppointment.paciente_id,
      doctor_id: selectedAppointment.doctor_id,
      colegiado: selectedAppointment.colegiado,
      especialidad: selectedAppointment.especialidad,
      ...values,
    };

    try {
      const res = await fetch("http://localhost/hospital_api/createPrescription.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        message.success("Receta generada correctamente");
        setSelectedAppointment(null);
        fetchAppointments();
      } else {
        message.error(data.message || "Error al generar receta");
      }
    } catch {
      message.error("Error de conexión");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Mis Citas</h2>

      <Button type="default" onClick={() => navigate("/dashboard")} style={{ marginBottom: 20 }}>
        ← Volver al Dashboard
      </Button>

      {appointments.length === 0 ? (
        <p>No tienes citas programadas.</p>
      ) : (
        appointments.map((app) => (
          <Card key={app.id} style={{ marginBottom: 10 }}>
            <p><strong>Paciente:</strong> {app.paciente}</p>
            <p><strong>Fecha:</strong> {app.fecha} - <strong>Hora:</strong> {app.hora}</p>
            <p><strong>Motivo:</strong> {app.motivo}</p>
            <Button onClick={() => handleToggleAppointment(app)} type="primary">
              {selectedAppointment?.id === app.id ? "Ocultar Formulario" : "Generar Receta"}
            </Button>
          </Card>
        ))
      )}

      {selectedAppointment && (
        <Card title="Formulario de Receta" style={{ marginTop: 20 }}>
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item name="medicamento" label="Medicamento" rules={[{ required: true }]}>
              <Input.TextArea rows={2} placeholder="Nombre comercial o genérico" />
            </Form.Item>

            <Form.Item name="principio_activo" label="Principio Activo" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="concentracion" label="Concentración" rules={[{ required: true }]}>
              <Input placeholder="Ej: 500mg" />
            </Form.Item>

            <Form.Item name="presentacion" label="Presentación" rules={[{ required: true }]}>
              <Input placeholder="Ej: Tabletas, jarabe, inyectable..." />
            </Form.Item>

            <Form.Item name="forma_farmaceutica" label="Forma Farmacéutica" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name="dosis" label="Dosis" rules={[{ required: true }]}>
              <Input placeholder="Ej: 1 tableta" />
            </Form.Item>

            <Form.Item name="frecuencia" label="Frecuencia" rules={[{ required: true }]}>
              <Input placeholder="Ej: Cada 8 horas" />
            </Form.Item>

            <Form.Item name="duracion" label="Duración" rules={[{ required: true }]}>
              <Input placeholder="Ej: 5 días" />
            </Form.Item>

            <Form.Item name="diagnostico" label="Diagnóstico" rules={[{ required: true }]}>
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item name="anotaciones" label="Anotaciones / Notas Especiales">
              <Input.TextArea rows={2} />
            </Form.Item>

            <Button htmlType="submit" type="primary" block>
              Guardar Receta
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default DoctorAppointments;
