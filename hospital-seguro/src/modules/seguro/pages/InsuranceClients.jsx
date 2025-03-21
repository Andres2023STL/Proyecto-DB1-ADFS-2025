import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Card, DatePicker } from 'antd';
import { motion } from 'framer-motion';
import moment from 'moment';
import clientsData from '../../../data/insurance_clients.json';

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

  // Cargamos los datos de clientes al iniciar el componente
  useEffect(() => {
    setClients(clientsData);
  }, []);

  // Actualiza la póliza de un cliente
  const handlePolicyChange = (clientId, newPolicy) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId) {
        return { ...client, policy: newPolicy };
      }
      return client;
    });
    setClients(updatedClients);
  };

  // Registra un nuevo cliente
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

  // Filtra los clientes por número de seguro
  const handleFilterClients = (e) => {
    const filterValue = e.target.value.toLowerCase();
    const filteredClients = clientsData.filter(client =>
      client.insuranceNumber.toLowerCase().includes(filterValue)
    );
    setClients(filteredClients);
  };

  // Alterna el estado "paid" de todos los servicios de un cliente
  const toggleAllServicesPaid = (clientId) => {
    const updatedClients = clients.map(client => {
      if (client.id === clientId && client.services && client.services.length > 0) {
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

  // Actualiza la fecha de vencimiento de todos los servicios de un cliente
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

  // Definición de animación para cada tarjeta de cliente
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="private-page-container insurance-container">
      <h1>Clientes Asegurados</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="private-back-button">← Regresar</Link>

      {/* Campo para filtrar clientes */}
      <div className="filter-container" style={{ marginBottom: '20px' }}>
        <Input 
          placeholder="Filtrar por número de seguro" 
          onChange={handleFilterClients} 
        />
      </div>

      {/* Listado de clientes */}
      <div className="client-list">
        {clients.map(client => (
          <motion.div
            key={client.id}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.3 }}
            className="client-card"
            style={{ marginBottom: '20px' }}
          >
            <Card className="blue-theme">
              <div className="client-header" style={{ marginBottom: '10px' }}>
                <span className="client-name" style={{ fontWeight: 'bold' }}>{client.name}</span>
                <span className="client-info">
                  Póliza: {client.policy} | ID: {client.documentId} | Nº Seguro: {client.insuranceNumber}
                </span>
                <div className="policy-selector">
                  <strong>Cambiar Póliza: </strong>
                  <select
                    value={client.policy}
                    onChange={e => handlePolicyChange(client.id, e.target.value)}
                  >
                    <option value="70%">70%</option>
                    <option value="90%">90%</option>
                  </select>
                </div>
              </div>

              {/* Desplegable para mostrar servicios */}
              <details className="services-details" style={{ marginBottom: '10px' }}>
                <summary>Mostrar/Ocultar Servicios</summary>
                {client.services && client.services.length > 0 ? (
                  client.services.map((service, index) => (
                    <ul key={index} className="service-list" style={{ marginLeft: '20px', marginTop: '10px' }}>
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

              {/* Acciones de servicios */}
              {client.services && client.services.length > 0 && (
                <div className="service-actions-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>
                    <strong>Pagado:</strong> {client.services.every(s => s.paid) ? 'Sí' : 'No'}
                  </span>
                  <Button onClick={() => toggleAllServicesPaid(client.id)}>
                    Cambiar Estado
                  </Button>
                  <span>
                    <strong>Fecha de Vencimiento:</strong>
                  </span>
                  <DatePicker
                    value={client.services[0].expirationDate ? moment(client.services[0].expirationDate) : null}
                    onChange={(date, dateString) => updateAllServicesExpiration(client.id, dateString)}
                    format="YYYY-MM-DD"
                  />
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sección de registro de nuevos clientes */}
      <div className="final-register-section" style={{ marginTop: '20px' }}>
        <Button 
          type="primary" 
          onClick={() => setIsRegistering(!isRegistering)}
          className="register-button"
        >
          {isRegistering ? 'Ocultar Registro' : 'Registro'}
        </Button>

        {isRegistering && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.3 }}
          >
            <form className="register-form" onSubmit={handleRegisterClient} style={{ marginTop: '20px' }}>
              <Input 
                type="text"
                placeholder="Nombre"
                value={newClient.name}
                required
                onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <Input 
                type="text"
                placeholder="ID del Documento"
                value={newClient.documentId}
                required
                onChange={e => setNewClient({ ...newClient, documentId: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <Input 
                type="text"
                placeholder="Número de Seguro"
                value={newClient.insuranceNumber}
                required
                onChange={e => setNewClient({ ...newClient, insuranceNumber: e.target.value })}
                style={{ marginBottom: '10px' }}
              />
              <DatePicker 
                placeholder="Fecha de Vencimiento"
                value={newClient.expirationDate ? moment(newClient.expirationDate) : null}
                onChange={(date, dateString) => setNewClient({ ...newClient, expirationDate: dateString })}
                style={{ marginBottom: '10px', width: '100%' }}
                format="YYYY-MM-DD"
              />
              <div className="policy-selector" style={{ marginBottom: '10px' }}>
                <strong>Póliza: </strong>
                <select
                  value={newClient.policy}
                  onChange={e => setNewClient({ ...newClient, policy: e.target.value })}
                >
                  <option value="70%">70%</option>
                  <option value="90%">90%</option>
                </select>
              </div>
              <div style={{ marginBottom: '10px' }}>
                Costo por afiliación: Q.125
              </div>
              <Button type="primary" htmlType="submit" className="submit-button">
                Agregar Cliente
              </Button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default InsuranceClients;
