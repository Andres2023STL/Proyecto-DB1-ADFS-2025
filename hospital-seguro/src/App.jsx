import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Layout';

import Appointments from './modules/hospital/pages/Appointments';
import PatientHistory from './modules/hospital/pages/PatientHistory';
import Prescriptions from './modules/hospital/pages/Prescriptions';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
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
      </Routes>
    </Layout>
  );
}

export default App;