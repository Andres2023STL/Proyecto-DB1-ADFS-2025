import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clientsData from '../../../data/insurance_clients.json';
import '../../../styles/PatientHistory.css';
import '../../../styles/InsuranceClients.css';

function InsuranceClients() {
  const [clients, setClients] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);

  const [newClient, setNewClient] = useState({
    name: '',
    policy: '70%',
    documentId: '',
    insuranceNumber: '',
    expirationDate: '',
    services: []
  });

  useEffect(() => {
    setClients(clientsData);
  }, []);

  const handlePolicyChange = (clientId, newPolicy) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        return { ...client, policy: newPolicy };
      }
      return client;
    });
    setClients(updatedClients);
  };

  const handleRegisterClient = (e) => {
    e.preventDefault();
    const newId = clients.length ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    const clientToAdd = { id: newId, ...newClient };
    setClients([...clients, clientToAdd]);
    setNewClient({
      name: '',
      policy: '70%',
      documentId: '',
      insuranceNumber: '',
      expirationDate: '',
      services: []
    });
    setIsRegistering(false);
  };

  const handleFilterClients = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filteredClients = clientsData.filter(client =>
      client.insuranceNumber.toLowerCase().includes(filterValue)
    );
    setClients(filteredClients);
  };

  // Cambia el estado "paid" de todas las consultas de un cliente
  const toggleAllServicesPaid = (clientId) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId && client.services && client.services.length > 0) {
        // Si todas están pagadas => false, sino => true.
        const allPaid = client.services.every(s => s.paid);
        return {
          ...client,
          services: client.services.map(s => ({ ...s, paid: !allPaid }))
        };
      }
      return client;
    });
    setClients(updatedClients);
  };

  // Actualiza la fecha de vencimiento de todas las consultas de un cliente
  const updateAllServicesExpiration = (clientId, newDate) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId && client.services && client.services.length > 0) {
        return {
          ...client,
          services: client.services.map(s => ({ ...s, expirationDate: newDate }))
        };
      }
      return client;
    });
    setClients(updatedClients);
  };

  return (
    <div className="insurance-container">
      <h1>Clientes Asegurados</h1>
      <Link to="/dashboard" className="back-button">← Regresar</Link>

      <div className="filter-container">
        <input
          type="text"
          placeholder="Filtrar por número de seguro"
          onChange={handleFilterClients}
        />
      </div>

      <ul className="client-list">
        {clients.map(client => (
          <li key={client.id} className="client-card">
            <div className="client-header">
              <span className="client-name">{client.name}</span>
              <span className="client-info">
                Póliza: {client.policy} | ID: {client.documentId} | Nº Seguro: {client.insuranceNumber}
              </span>
              <div className="policy-selector">
                <strong>Cambiar Póliza:</strong>
                <select
                  value={client.policy}
                  onChange={e => handlePolicyChange(client.id, e.target.value)}
                >
                  <option value="70%">70%</option>
                  <option value="90%">90%</option>
                </select>
              </div>
            </div>

            {/* Sección desplegable para mostrar información básica del servicio */}
            <details className="services-details">
              <summary>Mostrar/Ocultar Servicios</summary>
              {client.services && client.services.length > 0 ? (
                client.services.map((service, index) => (
                  <ul key={index} className="service-list">
                    <li className="service-title"><strong>{service.serviceName}</strong></li>
                    <li><strong>Visita:</strong> {service.lastVisit}</li>
                    <li><strong>Diagnóstico:</strong> {service.diagnosis}</li>
                    <li><strong>Medicamentos:</strong> {service.medications.join(', ') || 'Ninguno'}</li>
                    <li><strong>Notas:</strong> {service.notes}</li>
                    {service.services && service.services.join ? (
                      <li><strong>Servicios:</strong> {service.services.join(', ')}</li>
                    ) : null}
                    <li><strong>Costo:</strong> {service.cost}</li>
                    <li><strong>Copago:</strong> {service.copayment}</li>
                  </ul>
                ))
              ) : (
                <p>No hay servicios registrados.</p>
              )}
            </details>

            {/* Sección de acciones, fuera del desplegable, una sola instancia para el cliente */}
            {client.services && client.services.length > 0 && (
              <div className="service-actions-container">
                {/* Muestra estado "Pagado" basado en si todas las consultas están pagadas */}
                <span>
                  <strong>Pagado:</strong> {client.services.every(s => s.paid) ? 'Sí' : 'No'}
                </span>
                <button onClick={() => toggleAllServicesPaid(client.id)}>
                  Cambiar Estado
                </button>
                <span>
                  <strong>Fecha de Vencimiento:</strong>
                </span>
                <input
                  type="date"
                  value={client.services[0].expirationDate || ''}
                  onChange={(e) => updateAllServicesExpiration(client.id, e.target.value)}
                />
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="final-register-section">
        <button
          className="register-button"
          onClick={() => setIsRegistering(!isRegistering)}
        >
          {isRegistering ? 'Ocultar Registro' : 'Registro'}
        </button>

        {isRegistering && (
          <form className="register-form" onSubmit={handleRegisterClient}>
            <input
              type="text"
              placeholder="Nombre"
              value={newClient.name}
              required
              onChange={e => setNewClient({ ...newClient, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID del Documento"
              value={newClient.documentId}
              required
              onChange={e =>
                setNewClient({ ...newClient, documentId: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Número de Seguro"
              value={newClient.insuranceNumber}
              required
              onChange={e =>
                setNewClient({ ...newClient, insuranceNumber: e.target.value })
              }
            />
            <input
              type="date"
              placeholder="Fecha de Vencimiento"
              value={newClient.expirationDate}
              required
              onChange={e =>
                setNewClient({ ...newClient, expirationDate: e.target.value })
              }
            />
            <div className="policy-selector">
              <strong>Póliza:</strong>
              <select
                value={newClient.policy}
                onChange={e =>
                  setNewClient({ ...newClient, policy: e.target.value })
                }
              >
                <option value="70%">70%</option>
                <option value="90%">90%</option>
              </select>
            </div>
            <div>
              Costo por afiliación: Q.125
            </div>
            <button type="submit" className="submit-button">
              Agregar Cliente
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InsuranceClients;