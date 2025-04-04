import React, { useEffect, useState } from "react";
import { Typography, List, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../../../components/DashboardLayout";
import dayjs from "dayjs";

const { Title } = Typography;

function PacienteCitas() {
  const [loading, setLoading] = useState(true);
  const [citas, setCitas] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCitas = async () => {
      const today = dayjs().format("YYYY-MM-DD");
      try {
        const res = await fetch("http://localhost/hospital_api/getMyAppointments.php?date=" + today, {
          credentials: "include"
        });
        const data = await res.json();
        if (data.success) {
          setCitas(data.appointments);
        } else {
          setError(data.message || "Error al obtener citas");
        }
      } catch {
        setError("Error de conexión");
      } finally {
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  return (
    <DashboardLayout title="Mis Citas">
      <div style={{ marginBottom: "20px" }}>
        <Button onClick={() => navigate("/paciente/PacienteDashboard")}>
          ← Regresar al Dashboard
        </Button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : citas.length === 0 ? (
        <p>No tienes citas para hoy.</p>
      ) : (
        <List
          dataSource={citas}
          renderItem={(item) => (
            <List.Item>
              <Card style={{ width: "100%" }}>
                <p><strong>Hora:</strong> {item.hora}</p>
                <p><strong>Motivo:</strong> {item.motivo || "No especificado"}</p>
                <p><strong>Doctor:</strong> {item.doctor}</p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </DashboardLayout>
  );
}

export default PacienteCitas;
