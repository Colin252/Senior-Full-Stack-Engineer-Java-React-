import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

export default function Sidebar() {

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    };

    return (
        <div className="sidebar">
            <h2>IceBank</h2>

            <nav className="nav-menu">

                {/* -------------------- BANCA -------------------- */}
                <h3 className="nav-section-title">Banca</h3>
                <Link to="/">Dashboard</Link>
                <Link to="/create-account">Crear Cuenta</Link>
                <Link to="/accounts">Mis Cuentas</Link>
                <Link to="/transfer">Transferencias</Link>
                <Link to="/movements">Movimientos</Link>

                {/* ------------------- FINANZAS ------------------- */}
                <h3 className="nav-section-title">Finanzas</h3>

                <Link to="/finanzas/balance">Balance General</Link>
                <Link to="/finanzas/ingresos">Ingresos</Link>
                <Link to="/finanzas/gastos">Gastos</Link>
                <Link to="/finanzas/reportes">Reportes</Link>

                {/* ---------------- CONTABILIDAD ------------------ */}
                <h3 className="nav-section-title">Contabilidad</h3>

                <Link to="/finanzas/libro-diario">Libro Diario</Link>
                <Link to="/finanzas/libro-mayor">Libro Mayor</Link>
                <Link to="/finanzas/estado-resultados">Estado de Resultados</Link>
                <Link to="/finanzas/resumen">Resumen Contable</Link>

            </nav>



        </div>
    );
}
