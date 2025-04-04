import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, message } from 'antd';
import { motion } from 'framer-motion';
import * as XLSX from 'xlsx';

function Reports() {
  const [reports, setReports] = useState([]);

  const handleGenerateReport = async () => {
    try {
      const res = await fetch("http://localhost/hospital_api/getReports.php", {
        credentials: "include"
      });
      const data = await res.json();
      if (data.success) {
        setReports(data.reports);
        message.success("Reporte generado correctamente");
      } else {
        message.error(data.message || "Error al generar reporte");
      }
    } catch (error) {
      message.error("Error de conexión");
    }
  };

  const handleDownload = () => {
    const flattened = [];
    reports.forEach(report => {
      report.details.forEach(detail => {
        detail.services.forEach(service => {
          flattened.push({
            Title: report.title,
            Date: report.date,
            Summary: report.summary,
            Hospital: detail.hospital || "",
            Pharmacy: detail.pharmacy || "",
            Service: service.service,
            Amount: service.amount,
            Total: detail.total
          });
        });
      });
    });

    const worksheet = XLSX.utils.json_to_sheet(flattened);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");
    XLSX.writeFile(workbook, "reportes_operativos.xlsx");
    console.log("Downloading report...");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="private-page-container reports-container">
      <h1>Reportes Operativos</h1>
      <Link to="/seguro/SeguroEmpleadoDashboard" className="private-back-button">
        ← Regresar al Dashboard
      </Link>
      <p>Aquí se generarán los reportes de actividad del sistema.</p>

      <Button 
        type="primary" 
        onClick={handleGenerateReport} 
        className="mb-10"
      >
        Generar Reporte
      </Button>

      {reports.length > 0 && (
        <>
          <Button onClick={handleDownload} className="mb-10">
            Descargar Reporte
          </Button>

          {reports.map((report, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="report-card-wrapper"
            >
              <Card title={`${report.title} - ${report.date}`} bordered={false} className="blue-theme">
                <p>{report.summary}</p>
                <h3>Detalles del Reporte</h3>
                {report.details.map((detail, idx) => (
                  <div key={idx} className="report-detail-item">
                    {detail.hospital && <h4>Hospital: {detail.hospital}</h4>}
                    {detail.pharmacy && <h4>Farmacia: {detail.pharmacy}</h4>}
                    <ul>
                      {detail.services.map((service, serviceIdx) => (
                        <li key={serviceIdx}>
                          {service.service}: Q{service.amount}
                        </li>
                      ))}
                    </ul>
                    <p><strong>Total:</strong> Q{detail.total}</p>
                  </div>
                ))}
              </Card>
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}

export default Reports;
