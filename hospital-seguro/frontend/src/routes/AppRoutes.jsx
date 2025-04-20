import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import RoleRoutes from './RoleRoutes'

import AdminDashboard from '../pages/admin/Dashboard'
import DoctorDashboard from '../pages/doctor/Dashboard'
import EmpleadoDashboard from '../pages/empleado/Dashboard'
import PacienteDashboard from '../pages/paciente/Dashboard'
import Unauthorized from '../pages/auth/Unauthorized'
import UsersManagement from '../pages/admin/UsersManagement'
import DoctorProfileForm from '../pages/doctor/DoctorProfileForm'
import EmpleadoProfileForm from '../pages/empleado/EmpleadoProfileForm'
import PacienteProfileForm from '../pages/paciente/PacienteProfileForm'

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🌐 Rutas públicas */}
      <Route path="/*" element={<PublicRoutes />} />

      {/* 🔐 Rutas protegidas por rol */}
      <Route path="/dashboard/admin" element={<RoleRoutes role="admin" />}>
        <Route index element={<AdminDashboard />} />
        <Route path="usuarios" element={<UsersManagement />} />
      </Route>

      <Route path="/dashboard/doctor" element={<RoleRoutes role="doctor" overrideAdmin />}>
        <Route index element={<DoctorDashboard />} />
      </Route>

      <Route path="/dashboard/empleado" element={<RoleRoutes role="empleado" overrideAdmin />}>
        <Route index element={<EmpleadoDashboard />} />
      </Route>

      <Route path="/dashboard/paciente" element={<RoleRoutes role="paciente" overrideAdmin />}>
        <Route index element={<PacienteDashboard />} />
      </Route>

      {/* 📄 Formularios obligatorios */}
      <Route path="/perfil/doctor" element={<DoctorProfileForm />} />
      <Route path="/perfil/empleado" element={<EmpleadoProfileForm />} />
      <Route path="/perfil/paciente" element={<PacienteProfileForm />} />

      {/* 🚫 Página para usuarios no autorizados */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
  )
}

export default AppRoutes
