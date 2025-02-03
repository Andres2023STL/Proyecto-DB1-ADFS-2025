import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import HospitalHome from '../pages/HospitalHome';
import SeguroHome from '../pages/SeguroHome';
import Historia from '../pages/Historia';
import Faq from '../pages/Faq';
import Contacto from '../pages/Contacto';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from '../components/ProtectedRoute';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/hospital" element={<HospitalHome />} />
      <Route path="/seguro" element={<SeguroHome />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<ProtectedRoute component={Dashboard} />} />
    </Routes>
  );
}

export default AppRouter;
