import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "antd";
import { motion } from "framer-motion";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Maneja la autenticación
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost/hospital_api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      setIsAuthenticated(true);
      // Normaliza el rol recibido para redirigir correctamente
      const role = data.role && data.role.trim().toLowerCase();
      if (role === "admin") {
        navigate("/admin/admindashboard");
      } else if (role === "doctor") {
        navigate("/hospital/dashboard");
      } else if (role === "empleado_seguro") {
        navigate("/seguro/SeguroEmpleadoDashboard");
      } else {
        navigate("/login");
      }
    } else {
      alert(data.message);
    }
  };

  // Variantes de animación para el card de login
  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div
      className="login-container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card title="Iniciar Sesión" style={{ width: 350, borderRadius: 8 }} className="login-card">
          <form className="login-form" onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Input.Password
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Button type="primary" htmlType="submit" block style={{ marginBottom: "0.5rem" }}>
              Ingresar
            </Button>
            <Button type="default" onClick={() => navigate("/register")} block>
              Registrarse
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default Login;
