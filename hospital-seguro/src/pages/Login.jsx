import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Input, Button } from "antd";
import { motion } from "framer-motion";

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      localStorage.setItem("user_id", data.userId);
  
      const role = data.role && data.role.trim().toLowerCase();
  
      // 🚨 Aquí es la parte importante
      if (role === "doctor" && data.needsProfile) {
        navigate("/hospital/DoctorProfileForm");
      } else if (role === "doctor") {
        navigate("/hospital/dashboard");
      } else if (role === "admin") {
        navigate("/admin/admindashboard");
      } else if (role === "empleado_seguro") {
        navigate("/seguro/SeguroEmpleadoDashboard");
      } else if (role === "empleado_hospital") {
        navigate("/hospital-empleado/HospitalEmpleadoDashboard");
      } else {
        navigate("/login");
      }
    } else {
      alert(data.message);
    }
  };
  

  const cardVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="login-container">
      <motion.div initial="hidden" animate="visible" variants={cardVariants}>
        <Card title="Iniciar Sesión" className="login-card">
          <form className="login-form" onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input.Password
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
