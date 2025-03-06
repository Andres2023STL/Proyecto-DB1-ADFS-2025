import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx';
import '../../../styles/Reports.css';
import reportsData from '../../../data/reports.json';

function Reports() {
  const [reports, setReports] = useState([]);

  const handleGenerateReport = () => {
    setReports(reportsData);
    console.log("Reporte generado");
  };

  const handleDownload = () => {
    // Preparamos los datos en formato aplanado, agregando las columnas "HospitalAmount" y "PharmacyAmount"
    const flattened = [];
    reports.forEach(report => {
      report.details.forEach(detail => {
        flattened.push({
          Title: report.title,
          Date: report.date,
          Summary: report.summary,
          Hospital: detail.hospital || "",
          Pharmacy: detail.pharmacy || "",
          HospitalAmount: detail.hospital ? detail.total : "",
          PharmacyAmount: detail.pharmacy ? detail.total : "",
          Total: detail.total
        });
      });
    });

    // Convertir el array a una hoja de cálculo.
    const worksheet = XLSX.utils.json_to_sheet(flattened);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reportes");
    // Escribir el archivo Excel y descargarlo
    XLSX.writeFile(workbook, "reportes_operativos.xlsx");
    console.log("Downloading report...");
  };

  return (
    <div className="reports-container">
      <h1>Reportes Operativos</h1>
      <Link to="/dashboard" className="back-button">← Regresar al Dashboard</Link>
      <p>Aquí se generarán los reportes de actividad del sistema.</p>
      
      {/* Botón que genera el reporte */}
      <button onClick={handleGenerateReport}>Generar Reporte</button>
      
      {reports.length > 0 && (
        <>
          <button onClick={handleDownload}>Descargar Reporte</button>
          {reports.map((report, index) => (
            <div key={index}>
              <h2>{report.title} - {report.date}</h2>
              <p>{report.summary}</p>
              <h3>Detalles del Reporte</h3>
              {report.details.map((detail, idx) => (
                <div key={idx}>
                  {detail.hospital && <h4>{detail.hospital}</h4>}
                  {detail.pharmacy && <h4>{detail.pharmacy}</h4>}
                  <ul>
                    {detail.services.map((service, serviceIdx) => (
                      <li key={serviceIdx}>{service.service}: Q{service.amount}</li>
                    ))}
                  </ul>
                  <p>Total: Q{detail.total}</p>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Reports;