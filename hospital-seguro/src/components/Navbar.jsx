import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
import '../assets/navbar.css'; // Import the CSS file
const { Header } = Layout;

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

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 1) Items comunes para todos
  const commonItems = [
    { key: '1', label: <Link to="/" className="navbar-menu-item">Inicio</Link> },
    { key: '2', label: <Link to="/SubHomeHospital" className="navbar-menu-item">Hospital</Link> },
    { key: '3', label: <Link to="/SubHomeSeguro" className="navbar-menu-item">Seguro</Link> },
    { key: '4', label: <Link to="/AboutUs" className="navbar-menu-item">Acerca de nosotros</Link> },
    { key: '5', label: <Link to="/Contacto" className="navbar-menu-item">Contacto</Link> },
    { key: '6', label: <Link to="/Faq" className="navbar-menu-item">FAQ</Link> },
  ];

  // 2) Items para usuario logueado
  const authItems = [
    { key: '7', label: <Link to="/hospital/dashboard" className="navbar-menu-item">Dashboard</Link> },
    {
      key: '8',
      label: (
        <span onClick={handleLogout} className="navbar-logout">
          Cerrar Sesión
        </span>
      ),
    },
  ];

  // 3) Items para usuario NO logueado
  const guestItems = [
    { key: '9', label: <Link to="/Login" className="navbar-menu-item">Inicio de Sesión</Link> },
  ];

  // 4) Combinar según autenticación
  const menuItems = isAuthenticated
    ? [...commonItems, ...authItems]
    : [...commonItems, ...guestItems];

  return (
    <nav>
      <Layout>
        <Header className="navbar-header">
          {/* LOGO Y TÍTULO */}
          <img src="../../public/home-heart.png" alt="Logo" className="navbar-logo"/>
          <h1 className="navbar-title">Plataforma Unificada</h1>
          
          {/* MENÚ CON ITEMS CONDICIONALES A LA DERECHA */}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            items={menuItems}
            className="navbar-menu"
          />
        </Header>
      </Layout>
    </nav>
  );
};

export default Navbar;