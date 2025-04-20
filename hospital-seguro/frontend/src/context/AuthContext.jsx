import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = async () => {
    try {
      const res = await fetch('http://localhost/hospital_api/auth/verifyToken.php', {
        method: 'GET',
        credentials: 'include'
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error('❌ Error verificando token:', error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const logout = async () => {
    try {
      await fetch('http://localhost/hospital_api/auth/logout.php', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (e) {
      console.warn('Logout request falló, pero se limpiará el estado igual')
    }

    setUser(null)
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }
