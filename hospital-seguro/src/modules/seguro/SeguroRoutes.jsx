import { Routes, Route } from "react-router-dom";
import SeguroEmpleadoDashboard from "./pages/SeguroEmpladoDashboard";
import AppointmentsControl from "./pages/AppointmentsControl";
import Approvals from "./pages/Approvals";
import CatalogoMedicina from "./pages/CatalogoMedicina"
import CatalogoSeguro from "./pages/CatalogoSeguro"
import InsuranceClients from "./pages/InsuranceClients"
import Reports from "./pages/Reports"
import EmpleadoSeguroProfileForm from "./pages/EmpleadoSeguroProfileForm";


const SeguroRoutes = () => {
  return (
    <Routes>
      {/* Define las rutas para la sección de seguro, Ccada <Route> mapea una dirección a un componente específico. */}
      <Route path="SeguroEmpleadoDashboard" element={<SeguroEmpleadoDashboard />} />
      <Route path="AppointmentsControl" element={<AppointmentsControl />} />
      <Route path="Approvals" element={<Approvals />} />
      <Route path="EmpleadoSeguroProfileForm" element={<EmpleadoSeguroProfileForm />} />
      <Route path="CatalogoMedicina" element={<CatalogoMedicina />} /> 
      <Route path="CatalogoSeguro" element={<CatalogoSeguro />} />   
      <Route path="InsuranceClients" element={<InsuranceClients />} />   
      <Route path="Reports" element={<Reports />} />   
      {/* Ruta por defecto para mostrar un mensaje en caso de ruta no encontrada */}
      <Route path="*" element={<p>Ruta no encontrada en HospitalRoutes</p>} />
    </Routes>
  );
};

export default SeguroRoutes;