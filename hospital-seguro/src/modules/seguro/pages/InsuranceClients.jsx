import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Card, DatePicker, message } from 'antd';
import { motion } from 'framer-motion';
import moment from 'moment';

function InsuranceClients() {
  const [clients, setClients] = useState([]);
  const [isRegistering, setIsRegistering] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    policy: '70%',
    documentId: '',
    insuranceNumber: '',
    expirationDate: ''
  });

  // Carga de clientes desde el backend
  const fetchClients = async () => {
    try {
      const res = await fetch("http://localhost/hospital_api/getInsuranceClients.php");
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      } else {
        message.error(data.message || "Error al cargar clientes");
      }
    } catch (error) {
      message.error("Error de conexión con el servidor");
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleRegisterClient = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost/hospital_api/registerInsuranceClient.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      const data = await res.json();
      if (data.success) {
        message.success("Cliente registrado exitosamente");
        fetchClients(); // Recargar la lista
        setNewClient({
          name: '',
          policy: '70%',
          documentId: '',
          insuranceNumber: '',
          expirationDate: ''
        });
        setIsRegistering(false);
      } else {
        message.error(data.message || "Error al registrar cliente");
      }
    } catch (error) {
      message.error("Error de conexión con el servidor");
    }
  };

  const handleFilterClients = async (e) => {
    const filter = e.target.value;
    try {
      const res = await fetch(`http://localhost/hospital_api/getInsuranceClients.php?filter=${filter}`);
      const data = await res.json();
      if (data.success) {
        setClients(data.clients);
      } else {
        setClients([]);
      }
    } catch {
      setClients([]);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="private-page-container insurance-container">
      <h1>Clientes Asegurados</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="private-back-button">← Regresar</Link>

      <div className="filter-container" style={{ marginBottom: '20px' }}>
        <Input placeholder="Filtrar por número de seguro" onChange={handleFilterClients} />
      </div>

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
                  Póliza: {client.policy_percentage}% | ID: {client.document_id} | Nº Seguro: {client.insurance_number}
                </span>
                <div><strong>Vence:</strong> {client.expiration_date}</div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

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
