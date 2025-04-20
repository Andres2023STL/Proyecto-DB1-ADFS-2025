// 📄 frontend/src/pages/paciente/PacienteProfileForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PacienteProfileForm = () => {
  const [formData, setFormData] = useState({
    fecha_nacimiento: '',
    genero: '',
    dpi: '',
    numero_afiliacion: '',
    codigo_seguro: '',
    numero_carnet_seguro: '',
    direccion: '',
    telefono: '',
    tiene_seguro: false,
    imagen: null
  })
  const [preview, setPreview] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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
    Object.keys(formData).forEach(key => {
      form.append(key, formData[key])
    })

    try {
      const res = await fetch('http://localhost/hospital_api/api/perfil/savePacienteProfile.php', {
        method: 'POST',
        credentials: 'include',
        body: form
      })

      const data = await res.json()
      if (data.success) {
        setMensaje(data.message)
        setTimeout(() => navigate('/dashboard/paciente'), 1500)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Error al guardar el perfil del paciente')
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <fieldset>
          <legend>Ficha Técnica del Paciente</legend>

          <label>Fecha de nacimiento:</label>
          <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} required />

          <label>Género:</label>
          <select name="genero" value={formData.genero} onChange={handleChange}>
            <option value="">Selecciona</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>

          <label>DPI:</label>
          <input name="dpi" value={formData.dpi} onChange={handleChange} required />

          <label>Número de afiliación:</label>
          <input name="numero_afiliacion" value={formData.numero_afiliacion} onChange={handleChange} required />

          <label>Cuenta con seguro?</label>
          <input type="checkbox" name="tiene_seguro" checked={formData.tiene_seguro} onChange={handleChange} />

          {formData.tiene_seguro && (
            <>
              <label>Código de compañía de seguro:</label>
              <input name="codigo_seguro" value={formData.codigo_seguro} onChange={handleChange} />

              <label>Número de carnet:</label>
              <input name="numero_carnet_seguro" value={formData.numero_carnet_seguro} onChange={handleChange} />
            </>
          )}

          <label>Dirección:</label>
          <textarea name="direccion" value={formData.direccion} onChange={handleChange} required />

          <label>Teléfono:</label>
          <input name="telefono" value={formData.telefono} onChange={handleChange} required />

          <label>Fotografía:</label>
          <input type="file" name="imagen" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="preview" style={{ width: '150px', marginTop: '10px' }} />}

          <button type="submit">Guardar perfil</button>
          {mensaje && <p className="success">{mensaje}</p>}
          {error && <p className="error">{error}</p>}
        </fieldset>
      </form>
    </div>
  )
}

export default PacienteProfileForm
