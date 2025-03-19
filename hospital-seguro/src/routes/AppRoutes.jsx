import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

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
    <>
      <Header />
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/*" element={<PublicRoutes setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/hospital/*" element={<PrivateRoutes allowedRole="doctor" />} />
        <Route path="/admin/*" element={<PrivateRoutes allowedRole="admin" />} />
        <Route path="/acceso-denegado" element={<p>Acceso Denegado</p>} />
      </Routes>
    </>
  );
};

export default AppRoutes;
