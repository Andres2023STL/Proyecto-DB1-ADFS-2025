import React from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const DashboardLinkCard = ({ title, description, link }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={cardVariants}>
      <Link to={link} className="dashboard-link">
        <Card hoverable className="dashboard-link-card">
          <h3 className="card-title-blue">{title}</h3>
          {description && <p className="dashboard-card-description">{description}</p>}
        </Card>
      </Link>
    </motion.div>
  );
};

export default DashboardLinkCard;
