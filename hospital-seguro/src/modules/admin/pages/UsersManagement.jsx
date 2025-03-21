import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Select, DatePicker, Form, Button, Typography, Pagination, Card } from 'antd';
import { motion } from 'framer-motion';
import usersData from '../../../data/users.json';
import { logAuditEvent } from './AuditLogs';

const { Title } = Typography;
const { Option } = Select;

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [newUser, setNewUser] = useState({ name: "", email: "", role: "", active: false });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Cargar usuarios iniciales desde JSON
  useEffect(() => {
    setUsers(usersData);
    setFilteredUsers(usersData);
  }, []);

  // Filtrar usuarios según los valores de búsqueda
  useEffect(() => {
    if (users.length === 0) return;
    let filtered = users.filter(user =>
      (searchEmail === "" || user.email.toLowerCase().includes(searchEmail.toLowerCase())) &&
      (searchRole === "" || user.role === searchRole) &&
      (searchDate === "" || (user.createdAt && user.createdAt.startsWith(searchDate)))
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchEmail, searchRole, searchDate, users]);

  // Cálculo para paginación manual
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Función para agregar un nuevo usuario
  const handleAddUser = (values) => {
    const newUserEntry = {
      ...values,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      active: false,
    };
    const updatedUsers = [...users, newUserEntry];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    logAuditEvent("Administrador", "Creación de usuario", `Se creó el usuario ${values.email} con rol ${values.role}`);
    alert("✅ Usuario agregado correctamente.");
  };

  // Alternar el estado (activo/inactivo) de un usuario
  const toggleUserStatus = (id) => {
    const updatedUsers = users.map(user =>
      user.id === id ? { ...user, active: !user.active } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    const toggledUser = updatedUsers.find(user => user.id === id);
    const status = toggledUser.active ? "activado" : "desactivado";
    logAuditEvent("Administrador", "Cambio de estado", `Se ${status} la cuenta de ${toggledUser.email}`);
  };

  // Columnas para la tabla de usuarios
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: text => text || "No asignado"
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: text => text || "Sin rol"
    },
    {
      title: 'Estado',
      dataIndex: 'active',
      key: 'active',
      render: active => active ? "🟢 Activo" : "🔴 Inactivo"
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Button onClick={() => toggleUserStatus(record.id)}>
          {record.active ? "Desactivar" : "Activar"}
        </Button>
      )
    }
  ];

  return (
    <div className="private-page-container">
      <div className="private-page-header">
        <Title level={2}>Gestión de Usuarios</Title>
        <Link to="/admin/admindashboard" className="private-back-button">← Regresar</Link>
      </div>

      {/* Filtros de búsqueda */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="private-filters" style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Input
          placeholder="Buscar por correo..."
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
          className="private-input"
          style={{ width: "200px" }}
        />
        <Select
          placeholder="Todos los roles"
          value={searchRole}
          onChange={value => setSearchRole(value)}
          style={{ width: "200px" }}
        >
          <Option value="">Todos los roles</Option>
          <Option value="doctor">Doctor</Option>
          <Option value="admin">Administrador</Option>
          <Option value="empleado">Empleado hospital</Option>
          <Option value="empleadoAs">Empleado aseguradora</Option>
        </Select>
        <DatePicker
          placeholder="Fecha"
          onChange={(date, dateString) => setSearchDate(dateString)}
          style={{ width: "200px" }}
        />
      </motion.div>

      {/* Tabla de usuarios */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Table
          dataSource={currentUsers}
          columns={columns}
          rowKey="id"
          pagination={false}
          className="private-users-table"
        />
      </motion.div>

      {/* Paginación */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Pagination
          current={currentPage}
          total={filteredUsers.length}
          pageSize={usersPerPage}
          onChange={page => setCurrentPage(page)}
          className="private-pagination"
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </motion.div>

      {/* Formulario para agregar usuario */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <Title level={3} style={{ marginTop: "30px" }}>Agregar Usuario</Title>
        <Card className="private-user-form-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Form layout="vertical" onFinish={handleAddUser} className="private-user-form">
            <Form.Item
              label="Nombre completo"
              name="name"
              rules={[{ required: true, message: "Ingrese el nombre completo" }]}
              className="private-form-item"
            >
              <Input className="private-input" />
            </Form.Item>
            <Form.Item
              label="Correo electrónico"
              name="email"
              rules={[{ required: true, message: "Ingrese el correo electrónico" }]}
              className="private-form-item"
            >
              <Input className="private-input" />
            </Form.Item>
            <Form.Item
              label="Rol"
              name="role"
              rules={[{ required: true, message: "Seleccione un rol" }]}
              className="private-form-item"
            >
              <Select className="private-input">
                <Option value="">Selecciona un rol</Option>
                <Option value="doctor">Doctor</Option>
                <Option value="admin">Administrador</Option>
                <Option value="empleado">Empleado</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block className="private-btn">
                Guardar Usuario
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </motion.div>
    </div>
  );
}

export default UsersManagement;
