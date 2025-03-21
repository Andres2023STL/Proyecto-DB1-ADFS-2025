import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';
import { motion } from 'framer-motion';
import services from '../../../data/medical_services.json';

const { Panel } = Collapse;

// Agrupa los servicios por categoría y subcategoría
function groupData(items, categoryKey, subcategoryKey) {
  const grouped = {};
  items.forEach(item => {
    const category = item[categoryKey];
    const subcategory = item[subcategoryKey];
    if (!grouped[category]) grouped[category] = {};
    if (!grouped[category][subcategory]) grouped[category][subcategory] = [];
    grouped[category][subcategory].push(item);
  });
  return grouped;
}

function CatalogoSeguro() {
  const groupedServices = groupData(services, 'category', 'subcategory');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="catalog-container private-page-container">
      <h1 className="catalog-title">Catálogo Seguro</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="back-button">← Regresar al Dashboard</Link>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {Object.keys(groupedServices).map(category => (
          <motion.div key={category} variants={itemVariants} className="category-panel" style={{ marginBottom: '20px' }}>
            <Collapse accordion className="blue-theme">
              <Panel header={category} key={category}>
                <Collapse accordion>
                  {Object.keys(groupedServices[category]).map(subcategory => (
                    <Panel header={subcategory} key={subcategory} className="subcategory-panel">
                      <ul className="item-list">
                        {groupedServices[category][subcategory].map(service => (
                          <li key={service.id_servicio} className="item">
                            <div className="item-details">
                              <span>Precio: ${service.price}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            </Collapse>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default CatalogoSeguro;
