import React, { useEffect, useState } from 'react'
import {
  Table, Input, Select, Button, DatePicker,
  Space, message, Tag, Modal, Form, Switch
} from 'antd'
import dayjs from 'dayjs'

const { Option } = Select

const UsersManagement = () => {
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  const [filters, setFilters] = useState({
    search: '',
    rol: '',
    fecha: null
  })

  const [editingUser, setEditingUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalLoading, setModalLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.append('page', page)
      params.append('limit', 10)
      if (filters.search) params.append('search', filters.search)
      if (filters.rol) params.append('rol', filters.rol)
      if (filters.fecha) params.append('fecha', filters.fecha.format('YYYY-MM-DD'))

      const res = await fetch(`http://localhost/hospital_api/api/admin/getUsers.php?${params.toString()}`, {
        credentials: 'include'
      })
      const data = await res.json()
      if (data.success) {
        setUsers(data.data)
        setTotal(data.total)
      } else {
        message.error(data.message)
      }
    } catch (err) {
      message.error('Error al cargar usuarios')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [page, filters])

  const openEditModal = (user) => {
    const initialTipo = user.rol === 'empleado' ? user.tipo_empleado || 'hospital' : null
    setEditingUser({ ...user, tipo_empleado: initialTipo })
    setIsModalOpen(true)
  }

  const handleSaveEdit = async () => {
    setModalLoading(true);
  
    // 🧠 Asegurar tipo_empleado coherente
    let tipo_empleado = null;
    if (editingUser.rol === 'empleado') {
      tipo_empleado = editingUser.tipo_empleado || 'hospital';
    }
  
    const userToSend = {
      id: editingUser.id,
      nombre: editingUser.nombre,
      email: editingUser.email,
      rol: editingUser.rol,
      activo: editingUser.activo ? 1 : 0,
      tipo_empleado,
    };
  
    // 👁️ Rastreo de lo que se envía
    console.log('🛰️ Enviando usuario al backend:', userToSend);
  
    try {
      const res = await fetch('http://localhost/hospital_api/api/admin/updateUser.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(userToSend),
      });
      const data = await res.json();
  
      if (data.success) {
        message.success('Usuario actualizado correctamente');
        fetchUsers();
        setIsModalOpen(false);
        setEditingUser(null);
      } else {
        message.error(data.message || 'Error desconocido del backend');
        console.error('❌ Respuesta backend:', data); // 🔍 Extra
      }
    } catch (err) {
      message.error('Error al actualizar usuario (FE)');
      console.error('❌ Error en fetch:', err); // 🔍 Extra
    } finally {
      setModalLoading(false);
    }
  };
  
  
  

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Nombre', dataIndex: 'nombre' },
    { title: 'Correo', dataIndex: 'email' },
    {
      title: 'Rol',
      dataIndex: 'rol',
      render: rol => <Tag color="blue">{rol || 'Sin rol'}</Tag>
    },
    {
      title: 'Activo',
      dataIndex: 'activo',
      render: activo => <Tag color={activo ? 'green' : 'red'}>{activo ? 'Sí' : 'No'}</Tag>
    },
    {
      title: 'Tipo de Empleado',
      dataIndex: 'tipo_empleado',
      render: tipo =>
        tipo === 'hospital' ? <Tag color="geekblue">Hospital</Tag> :
          tipo === 'seguro' ? <Tag color="purple">Seguro</Tag> :
            <Tag>—</Tag>
    },
    { title: 'Fecha de creación', dataIndex: 'fecha_creacion' },
    {
      title: 'Acciones',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => openEditModal(record)}>Editar</Button>
        </Space>
      )
    }
  ]

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Gestión de Usuarios</h2>

      <Space style={{ marginBottom: '1rem' }}>
        <Input
          placeholder="Buscar por correo"
          value={filters.search}
          onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        />
        <Select
          placeholder="Filtrar por rol"
          value={filters.rol}
          onChange={(value) => setFilters(prev => ({ ...prev, rol: value }))}
          allowClear
          style={{ width: 150 }}
        >
          <Option value="admin">Admin</Option>
          <Option value="doctor">Doctor</Option>
          <Option value="empleado">Empleado</Option>
          <Option value="paciente">Paciente</Option>
        </Select>
        <DatePicker
          placeholder="Fecha de creación"
          value={filters.fecha}
          onChange={(date) => setFilters(prev => ({ ...prev, fecha: date }))}
        />
        <Button onClick={() => setFilters({ search: '', rol: '', fecha: null })}>Limpiar filtros</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
        pagination={{
          current: page,
          total,
          pageSize: 10,
          onChange: setPage
        }}
      />

      <Modal
        title="Editar Usuario"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false)
          setEditingUser(null)
        }}
        onOk={() => {
          setTimeout(handleSaveEdit, 100); // Esperamos brevemente que el setState de rol/tipo/activo se procese
        }}
        
        confirmLoading={modalLoading}
      >
        {editingUser && (
          <Form
            layout="vertical"
            initialValues={{
              activo: editingUser.activo === 1,
              tipo_empleado: editingUser.tipo_empleado || 'hospital',
            }}
          >
            <Form.Item label="Nombre">
              <Input
                value={editingUser.nombre}
                onChange={(e) =>
                  setEditingUser((prev) => ({ ...prev, nombre: e.target.value }))
                }
              />
            </Form.Item>

            <Form.Item label="Correo">
              <Input
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </Form.Item>

            <Form.Item label="Rol">
  <Select
    value={editingUser.rol}
    onChange={(value) => {
      setEditingUser(prev => ({
        ...prev,
        rol: value,
        tipo_empleado: value === 'empleado' ? (prev.tipo_empleado || 'hospital') : null,
      }))
    }}
  >
    <Option value="admin">Admin</Option>
    <Option value="doctor">Doctor</Option>
    <Option value="empleado">Empleado</Option>
    <Option value="paciente">Paciente</Option>
  </Select>
</Form.Item>


            {editingUser.rol === 'empleado' && (
              <Form.Item label="Tipo de Empleado">
                <Select
                  value={editingUser.tipo_empleado}
                  onChange={(value) =>
                    setEditingUser((prev) => ({ ...prev, tipo_empleado: value }))
                  }
                >
                  <Option value="hospital">Hospital</Option>
                  <Option value="seguro">Seguro</Option>
                </Select>
              </Form.Item>
            )}

            <Form.Item label="Activo">
              <Switch
                checked={!!editingUser.activo}
                onChange={(checked) =>
                  setEditingUser((prev) => ({ ...prev, activo: checked ? 1 : 0 }))
                }
              />
            </Form.Item>
          </Form>


        )}
      </Modal>
    </div>
  )
}

export default UsersManagement
