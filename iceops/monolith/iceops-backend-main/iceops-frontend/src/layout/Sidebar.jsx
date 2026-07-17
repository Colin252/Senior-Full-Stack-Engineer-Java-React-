import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="title">ICEOPS</h2>

            <ul>
                <li><Link to="/">Dashboard</Link></li>
                <li><Link to="/status">Estado del Sistema</Link></li>
                <li><Link to="/modules">Módulos</Link></li>
                <li><Link to="/summary">Resumen</Link></li>
                <li><Link to="/config">Configuración</Link></li>
            </ul>
        </div>
    );
}
