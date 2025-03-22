import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "antd";
import { motion } from "framer-motion";

function Login({ setIsAuthenticated }) {
  // Estados para almacenar el correo y la contraseña
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Hook para realizar redirecciones programáticas
  const navigate = useNavigate();

  // Función que maneja el envío del formulario de autenticación
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario (para que no recargue y manejarlo de forma personalizada)
    const response = await fetch("http://localhost/hospital_api/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Envía cookies para mantener la sesión
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.success) {
      setIsAuthenticated(true);
      // Se obtiene y normaliza el rol del usuario para redirigir correctamente
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

  // Configuración de la animación para el contenedor del card
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
      {/* Contenedor animado para el card de login */}
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
            {/* Botón que redirige al usuario a la página de registro */}
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
