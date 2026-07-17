import React, { useState, useEffect } from "react";
import API from "../services/api";
import "../styles/Productos.css";

function Productos() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [stock, setStock] = useState("");
    const [productos, setProductos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        fetchProductos();
    }, []);

    const fetchProductos = async () => {
        try {
            const res = await API.get("/productos");
            setProductos(res.data);
        } catch (err) {
            console.error("Error al obtener productos:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { nombre, precio, stock };

            if (editandoId) {
                await API.put(`/productos/${editandoId}`, data);
                setMensaje("Producto actualizado âœ…");
            } else {
                await API.post("/productos", data);
                setMensaje("Producto registrado âœ…");
            }

            setNombre("");
            setPrecio("");
            setStock("");
            setEditandoId(null);
            fetchProductos();
        } catch (err) {
            console.error(err);
            setMensaje("Error al guardar producto âŒ");
        }
    };

    const handleEliminar = async (id) => {
        if (window.confirm("Â¿Seguro que deseas eliminar este producto?")) {
            try {
                await API.delete(`/productos/${id}`);
                setMensaje("Producto eliminado ðŸ—‘ï¸");
                fetchProductos();
            } catch (err) {
                console.error(err);
                setMensaje("Error al eliminar producto âŒ");
            }
        }
    };

    const handleEditar = (producto) => {
        setNombre(producto.nombre);
        setPrecio(producto.precio);
        setStock(producto.stock);
        setEditandoId(producto.id);
    };

    return (
        <div className="productos-page">
            {/* ðŸŽ¥ Fondo con video */}
<div className="productos-container">
                <h2>ðŸ“¦ GestiÃ³n de Productos</h2>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="form-producto">
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                        required
                    />

                    <button type="submit">
                        {editandoId ? "Actualizar Producto" : "Registrar Producto"}
                    </button>
                    {editandoId && (
                        <button
                            type="button"
                            onClick={() => {
                                setNombre("");
                                setPrecio("");
                                setStock("");
                                setEditandoId(null);
                            }}
                        >
                            Cancelar
                        </button>
                    )}
                </form>

                {mensaje && <p className="mensaje">{mensaje}</p>}

                {/* Tabla */}
                <h3>Listado de Productos</h3>
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
                        productos.map((p) => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.nombre}</td>
                                <td>{p.precio}</td>
                                <td>{p.stock}</td>
                                <td>
                                    <button className="editar" onClick={() => handleEditar(p)}>âœï¸</button>
                                    <button className="eliminar" onClick={() => handleEliminar(p.id)}>ðŸ—‘ï¸</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No hay productos registrados</td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Productos;

