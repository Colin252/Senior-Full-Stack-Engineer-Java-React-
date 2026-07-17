import "../styles/dashboard.css";

export default function Dashboard() {

    const userName = localStorage.getItem("userName") || "Demo User";

    return (

        <div className="page">

            <header className="dashboard-header">

                <div>
                    <h1>IceBank Dashboard</h1>

                    <p>
                        Bienvenido, <strong>{userName}</strong>.
                    </p>
                </div>

            </header>

            <div className="cards-grid">

                <div className="card">
                    <h3>Cuentas Bancarias</h3>
                    <strong>Accounts</strong>

                    <p>
                        Administra todas tus cuentas bancarias.
                    </p>
                </div>

                <div className="card">
                    <h3>Transferencias</h3>
                    <strong>Transfers</strong>

                    <p>
                        Envía dinero entre cuentas de forma segura.
                    </p>
                </div>

                <div className="card">
                    <h3>Movimientos</h3>
                    <strong>Transactions</strong>

                    <p>
                        Consulta el historial completo de operaciones.
                    </p>
                </div>

                <div className="card">
                    <h3>Finanzas</h3>
                    <strong>Analytics</strong>

                    <p>
                        Balance, ingresos, gastos y reportes financieros.
                    </p>
                </div>

            </div>

        </div>

    );

}