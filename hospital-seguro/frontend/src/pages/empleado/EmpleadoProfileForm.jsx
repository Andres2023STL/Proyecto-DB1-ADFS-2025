import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EmpleadoProfileForm = () => {
  const [formData, setFormData] = useState({
    puesto: '',
    telefono: '',
    extension: '',
    imagen: null
  })

  const [preview, setPreview] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, imagen: file }))
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMensaje('')
    setError('')

    const form = new FormData()
    form.append('puesto', formData.puesto)
    form.append('telefono', formData.telefono)
    form.append('extension', formData.extension)
    if (formData.imagen) {
      form.append('imagen', formData.imagen)
    }

    try {
      const res = await fetch('http://localhost/hospital_api/api/perfil/saveEmpleadoProfile.php', {
        method: 'POST',
        credentials: 'include',
        body: form
      })

      const data = await res.json()
      if (data.success) {
        setMensaje(data.message)
        setTimeout(() => navigate('/dashboard/empleado'), 1000)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error al enviar perfil del empleado')
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <legend>Formulario de Perfil - Empleado</legend>

          <label htmlFor="puesto">Puesto:</label>
          <input id="puesto" name="puesto" required value={formData.puesto} onChange={handleChange} />

          <label htmlFor="telefono">Teléfono institucional:</label>
          <input id="telefono" name="telefono" required value={formData.telefono} onChange={handleChange} />

          <label htmlFor="extension">Extensión:</label>
          <input id="extension" name="extension" value={formData.extension} onChange={handleChange} />

          <label htmlFor="imagen">Fotografía:</label>
          <input type="file" id="imagen" name="imagen" accept="image/*" onChange={handleImageChange} />

          {preview && (
            <div style={{ marginTop: '1rem' }}>
              <p>Previsualización:</p>
              <img src={preview} alt="Previsualización" style={{ width: '150px', borderRadius: '8px' }} />
            </div>
          )}

          <button type="submit" style={{ marginTop: '1rem' }}>Guardar información</button>

          {mensaje && <p className="success">{mensaje}</p>}
          {error && <p className="error">{error}</p>}
        </fieldset>
      </form>
    </div>
  )
}

export default EmpleadoProfileForm
