import { useEffect, useState } from 'react'

const useProfileStatus = () => {
  const [perfilCompleto, setPerfilCompleto] = useState(true)
  const [loadingPerfil, setLoadingPerfil] = useState(true)
  const [rol, setRol] = useState('')

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch('http://localhost/hospital_api/api/auth/getProfileStatus.php', {
          credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
          setPerfilCompleto(data.perfilCompleto)
          setRol(data.rol)
        }
      } catch (err) {
        console.error('Error verificando estado del perfil', err)
      } finally {
        setLoadingPerfil(false)
      }
    }

    fetchStatus()
  }, [])

  return { perfilCompleto, loadingPerfil, rol }
}

export default useProfileStatus
