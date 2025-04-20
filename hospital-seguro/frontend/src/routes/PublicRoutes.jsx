import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/portal/home/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import SubHomeHospital from '../pages/portal/home/SubHomeHospital'
import SubHomeSeguro from '../pages/portal/home/SubHomeSeguro'
import Historia from '../pages/portal/Historia'
import FAQ from '../pages/portal/FAQ'

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/subhome-hospital" element={<SubHomeHospital />} />
      <Route path="/subhome-seguro" element={<SubHomeSeguro />} />
      <Route path="/historia" element={<Historia />} />
      <Route path="/faq" element={<FAQ />} />
      {/* <Route path="/faq" element={<Faq />} /> */}
      {/* <Route path="/contacto" element={<Contacto />} /> */}
    </Routes>
  )
}

export default PublicRoutes
