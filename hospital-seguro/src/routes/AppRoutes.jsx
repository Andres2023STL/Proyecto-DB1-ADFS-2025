import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import DashboardRedirect from "./DashboardRedirect";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost/hospital_api/getUser.php", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setIsAuthenticated(data.success);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="page-container">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <main className="main-content">
        <Routes>
          <Route path="/*" element={<PublicRoutes setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          <Route path="/hospital/*" element={<PrivateRoutes allowedRole="doctor" />} />
          <Route path="/admin/*" element={<PrivateRoutes allowedRole="admin" />} />
          <Route path="/seguro/*" element={<PrivateRoutes allowedRole="empleado_seguro" />} />
          <Route path="/acceso-denegado" element={<p>Acceso Denegado</p>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default AppRoutes;
