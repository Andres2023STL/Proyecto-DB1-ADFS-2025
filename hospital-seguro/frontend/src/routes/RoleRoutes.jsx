import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useProfileStatus from '../hooks/useProfileStatus'

const RoleRoutes = ({ role, overrideAdmin = false }) => {
  const { user, loading } = useAuth()
  const { perfilCompleto, loadingPerfil } = useProfileStatus()

  if (loading || loadingPerfil) return <p>Cargando...</p>

  const esAdmin = user?.rol === 'admin'

  // Si no hay usuario o no tiene el rol requerido (salvo que sea admin y se permita override)
  if (!user || (user.rol !== role && !(overrideAdmin && esAdmin))) {
    return <Navigate to="/unauthorized" replace />
  }

  // Redirigir si no ha completado su perfil (excepto admin o si override está activo)
  if (!perfilCompleto && !esAdmin && role !== 'admin') {
    return <Navigate to={`/perfil/${role}`} replace />
  }

  return <Outlet />
}

export default RoleRoutes
