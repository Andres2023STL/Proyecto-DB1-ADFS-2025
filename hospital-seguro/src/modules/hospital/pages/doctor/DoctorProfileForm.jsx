import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  Space,
  Upload,
  message,
  Alert,
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
  const [access, setAccess] = useState(true);
  const [alreadyFilled, setAlreadyFilled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("http://localhost/hospital_api/getProfileStatus.php", {
          credentials: "include",
        });
        const data = await res.json();

        if (!data.success) {
          message.error("No estás autenticado o tu sesión expiró.");
          navigate("/login");
          return;
        }

        if (!data.active) {
          setAccess(false);
          form.resetFields();
          return;
        }

        if (data.filled) {
          setAlreadyFilled(true);
          navigate("/hospital/dashboard");
        }
      } catch (err) {
        message.error("Error al verificar perfil.");
      }
    };

    checkStatus();
  }, [form, navigate]);

  const handleFinish = async (values) => {
    console.log("➡️ Formulario enviado:", values);
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

  const handleUpload = (info, fieldName) => {
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

  if (!access) {
    return (
      <Alert
        message="Tu cuenta aún no está activa"
        description="Un administrador debe activar tu cuenta antes de completar tu perfil."
        type="warning"
        showIcon
      />
    );
  }

  if (alreadyFilled) return null;

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

        <Form.Item
  label="Foto de perfil"
  required
>
  <Form.Item
    name="foto_perfil"
    noStyle
    rules={[{ required: true, message: "Sube una foto de perfil" }]}
  >
    <Input type="hidden" />
  </Form.Item>

  <Upload
    name="file"
    listType="picture"
    maxCount={1}
    showUploadList
    customRequest={({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append("file", file);

      fetch("http://localhost/hospital_api/uploadImage.php?tipo=doctor", {
        method: "POST",
        credentials: "include",
        body: formData,
      })
        .then(async (res) => {
          const data = await res.json();
          console.log("📥 Respuesta del servidor:", data);
          if (data.success && data.url) {
            onSuccess({ url: data.url }, file);
            form.setFieldValue("foto_perfil", data.url); // ⬅️ GUARDA LA URL EN EL FORM
            message.success("✅ Imagen subida correctamente");
          } else {
            onError("Error del servidor");
            message.error("❌ No se recibió URL válida del servidor");
          }
        })
        .catch((err) => {
          onError(err);
          message.error("❌ Error de red");
        });
    }}
  >
    <Button icon={<UploadOutlined />}>Subir Foto</Button>
  </Upload>
</Form.Item>



<Form.List name="titulos">
  {(fields, { add, remove }) => (
    <>
      <Title level={5}>Títulos y Certificaciones</Title>
      {fields.map(({ key, name, ...restField }) => (
        <Space key={key} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
          <Form.Item
            {...restField}
            name={name}
            rules={[{ required: true, message: "Sube el archivo del título" }]}
            noStyle
          >
            <Input type="hidden" />
          </Form.Item>

          <Upload
            name="file"
            action="http://localhost/hospital_api/uploadImage.php?tipo=doctor"
            listType="picture"
            maxCount={1}
            showUploadList={true}
            onChange={(info) => {
              if (info.file.status === "done") {
                const url = info.file.response?.url;
                if (url) {
                  const current = form.getFieldValue("titulos") || [];
                  current[name] = url;
                  form.setFieldsValue({ titulos: [...current] });
                  message.success("✅ Título subido");
                }
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
          Agregar título
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
