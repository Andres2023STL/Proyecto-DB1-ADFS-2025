import React from 'react';
import { Link } from 'react-router-dom';
import services from '../../../data/medical_services.json';


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

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo Seguro</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="back-button">← Regresar al Dashboard</Link>
      {Object.keys(groupedServices).map(category => (
        <details key={category} className="category-details">
          <summary className="category-summary">{category}</summary>
          {Object.keys(groupedServices[category]).map(subcategory => (
            <details key={subcategory} className="subcategory-details">
              <summary className="subcategory-summary">{subcategory}</summary>
              <ul className="item-list">
                {groupedServices[category][subcategory].map(service => (
                  <li key={service.id_servicio} className="item">
                    <div className="item-details">
                      <span>Precio: ${service.price}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </details>
      ))}
    </div>
  );
}

export default CatalogoSeguro;