import React from "react";
import { Row, Col, Card } from "antd";
import { motion } from "framer-motion";

const DashboardLayout = ({ title, children }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="dashboard-container">
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Row justify="center" align="middle" className="dashboard-layout">
          <Col xs={24} sm={20} md={16} lg={12}>
            <Card title={title} className="blue-theme">
              {children}
            </Card>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default DashboardLayout;
