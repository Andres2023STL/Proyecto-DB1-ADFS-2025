import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { utils, writeFile } from 'xlsx';
import '../../../styles/AuditLogs.css';

// 🔹 Exportar logAuditEvent para que otros archivos puedan usarlo
export const logAuditEvent = (user, action, details) => {
  const newLog = {
    date: new Date().toLocaleString(),
    user,
    action,
    details
  };

  const logs = JSON.parse(localStorage.getItem("auditLogs")) || [];
  logs.unshift(newLog);
  localStorage.setItem("auditLogs", JSON.stringify(logs));
};

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("auditLogs")) || [];
    setLogs(storedLogs);
  }, []);

  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(logs);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Registros de Auditoría");
    writeFile(workbook, "audit_logs.xlsx");
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Auditoría</h1>
        <Link to="/dashboard" className="back-button">← Regresar</Link>
      </div>

      <table className="audit-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Usuario</th>
            <th>Acción</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log, index) => (
              <tr key={index}>
                <td>{log.date}</td>
                <td>{log.user}</td>
                <td>{log.action}</td>
                <td>{log.details}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="empty-row">No hay registros disponibles.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={exportToExcel} className="export-button">📥 Exportar a Excel</button>
    </div>
  );
}

export default AuditLogs;
