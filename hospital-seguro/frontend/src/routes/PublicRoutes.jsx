import { Routes, Route } from "react-router-dom";
import SubHomeHospital from "../pages/portal/home/SubHomeHospital";
import SubHomeSeguro from "../pages/portal/home/SubHomeSeguro";
import Home from "../pages/portal/home/Home";
import Contacto from "../pages/portal/Contacto";
import Register from "../pages/auth/Register";
import AboutUs from "../pages/portal/AboutUs";
import Login from "../pages/auth/Login";
import Faq from "../pages/portal/Faq";




const PublicRoutes = ({ setIsAuthenticated }) => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/SubHomeHospital" element={<SubHomeHospital />} />
      <Route path="/SubHomeSeguro" element={<SubHomeSeguro />} />
      <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/AboutUs" element={<AboutUs />} />
      <Route path="/Contacto" element={<Contacto />} />
      <Route path="/Faq" element={<Faq />} />
    </Routes>
  );
};

export default PublicRoutes;