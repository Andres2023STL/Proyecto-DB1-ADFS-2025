import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Layout';

// Importa las páginas específicas
import Appointments from './modules/hospital/pages/Appointments';
import PatientHistory from './modules/hospital/pages/PatientHistory';
import Prescriptions from './modules/hospital/pages/Prescriptions';

function App() {
  return (
    <Layout>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida principal */}
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />

        {/* Rutas específicas del módulo Hospital */}
        <Route
          path="/hospital/appointments"
          element={<ProtectedRoute component={Appointments} requiredRole="doctor" />}
        />
        <Route
          path="/hospital/patient-history"
          element={<ProtectedRoute component={PatientHistory} requiredRole="doctor" />}
        />
        <Route
          path="/hospital/prescriptions"
          element={<ProtectedRoute component={Prescriptions} requiredRole="doctor" />}
        />

        {/* Rutas de ejemplo para otros roles */}
        <Route
          path="/admin/users"
          element={<ProtectedRoute component={() => <h1>Gestión de Usuarios</h1>} requiredRole="admin" />}
        />
        <Route
          path="/employee/appointments"
          element={<ProtectedRoute component={() => <h1>Control de Citas</h1>} requiredRole="empleado" />}
        />
      </Routes>
    </Layout>
  );
}

export default App;
