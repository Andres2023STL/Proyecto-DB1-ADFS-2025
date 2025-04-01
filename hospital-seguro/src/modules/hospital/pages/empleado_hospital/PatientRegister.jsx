import React, { useState } from 'react';
import { Form, Input, InputNumber, DatePicker, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import moment from 'moment';

function PatientRegister() {
  const [form] = Form.useForm();
  const [foto, setFoto] = useState(null);

  // Convierte la imagen a base64 para previsualización o envío
  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFoto(reader.result);
    };
    reader.readAsDataURL(file);
    return false; // Prevenir la carga automática
  };

  const onFinish = (values) => {
    const patientData = {
      ...values,
      f_nacimiento: values.f_nacimiento.format('YYYY-MM-DD'),
      foto: foto ? foto : "" // Si no se selecciona imagen, se envía cadena vacía
    };
  
    fetch('http://localhost/hospital_api/patients.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patientData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          message.success('Paciente registrado correctamente');
          form.resetFields();
          setFoto(null);
        } else {
          message.error(data.message);
        }
      })
      .catch(err => {
        message.error('Error al registrar el paciente');
      });
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Error:', errorInfo);
    message.error('Por favor, revisa los datos ingresados.');
  };

  return (
    <div className="private-page-container patient-register-container">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Registro de Paciente</h1>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="DPI"
            name="dpi"
            rules={[{ required: true, message: 'Por favor ingresa el DPI' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Fecha de Nacimiento"
            name="f_nacimiento"
            rules={[{ required: true, message: 'Por favor ingresa la fecha de nacimiento' }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item label="Foto" name="foto">
            <Upload
              beforeUpload={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Subir Foto</Button>
            </Upload>
            {foto && (
              <img src={foto} alt="Preview" className="preview-image" />
            )}
          </Form.Item>

          <Form.Item
            label="Código de Seguro"
            name="codigo_seguro"
            rules={[{ required: true, message: 'Por favor ingresa el código de seguro' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Dirección"
            name="direccion"
            rules={[{ required: true, message: 'Por favor ingresa la dirección' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Teléfono"
            name="telefono"
            rules={[{ required: true, message: 'Por favor ingresa el teléfono' }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Registrar Paciente
            </Button>
          </Form.Item>
        </Form>
      </motion.div>
    </div>
  );
}

export default PatientRegister;
