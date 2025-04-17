import React from 'react'
import { Routes, Route } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
// Aquí irán después PrivateRoutes y RoleRoutes según roles
// import PrivateRoutes from './PrivateRoutes'
// import RoleRoutes from './RoleRoutes'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<PublicRoutes />} />
      {/* <Route path="/dashboard/*" element={<PrivateRoutes />} /> */}
      {/* <Route path="/admin/*" element={<RoleRoutes role="admin" />} /> */}
    </Routes>
  )
}

export default AppRoutes
