import React, { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import "../styles/Estadisticas.css";

function Estadisticas() {
    const [data, setData] = useState([]);
    const [transacciones, setTransacciones] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        try {
            setCargando(true);
            setError("");

            const response = await API.get("/transacciones");

            const rows = Array.isArray(response.data)
                ? response.data
                : [];

            setTransacciones(rows);

            const agrupado = {};

            rows.forEach((transaccion) => {
                const fecha = transaccion.fecha
                    ? new Date(`${transaccion.fecha}T00:00:00`)
                    : null;

                const mes =
                    fecha && !Number.isNaN(fecha.getTime())
                        ? fecha.toLocaleString("es-CR", {
                            month: "short",
                            year: "numeric"
                        })
                        : "Sin fecha";

                if (!agrupado[mes]) {
                    agrupado[mes] = {
                        mes,
                        ingresos: 0,
                        gastos: 0
                    };
                }

                const monto = Number(transaccion.monto || 0);

                if (transaccion.tipo === "INGRESO") {
                    agrupado[mes].ingresos += monto;
                }

                if (transaccion.tipo === "GASTO") {
                    agrupado[mes].gastos += monto;
                }
            });

            setData(Object.values(agrupado));
        } catch (err) {
            console.error("Error al cargar estadísticas:", err);
            setError("No fue posible cargar las estadísticas.");
        } finally {
            setCargando(false);
        }
    }

    const ingresos = useMemo(
        () =>
            transacciones
                .filter((item) => item.tipo === "INGRESO")
                .reduce(
                    (sum, item) => sum + Number(item.monto || 0),
                    0
                ),
        [transacciones]
    );

    const gastos = useMemo(
        () =>
            transacciones
                .filter((item) => item.tipo === "GASTO")
                .reduce(
                    (sum, item) => sum + Number(item.monto || 0),
                    0
                ),
        [transacciones]
    );

    const balance = ingresos - gastos;

    const formatCurrency = (value) =>
        `₡${Number(value || 0).toLocaleString("es-CR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

    return (
        <div className="estadisticas-page">
            <div className="estadisticas-container">
                <header className="estadisticas-header">
                    <div>
                        <h1>Estadísticas Generales</h1>

                        <p>
                            Consulta el comportamiento financiero y la evolución
                            mensual de Quantik.
                        </p>
                    </div>

                    <div className="estadisticas-total">
                        <span>Transacciones analizadas</span>
                        <strong>{transacciones.length}</strong>
                    </div>
                </header>

                {error && (
                    <p className="estadisticas-message estadisticas-error">
                        {error}
                    </p>
                )}

                {cargando ? (
                    <div className="estadisticas-loading">
                        Cargando estadísticas...
                    </div>
                ) : (
                    <>
                        <section className="estadisticas-cards">
                            <article className="estadisticas-card ingreso">
                                <span>Total Ingresos</span>
                                <strong>{formatCurrency(ingresos)}</strong>
                            </article>

                            <article className="estadisticas-card gasto">
                                <span>Total Gastos</span>
                                <strong>{formatCurrency(gastos)}</strong>
                            </article>

                            <article
                                className={
                                    balance >= 0
                                        ? "estadisticas-card balance positivo"
                                        : "estadisticas-card balance negativo"
                                }
                            >
                                <span>Balance Neto</span>
                                <strong>{formatCurrency(balance)}</strong>
                            </article>
                        </section>

                        {data.length === 0 ? (
                            <div className="estadisticas-empty">
                                No hay datos suficientes para generar estadísticas.
                            </div>
                        ) : (
                            <section className="estadisticas-chart-container">
                                <div className="estadisticas-chart-header">
                                    <h2>Evolución Mensual</h2>

                                    <p>
                                        Comparación de ingresos y gastos por mes.
                                    </p>
                                </div>

                                <div className="estadisticas-chart-content">
                                    <ResponsiveContainer
                                        width="100%"
                                        height={340}
                                    >
                                        <BarChart data={data}>
                                            <CartesianGrid
                                                stroke="#30363d"
                                                strokeDasharray="3 3"
                                            />

                                            <XAxis
                                                dataKey="mes"
                                                stroke="#9198a1"
                                                tick={{ fill: "#9198a1" }}
                                            />

                                            <YAxis
                                                stroke="#9198a1"
                                                tick={{ fill: "#9198a1" }}
                                                tickFormatter={(value) =>
                                                    `₡${Number(value).toLocaleString(
                                                        "es-CR"
                                                    )}`
                                                }
                                            />

                                            <Tooltip
                                                formatter={(value) =>
                                                    formatCurrency(value)
                                                }
                                                contentStyle={{
                                                    background: "#161b22",
                                                    border: "1px solid #30363d",
                                                    borderRadius: "8px",
                                                    color: "#e6edf3"
                                                }}
                                                labelStyle={{
                                                    color: "#ffffff"
                                                }}
                                            />

                                            <Legend />

                                            <Bar
                                                dataKey="ingresos"
                                                name="Ingresos"
                                                fill="#3fb950"
                                                radius={[4, 4, 0, 0]}
                                            />

                                            <Bar
                                                dataKey="gastos"
                                                name="Gastos"
                                                fill="#f85149"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Estadisticas;