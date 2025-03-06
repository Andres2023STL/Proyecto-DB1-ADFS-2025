import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clientsData from '../../../data/insurance_clients.json';
import '../../../styles/InsuranceClients.css'

function InsuranceClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(clientsData);
  }, []);

  return (
    <div>
      <h1>Clientes Asegurados</h1>
      <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            {client.name} - Póliza: {client.policy}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InsuranceClients;
