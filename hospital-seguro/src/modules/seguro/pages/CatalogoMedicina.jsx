import React, { useEffect, useState } from "react";
import { Collapse, message } from "antd";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const { Panel } = Collapse;

function CatalogoMedicina() {
  const [medicinas, setMedicinas] = useState([]);

  useEffect(() => {
    fetch("http://localhost/hospital_api/getCoveredMedicines.php", {
      credentials: "include"
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMedicinas(data.medicinas);
        } else {
          message.error(data.message || "Error al cargar catálogo");
        }
      })
      .catch(() => {
        message.error("Error de conexión");
      });
  }, []);

  // Agrupar por categoría y subcategoría
  const grouped = {};
  medicinas.forEach(item => {
    const cat = item.category || "Sin categoría";
    const sub = item.subcategory || "General";
    if (!grouped[cat]) grouped[cat] = {};
    if (!grouped[cat][sub]) grouped[cat][sub] = [];
    grouped[cat][sub].push(item);
  });

  return (
    <div className="catalog-container private-page-container">
      <h1 className="catalog-title">Catálogo Medicina</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="back-button">← Regresar</Link>
      {Object.keys(grouped).map(cat => (
        <motion.div
          key={cat}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ marginBottom: "20px" }}
        >
          <Collapse accordion className="blue-theme">
            <Panel header={cat} key={cat}>
              <Collapse accordion>
                {Object.keys(grouped[cat]).map(sub => (
                  <Panel header={sub} key={sub}>
                    <ul>
                      {grouped[cat][sub].map(med => (
                        <li key={med.id}>
                          <strong>{med.name}</strong> - {med.active_ingredient} | {med.concentration} | Q{med.price}
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
    </div>
  );
}

export default CatalogoMedicina;
