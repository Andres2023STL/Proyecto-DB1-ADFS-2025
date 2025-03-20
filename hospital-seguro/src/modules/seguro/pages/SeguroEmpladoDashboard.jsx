import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from"../../../components/DashboardLayout.jsx";
import DashboardLinkCard from "../../../components/DashboardLinkCard";

function SeguroEmpleadoDashboard() {
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
    <DashboardLayout title="¡Bienvenido, Empleado seguro!">
      <div className="dashboard-link-container">
        <DashboardLinkCard 
          title="Aprobaciones" 
          description="Aprueba o rechaza servicios." 
          link="/seguro/Approvals" 
        />
        <DashboardLinkCard 
          title="Clientes Seguro" 
          description="Administra los clientes asegurados." 
          link="/seguro/InsuranceClients" 
        />
        <DashboardLinkCard 
          title="Reportes Operativos" 
          description="Genera reportes de actividad." 
          link="/seguro/Reports" 
        />
        <DashboardLinkCard 
          title="Catálogo Seguro" 
          description="Consulta el catálogo de servicios cubiertos." 
          link="/seguro/CatalogoSeguro" 
        />
        <DashboardLinkCard 
          title="Catálogo Medicina" 
          description="Consulta el catálogo de medicinas cubiertas." 
          link="/seguro/CatalogoMedicina" 
        />
      </div>
    </DashboardLayout>
  );
}

export default SeguroEmpleadoDashboard;
