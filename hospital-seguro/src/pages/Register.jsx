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

    const response = await fetch("http://localhost/hospital_api/register.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } else {
      alert(data.message);
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
