import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu, theme } from 'antd';
const { Header } = Layout;

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  // Maneja el cierre de sesión: envía una petición a la API, actualiza el estado y redirige al login.
  const handleLogout = async () => {
    await fetch("http://localhost/hospital_api/logout.php", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Obtiene tokens de estilo de Ant Design para personalizar el menú.
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // 1) Ítems comunes para todos los usuarios.
  const commonItems = [
    { key: '1', label: <Link to="/" className="navbar-menu-item">Inicio</Link> },
    { key: '2', label: <Link to="/SubHomeHospital" className="navbar-menu-item">Hospital</Link> },
    { key: '3', label: <Link to="/SubHomeSeguro" className="navbar-menu-item">Seguro</Link> },
    { key: '4', label: <Link to="/AboutUs" className="navbar-menu-item">Acerca de nosotros</Link> },
    { key: '5', label: <Link to="/Contacto" className="navbar-menu-item">Contacto</Link> },
    { key: '6', label: <Link to="/Faq" className="navbar-menu-item">FAQ</Link> },
  ];

  // 2) Ítems para usuarios autenticados.
  const authItems = [
    { key: '7', label: <Link to="/dashboard" className="navbar-menu-item">Dashboard</Link> },
    {
      key: '8',
      label: (
        <span onClick={handleLogout} className="navbar-logout">
          Cerrar Sesión
        </span>
      ),
    },
  ];

  // 3) Ítems para usuarios no autenticados.
  const guestItems = [
    { key: '9', label: <Link to="/Login" className="navbar-menu-item">Inicio de Sesión</Link> },
  ];

  // 4) Combina los ítems según si el usuario está autenticado o no.
  const menuItems = isAuthenticated
    ? [...commonItems, ...authItems]
    : [...commonItems, ...guestItems];

  return (
    <nav>
      <Layout>
        <Header className="navbar-header">
          {/* Logo y título de la aplicación */}
          <img src="/home-heart.png" alt="Logo" className="navbar-logo" />
          <h1 className="navbar-title">Plataforma Unificada</h1>
          
          {/* Menú de navegación con ítems condicionales */}
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
