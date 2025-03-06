import React from 'react';
import { Link } from 'react-router-dom';
import medications from '../../../data/medications.json';
import '../../../styles/CatalogoMedicina.css';  // Import the CSS file

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

  return (
    <div className="catalog-container">
      <h1 className="catalog-title">Catálogo Medicina</h1>
      <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      {Object.keys(groupedMedications).map(category => (
        <details key={category} className="category-details">
          <summary className="category-summary">{category}</summary>
          {Object.keys(groupedMedications[category]).map(subcategory => (
            <details key={subcategory} className="subcategory-details">
              <summary className="subcategory-summary">{subcategory}</summary>
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
            </details>
          ))}
        </details>
      ))}
    </div>
  );
}

export default CatalogoMedicina;