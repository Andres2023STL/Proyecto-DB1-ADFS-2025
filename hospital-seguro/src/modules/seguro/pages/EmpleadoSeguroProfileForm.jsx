// EmpleadoSeguroProfileForm.jsx
import React, { useState } from "react";
import { Form, Input, Button, Typography, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Title } = Typography;

function EmpleadoSeguroProfileForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost/hospital_api/saveEmpleadoSeguroProfile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        message.success("✅ Perfil guardado correctamente");
      } else {
        message.error("❌ " + data.message);
      }
    } catch {
      message.error("❌ Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="private-page-container">
      <Title level={2}>Perfil Empleado del Seguro</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="nombre" label="Nombre completo" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="numero_empleado" label="Número de empleado" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="departamento" label="Departamento" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="area_cobertura" label="Área de cobertura" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item name="telefono" label="Teléfono" rules={[{ required: true }]}> <Input /> </Form.Item>
        <Form.Item label="Fotografía">
          <Upload name="file"   action="http://localhost/hospital_api/uploadImage.php?tipo=empleado_seguro" listType="picture" maxCount={1} showUploadList>
            <Button icon={<UploadOutlined />}>Subir Foto</Button>
          </Upload>
        </Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}> Guardar Perfil </Button>
      </Form>
    </div>
  );
}

export default EmpleadoSeguroProfileForm;