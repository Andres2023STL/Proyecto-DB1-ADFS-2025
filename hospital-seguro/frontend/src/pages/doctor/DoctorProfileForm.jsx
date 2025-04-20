import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorProfileForm = () => {
  const [formData, setFormData] = useState({
    especialidad: '',
    colegiado: '',
    universidad: '',
    fecha_graduacion: '',
    telefono: '',
    imagen: null,
    titulos: []
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

  const handleTituloChange = e => {
    setFormData(prev => ({
      ...prev,
      titulos: Array.from(e.target.files)
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setMensaje('')
    setError('')

    const form = new FormData()
    form.append('especialidad', formData.especialidad)
    form.append('colegiado', formData.colegiado)
    form.append('universidad', formData.universidad)
    form.append('fecha_graduacion', formData.fecha_graduacion)
    form.append('telefono', formData.telefono)

    if (formData.imagen) form.append('imagen', formData.imagen)
    formData.titulos.forEach((file, idx) => {
      form.append(`titulos[]`, file)
    })

    try {
      const res = await fetch('http://localhost/hospital_api/api/perfil/saveDoctorProfile.php', {
        method: 'POST',
        credentials: 'include',
        body: form
      })

      const data = await res.json()
      if (data.success) {
        setMensaje(data.message)
        setTimeout(() => navigate('/dashboard/doctor'), 1500)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error al guardar el perfil del doctor')
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <legend>Perfil Profesional del Doctor</legend>

          <label>Especialidad:</label>
          <input name="especialidad" required value={formData.especialidad} onChange={handleChange} />

          <label>Número de colegiado:</label>
          <input name="colegiado" required value={formData.colegiado} onChange={handleChange} />

          <label>Universidad:</label>
          <input name="universidad" required value={formData.universidad} onChange={handleChange} />

          <label>Fecha de graduación:</label>
          <input type="date" name="fecha_graduacion" required value={formData.fecha_graduacion} onChange={handleChange} />

          <label>Teléfono:</label>
          <input name="telefono" required value={formData.telefono} onChange={handleChange} />

          <label>Foto de perfil:</label>
          <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Previsualización" style={{ width: '150px', marginTop: '10px' }} />}

          <label>Títulos o diplomas (puedes subir varios):</label>
          <input type="file" name="titulos[]" multiple accept="image/*" onChange={handleTituloChange} />
          {formData.titulos.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <p>Títulos seleccionados:</p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {formData.titulos.map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Título ${index + 1}`}
                    style={{ width: '120px', borderRadius: '8px' }}
                  />
                ))}
              </div>
            </div>
          )}

          <button type="submit">Guardar perfil</button>
          {mensaje && <p className="success">{mensaje}</p>}
          {error && <p className="error">{error}</p>}
        </fieldset>
      </form>
    </div>
  )
}

export default DoctorProfileForm
