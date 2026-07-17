import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Ventas.css";

function Ventas() {
    const [clienteId, setClienteId] = useState("");
    const [productoId, setProductoId] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [total, setTotal] = useState(0);

    const [ventas, setVentas] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        cargarDatos();
    }, []);

    useEffect(() => {
        if (!productoId || !cantidad) {
            setTotal(0);
            return;
        }

        const producto = productos.find(
            (item) => item.id === Number(productoId)
        );

        if (!producto) {
            setTotal(0);
            return;
        }

        const precio = Number(producto.precio || 0);
        const unidades = Number(cantidad || 0);

        setTotal(precio * unidades);
    }, [productoId, cantidad, productos]);

    async function cargarDatos() {
        await Promise.all([
            fetchClientes(),
            fetchProductos(),
            fetchVentas()
        ]);
    }

    async function fetchClientes() {
        try {
            const response = await API.get("/clientes");
            setClientes(response.data || []);
        } catch (error) {
            console.error("Error cargando clientes:", error);
        }
    }

    async function fetchProductos() {
        try {
            const response = await API.get("/productos");
            setProductos(response.data || []);
        } catch (error) {
            console.error("Error cargando productos:", error);
        }
    }

    async function fetchVentas() {
        try {
            const response = await API.get("/ventas");
            setVentas(response.data || []);
        } catch (error) {
            console.error("Error cargando ventas:", error);
        }
    }

    function limpiarFormulario() {
        setClienteId("");
        setProductoId("");
        setCantidad("");
        setTotal(0);
        setEditandoId(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const parsedClienteId = Number(clienteId);
        const parsedProductoId = Number(productoId);
        const parsedCantidad = Number(cantidad);

        if (
            !parsedClienteId ||
            !parsedProductoId ||
            !Number.isFinite(parsedCantidad) ||
            parsedCantidad <= 0
        ) {
            setMensaje("Completa correctamente todos los campos.");
            setTipoMensaje("error");
            return;
        }

        const data = {
            clienteId: parsedClienteId,
            productoId: parsedProductoId,
            cantidad: parsedCantidad,
            total: Number(total)
        };

        try {
            setGuardando(true);
            setMensaje("");

            if (editandoId) {
                await API.put(`/ventas/${editandoId}`, data);
                setMensaje("Venta actualizada correctamente.");
            } else {
                await API.post("/ventas", data);
                setMensaje("Venta registrada correctamente.");
            }

            setTipoMensaje("success");
            limpiarFormulario();
            await fetchVentas();
        } catch (error) {
            console.error("Error guardando venta:", error);
            setMensaje("No fue posible guardar la venta.");
            setTipoMensaje("error");
        } finally {
            setGuardando(false);
        }
    }

    async function handleEliminar(id) {
        const confirmed = window.confirm(
            "¿Seguro que deseas eliminar esta venta?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.delete(`/ventas/${id}`);

            setMensaje("Venta eliminada correctamente.");
            setTipoMensaje("success");

            await fetchVentas();
        } catch (error) {
            console.error("Error eliminando venta:", error);
            setMensaje("No fue posible eliminar la venta.");
            setTipoMensaje("error");
        }
    }

    function handleEditar(venta) {
        setClienteId(String(venta.clienteId ?? ""));
        setProductoId(String(venta.productoId ?? ""));
        setCantidad(String(venta.cantidad ?? ""));
        setTotal(Number(venta.total || 0));
        setEditandoId(venta.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    function obtenerNombreCliente(id) {
        return (
            clientes.find((cliente) => cliente.id === id)?.nombre ||
            "No disponible"
        );
    }

    function obtenerNombreProducto(id) {
        return (
            productos.find((producto) => producto.id === id)?.nombre ||
            "No disponible"
        );
    }

    return (
        <div className="ventas-page">
            <div className="ventas-container">
                <header className="ventas-header">
                    <div>
                        <h1>Gestión de Ventas</h1>

                        <p>
                            Registra, actualiza y consulta las ventas de Quantik.
                        </p>
                    </div>

                    <div className="ventas-total">
                        <span>Ventas registradas</span>
                        <strong>{ventas.length}</strong>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="form-venta"
                >
                    <label>
                        Cliente

                        <select
                            value={clienteId}
                            onChange={(event) =>
                                setClienteId(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Seleccionar cliente
                            </option>

                            {clientes.map((cliente) => (
                                <option
                                    key={cliente.id}
                                    value={cliente.id}
                                >
                                    {cliente.nombre}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Producto

                        <select
                            value={productoId}
                            onChange={(event) =>
                                setProductoId(event.target.value)
                            }
                            required
                        >
                            <option value="">
                                Seleccionar producto
                            </option>

                            {productos.map((producto) => (
                                <option
                                    key={producto.id}
                                    value={producto.id}
                                >
                                    {producto.nombre} — ₡
                                    {Number(producto.precio || 0).toFixed(2)}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Cantidad

                        <input
                            type="number"
                            min="1"
                            step="1"
                            value={cantidad}
                            placeholder="Cantidad"
                            onChange={(event) =>
                                setCantidad(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Total

                        <input
                            type="text"
                            value={`₡${Number(total || 0).toFixed(2)}`}
                            readOnly
                        />
                    </label>

                    <div className="ventas-form-actions">
                        <button
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : editandoId
                                    ? "Actualizar Venta"
                                    : "Registrar Venta"}
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

                <section className="ventas-listado">
                    <h2>Listado de Ventas</h2>

                    <div className="ventas-table-wrapper">
                        <table className="ventas-tabla">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {ventas.length > 0 ? (
                                ventas.map((venta) => (
                                    <tr key={venta.id}>
                                        <td>{venta.id}</td>

                                        <td>
                                            {obtenerNombreCliente(
                                                venta.clienteId
                                            )}
                                        </td>

                                        <td>
                                            {obtenerNombreProducto(
                                                venta.productoId
                                            )}
                                        </td>

                                        <td>{venta.cantidad}</td>

                                        <td>
                                            ₡
                                            {Number(
                                                venta.total || 0
                                            ).toFixed(2)}
                                        </td>

                                        <td>
                                            <div className="acciones-venta">
                                                <button
                                                    type="button"
                                                    className="btn-editar"
                                                    onClick={() =>
                                                        handleEditar(venta)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-eliminar"
                                                    onClick={() =>
                                                        handleEliminar(venta.id)
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
                                        colSpan="6"
                                        className="ventas-empty"
                                    >
                                        No hay ventas registradas.
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

export default Ventas;