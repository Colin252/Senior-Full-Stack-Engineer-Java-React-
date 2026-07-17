import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Transacciones.css";

function Transacciones() {
    const [tipo, setTipo] = useState("");
    const [monto, setMonto] = useState("");
    const [fecha, setFecha] = useState("");

    const [transacciones, setTransacciones] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        fetchTransacciones();
    }, []);

    async function fetchTransacciones() {
        try {
            const response = await API.get("/transacciones");
            setTransacciones(response.data || []);
        } catch (error) {
            console.error("Error al obtener transacciones:", error);
            setMensaje("No fue posible cargar las transacciones.");
            setTipoMensaje("error");
        }
    }

    function limpiarFormulario() {
        setTipo("");
        setMonto("");
        setFecha("");
        setEditandoId(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const parsedMonto = Number(monto);

        if (
            !tipo ||
            !Number.isFinite(parsedMonto) ||
            parsedMonto <= 0 ||
            !fecha
        ) {
            setMensaje("Completa correctamente todos los campos.");
            setTipoMensaje("error");
            return;
        }

        const data = {
            tipo,
            monto: parsedMonto,
            fecha
        };

        try {
            setGuardando(true);
            setMensaje("");

            if (editandoId) {
                await API.put(`/transacciones/${editandoId}`, data);
                setMensaje("Transacción actualizada correctamente.");
            } else {
                await API.post("/transacciones", data);
                setMensaje("Transacción registrada correctamente.");
            }

            setTipoMensaje("success");
            limpiarFormulario();
            await fetchTransacciones();
        } catch (error) {
            console.error("Error al guardar transacción:", error);
            setMensaje("No fue posible guardar la transacción.");
            setTipoMensaje("error");
        } finally {
            setGuardando(false);
        }
    }

    async function handleEliminar(id) {
        const confirmed = window.confirm(
            "¿Seguro que deseas eliminar esta transacción?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.delete(`/transacciones/${id}`);

            setMensaje("Transacción eliminada correctamente.");
            setTipoMensaje("success");

            await fetchTransacciones();
        } catch (error) {
            console.error("Error al eliminar transacción:", error);
            setMensaje("No fue posible eliminar la transacción.");
            setTipoMensaje("error");
        }
    }

    function handleEditar(transaccion) {
        setTipo(transaccion.tipo || "");
        setMonto(String(transaccion.monto ?? ""));
        setFecha(transaccion.fecha || "");
        setEditandoId(transaccion.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    const totalIngresos = transacciones
        .filter((item) => item.tipo === "INGRESO")
        .reduce((sum, item) => sum + Number(item.monto || 0), 0);

    const totalGastos = transacciones
        .filter((item) => item.tipo === "GASTO")
        .reduce((sum, item) => sum + Number(item.monto || 0), 0);

    return (
        <div className="transacciones-page">
            <div className="transacciones-container">
                <header className="transacciones-header">
                    <div>
                        <h1>Gestión de Transacciones</h1>

                        <p>
                            Registra, actualiza y consulta ingresos y gastos.
                        </p>
                    </div>

                    <div className="transacciones-resumen">
                        <div>
                            <span>Ingresos</span>
                            <strong className="valor-ingreso">
                                ₡{totalIngresos.toFixed(2)}
                            </strong>
                        </div>

                        <div>
                            <span>Gastos</span>
                            <strong className="valor-gasto">
                                ₡{totalGastos.toFixed(2)}
                            </strong>
                        </div>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="form-transaccion"
                >
                    <label>
                        Tipo

                        <select
                            value={tipo}
                            onChange={(event) =>
                                setTipo(event.target.value)
                            }
                            required
                        >
                            <option value="">Seleccionar tipo</option>
                            <option value="INGRESO">Ingreso</option>
                            <option value="GASTO">Gasto</option>
                        </select>
                    </label>

                    <label>
                        Monto

                        <input
                            type="number"
                            min="0.01"
                            step="0.01"
                            placeholder="0.00"
                            value={monto}
                            onChange={(event) =>
                                setMonto(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Fecha

                        <input
                            type="date"
                            value={fecha}
                            onChange={(event) =>
                                setFecha(event.target.value)
                            }
                            required
                        />
                    </label>

                    <div className="transacciones-form-actions">
                        <button
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : editandoId
                                    ? "Actualizar Transacción"
                                    : "Registrar Transacción"}
                        </button>

                        {editandoId && (
                            <button
                                type="button"
                                className="btn-cancelar"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>
                        )}
                    </div>
                </form>

                {mensaje && (
                    <p
                        className={
                            tipoMensaje === "success"
                                ? "mensaje mensaje-success"
                                : "mensaje mensaje-error"
                        }
                    >
                        {mensaje}
                    </p>
                )}

                <section className="transacciones-listado">
                    <h2>Listado de Transacciones</h2>

                    <div className="transacciones-table-wrapper">
                        <table className="transacciones-tabla">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tipo</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {transacciones.length > 0 ? (
                                transacciones.map((transaccion) => (
                                    <tr key={transaccion.id}>
                                        <td>{transaccion.id}</td>

                                        <td>
                        <span
                            className={
                                transaccion.tipo === "INGRESO"
                                    ? "tipo-badge tipo-ingreso"
                                    : "tipo-badge tipo-gasto"
                            }
                        >
                          {transaccion.tipo === "INGRESO"
                              ? "Ingreso"
                              : "Gasto"}
                        </span>
                                        </td>

                                        <td>
                                            ₡
                                            {Number(
                                                transaccion.monto || 0
                                            ).toFixed(2)}
                                        </td>

                                        <td>{transaccion.fecha}</td>

                                        <td>
                                            <div className="acciones-transaccion">
                                                <button
                                                    type="button"
                                                    className="btn-editar"
                                                    onClick={() =>
                                                        handleEditar(transaccion)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-eliminar"
                                                    onClick={() =>
                                                        handleEliminar(transaccion.id)
                                                    }
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="transacciones-empty"
                                    >
                                        No hay transacciones registradas.
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Transacciones;