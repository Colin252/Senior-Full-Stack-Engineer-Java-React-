import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Balance.css";

function Balance() {
    const [transacciones, setTransacciones] = useState([]);
    const [ingresos, setIngresos] = useState(0);
    const [gastos, setGastos] = useState(0);
    const [balance, setBalance] = useState(0);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTransacciones();
    }, []);

    async function fetchTransacciones() {
        try {
            setCargando(true);
            setError("");

            const response = await API.get("/transacciones");
            const rows = Array.isArray(response.data)
                ? response.data
                : [];

            setTransacciones(rows);

            const totalIngresos = rows
                .filter((item) => item.tipo === "INGRESO")
                .reduce(
                    (sum, item) => sum + Number(item.monto || 0),
                    0
                );

            const totalGastos = rows
                .filter((item) => item.tipo === "GASTO")
                .reduce(
                    (sum, item) => sum + Number(item.monto || 0),
                    0
                );

            setIngresos(totalIngresos);
            setGastos(totalGastos);
            setBalance(totalIngresos - totalGastos);
        } catch (err) {
            console.error("Error al cargar transacciones:", err);
            setError("No fue posible cargar el balance.");
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="balance-page">
            <div className="balance-container">
                <header className="balance-header">
                    <div>
                        <h1>Balance General</h1>

                        <p>
                            Resumen consolidado de ingresos, gastos y resultado neto.
                        </p>
                    </div>

                    <div className="balance-total-transacciones">
                        <span>Transacciones</span>
                        <strong>{transacciones.length}</strong>
                    </div>
                </header>

                {error && (
                    <p className="balance-message balance-error">
                        {error}
                    </p>
                )}

                {cargando ? (
                    <div className="balance-loading">
                        Cargando información financiera...
                    </div>
                ) : (
                    <section className="resumen-balance">
                        <article className="balance-card ingreso">
                            <span>Ingresos</span>

                            <strong>
                                ₡{Number(ingresos || 0).toFixed(2)}
                            </strong>

                            <p>
                                Total acumulado de transacciones de ingreso.
                            </p>
                        </article>

                        <article className="balance-card gasto">
                            <span>Gastos</span>

                            <strong>
                                ₡{Number(gastos || 0).toFixed(2)}
                            </strong>

                            <p>
                                Total acumulado de transacciones de gasto.
                            </p>
                        </article>

                        <article
                            className={
                                balance >= 0
                                    ? "balance-card resultado positivo"
                                    : "balance-card resultado negativo"
                            }
                        >
                            <span>Balance Neto</span>

                            <strong>
                                ₡{Number(balance || 0).toFixed(2)}
                            </strong>

                            <p>
                                Diferencia entre ingresos y gastos.
                            </p>
                        </article>
                    </section>
                )}
            </div>
        </div>
    );
}

export default Balance;