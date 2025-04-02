import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Select, DatePicker, Button, Typography, Pagination } from 'antd';
import { motion } from 'framer-motion';
import { logAuditEvent } from '../../admin/pages/AuditLogs';

const { Title } = Typography;
const { Option } = Select;

function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    fetch("http://localhost/hospital_api/getUsers.php")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUsers(data.users);
          setFilteredUsers(data.users);
        }
      });
  }, []);

  useEffect(() => {
    let filtered = users.filter(user =>
      (searchEmail === "" || user.email.toLowerCase().includes(searchEmail.toLowerCase())) &&
      (searchRole === "" || user.role === searchRole) &&
      (searchDate === "" || (user.created_at && user.created_at.startsWith(searchDate)))
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchEmail, searchRole, searchDate, users]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const toggleUserStatus = async (id, currentStatus) => {
    const payload = {
      id: parseInt(id),
      active: currentStatus ? 0 : 1
    };

    const response = await fetch("http://localhost/hospital_api/toggleUserStatus.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.success) {
      const updated = await fetch("http://localhost/hospital_api/getUsers.php").then(res => res.json());
      if (updated.success) {
        setUsers(updated.users);
        setFilteredUsers(updated.users);
        const toggledUser = updated.users.find(user => user.id === id);
        const status = currentStatus ? "desactivado" : "activado";
        logAuditEvent("Administrador", "Cambio de estado", `Se ${status} la cuenta de ${toggledUser?.email}`);
      }
    } else {
      alert("❌ Error al cambiar estado: " + data.message);
    }
  };

  const assignUserRole = async (id, newRole) => {
    const response = await fetch("http://localhost/hospital_api/setUserRole.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: parseInt(id), role: newRole })
    });
    const data = await response.json();
    if (data.success) {
      const updated = await fetch("http://localhost/hospital_api/getUsers.php").then(res => res.json());
      if (updated.success) {
        setUsers(updated.users);
        setFilteredUsers(updated.users);
        logAuditEvent("Administrador", "Cambio de rol", `Se asignó el rol ${newRole} al usuario con ID ${id}`);
      }
    } else {
      alert("❌ Error al cambiar el rol: " + data.message);
    }
  };

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name', render: text => text || "No asignado" },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Rol', dataIndex: 'role', key: 'role', render: text => text || "Sin rol" },
    { title: 'Estado', dataIndex: 'active', key: 'active', render: active => Number(active) === 1 ? "🟢 Activo" : "🔴 Inactivo" },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Button onClick={() => toggleUserStatus(record.id, Number(record.active))}>
            {Number(record.active) === 1 ? "Desactivar" : "Activar"}
          </Button>
          <Select
            defaultValue={record.role || undefined}
            style={{ width: 150 }}
            onChange={(newRole) => assignUserRole(record.id, newRole)}
          >
            <Option value="doctor">Doctor</Option>
            <Option value="admin">Administrador</Option>
            <Option value="empleado_hospital">Empleado hospital</Option>
            <Option value="empleado_seguro">Empleado aseguradora</Option>
          </Select>
        </div>
      )
    }
  ];

  return (
    <div className="private-page-container">
      <div className="private-page-header">
        <Title level={2}>Gestión de Usuarios</Title>
        <Link to="/admin/admindashboard" className="private-back-button">← Regresar</Link>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="private-filters" style={{ marginBottom: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <Input placeholder="Buscar por correo..." value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} style={{ width: "200px" }} />
        <Select placeholder="Todos los roles" value={searchRole} onChange={value => setSearchRole(value)} style={{ width: "200px" }}>
          <Option value="">Todos los roles</Option>
          <Option value="doctor">Doctor</Option>
          <Option value="admin">Administrador</Option>
          <Option value="empleado_hospital">Empleado hospital</Option>
          <Option value="empleado_seguro">Empleado aseguradora</Option>
        </Select>
        <DatePicker placeholder="Fecha" onChange={(date, dateString) => setSearchDate(dateString)} style={{ width: "200px" }} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <Table dataSource={currentUsers} columns={columns} rowKey="id" pagination={false} />
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
        <Pagination current={currentPage} total={filteredUsers.length} pageSize={usersPerPage} onChange={page => setCurrentPage(page)} style={{ textAlign: "center", marginTop: "20px" }} />
      </motion.div>
    </div>
  );
}

export default UsersManagement;
