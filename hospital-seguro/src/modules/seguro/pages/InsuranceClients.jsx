import React, { useState, useEffect } from 'react';
import '../../../styles/PatientHistory.css';
import { Link } from 'react-router-dom';
import clientsData from '../../../data/insurance_clients.json';
import '../../../styles/InsuranceClients.css';

function InsuranceClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setClients(clientsData);
  }, []);

  return (
    <div>
      <h1>Clientes Asegurados</h1>
      <Link to="/seguro" className="back-button">← Regresar</Link>
      <div>
        <input 
          type="text" 
          placeholder="Filtrar por número de seguro" 
          onChange={(e) => {
            const filterValue = e.target.value.toLowerCase();
            const filteredClients = clientsData.filter(client => 
              client.insuranceNumber.toLowerCase().includes(filterValue)
            );
            setClients(filteredClients);
          }} 
        />
      </div>
      <ul className="patient-list">

        {clients.map((client) => (
          <li key={client.id}>
            <strong>{client.name} - Póliza: {client.policy} (ID: {client.documentId}, Número de Seguro: {client.insuranceNumber})
            </strong>
            <ul className="patient-list">
              <li>Última Visita: {client.services[0].lastVisit}</li>
              <li>Diagnóstico: {client.services[0].diagnosis}</li>
              <li>Medicamentos: {client.services[0].medications.join(', ')}</li>
              <li>Notas: {client.services[0].notes}</li>
              <li>Servicios: {client.services[0].services.join(', ')}</li>
              <li>Costo: {client.services[0].cost}</li>
              <li>Copago: {client.services[0].copayment}</li>
              <li>
                Pagado: {client.services[0].paid ? 'Sí' : 'No'}
                <button onClick={() => {
                  const updatedClients = clients.map(c => {
                    if (c.id === client.id) {
                      return {
                        ...c,
                        services: c.services.map(s => ({
                          ...s,
                          paid: !s.paid
                        }))
                      };
                    }
                    return c;
                  });
                  setClients(updatedClients);
                }}>
                  Cambiar Estado
                </button>
              </li>
              <li>
                Fecha de Vencimiento: 
                <input 
                  type="date" 
                  value={client.services[0].expirationDate} 
                  onChange={(e) => {
                    const updatedClients = clients.map(c => {
                      if (c.id === client.id) {
                        return {
                          ...c,
                          services: c.services.map(s => ({
                            ...s,
                            expirationDate: e.target.value
                          }))
                        };
                      }
                      return c;
                    });
                    setClients(updatedClients);
                  }} 
                />
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InsuranceClients;
