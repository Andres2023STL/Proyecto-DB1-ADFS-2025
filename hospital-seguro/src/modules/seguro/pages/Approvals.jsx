import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, List } from 'antd';
import { motion } from 'framer-motion';
import approvalsData from '../../../data/approvals.json';

function Approvals() {
  const [pendingApprovals, setPendingApprovals] = useState(approvalsData);

  const handleApprove = (id) => {
    setPendingApprovals(pendingApprovals.map(ap => 
      ap.id === id ? { ...ap, status: 'Aprobado' } : ap
    ));
  };

  const handleReject = (id) => {
    setPendingApprovals(pendingApprovals.map(ap => 
      ap.id === id ? { ...ap, status: 'Rechazado' } : ap
    ));
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="private-page-container approvals-container">
      <h1>Aprobaciones</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="private-back-button">
        ← Regresar al Dashboard
      </Link>
      <List
        dataSource={pendingApprovals}
        renderItem={item => (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.3 }}
            className="motion-item"
          >
            <Card className="blue-theme">
              <div className="approval-item-content">
                <div>
                  <p>{item.service} - {item.patient}</p>
                  <p><strong>{item.status}</strong></p>
                </div>
                {item.status === 'Pendiente' && (
                  <div>
                    <Button 
                      type="primary" 
                      onClick={() => handleApprove(item.id)}
                      className="mr-8"
                    >
                      Aprobar
                    </Button>
                    <Button 
                      danger 
                      onClick={() => handleReject(item.id)}
                    >
                      Rechazar
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      />
    </div>
  );
}

export default Approvals;
