import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateAccount from "./pages/CreateAccount";
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import Movements from "./pages/Movements";

import Finanzas from "./pages/Finanzas";
import Balance from "./pages/Balance";
import Ingresos from "./pages/Ingresos";
import Gastos from "./pages/Gastos";
import Reportes from "./pages/Reportes";

import LibroDiario from "./pages/LibroDiario";
import LibroMayor from "./pages/LibroMayor";
import EstadoResultados from "./pages/EstadoResultados";
import Resumen from "./pages/Resumen";

import Sidebar from "./components/Sidebar";

import "./styles/global.css";

export default function App() {
    return (
        <BrowserRouter>
            <div className="layout">
                <Sidebar />

                <div className="content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route
                            path="/create-account"
                            element={<CreateAccount />}
                        />

                        <Route
                            path="/accounts"
                            element={<Accounts />}
                        />

                        <Route
                            path="/transfer"
                            element={<Transfer />}
                        />

                        <Route
                            path="/movements"
                            element={<Movements />}
                        />

                        <Route
                            path="/finanzas"
                            element={<Finanzas />}
                        />

                        <Route
                            path="/finanzas/balance"
                            element={<Balance />}
                        />

                        <Route
                            path="/finanzas/ingresos"
                            element={<Ingresos />}
                        />

                        <Route
                            path="/finanzas/gastos"
                            element={<Gastos />}
                        />

                        <Route
                            path="/finanzas/reportes"
                            element={<Reportes />}
                        />

                        <Route
                            path="/finanzas/libro-diario"
                            element={<LibroDiario />}
                        />

                        <Route
                            path="/finanzas/libro-mayor"
                            element={<LibroMayor />}
                        />

                        <Route
                            path="/finanzas/estado-resultados"
                            element={<EstadoResultados />}
                        />

                        <Route
                            path="/finanzas/resumen"
                            element={<Resumen />}
                        />

                        <Route
                            path="*"
                            element={<Navigate to="/" replace />}
                        />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}