import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/portal/home/Home'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
// Aquí puedes agregar más páginas públicas como Faq, Contacto, etc.

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* <Route path="/faq" element={<Faq />} /> */}
      {/* <Route path="/contacto" element={<Contacto />} /> */}
    </Routes>
  )
}

export default PublicRoutes
