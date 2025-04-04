import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Card } from "antd";
import { motion } from "framer-motion";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    const start = performance.now();

    try {
      const response = await fetch("http://localhost/hospital_api/register.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const text = await response.text();
      const end = performance.now();
      console.log("⏱️ Tiempo de respuesta percibido:", Math.round(end - start), "ms");
      console.log("Respuesta cruda:", text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        alert("Error inesperado. La respuesta no es válida.");
        return;
      }

      if (data.success) {
        alert("Registro exitoso. Se ha enviado un correo al administrador para activar tu cuenta.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/login");
      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error("Error de red:", error);
      alert("Ocurrió un error al registrarse. Verifica tu conexión o contacta al soporte.");
    }
  };

  return (
    <div className="register-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card title="Registrarse" className="register-card">
          <form className="register-form" onSubmit={handleRegister}>
            <Input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <Input.Password
              placeholder="Confirmar Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="primary" htmlType="submit" block style={{ marginTop: "1rem" }}>
              Registrarse
            </Button>
            <Button type="default" onClick={() => navigate("/login")} block style={{ marginTop: "10px" }}>
              Volver al Login
            </Button>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default Register;
