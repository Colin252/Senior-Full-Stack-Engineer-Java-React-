import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Proveedores.css";

function Proveedores() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    const [proveedores, setProveedores] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        fetchProveedores();
    }, []);

    async function fetchProveedores() {
        try {
            const response = await API.get("/proveedores");
            setProveedores(response.data || []);
        } catch (error) {
            console.error("Error al obtener proveedores:", error);
            setMensaje("No fue posible cargar los proveedores.");
            setTipoMensaje("error");
        }
    }

    function limpiarFormulario() {
        setNombre("");
        setEmail("");
        setTelefono("");
        setEditandoId(null);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!nombre.trim() || !email.trim()) {
            setMensaje("Nombre y correo son obligatorios.");
            setTipoMensaje("error");
            return;
        }

        const data = {
            nombre: nombre.trim(),
            email: email.trim(),
            telefono: telefono.trim()
        };

        try {
            setGuardando(true);
            setMensaje("");

            if (editandoId) {
                await API.put(`/proveedores/${editandoId}`, data);
                setMensaje("Proveedor actualizado correctamente.");
            } else {
                await API.post("/proveedores", data);
                setMensaje("Proveedor registrado correctamente.");
            }

            setTipoMensaje("success");
            limpiarFormulario();
            await fetchProveedores();
        } catch (error) {
            console.error("Error al guardar proveedor:", error);
            setMensaje("No fue posible guardar el proveedor.");
            setTipoMensaje("error");
        } finally {
            setGuardando(false);
        }
    }

    async function handleEliminar(id) {
        const confirmed = window.confirm(
            "¿Seguro que deseas eliminar este proveedor?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.delete(`/proveedores/${id}`);

            setMensaje("Proveedor eliminado correctamente.");
            setTipoMensaje("success");

            await fetchProveedores();
        } catch (error) {
            console.error("Error al eliminar proveedor:", error);
            setMensaje("No fue posible eliminar el proveedor.");
            setTipoMensaje("error");
        }
    }

    function handleEditar(proveedor) {
        setNombre(proveedor.nombre || "");
        setEmail(proveedor.email || "");
        setTelefono(proveedor.telefono || "");
        setEditandoId(proveedor.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="proveedores-page">
            <div className="proveedores-container">
                <header className="proveedores-header">
                    <div>
                        <h1>Gestión de Proveedores</h1>

                        <p>
                            Registra, actualiza y administra los proveedores de Quantik.
                        </p>
                    </div>

                    <div className="proveedores-total">
                        <span>Proveedores registrados</span>
                        <strong>{proveedores.length}</strong>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="form-proveedor"
                >
                    <label>
                        Nombre

                        <input
                            type="text"
                            value={nombre}
                            placeholder="Nombre del proveedor"
                            onChange={(event) =>
                                setNombre(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Correo electrónico

                        <input
                            type="email"
                            value={email}
                            placeholder="correo@ejemplo.com"
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            required
                        />
                    </label>

                    <label>
                        Teléfono

                        <input
                            type="text"
                            value={telefono}
                            placeholder="Número de teléfono"
                            onChange={(event) =>
                                setTelefono(event.target.value)
                            }
                        />
                    </label>

                    <div className="proveedores-form-actions">
                        <button
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : editandoId
                                    ? "Actualizar Proveedor"
                                    : "Registrar Proveedor"}
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

                <section className="proveedores-listado">
                    <h2>Listado de Proveedores</h2>

                    <div className="proveedores-table-wrapper">
                        <table className="proveedores-tabla">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {proveedores.length > 0 ? (
                                proveedores.map((proveedor) => (
                                    <tr key={proveedor.id}>
                                        <td>{proveedor.id}</td>
                                        <td>{proveedor.nombre}</td>
                                        <td>{proveedor.email}</td>

                                        <td>
                                            {proveedor.telefono || "No registrado"}
                                        </td>

                                        <td>
                                            <div className="acciones-proveedor">
                                                <button
                                                    type="button"
                                                    className="btn-editar"
                                                    onClick={() =>
                                                        handleEditar(proveedor)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-eliminar"
                                                    onClick={() =>
                                                        handleEliminar(proveedor.id)
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
                                        className="proveedores-empty"
                                    >
                                        No hay proveedores registrados.
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

export default Proveedores;