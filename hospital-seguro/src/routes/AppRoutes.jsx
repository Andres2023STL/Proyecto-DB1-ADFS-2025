// Importación de componentes y hooks de React y React Router
import { Routes, Route } from "react-router-dom"; // Para definir las rutas de la aplicación
import { useState, useEffect } from "react";       // Hooks para manejar estado y efectos secundarios

// Importación de componentes personalizados
import Navbar from "../components/Navbar";         // Barra de navegación principal
import Footer from "../components/Footer";         // Pie de página
import PublicRoutes from "./PublicRoutes";         // Rutas públicas (login, registro, etc.)
import PrivateRoutes from "./PrivateRoutes";       // Rutas privadas protegidas por roles
import DashboardRedirect from "./DashboardRedirect"; // Redirecciona al dashboard según rol

// Componente principal que define todas las rutas de la aplicación
const AppRoutes = () => {
  // Estado que indica si el usuario está autenticado
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect se ejecuta al montar el componente para verificar si el usuario tiene una sesión activa
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Llamada a la API para obtener el usuario autenticado
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include", // Incluye cookies para autenticación con sesión
        });
        const data = await response.json();
        // Si la respuesta indica éxito, se actualiza el estado de autenticación
        setIsAuthenticated(data.success);
      } catch (error) {
        // Si hay error, se asume que no está autenticado
        setIsAuthenticated(false);
      }
    };

    checkAuth(); // Se ejecuta la verificación al cargar el componente
  }, []);

  return (
    <div className="page-container">
      {/* Barra de navegación con props de autenticación */}
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

      {/* Contenedor principal de contenido */}
      <main className="main-content">
        <Routes>
          {/* Rutas públicas: login, registro, etc. */}
          <Route path="/*" element={<PublicRoutes setIsAuthenticated={setIsAuthenticated} />} />

          {/* Redirección al dashboard según el rol del usuario */}
          <Route path="/dashboard" element={<DashboardRedirect />} />

          {/* Rutas protegidas para médicos */}
          <Route path="/hospital/*" element={<PrivateRoutes allowedRole="doctor" />} />

          {/* Rutas protegidas para administradores */}
          <Route path="/admin/*" element={<PrivateRoutes allowedRole="admin" />} />

          {/* Rutas protegidas para empleados de seguro */}
          <Route path="/seguro/*" element={<PrivateRoutes allowedRole="empleado_seguro" />} />

          {/* Rutas protegidas para empleados del hospital, distinta al hospital para que no colisionen */}
          <Route path="/hospital-empleado/*" element={<PrivateRoutes allowedRole="empleado_hospital" />} />

          {/* Ruta para acceso denegado */}
          <Route path="/acceso-denegado" element={<p>Acceso Denegado</p>} />
        </Routes>
      </main>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default AppRoutes; // Exporta el componente para ser usado en la aplicación

