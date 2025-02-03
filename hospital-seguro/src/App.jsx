import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Layout';

// Importar componentes de módulos hospital y admin
import Appointments from './modules/hospital/pages/Appointments';
import PatientHistory from './modules/hospital/pages/PatientHistory';
import Prescriptions from './modules/hospital/pages/Prescriptions';
import UsersManagement from './modules/admin/pages/UsersManagement';
import AuditLogs from './modules/admin/pages/AuditLogs';
import Settings from './modules/admin/pages/Settings';

// Importar componentes de las páginas adicionales
import HospitalHome from './pages/HospitalHome';
import SeguroHome from './pages/SeguroHome';
import Historia from './pages/Historia';
import Faq from './pages/Faq';
import Contacto from './pages/Contacto';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/hospital" element={<HospitalHome />} />
        <Route path="/seguro" element={<SeguroHome />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida principal */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas del módulo hospital */}
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
          path="/hospital/prescriptions"
          element={
            <ProtectedRoute requiredRole="doctor">
              <Prescriptions />
            </ProtectedRoute>
          }
        />

        {/* Rutas protegidas del módulo de administración */}
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
      </Routes>
    </Layout>
  );
}

export default App;