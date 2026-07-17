import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();

    const menu = [
        {
            title: "Nueva Venta",
            description: "Registra una nueva operación comercial.",
            route: "/ventas"
        },
        {
            title: "Clientes",
            description: "Administra la información de clientes.",
            route: "/clientes"
        },
        {
            title: "Proveedores",
            description: "Gestiona proveedores y relaciones comerciales.",
            route: "/proveedores"
        },
        {
            title: "Productos",
            description: "Consulta y administra el catálogo.",
            route: "/productos"
        },
        {
            title: "Ventas",
            description: "Revisa las ventas registradas.",
            route: "/ventas"
        },
        {
            title: "Facturas",
            description: "Gestiona facturas y documentos financieros.",
            route: "/facturas"
        },
        {
            title: "Transacciones",
            description: "Consulta ingresos, gastos y movimientos.",
            route: "/transacciones"
        },
        {
            title: "Balance",
            description: "Visualiza el balance financiero general.",
            route: "/balance"
        },
        {
            title: "Reportes",
            description: "Genera y consulta reportes operativos.",
            route: "/reportes"
        },
        {
            title: "Estadísticas",
            description: "Analiza métricas y datos del sistema.",
            route: "/estadisticas"
        }
    ];

    return (
        <div className="dashboard-page">
            <aside className="dashboard-sidebar">
                <div className="dashboard-brand">
                    <div className="dashboard-logo">Q</div>

                    <div>
                        <strong>Quantik</strong>
                        <small>Financial Platform</small>
                    </div>
                </div>

                <nav className="dashboard-navigation">
                    <p className="dashboard-section-title">
                        Aplicaciones
                    </p>

                    {menu.map((item) => (
                        <button
                            key={`${item.title}-${item.route}`}
                            type="button"
                            className="dashboard-nav-button"
                            onClick={() => navigate(item.route)}
                        >
                            {item.title}
                        </button>
                    ))}
                </nav>

                <div className="dashboard-demo-label">
                    Demo Environment
                </div>
            </aside>

            <main className="dashboard-content">
                <header className="dashboard-header">
                    <div className="dashboard-header-copy">
                        <h1>Quantik Dashboard</h1>

                        <p>
                            Gestión empresarial, financiera y operativa desde
                            una plataforma central.
                        </p>
                    </div>

                    <span className="dashboard-status">
                        <span className="dashboard-status-dot" />
                        Online
                    </span>
                </header>

                <section className="dashboard-grid">
                    {menu.map((item) => (
                        <article
                            key={`card-${item.title}-${item.route}`}
                            className="dashboard-card"
                        >
                            <h2>{item.title}</h2>

                            <p>{item.description}</p>

                            <button
                                type="button"
                                onClick={() => navigate(item.route)}
                            >
                                Abrir módulo
                            </button>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;