import React, { useEffect, useState } from "react";
import { Collapse, Spin, Alert } from "antd";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

function CatalogoSeguro() {
  const [catalogo, setCatalogo] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost/hospital_api/getInsuranceCatalog.php", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCatalogo(data.catalogo);
        } else {
          setError(data.message || "Error al obtener catálogo");
        }
      })
      .catch(() => setError("Error de conexión"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="catalog-container private-page-container">
      <h1 className="catalog-title">Catálogo Seguro</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="back-button">
        ← Regresar al Dashboard
      </Link>

      {loading ? (
        <Spin />
      ) : error ? (
        <Alert type="error" message={error} />
      ) : (
        Object.keys(catalogo).map((categoria) => (
          <motion.div
            key={categoria}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginBottom: 20 }}
          >
            <Collapse accordion>
              <Panel header={categoria} key={categoria}>
                <Collapse accordion>
                  {Object.keys(catalogo[categoria]).map((subcategoria) => (
                    <Panel header={subcategoria} key={subcategoria}>
                      <ul>
                        {catalogo[categoria][subcategoria].map((item) => (
                          <li key={item.id}>
                            {item.nombre} - Q{item.precio}
                          </li>
                        ))}
                      </ul>
                    </Panel>
                  ))}
                </Collapse>
              </Panel>
            </Collapse>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default CatalogoSeguro;
