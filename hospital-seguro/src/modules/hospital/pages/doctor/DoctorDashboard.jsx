import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function DoctorDashboard() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();
        if (data.success) {
          setRole(data.role);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!role) {
    return <p>Error: No se pudo obtener el rol.</p>;
  }

  return (
    <div className="dashboard-container">
      <h1>¡Bienvenido, Doctor!</h1>
      <Link to="/hospital/appointments">Ir a Citas</Link>  
      <Link to="/hospital/patienthistory">Historial de Pacientes</Link>
      <Link to="/hospital/recetas">Gestión de Recetas</Link>
    </div>
  );
}

export default DoctorDashboard;
