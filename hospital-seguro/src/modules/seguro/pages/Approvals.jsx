import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import approvalsData from '../../../data/approvals.json';


function Approvals() {
  const [pendingApprovals, setPendingApprovals] = useState(approvalsData);

  const handleApprove = (id) => {
    setPendingApprovals(pendingApprovals.map(ap => ap.id === id ? { ...ap, status: 'Aprobado' } : ap));
  };

  const handleReject = (id) => {
    setPendingApprovals(pendingApprovals.map(ap => ap.id === id ? { ...ap, status: 'Rechazado' } : ap));
  };

  return (
    <div>
      <h1>Aprobaciones</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="back-button">← Regresar al Dashboard</Link>
      <ul>
        {pendingApprovals.map((ap) => (
          <li key={ap.id}>
            {ap.service} - {ap.patient} - <strong>{ap.status}</strong>
            {ap.status === 'Pendiente' && (
              <>
                <button onClick={() => handleApprove(ap.id)}>✅ Aprobar</button>
                <button onClick={() => handleReject(ap.id)}>❌ Rechazar</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Approvals;
