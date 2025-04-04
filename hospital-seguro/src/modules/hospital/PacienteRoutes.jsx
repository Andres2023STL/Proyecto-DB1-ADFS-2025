import { Routes, Route } from "react-router-dom";
import PacienteDashboard from "./pages/paciente/PacienteDashboard";
import PacienteProfileForm from "./pages/paciente/PacienteProfileForm";

// Agregá tus páginas acá

const PacienteRoutes = () => {
  return (
    <Routes>
      <Route path="PacienteDashboard" element={<PacienteDashboard />} />
      <Route path="PacienteProfileForm" element={<PacienteProfileForm />} />
      {/* Más rutas del paciente */}
      <Route path="*" element={<p>Ruta no encontrada en PacienteRoutes</p>} />
    </Routes>
  );
};

export default PacienteRoutes;
