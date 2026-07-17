import React, { useEffect, useMemo, useState } from "react";
import API from "../services/api";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import "../styles/Reportes.css";

function Reportes() {
    const [transacciones, setTransacciones] = useState([]);
    const [dataMensual, setDataMensual] = useState([]);
    const [dataTipo, setDataTipo] = useState([]);
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
            procesarDatos(rows);
        } catch (err) {
            console.error("Error al cargar transacciones:", err);
            setError("No fue posible cargar los reportes financieros.");
        } finally {
            setCargando(false);
        }
    }

    function procesarDatos(rows) {
        const agrupadoMes = {};
        const resumenTipo = {
            INGRESO: 0,
            GASTO: 0
        };

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

            if (!agrupadoMes[mes]) {
                agrupadoMes[mes] = {
                    mes,
                    ingresos: 0,
                    gastos: 0
                };
            }

            const monto = Number(transaccion.monto || 0);

            if (transaccion.tipo === "INGRESO") {
                agrupadoMes[mes].ingresos += monto;
                resumenTipo.INGRESO += monto;
            } else if (transaccion.tipo === "GASTO") {
                agrupadoMes[mes].gastos += monto;
                resumenTipo.GASTO += monto;
            }
        });

        setDataMensual(Object.values(agrupadoMes));

        setDataTipo([
            {
                name: "Ingresos",
                value: resumenTipo.INGRESO
            },
            {
                name: "Gastos",
                value: resumenTipo.GASTO
            }
        ]);
    }

    const totalIngresos = useMemo(
        () =>
            transacciones
                .filter((item) => item.tipo === "INGRESO")
                .reduce(
                    (sum, item) => sum + Number(item.monto || 0),
                    0
                ),
        [transacciones]
    );

    const totalGastos = useMemo(
        () =>
            transacciones
                .filter((item) => item.tipo === "GASTO")
                .reduce(
                    (sum, item) => sum + Number(item.monto || 0),
                    0
                ),
        [transacciones]
    );

    const balance = totalIngresos - totalGastos;

    const colores = ["#3fb950", "#f85149"];

    const formatCurrency = (value) =>
        `₡${Number(value || 0).toLocaleString("es-CR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;

    return (
        <div className="reportes-page">
            <div className="reportes-container">
                <header className="reportes-header">
                    <div>
                        <h1>Reportes Financieros</h1>

                        <p>
                            Analiza el comportamiento mensual de ingresos, gastos y balance.
                        </p>
                    </div>

                    <div className="reportes-total">
                        <span>Transacciones analizadas</span>
                        <strong>{transacciones.length}</strong>
                    </div>
                </header>

                {error && (
                    <p className="reportes-message reportes-error">
                        {error}
                    </p>
                )}

                {cargando ? (
                    <div className="reportes-loading">
                        Cargando información financiera...
                    </div>
                ) : (
                    <>
                        <section className="reportes-summary">
                            <article className="reportes-summary-card ingreso">
                                <span>Ingresos</span>
                                <strong>{formatCurrency(totalIngresos)}</strong>
                            </article>

                            <article className="reportes-summary-card gasto">
                                <span>Gastos</span>
                                <strong>{formatCurrency(totalGastos)}</strong>
                            </article>

                            <article
                                className={
                                    balance >= 0
                                        ? "reportes-summary-card balance positivo"
                                        : "reportes-summary-card balance negativo"
                                }
                            >
                                <span>Balance</span>
                                <strong>{formatCurrency(balance)}</strong>
                            </article>
                        </section>

                        {transacciones.length === 0 ? (
                            <div className="reportes-empty">
                                No hay transacciones disponibles para generar reportes.
                            </div>
                        ) : (
                            <section className="reportes-grid">
                                <article className="chart-container">
                                    <div className="chart-header">
                                        <h2>Ingresos vs. Gastos por Mes</h2>

                                        <p>
                                            Comparación mensual del flujo financiero.
                                        </p>
                                    </div>

                                    <div className="chart-content">
                                        <ResponsiveContainer
                                            width="100%"
                                            height={320}
                                        >
                                            <BarChart data={dataMensual}>
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
                                </article>

                                <article className="chart-container">
                                    <div className="chart-header">
                                        <h2>Distribución Financiera</h2>

                                        <p>
                                            Participación total de ingresos y gastos.
                                        </p>
                                    </div>

                                    <div className="chart-content">
                                        <ResponsiveContainer
                                            width="100%"
                                            height={320}
                                        >
                                            <PieChart>
                                                <Pie
                                                    data={dataTipo}
                                                    dataKey="value"
                                                    nameKey="name"
                                                    cx="50%"
                                                    cy="50%"
                                                    outerRadius={105}
                                                    innerRadius={58}
                                                    paddingAngle={3}
                                                    label={({ name, percent }) =>
                                                        `${name}: ${(percent * 100).toFixed(
                                                            0
                                                        )}%`
                                                    }
                                                >
                                                    {dataTipo.map((entry, index) => (
                                                        <Cell
                                                            key={`${entry.name}-${index}`}
                                                            fill={
                                                                colores[index % colores.length]
                                                            }
                                                        />
                                                    ))}
                                                </Pie>

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
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                </article>
                            </section>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Reportes;