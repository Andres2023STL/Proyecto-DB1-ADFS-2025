import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clientsData from '../../../data/insurance_clients.json';
import '../../../styles/PatientHistory.css';
import '../../../styles/InsuranceClients.css';

function InsuranceClients() {
  const [clients, setClients] = useState([]);
  // Quitar isExpanded y toda la lógica del botón "Expandir Interfaz"
  const [isRegistering, setIsRegistering] = useState(false);

  // Estado para manejar los valores del nuevo cliente
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

  // Cambiar la póliza de un cliente existente
  const handlePolicyChange = (clientId, newPolicy) => {
    const updatedClients = clients.map((client) => {
      if (client.id === clientId) {
        return { ...client, policy: newPolicy };
      }
      return client;
    });
    setClients(updatedClients);
  };

  // Registrar un nuevo cliente en la lista
  const handleRegisterClient = (e) => {
    e.preventDefault();
    const newId = clients.length ? Math.max(...clients.map((c) => c.id)) + 1 : 1;
    const clientToAdd = { id: newId, ...newClient };
    setClients([...clients, clientToAdd]);

    // Resetear formulario
    setNewClient({
      name: '',
      policy: '70%',
      documentId: '',
      insuranceNumber: '',
      expirationDate: '',
      services: []
    });

    // Cerrar formulario de registro
    setIsRegistering(false);
  };

  // Filtrar clientes por número de seguro
  const handleFilterClients = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filteredClients = clientsData.filter((client) =>
      client.insuranceNumber.toLowerCase().includes(filterValue)
    );
    setClients(filteredClients);
  };

  return (
    <div className="insurance-container">
      <h1>Clientes Asegurados</h1>
      <Link to="/dashboard" className="back-button">← Regresar</Link>

      {/* Filtro por número de seguro */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Filtrar por número de seguro"
          onChange={handleFilterClients}
        />
      </div>

      {/* Listado de clientes */}
      <ul className="client-list">
        {clients.map((client) => (
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
                  onChange={(e) => handlePolicyChange(client.id, e.target.value)}
                >
                  <option value="70%">70%</option>
                  <option value="90%">90%</option>
                </select>
              </div>
            </div>

            {/* Detalles de servicios con <details> */}
            <details className="services-details">
              <summary>Mostrar/Ocultar Servicios</summary>
              {client.services && client.services.length > 0 ? (
                client.services.map((service, index) => (
                  <ul key={index} className="service-list">
                    <li className="service-title"><strong>{service.serviceName}</strong></li>
                    <li><strong>Última Visita:</strong> {service.lastVisit}</li>
                    <li><strong>Diagnóstico:</strong> {service.diagnosis}</li>
                    <li>
                      <strong>Medicamentos:</strong> {service.medications.join(', ') || 'Ninguno'}
                    </li>
                    <li><strong>Notas:</strong> {service.notes}</li>
                    {service.services && service.services.join ? (
                      <li><strong>Servicios:</strong> {service.services.join(', ')}</li>
                    ) : null}
                    <li><strong>Costo:</strong> {service.cost}</li>
                    <li><strong>Copago:</strong> {service.copayment}</li>
                    <li className="service-actions">
                      <div>
                        <strong>Pagado:</strong> {service.paid ? 'Sí' : 'No'}
                        <button
                          onClick={() => {
                            const updatedClients = clients.map((c) => {
                              if (c.id === client.id) {
                                return {
                                  ...c,
                                  services: c.services.map((s, i) => {
                                    if (i === index) {
                                      return { ...s, paid: !s.paid };
                                    }
                                    return s;
                                  })
                                };
                              }
                              return c;
                            });
                            setClients(updatedClients);
                          }}
                        >
                          Cambiar Estado
                        </button>
                      </div>
                      <div>
                        <strong>Fecha de Vencimiento:</strong>
                        <input
                          type="date"
                          value={service.expirationDate}
                          onChange={(e) => {
                            const updatedClients = clients.map((c) => {
                              if (c.id === client.id) {
                                return {
                                  ...c,
                                  services: c.services.map((s, i) => {
                                    if (i === index) {
                                      return { ...s, expirationDate: e.target.value };
                                    }
                                    return s;
                                  })
                                };
                              }
                              return c;
                            });
                            setClients(updatedClients);
                          }}
                        />
                      </div>
                    </li>
                  </ul>
                ))
              ) : (
                <p>No hay servicios registrados.</p>
              )}
            </details>
          </li>
        ))}
      </ul>

      {/* Botón Registro SIEMPRE al final y centrado */}
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
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="ID del Documento"
              value={newClient.documentId}
              required
              onChange={(e) => setNewClient({ ...newClient, documentId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Número de Seguro"
              value={newClient.insuranceNumber}
              required
              onChange={(e) => setNewClient({ ...newClient, insuranceNumber: e.target.value })}
            />
            <input
              type="date"
              placeholder="Fecha de Vencimiento"
              value={newClient.expirationDate}
              required
              onChange={(e) => setNewClient({ ...newClient, expirationDate: e.target.value })}
            />

            <div className="policy-selector">
              <strong>Póliza:</strong>
              <select
                value={newClient.policy}
                onChange={(e) => setNewClient({ ...newClient, policy: e.target.value })}
              >
                <option value="70%">70%</option>
                <option value="90%">90%</option>
              </select>
            </div>

            <button type="submit" className="submit-button">Agregar Cliente</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InsuranceClients;
