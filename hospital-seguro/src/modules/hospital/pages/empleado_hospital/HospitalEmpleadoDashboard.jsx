import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from"../../../../components/DashboardLayout.jsx";
import DashboardLinkCard from "../../../../components/DashboardLinkCard";

function HospitalEmpleadoDashboard() {
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
  
    if (loading) return <p>Cargando...</p>;
    if (!role) return <p>Error: No se pudo obtener el rol.</p>;
  
    return (
      <DashboardLayout title="¡Bienvenido, Empleado!">
        <div className="dashboard-link-container">
          <DashboardLinkCard 
            title="" 
            description="" 
            link=""
          />
        </div>
      </DashboardLayout>
    );
  }
  
  export default HospitalEmpleadoDashboard;