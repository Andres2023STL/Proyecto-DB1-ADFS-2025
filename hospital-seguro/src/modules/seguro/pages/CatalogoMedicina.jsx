import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse } from 'antd';
import { motion } from 'framer-motion';
import medications from '../../../data/medications.json';

const { Panel } = Collapse;

// Función para agrupar los datos por categoría y subcategoría
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

function CatalogoMedicina() {
  const groupedMedications = groupData(medications, 'category', 'subcategory');

  // Variantes de animación para los contenedores
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
      <h1 className="catalog-title">Catálogo Medicina</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="back-button">← Regresar al Dashboard</Link>
      <motion.div variants={containerVariants} initial="hidden" animate="visible">
        {Object.keys(groupedMedications).map(category => (
          <motion.div key={category} variants={itemVariants} className="category-panel" style={{ marginBottom: '20px' }}>
            {/* Collapse principal con estilo reutilizando la clase blue-theme */}
            <Collapse accordion className="blue-theme">
              <Panel header={category} key={category}>
                <Collapse accordion>
                  {Object.keys(groupedMedications[category]).map(subcategory => (
                    <Panel header={subcategory} key={subcategory} className="subcategory-panel">
                      <ul className="item-list">
                        {groupedMedications[category][subcategory].map(item => (
                          <li key={item.id_med} className="item">
                            <div className="item-name">{item.name}</div>
                            <div className="item-details">
                              <span>{item.activeIngredient}</span> | <span>{item.concentration}</span> | <span>${item.price}</span>
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

export default CatalogoMedicina;
