import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

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

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!role) {
        return <p>Error: No se pudo obtener el rol.</p>;
    }

    return (
        <div className="dashboard-container">
            <h1>¡Bienvenido, Empleado seguro!</h1>
            <Link to="/seguro/Approvals" className="dashboard-card">
                <h3>Aprobaciones</h3>
                <p>Aquí los empleados del seguro pueden aprobar o rechazar servicios.</p>
            </Link>
            <Link to="/seguro/InsuranceClients" className="dashboard-card">
                <h3>Clientes Seguro</h3>
                <p>Aquí se pueden administrar los clientes asegurados.</p>
            </Link>
            <Link to="/seguro/Reports" className="dashboard-card">
                <h3>Reportes Operativos</h3>
                <p>Genera reportes de actividad.</p>
            </Link>
            <Link to="/seguro/CatalogoSeguro" className="dashboard-card">
                <h3>Catálogo Seguro</h3>
                <p>Consulta el catálogo de servicios cubiertos.</p>
            </Link>
            <Link to="/seguro/CatalogoMedicina" className="dashboard-card">
                <h3>Catálogo Medicina</h3>
                <p>Consulta el catálogo de medicinas cubierta.</p>
            </Link>
        </div>
    );
}


export default SeguroEmpleadoDashboard;
