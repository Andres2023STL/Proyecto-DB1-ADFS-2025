import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://localhost/hospital_api/logout.php", {
      method: "POST",
      credentials: "include",
    });

    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/">Inicio</Link>  
      <Link to="/SubHomeHospital">Hospital</Link> 
      <Link to="/SubHomeSeguro">Seguro</Link> 
      <Link to="/AboutUs">Acerca de nosotros</Link> 
      <Link to="/Contacto">Contacto</Link> 
      <Link to="/Faq">FAQ</Link> 

      {isAuthenticated ? (
        <>
          <Link to="/hospital/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Cerrar Sesión</button>
        </>
      ) : (
        <Link to="/Login">Inicio de Sesión</Link>
      )}
    </nav>
  );
};

export default Navbar;
