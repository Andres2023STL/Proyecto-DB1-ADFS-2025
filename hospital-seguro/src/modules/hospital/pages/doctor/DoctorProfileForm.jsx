import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  Space,
  Upload,
  message,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

function DoctorProfileForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        graduation_date: values.graduation_date.format("YYYY-MM-DD"),
      };

      const response = await fetch("http://localhost/hospital_api/saveDoctorProfile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success) {
        message.success("✅ Perfil guardado correctamente");
        navigate("/hospital/dashboard");
      } else {
        message.error("❌ " + data.message);
      }
    } catch (err) {
      message.error("❌ Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (info, fieldName) => {
    if (info.file.status === "done") {
      const url = info.file.response?.url;
      if (url) {
        form.setFieldValue(fieldName, url);
        message.success("✅ Imagen subida");
      }
    } else if (info.file.status === "error") {
      message.error("❌ Falló la subida");
    }
  };

  return (
    <div className="private-page-container">
      <Title level={2}>Completar Perfil Profesional</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="colegiado" label="Número de Colegiado" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="universidad" label="Universidad de Graduación" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="graduation_date" label="Fecha de Graduación" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="especialidad" label="Especialidad" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item name="telefono" label="Teléfono de Contacto" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        {/* Foto de perfil */}
<Form.Item label="Foto de perfil">
  <Upload
    name="file"
    action="http://localhost/hospital_api/uploadDoctorImage.php"
    listType="picture"
    maxCount={1}
    showUploadList={true}
    onChange={(info) => handleUpload(info, "foto_perfil")}
  >
    <Button icon={<UploadOutlined />}>Subir Foto</Button>
  </Upload>
</Form.Item>
<Form.Item name="foto_perfil" hidden>
  <Input />
</Form.Item>

{/* Títulos */}
<Form.List name="titulos">
  {(fields, { add, remove }) => (
    <>
      <Title level={5}>Títulos y Certificaciones</Title>
      {fields.map(({ key, name }) => (
        <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
          {/* ❌ SIN Form.Item name aquí */}
          <Upload
            name="file"
            action="http://localhost/hospital_api/uploadTitleImage.php"
            listType="picture"
            maxCount={1}
            showUploadList={true}
            onChange={(info) => {
              if (info.file.status === "done") {
                const current = form.getFieldValue("titulos") || [];
                current[name] = info.file.response?.url;
                form.setFieldValue("titulos", [...current]);
                message.success("✅ Título subido");
              } else if (info.file.status === "error") {
                message.error("❌ Falló la subida del título");
              }
            }}
          >
            <Button icon={<UploadOutlined />}>Subir Título</Button>
          </Upload>

          <MinusCircleOutlined onClick={() => remove(name)} />
        </Space>
      ))}
      <Form.Item>
        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
          Agregar otro título
        </Button>
      </Form.Item>
    </>
  )}
</Form.List>


        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Guardar Perfil
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default DoctorProfileForm;
