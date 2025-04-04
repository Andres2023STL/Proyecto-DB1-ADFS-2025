import { Routes, Route } from "react-router-dom";
import EmpleadoHospitalProfileForm from "../hospital/pages/empleado_hospital/EmpleadoHospitalProfileForm"
import HospitalEmpleadoDashboard from "./pages/empleado_hospital/HospitalEmpleadoDashboard";
import Appointments from "./pages/empleado_hospital/Appointments";
import DoctorCatalog from "./pages/doctor/DoctorCatalog";
import DoctorDetails from "./pages/doctor/DoctorDetails";

const EmpleadoHospitalRoutes = () => {
  return (
    <Routes>
      <Route path="HospitalEmpleadoDashboard" element={<HospitalEmpleadoDashboard />} />
      <Route path="EmpleadoHospitalProfileForm" element={<EmpleadoHospitalProfileForm />} />
      <Route path="Appointments" element={<Appointments />} />
      <Route path="doctorcatalog" element={<DoctorCatalog />} />
      <Route path="doctordetails/:id" element={<DoctorDetails />} />
      {/* Más rutas del empleado hospitalario */}
      <Route path="*" element={<p>Ruta no encontrada en EmpleadoHospitalRoutes</p>} />
    </Routes>
  );
};

export default EmpleadoHospitalRoutes;
