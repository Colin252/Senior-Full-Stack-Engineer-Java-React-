import React from "react";
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Clientes from "./pages/Clientes";
import Productos from "./pages/Productos";
import Ventas from "./pages/Ventas";
import Transacciones from "./pages/Transacciones";
import Proveedores from "./pages/Proveedores";
import Facturas from "./pages/Facturas";
import RegistrarFactura from "./pages/RegistrarFactura";
import Reportes from "./pages/Reportes";
import Balance from "./pages/Balance";
import Estadisticas from "./pages/Estadisticas";

import VerMovimientos from "./pages/VerMovimientos";
import AgregarMovimiento from "./pages/AgregarMovimiento";
import EditarMovimiento from "./pages/EditarMovimiento";
import EliminarMovimiento from "./pages/EliminarMovimiento";
import ResumenMovimientos from "./pages/ResumenMovimientos";

function App() {
    return (
        <Router>
            <Routes>
                {/* Entrada directa a la versión demo */}
                <Route
                    path="/"
                    element={<Navigate to="/dashboard" replace />}
                />

                {/* Core */}
                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/clientes"
                    element={<Clientes />}
                />

                <Route
                    path="/productos"
                    element={<Productos />}
                />

                <Route
                    path="/ventas"
                    element={<Ventas />}
                />

                <Route
                    path="/transacciones"
                    element={<Transacciones />}
                />

                <Route
                    path="/proveedores"
                    element={<Proveedores />}
                />

                <Route
                    path="/facturas"
                    element={<Facturas />}
                />

                <Route
                    path="/registrar-factura"
                    element={<RegistrarFactura />}
                />

                <Route
                    path="/reportes"
                    element={<Reportes />}
                />

                <Route
                    path="/balance"
                    element={<Balance />}
                />

                <Route
                    path="/estadisticas"
                    element={<Estadisticas />}
                />

                {/* Movimientos */}
                <Route
                    path="/ver-movimientos"
                    element={<VerMovimientos />}
                />

                <Route
                    path="/agregar-movimiento"
                    element={<AgregarMovimiento />}
                />

                <Route
                    path="/editar-movimiento"
                    element={<EditarMovimiento />}
                />

                <Route
                    path="/eliminar-movimiento"
                    element={<EliminarMovimiento />}
                />

                <Route
                    path="/resumen-movimientos"
                    element={<ResumenMovimientos />}
                />

                {/* Login futuro */}
                {/*
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        Para restaurar seguridad:

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        */}

                <Route
                    path="*"
                    element={<Navigate to="/dashboard" replace />}
                />
            </Routes>
        </Router>
    );
}

export default App;