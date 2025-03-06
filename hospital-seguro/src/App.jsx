import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import DoctorProvider from './context/DoctorContext';

// Importar módulos hospital y admin
import Appointments from './modules/hospital/pages/Appointments';
import PatientHistory from './modules/hospital/pages/PatientHistory';
import Recetas from './modules/hospital/pages/Recetas';
import DoctorCatalog from './modules/hospital/pages/DoctorCatalog';
import DoctorDetails from './modules/hospital/pages/DoctorDetails';
import UsersManagement from './modules/admin/pages/UsersManagement';
import AuditLogs from './modules/admin/pages/AuditLogs';
import Settings from './modules/admin/pages/Settings';
import EditarContenido from './modules/admin/pages/EditarContenido';

// Importar módulos seguros y empleados
import Approvals from './modules/seguro/pages/Approvals';
import Reports from './modules/seguro/pages/Reports';
import AppointmentsControl from './modules/seguro/pages/AppointmentsControl';
import InsuranceClients from './modules/seguro/pages/InsuranceClients';
import CatalogoSeguro from './modules/seguro/pages/CatalogoSeguro';
import CatalogoMedicina from './modules/seguro/pages/CatalogoMedicina';

// Importar páginas adicionales
import HospitalHome from './pages/HospitalHome';
import SeguroHome from './pages/SeguroHome';
import Historia from './pages/Historia';
import Faq from './pages/Faq';
import Contacto from './pages/Contacto';
import { UsersProvider } from "./context/UsersContext"; // Asegúrate de la ruta correcta

// Importar Panel de Administración y Moderación
import AdminPanel from './modules/admin/pages/AdminPanel';
import ModerationPanel from './modules/admin/pages/ModerationPanel';

// Importar draft
import DraftEditor from './pages/draft';

function App() {
  return (
    <DoctorProvider>
      <Layout>
        <Routes>
          {/* 🔹 Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/hospital" element={<HospitalHome />} />
          <Route path="/seguro" element={<SeguroHome />} />
          <Route path="/historia" element={<Historia />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          {/* 🔹 Dashboard (Protegido) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Rutas protegidas para el módulo hospital (Solo Doctor) */}
          <Route
            path="/hospital/appointments"
            element={
              <ProtectedRoute requiredRole="doctor">
                <Appointments />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital/patient-history"
            element={
              <ProtectedRoute requiredRole="doctor">
                <PatientHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital/recetas"
            element={
              <ProtectedRoute requiredRole="doctor">
                <Recetas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital/doctorcatalog"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorCatalog />
              </ProtectedRoute>
            }
          />
          <Route
            path="/hospital/doctordetails/:id"
            element={
              <ProtectedRoute requiredRole="doctor">
                <DoctorDetails />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Rutas protegidas para administración (Solo Admin) */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredRole="admin">
                <UsersManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/audit"
            element={
              <ProtectedRoute requiredRole="admin">
                <AuditLogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <ProtectedRoute requiredRole="admin">
                <Settings />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Panel de Administración (Empleados y Admins pueden acceder) */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole={['admin', 'empleado']}>
                <EditarContenido />
              </ProtectedRoute>
            }
          />
          <Route
            path="/adminpanel"
            element={
              <ProtectedRoute requiredRole={['admin', 'empleado']}>
                <AdminPanel />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Panel de Moderación (Solo Admin) */}
          <Route
            path="/moderation"
            element={
              <ProtectedRoute requiredRole="admin">
                <ModerationPanel />
              </ProtectedRoute>
            }
          />
          <Route
            path="/draft"
            element={
              <ProtectedRoute requiredRole={['empleado', 'admin']}>
                <DraftEditor />
              </ProtectedRoute>
            }
          />
          {/* 🔹 Panel de Empleados) */}
          <Route
            path="/empleado/Approvals"
            element={
              <ProtectedRoute requiredRole="empleado_Aseguradora">
                <Approvals />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empleado/Reports"
            element={
              <ProtectedRoute requiredRole="empleado_Aseguradora">
                <Reports />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empleado/AppointmentsControl"
            element={
              <ProtectedRoute requiredRole="empleado">
                <AppointmentsControl />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empleado/InsuranceClients"
            element={
              <ProtectedRoute requiredRole="empleado_Aseguradora">
                <InsuranceClients />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empleado/CatalogoSeguro"
            element={
              <ProtectedRoute requiredRole="empleado_Aseguradora">
                <CatalogoSeguro />
              </ProtectedRoute>
            }
          />
          <Route
            path="/empleado/CatalogoMedicina"
            element={
              <ProtectedRoute requiredRole="empleado_Aseguradora">
                <CatalogoMedicina />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </DoctorProvider>
  );
}

export default App;
