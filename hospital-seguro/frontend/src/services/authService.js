// authService.js
const API_URL = 'http://localhost/hospital_api/auth'

export const login = async (email, password) => {
  try {
    const res = await fetch(`${API_URL}/login.php`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json()
    return data
  } catch (error) {
    return { success: false, message: 'No se pudo conectar con el servidor.' }
  }
}

export const logout = async () => {
    try {
      await fetch('http://localhost/hospital_api/auth/logout.php', {
        method: 'POST',
        credentials: 'include'
      })
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  
