import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Typography, Card } from 'antd';
import { motion } from 'framer-motion';
import { utils, writeFile } from 'xlsx';

const { Title } = Typography;

// Función para registrar eventos en la auditoría
export const logAuditEvent = (user, action, details) => {
  const newLog = {
    date: new Date().toLocaleString(),
    user,
    action,
    details,
  };

  const logs = JSON.parse(localStorage.getItem("auditLogs")) || [];
  logs.unshift(newLog);
  localStorage.setItem("auditLogs", JSON.stringify(logs));
};

function AuditLogs() {
  const [logs, setLogs] = useState([]);

  // Cargar registros al montar el componente
  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("auditLogs")) || [];
    setLogs(storedLogs);
  }, []);

  // Exporta los registros a un archivo Excel
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(logs);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Registros de Auditoría");
    writeFile(workbook, "audit_logs.xlsx");
  };

  // Columnas para la tabla de auditoría
  const columns = [
    { title: 'Fecha', dataIndex: 'date', key: 'date' },
    { title: 'Usuario', dataIndex: 'user', key: 'user' },
    { title: 'Acción', dataIndex: 'action', key: 'action' },
    { title: 'Detalles', dataIndex: 'details', key: 'details' },
  ];

  return (
    <motion.div 
      className="private-page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="private-page-header">
        <Title level={2}>Auditoría</Title>
        <Link to="/admin/admindashboard" className="private-back-button">← Regresar</Link>
      </div>
      
      <Card className="private-panel">
        <Table 
          dataSource={logs}
          columns={columns}
          rowKey={(record, index) => index}
          pagination={{ pageSize: 10 }}
          className="private-audit-table"
        />
      </Card>

      <div className="private-clear-appointments" style={{ marginTop: '20px' }}>
        <Button onClick={exportToExcel} className="private-btn">
          📥 Exportar a Excel
        </Button>
      </div>
    </motion.div>
  );
}

export default AuditLogs;
