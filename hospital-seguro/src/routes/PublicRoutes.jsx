import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import SubHomeHospital from "../pages/home/SubHomeHospital";
import SubHomeSeguro from "../pages/home/SubHomeSeguro";
import Login from "../pages/Login"; // ✅ Importa Login correctamente
import Register from "../pages/Register";
import AboutUs from "../pages/AboutUs";
import DoctorDashboard from "../modules/hospital/pages/doctor/DoctorDashboard";

const PublicRoutes = ({ setIsAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SubHomeHospital" element={<SubHomeHospital />} />
      <Route path="/SubHomeSeguro" element={<SubHomeSeguro />} />
      <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/DoctorDashboard" element={<DoctorDashboard />} />
    </Routes>
  );
};

export default PublicRoutes;
