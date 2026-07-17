import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Productos.css";

function Productos() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");

    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        fetchProductos();
    }, []);

    async function fetchProductos() {
        try {
            const response = await API.get("/productos");
            setProductos(response.data || []);
        } catch (error) {
            console.error("Error al obtener productos:", error);
            setMensaje("No fue posible cargar los productos.");
            setTipoMensaje("error");
        }
    }

    function limpiarFormulario() {
        setNombre("");
        setPrecio("");
        setStock("");
        setEditandoId(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const parsedPrecio = Number(precio);
        const parsedStock = Number(stock);

        if (
            !nombre.trim() ||
            !Number.isFinite(parsedPrecio) ||
            parsedPrecio < 0 ||
            !Number.isInteger(parsedStock) ||
            parsedStock < 0
        ) {
            setMensaje("Completa correctamente todos los campos.");
            setTipoMensaje("error");
            return;
        }

        const data = {
            nombre: nombre.trim(),
            precio: parsedPrecio,
            stock: parsedStock
        };

        try {
            setGuardando(true);
            setMensaje("");

            if (editandoId) {
                await API.put(`/productos/${editandoId}`, data);
                setMensaje("Producto actualizado correctamente.");
            } else {
                await API.post("/productos", data);
                setMensaje("Producto registrado correctamente.");
            }

            setTipoMensaje("success");
            limpiarFormulario();
            await fetchProductos();
        } catch (error) {
            console.error("Error al guardar producto:", error);
            setMensaje("No fue posible guardar el producto.");
            setTipoMensaje("error");
        } finally {
            setGuardando(false);
        }
    }

    async function handleEliminar(id) {
        const confirmed = window.confirm(
            "¿Seguro que deseas eliminar este producto?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.delete(`/productos/${id}`);

            setMensaje("Producto eliminado correctamente.");
            setTipoMensaje("success");

            await fetchProductos();
        } catch (error) {
            console.error("Error al eliminar producto:", error);
            setMensaje("No fue posible eliminar el producto.");
            setTipoMensaje("error");
        }
    }

    function handleEditar(producto) {
        setNombre(producto.nombre || "");
        setPrecio(String(producto.precio ?? ""));
        setStock(String(producto.stock ?? ""));
        setEditandoId(producto.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="productos-page">
            <div className="productos-container">
                <header className="productos-header">
                    <div>
                        <h1>Gestión de Productos</h1>

                        <p>
                            Registra, actualiza y administra el catálogo de Quantik.
                        </p>
                    </div>

                    <div className="productos-total">
                        <span>Productos registrados</span>
                        <strong>{productos.length}</strong>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="form-producto"
                >
                    <label>
                        Nombre

                        <input
                            type="text"
                            placeholder="Nombre del producto"
                            value={nombre}
                            onChange={(event) =>
                                setNombre(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Precio

                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            value={precio}
                            onChange={(event) =>
                                setPrecio(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Stock

                        <input
                            type="number"
                            min="0"
                            step="1"
                            placeholder="0"
                            value={stock}
                            onChange={(event) =>
                                setStock(event.target.value)
                            }
                            required
                        />
                    </label>

                    <div className="productos-form-actions">
                        <button
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : editandoId
                                    ? "Actualizar Producto"
                                    : "Registrar Producto"}
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

                <section className="productos-listado">
                    <h2>Listado de Productos</h2>

                    <div className="productos-table-wrapper">
                        <table className="productos-tabla">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {productos.length > 0 ? (
                                productos.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.id}</td>
                                        <td>{producto.nombre}</td>

                                        <td>
                                            ₡
                                            {Number(
                                                producto.precio || 0
                                            ).toFixed(2)}
                                        </td>

                                        <td>{producto.stock}</td>

                                        <td>
                                            <div className="acciones-producto">
                                                <button
                                                    type="button"
                                                    className="btn-editar"
                                                    onClick={() =>
                                                        handleEditar(producto)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-eliminar"
                                                    onClick={() =>
                                                        handleEliminar(producto.id)
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
                                        className="productos-empty"
                                    >
                                        No hay productos registrados.
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

export default Productos;