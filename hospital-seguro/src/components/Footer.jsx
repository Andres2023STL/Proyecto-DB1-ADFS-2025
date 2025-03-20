import { Layout } from 'antd';
import '../assets/footer.css';

const { Footer: AntFooter } = Layout;

function Footer() {
  return (
    <AntFooter className="footer">
      © {new Date().getFullYear()} Plataforma de Gestión Médica. Todos los derechos reservados.
    </AntFooter>
  );
}

export default Footer;
