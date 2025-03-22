import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardRedirect = () => {
  // Estado para indicar si la carga de información del usuario está en proceso
  const [loading, setLoading] = useState(true);
  // Hook para realizar redirecciones programáticas
  const navigate = useNavigate();

  useEffect(() => {
    // Función asíncrona para obtener el rol del usuario desde la API
    const fetchUserRole = async () => {
      try {
        // Solicita al backend los datos del usuario, incluyendo la cookie de sesión
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        // Si la respuesta es exitosa y se obtiene un rol, se procesa y se redirige
        if (data.success && data.role) {
          // Normaliza el rol eliminando espacios y pasando a minúsculas
          const role = data.role.trim().toLowerCase();

          // Redirige al dashboard correspondiente según el rol del usuario
          if (role === "doctor") {
            navigate("/hospital/dashboard");
          } else if (role === "admin") {
            navigate("/admin/admindashboard");
          } else if (role === "empleado_seguro") {
            navigate("/seguro/SeguroEmpleadoDashboard");
          } else {
            // Si el rol no coincide con ninguno de los permitidos, se redirige a acceso denegado
            navigate("/acceso-denegado");
          }
        } else {
          // Si la respuesta no es exitosa o no se obtiene un rol, se redirige al login
          navigate("/login");
        }
      } catch (error) {
        // En caso de error durante la petición, se redirige al login
        navigate("/login");
      } finally {
        // Se finaliza la carga, independientemente del resultado
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [navigate]);

  // Mientras se obtiene la información del usuario, muestra un mensaje de carga
  if (loading) return <p>Cargando...</p>;
  // Una vez redirigido, no se renderiza ningún contenido adicional
  return null;
};

export default DashboardRedirect;
