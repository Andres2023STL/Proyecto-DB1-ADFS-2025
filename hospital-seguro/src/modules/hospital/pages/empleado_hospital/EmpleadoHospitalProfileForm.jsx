import React, { useState } from "react";
import { Form, Input, Button, Typography, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function EmpleadoHospitalProfileForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <- Faltaba esto

  const handleFinish = async (values) => {
    setLoading(true);

    // ✅ Corregido para tomar .response.url
    const fotoUrl =
      values.fotografia && values.fotografia[0]?.response?.url
        ? values.fotografia[0].response.url
        : "";

    const payload = {
      ...values,
      fotografia: fotoUrl,
    };

    try {
      const response = await fetch("http://localhost/hospital_api/saveEmpleadoHospitalProfile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.success) {
        message.success("✅ Perfil guardado correctamente");
        navigate("/hospital-empleado/HospitalEmpleadoDashboard");
      } else {
        message.error("❌ " + (data.message || "Error al guardar el perfil"));
      }
    } catch (err) {
      message.error("❌ Error al guardar: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="private-page-container">
      <Title level={2}>Perfil Empleado Hospitalario</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="nombre" label="Nombre completo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="puesto" label="Cargo o Puesto" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="departamento" label="Departamento" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="numero_empleado" label="Número de empleado" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="telefono" label="Teléfono" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="fotografia"
          label="Fotografía"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
        >
          <Upload
            name="file"
            action="http://localhost/hospital_api/uploadImage.php?tipo=empleado_hospital"
            listType="picture"
            maxCount={1}
            showUploadList
          >
            <Button icon={<UploadOutlined />}>Subir Foto</Button>
          </Upload>
        </Form.Item>

        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar Perfil
        </Button>
      </Form>
    </div>
  );
}

export default EmpleadoHospitalProfileForm;
