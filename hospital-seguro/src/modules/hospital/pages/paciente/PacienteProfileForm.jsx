// PacienteProfileForm.jsx
import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Typography,
  DatePicker,
  Upload,
  message,
  Switch,
  Select
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // ✅ Agregado para redirección

const { Title } = Typography;
const { Option } = Select;

function PacienteProfileForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [tieneSeguro, setTieneSeguro] = useState(false);
  const navigate = useNavigate(); // ✅ Hook de navegación

  const handleFinish = async (values) => {
    setLoading(true);
    try {
      values.fecha_nacimiento = values.fecha_nacimiento.format("YYYY-MM-DD");
      if (values.fecha_expiracion) {
        values.fecha_expiracion = values.fecha_expiracion.format("YYYY-MM-DD");
      }

      const response = await fetch("http://localhost/hospital_api/savePacienteProfile.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.success) {
        message.success("✅ Perfil guardado correctamente");
        navigate("/paciente/PacienteDashboard"); // ✅ Redirección después de guardar
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
      <Title level={2}>Perfil del Paciente</Title>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item name="nombre" label="Nombre completo" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="documento" label="Documento de identificación" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="fecha_nacimiento" label="Fecha de nacimiento" rules={[{ required: true }]}>
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="telefono" label="Teléfono" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="direccion" label="Dirección" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>

        <Form.Item label="Fotografía" rules={[{ required: true, message: "Por favor sube una foto" }]}>
          <Upload
            name="file"
            listType="picture"
            maxCount={1}
            showUploadList
            customRequest={({ file, onSuccess, onError }) => {
              const formData = new FormData();
              formData.append("file", file);
              fetch("http://localhost/hospital_api/uploadImage.php?tipo=paciente", {
                method: "POST",
                body: formData,
                credentials: "include"
              })
                .then(res => res.json())
                .then(data => {
                  if (data.success) {
                    form.setFieldsValue({ foto: data.url });
                    onSuccess(data, file);
                    message.success("✅ Imagen subida correctamente");
                  } else {
                    onError();
                    message.error("❌ " + data.message);
                  }
                })
                .catch(() => {
                  onError();
                  message.error("❌ Error al subir imagen");
                });
            }}
          >
            <Button icon={<UploadOutlined />}>Subir foto</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="foto" noStyle>
          <Input type="hidden" />
        </Form.Item>

        <Form.Item label="¿Tiene seguro?" name="tiene_seguro" valuePropName="checked">
          <Switch onChange={setTieneSeguro} />
        </Form.Item>

        {tieneSeguro && (
          <>
            <Form.Item name="codigo_seguro" label="Código de aseguradora" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="numero_carnet" label="Número de carnet" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="tipo_poliza" label="Tipo de póliza" rules={[{ required: true }]}>
              <Select>
                <Option value="70%">70%</Option>
                <Option value="90%">90%</Option>
              </Select>
            </Form.Item>
            <Form.Item name="fecha_expiracion" label="Fecha de expiración de la póliza" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </>
        )}

        <Button type="primary" htmlType="submit" loading={loading}>
          Guardar Perfil
        </Button>
      </Form>
    </div>
  );
}

export default PacienteProfileForm;
