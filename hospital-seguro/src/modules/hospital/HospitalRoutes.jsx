import { Routes, Route } from "react-router-dom";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Appointments from "./pages/doctor/Appointments";
import DoctorCatalog from "./pages/doctor/DoctorCatalog";
import DoctorDetails from "./pages/doctor/DoctorDetails";
import PatientHistory from "./pages/doctor/PatientHistory";
import Recetas from "./pages/doctor/Recetas";

const HospitalRoutes = () => {
  return (
    <Routes>
      {/* Define las rutas para la sección de hospital, cada <Route> mapea una dirección a un componente específico */}
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="doctorcatalog" element={<DoctorCatalog />} />
      <Route path="doctordetails/:id" element={<DoctorDetails />} />
      <Route path="patienthistory" element={<PatientHistory />} />
      <Route path="recetas" element={<Recetas />} />
      <Route path="*" element={<p>Ruta no encontrada en HospitalRoutes</p>} />
    </Routes>
  );
};

export default HospitalRoutes;
