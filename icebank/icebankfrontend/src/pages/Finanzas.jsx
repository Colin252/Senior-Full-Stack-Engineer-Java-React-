import { Link } from "react-router-dom";
import "../styles/finanzas.css";

export default function Finanzas() {
    return (
        <div className="finanzas-container">
            <h1 className="finanzas-title">Finanzas</h1>
            <p className="finanzas-subtitle">Módulo financiero del sistema bancario</p>

            <div className="finanzas-grid">

                <Link to="/finanzas/balance" className="fin-btn">
                    Balance General
                </Link>

                <Link to="/finanzas/ingresos" className="fin-btn">
                    Ingresos
                </Link>

                <Link to="/finanzas/gastos" className="fin-btn">
                    Gastos
                </Link>

                <Link to="/finanzas/reportes" className="fin-btn">
                    Reportes
                </Link>

                <Link to="/contabilidad/libro-diario" className="fin-btn">
                    Libro Diario
                </Link>

                <Link to="/contabilidad/estado-resultados" className="fin-btn">
                    Estado de Resultados
                </Link>

            </div>
        </div>
    );
}
