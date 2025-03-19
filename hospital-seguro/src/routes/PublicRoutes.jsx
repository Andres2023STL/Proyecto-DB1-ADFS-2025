import { Routes, Route } from "react-router-dom";
import DoctorDashboard from "../modules/hospital/pages/doctor/DoctorDashboard";
import SubHomeHospital from "../pages/home/SubHomeHospital";
import SubHomeSeguro from "../pages/home/SubHomeSeguro";
import Contacto from "../pages/Contacto";
import Register from "../pages/Register";
import AboutUs from "../pages/AboutUs";
import Home from "../pages/home/Home";
import Login from "../pages/Login";
import Faq from "../pages/Faq";




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
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/Faq" element={<Faq />} />
    </Routes>
  );
};

export default PublicRoutes;
