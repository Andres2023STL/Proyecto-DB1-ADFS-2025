import React, { useEffect, useState } from "react";
import { Typography, List, Card, Button } from "antd";
import DashboardLayout from "../../../../components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

function PacienteHistorial() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [historial, setHistorial] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const res = await fetch("http://localhost/hospital_api/getMyPatientHistory.php", {
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          setHistorial(data.paciente);
        } else {
          setError(data.message || "Error al cargar historial");
        }
      } catch {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorial();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!historial) return <p>No se encontró historial.</p>;

  return (
    <DashboardLayout title="Historial Médico">
      <Card>
        <Paragraph><strong>Nombre:</strong> {historial.nombre}</Paragraph>
        <Paragraph><strong>Documento:</strong> {historial.documento}</Paragraph>
        <Paragraph><strong>Fecha de nacimiento:</strong> {historial.fecha_nacimiento}</Paragraph>
        <Paragraph><strong>Seguro:</strong> {historial.seguro}</Paragraph>
        <Paragraph><strong>Código seguro:</strong> {historial.codigo_seguro || "No aplica"}</Paragraph>
        <Paragraph><strong>Última visita:</strong> {historial.ultima_visita || "No disponible"}</Paragraph>
        <Paragraph><strong>Diagnóstico:</strong> {historial.diagnostico || "No disponible"}</Paragraph>
        <Paragraph>
          <strong>Medicamentos:</strong>{" "}
          {historial.medicamentos.length > 0 ? historial.medicamentos.join(", ") : "Ninguno"}
        </Paragraph>

        <Title level={4}>Últimas Citas</Title>
        <List
          size="small"
          dataSource={historial.citas}
          renderItem={(cita) => (
            <List.Item>
              {cita.fecha} - {cita.hora} - {cita.motivo || "Sin motivo"}
            </List.Item>
          )}
        />

        <Button
          type="primary"
          style={{ marginTop: "16px" }}
          onClick={() => navigate("/paciente/PacienteDashboard")}
        >
          ← Volver al Dashboard
        </Button>
      </Card>
    </DashboardLayout>
  );
}

export default PacienteHistorial;
