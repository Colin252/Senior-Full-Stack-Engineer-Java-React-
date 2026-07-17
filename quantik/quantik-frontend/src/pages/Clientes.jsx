import React, { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Clientes.css";

function Clientes() {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");

    const [clientes, setClientes] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [editandoId, setEditandoId] = useState(null);
    const [guardando, setGuardando] = useState(false);

    useEffect(() => {
        fetchClientes();
    }, []);

    async function fetchClientes() {
        try {
            const response = await API.get("/clientes");
            setClientes(response.data || []);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
            setMensaje("No fue posible cargar los clientes.");
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
                await API.put(`/clientes/${editandoId}`, data);
                setMensaje("Cliente actualizado correctamente.");
            } else {
                await API.post("/clientes", data);
                setMensaje("Cliente registrado correctamente.");
            }

            setTipoMensaje("success");
            limpiarFormulario();
            await fetchClientes();
        } catch (error) {
            console.error("Error al guardar cliente:", error);
            setMensaje("No fue posible guardar el cliente.");
            setTipoMensaje("error");
        } finally {
            setGuardando(false);
        }
    }

    async function handleEliminar(id) {
        const confirmed = window.confirm(
            "¿Seguro que deseas eliminar este cliente?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.delete(`/clientes/${id}`);

            setMensaje("Cliente eliminado correctamente.");
            setTipoMensaje("success");

            await fetchClientes();
        } catch (error) {
            console.error("Error al eliminar cliente:", error);
            setMensaje("No fue posible eliminar el cliente.");
            setTipoMensaje("error");
        }
    }

    function handleEditar(cliente) {
        setNombre(cliente.nombre || "");
        setEmail(cliente.email || "");
        setTelefono(cliente.telefono || "");
        setEditandoId(cliente.id);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    return (
        <div className="clientes-page">
            <div className="clientes-container">
                <header className="clientes-header">
                    <div>
                        <h1>Gestión de Clientes</h1>

                        <p>
                            Registra, actualiza y administra los clientes de Quantik.
                        </p>
                    </div>

                    <div className="clientes-total">
                        <span>Clientes registrados</span>
                        <strong>{clientes.length}</strong>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="form-cliente"
                >
                    <label>
                        Nombre

                        <input
                            type="text"
                            value={nombre}
                            placeholder="Nombre completo"
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

                    <div className="clientes-form-actions">
                        <button
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Guardando..."
                                : editandoId
                                    ? "Actualizar Cliente"
                                    : "Registrar Cliente"}
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

                <section className="clientes-listado">
                    <h2>Listado de Clientes</h2>

                    <div className="clientes-table-wrapper">
                        <table className="clientes-tabla">
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
                            {clientes.length > 0 ? (
                                clientes.map((cliente) => (
                                    <tr key={cliente.id}>
                                        <td>{cliente.id}</td>
                                        <td>{cliente.nombre}</td>
                                        <td>{cliente.email}</td>

                                        <td>
                                            {cliente.telefono || "No registrado"}
                                        </td>

                                        <td>
                                            <div className="acciones-cliente">
                                                <button
                                                    type="button"
                                                    className="btn-editar"
                                                    onClick={() =>
                                                        handleEditar(cliente)
                                                    }
                                                >
                                                    Editar
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-eliminar"
                                                    onClick={() =>
                                                        handleEliminar(cliente.id)
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
                                        className="clientes-empty"
                                    >
                                        No hay clientes registrados.
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

export default Clientes;