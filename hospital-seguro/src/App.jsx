import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './layouts/Layout';

// Importa las nuevas páginas
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
        <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
      </Routes>
    </Layout>
  );
}

export default App;
