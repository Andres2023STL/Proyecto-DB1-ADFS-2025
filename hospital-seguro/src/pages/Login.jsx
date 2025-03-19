import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      // Normalizamos y verificamos el rol devuelto
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

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Iniciar Sesión</h1>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
        <button type="button" onClick={() => navigate("/register")}>
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Login;
