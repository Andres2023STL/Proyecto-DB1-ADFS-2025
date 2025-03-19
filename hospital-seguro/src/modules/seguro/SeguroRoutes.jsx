import { Routes, Route } from "react-router-dom";
import SeguroEmpleadoDashboard from "./pages/SeguroEmpladoDashboard";
import AppointmentsControl from "./pages/AppointmentsControl";
import Approvals from "./pages/Approvals";
import CatalogoMedicina from "./pages/CatalogoMedicina"
import CatalogoSeguro from "./pages/CatalogoSeguro"
import InsuranceClients from "./pages/InsuranceClients"
import Reports from "./pages/Reports"


const SeguroRoutes = () => {
  return (
    <Routes>
      <Route path="SeguroEmpleadoDashboard" element={<SeguroEmpleadoDashboard />} />
      <Route path="AppointmentsControl" element={<AppointmentsControl />} />
      <Route path="Approvals" element={<Approvals />} />
      <Route path="CatalogoMedicina" element={<CatalogoMedicina />} /> 
      <Route path="CatalogoSeguro" element={<CatalogoSeguro />} />   
      <Route path="InsuranceClients" element={<InsuranceClients />} />   
      <Route path="Reports" element={<Reports />} />   
      <Route path="*" element={<p>Ruta no encontrada en HospitalRoutes</p>} />
    </Routes>
  );
};

export default SeguroRoutes;