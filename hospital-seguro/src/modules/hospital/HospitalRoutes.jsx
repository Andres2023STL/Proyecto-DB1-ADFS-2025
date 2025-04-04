import { Routes, Route } from "react-router-dom";
import DoctorProfileForm from "./pages/doctor/DoctorProfileForm";
import PacienteProfileForm from "./pages/paciente/PacienteProfileForm";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import Appointments from "./pages/doctor/DoctorAppointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import PatientHistory from "./pages/doctor/PatientHistory";
import Recetas from "./pages/doctor/Recetas";
import HospitalEmpleadoDashboard from "./pages/empleado_hospital/HospitalEmpleadoDashboard";
import PatientRegister from "./pages/empleado_hospital/PatientRegister";
import PacienteDashboard from "./pages/paciente/PacienteDashboard";


const HospitalRoutes = () => {
  return (
    <Routes>
      {/* Define las rutas para la sección de hospital, cada <Route> mapea una dirección a un componente específico */}
      <Route path="dashboard" element={<DoctorDashboard />} />
      <Route path="appointments" element={<Appointments />} />
      <Route path="DoctorAppointments" element={<DoctorAppointments />} />
      <Route path="patienthistory" element={<PatientHistory />} />
      <Route path="recetas" element={<Recetas />} />
      <Route path="HospitalEmpleadoDashboard" element={<HospitalEmpleadoDashboard />} />
      <Route path="patientregister" element={<PatientRegister />} />
      <Route path="DoctorProfileForm" element={<DoctorProfileForm />} />
      <Route path="PacienteProfileForm" element={<PacienteProfileForm />} />
      <Route path="PacienteDashboard" element={<PacienteDashboard />} />
      
      <Route path="*" element={<p>Ruta no encontrada en HospitalRoutes</p>} />
    </Routes>
  );
};

export default HospitalRoutes;
