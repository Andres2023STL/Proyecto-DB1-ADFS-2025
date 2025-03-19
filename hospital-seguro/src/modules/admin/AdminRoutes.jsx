import { Routes, Route } from "react-router-dom";
import EditarContenido from "./pages/EditarContenido";
import UsersManagement from "./pages/UsersManagement";
import ModerationPanel from "./pages/ModerationPanel";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPanel from "./pages/AdminPanel";
import AuditLogs from "./pages/AuditLogs";
import Settings from "./pages/Settings";


const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="editarcontenido" element={<EditarContenido />} />
      <Route path="usersmanagement" element={<UsersManagement />} />
      <Route path="moderationpanel" element={<ModerationPanel />} />
      <Route path="admindashboard" element={<AdminDashboard />} />
      <Route path="adminpanel" element={<AdminPanel />} />
      <Route path="auditlogs" element={<AuditLogs />} />
      <Route path="settings" element={<Settings />} />
      <Route path="*" element={<p>Ruta no encontrada en AdminRoutes</p>} />
    </Routes>
  );
};

export default AdminRoutes;
