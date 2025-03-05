import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/Recetas.css';
import recetasData from '../../../data/recetas.json'; // ✅ Importar JSON de recetas

function Recetas() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [newPrescription, setNewPrescription] = useState({
    patient: '',
    date: '',
    medicine: '',
    dosage: '',
    duration: '',
  });

  const [editingPrescription, setEditingPrescription] = useState(null);

  // Cargar recetas desde el JSON al montar el componente
  useEffect(() => {
    setPrescriptions(recetasData);
  }, []);

  // Función para manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrescription((prev) => ({ ...prev, [name]: value }));
  };

  // Función para agregar o actualizar receta
  const handleAddOrUpdatePrescription = (e) => {
    e.preventDefault();

    if (editingPrescription) {
      // Modificar una receta existente
      setPrescriptions((prev) =>
        prev.map((p) => (p.id === editingPrescription.id ? { ...newPrescription, id: p.id } : p))
      );
      setEditingPrescription(null);
    } else {
      // Agregar una nueva receta
      const newId = prescriptions.length > 0 ? prescriptions[prescriptions.length - 1].id + 1 : 1;
      setPrescriptions((prev) => [...prev, { ...newPrescription, id: newId }]);
    }

    // Limpiar el formulario
    setNewPrescription({ patient: '', date: '', medicine: '', dosage: '', duration: '' });
  };

  // Función para eliminar receta
  const handleDeletePrescription = (id) => {
    setPrescriptions((prev) => prev.filter((p) => p.id !== id));
  };

  // Función para cargar datos en el formulario para edición
  const handleEditPrescription = (prescription) => {
    setNewPrescription(prescription);
    setEditingPrescription(prescription);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Gestión de Recetas</h1>
        <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      </div>

      <p>Crea, edita y administra las recetas médicas.</p>

      {/* Formulario para agregar o editar receta */}
      <form className="prescription-form" onSubmit={handleAddOrUpdatePrescription}>
        <label>
          Paciente:
          <input type="text" name="patient" value={newPrescription.patient} onChange={handleInputChange} required />
        </label>
        <label>
          Fecha:
          <input type="date" name="date" value={newPrescription.date} onChange={handleInputChange} required />
        </label>
        <label>
          Medicamento:
          <input type="text" name="medicine" value={newPrescription.medicine} onChange={handleInputChange} required />
        </label>
        <label>
          Dosis:
          <input type="text" name="dosage" value={newPrescription.dosage} onChange={handleInputChange} required />
        </label>
        <label>
          Duración:
          <input type="text" name="duration" value={newPrescription.duration} onChange={handleInputChange} required />
        </label>
        <button type="submit">
          {editingPrescription ? 'Actualizar Receta' : 'Agregar Receta'}
        </button>
      </form>

      {/* Lista de recetas médicas */}
      <ul className="prescription-list">
        {prescriptions.map((prescription) => (
          <li key={prescription.id} className="prescription-item">
            <strong>Paciente:</strong> {prescription.patient} <br />
            <strong>Fecha:</strong> {prescription.date} <br />
            <strong>Medicamento:</strong> {prescription.medicine} <br />
            <strong>Dosis:</strong> {prescription.dosage} <br />
            <strong>Duración:</strong> {prescription.duration} <br />
            <button className="edit-btn" onClick={() => handleEditPrescription(prescription)}>✏ Editar</button>
            <button className="delete-btn" onClick={() => handleDeletePrescription(prescription.id)}>🗑 Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Recetas;
