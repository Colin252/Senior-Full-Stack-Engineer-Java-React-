import React, { useEffect, useRef, useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/Facturas.css";

function Facturas() {
    const [fecha, setFecha] = useState("");
    const [numero, setNumero] = useState("");
    const [clienteId, setClienteId] = useState("");
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    const [clientes, setClientes] = useState([]);
    const [productos, setProductos] = useState([]);
    const [facturas, setFacturas] = useState([]);
    const [ultimaFactura, setUltimaFactura] = useState(null);

    const [correoManual, setCorreoManual] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [direccion, setDireccion] = useState("");
    const [metodoPago, setMetodoPago] = useState("");
    const [notas, setNotas] = useState("");

    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [guardando, setGuardando] = useState(false);

    const tablaRef = useRef(null);

    useEffect(() => {
        cargarDatos();
    }, []);

    async function cargarDatos() {
        await Promise.all([
            fetchFacturas(),
            fetchClientes(),
            fetchProductos()
        ]);
    }

    async function fetchFacturas() {
        try {
            const response = await API.get("/facturas");
            setFacturas(response.data || []);
        } catch (error) {
            console.error("Error al obtener facturas:", error);
            setMensaje("No fue posible cargar las facturas.");
            setTipoMensaje("error");
        }
    }

    async function fetchClientes() {
        try {
            const response = await API.get("/clientes");
            setClientes(response.data || []);
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    }

    async function fetchProductos() {
        try {
            const response = await API.get("/productos");
            setProductos(response.data || []);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
    }

    function handleAgregarProducto(id) {
        if (!id) {
            return;
        }

        const productId = Number(id);
        const producto = productos.find(
            (item) => item.id === productId
        );

        if (!producto) {
            return;
        }

        const existente = productosSeleccionados.find(
            (item) => item.id === productId
        );

        if (existente) {
            setProductosSeleccionados((current) =>
                current.map((item) =>
                    item.id === productId
                        ? {
                            ...item,
                            cantidad: Number(item.cantidad || 0) + 1
                        }
                        : item
                )
            );

            return;
        }

        setProductosSeleccionados((current) => [
            ...current,
            {
                ...producto,
                cantidad: 1
            }
        ]);
    }

    function handleCantidadChange(id, cantidad) {
        const parsedCantidad = Math.max(1, Number(cantidad) || 1);

        setProductosSeleccionados((current) =>
            current.map((producto) =>
                producto.id === id
                    ? {
                        ...producto,
                        cantidad: parsedCantidad
                    }
                    : producto
            )
        );
    }

    function handleEliminarProducto(id) {
        setProductosSeleccionados((current) =>
            current.filter((producto) => producto.id !== id)
        );
    }

    function limpiarFormulario() {
        setNumero("");
        setFecha("");
        setClienteId("");
        setCorreoManual("");
        setEmpresa("");
        setDireccion("");
        setMetodoPago("");
        setNotas("");
        setProductosSeleccionados([]);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (!clienteId) {
            setMensaje("Debes seleccionar un cliente.");
            setTipoMensaje("error");
            return;
        }

        if (productosSeleccionados.length === 0) {
            setMensaje("Debes agregar al menos un producto.");
            setTipoMensaje("error");
            return;
        }

        const data = {
            numero: numero.trim() || `F-${Date.now()}`,
            fecha,
            cliente: {
                id: Number(clienteId)
            },
            correoManual: correoManual.trim(),
            empresa: empresa.trim(),
            direccion: direccion.trim(),
            metodoPago: metodoPago.trim(),
            notas: notas.trim(),
            productos: productosSeleccionados.map((producto) => ({
                id: producto.id,
                cantidad: Number(producto.cantidad)
            }))
        };

        try {
            setGuardando(true);
            setMensaje("");

            await API.post("/facturas", data);

            setMensaje("Factura registrada correctamente.");
            setTipoMensaje("success");

            limpiarFormulario();
            await fetchFacturas();

            try {
                const response = await API.get("/facturas/ultima");
                setUltimaFactura(response.data || null);
            } catch (error) {
                console.error("Error obteniendo última factura:", error);
            }

            setTimeout(() => {
                if (tablaRef.current) {
                    tablaRef.current.scrollTop =
                        tablaRef.current.scrollHeight;
                }
            }, 300);
        } catch (error) {
            console.error("Error al guardar factura:", error);
            setMensaje("No fue posible guardar la factura.");
            setTipoMensaje("error");
        } finally {
            setGuardando(false);
        }
    }

    async function handleImprimir(facturaId) {
        try {
            const response = await API.get(
                `/facturas/${facturaId}/detalle`
            );

            const factura = response.data;
            const document = new jsPDF();

            document.setFontSize(20);
            document.setTextColor(185, 28, 28);
            document.text("Factura Quantik", 105, 20, {
                align: "center"
            });

            document.setFontSize(11);
            document.setTextColor(0, 0, 0);

            document.text(
                `Cliente: ${factura.cliente?.nombre || "-"}`,
                14,
                40
            );

            document.text(
                `Correo: ${
                    factura.correoManual ||
                    factura.cliente?.correo ||
                    factura.cliente?.email ||
                    "-"
                }`,
                14,
                48
            );

            document.text(
                `Teléfono: ${factura.cliente?.telefono || "-"}`,
                14,
                56
            );

            document.text(
                `Empresa: ${factura.empresa || "-"}`,
                14,
                64
            );

            document.text(
                `Dirección: ${factura.direccion || "-"}`,
                14,
                72
            );

            document.text(
                `Método de pago: ${factura.metodoPago || "-"}`,
                14,
                80
            );

            document.text(
                `Notas: ${factura.notas || "-"}`,
                14,
                88
            );

            document.text(
                `Número: ${factura.numero || factura.id}`,
                145,
                40
            );

            document.text(
                `Fecha: ${factura.fecha || "-"}`,
                145,
                48
            );

            if (
                Array.isArray(factura.productos) &&
                factura.productos.length > 0
            ) {
                const rows = factura.productos.map((producto) => {
                    const cantidad = Number(producto.cantidad || 1);
                    const precio = Number(producto.precio || 0);

                    return [
                        producto.nombre || "Producto",
                        cantidad,
                        `₡${precio.toLocaleString("es-CR")}`,
                        `₡${(cantidad * precio).toLocaleString("es-CR")}`
                    ];
                });

                autoTable(document, {
                    startY: 100,
                    head: [
                        [
                            "Producto",
                            "Cantidad",
                            "Precio unitario",
                            "Subtotal"
                        ]
                    ],
                    body: rows,
                    theme: "grid",
                    headStyles: {
                        fillColor: [127, 29, 29],
                        textColor: [255, 255, 255],
                        halign: "center"
                    },
                    bodyStyles: {
                        halign: "center"
                    },
                    styles: {
                        cellPadding: 4,
                        fontSize: 10
                    }
                });
            }

            const finalY = document.lastAutoTable
                ? document.lastAutoTable.finalY + 15
                : 110;

            document.setFontSize(14);
            document.setTextColor(0, 0, 0);

            document.text(
                `TOTAL: ₡${Number(
                    factura.montoTotal || 0
                ).toLocaleString("es-CR")}`,
                14,
                finalY
            );

            document.save(`factura_${factura.id}.pdf`);
        } catch (error) {
            console.error("Error al imprimir factura:", error);
            window.alert("No fue posible generar la factura en PDF.");
        }
    }

    async function handleEliminarFactura(facturaId) {
        const confirmed = window.confirm(
            "¿Seguro que deseas eliminar esta factura?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await API.delete(`/facturas/${facturaId}`);

            setFacturas((current) =>
                current.filter((factura) => factura.id !== facturaId)
            );

            setMensaje("Factura eliminada correctamente.");
            setTipoMensaje("success");

            if (ultimaFactura?.id === facturaId) {
                setUltimaFactura(null);
            }
        } catch (error) {
            console.error("Error al eliminar factura:", error);
            setMensaje("No fue posible eliminar la factura.");
            setTipoMensaje("error");
        }
    }

    const totalSeleccionado = productosSeleccionados.reduce(
        (sum, producto) =>
            sum +
            Number(producto.precio || 0) *
            Number(producto.cantidad || 0),
        0
    );

    return (
        <div className="facturas-page">
            <div className="facturas-container">
                <header className="facturas-header">
                    <div>
                        <h1>Gestión de Facturas</h1>

                        <p>
                            Registra, consulta, imprime y administra las facturas.
                        </p>
                    </div>

                    <div className="facturas-total">
                        <span>Facturas registradas</span>
                        <strong>{facturas.length}</strong>
                    </div>
                </header>

                <form
                    onSubmit={handleSubmit}
                    className="form-factura"
                >
                    <label>
                        Número de factura

                        <input
                            type="text"
                            placeholder="Generado automáticamente"
                            value={numero}
                            onChange={(event) =>
                                setNumero(event.target.value)
                            }
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

                    <label>
                        Cliente

                        <select
                            value={clienteId}
                            onChange={(event) =>
                                setClienteId(event.target.value)
                            }
                            required
                        >
                            <option value="">Seleccionar cliente</option>

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
                        Correo adicional

                        <input
                            type="email"
                            placeholder="correo@ejemplo.com"
                            value={correoManual}
                            onChange={(event) =>
                                setCorreoManual(event.target.value)
                            }
                        />
                    </label>

                    <label>
                        Empresa

                        <input
                            type="text"
                            placeholder="Nombre de la empresa"
                            value={empresa}
                            onChange={(event) =>
                                setEmpresa(event.target.value)
                            }
                        />
                    </label>

                    <label>
                        Dirección

                        <input
                            type="text"
                            placeholder="Dirección de facturación"
                            value={direccion}
                            onChange={(event) =>
                                setDireccion(event.target.value)
                            }
                        />
                    </label>

                    <label>
                        Método de pago

                        <input
                            type="text"
                            placeholder="Efectivo, tarjeta, transferencia..."
                            value={metodoPago}
                            onChange={(event) =>
                                setMetodoPago(event.target.value)
                            }
                        />
                    </label>

                    <label>
                        Agregar producto

                        <select
                            value=""
                            onChange={(event) =>
                                handleAgregarProducto(event.target.value)
                            }
                        >
                            <option value="">Seleccionar producto</option>

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

                    <label className="factura-notas">
                        Notas u observaciones

                        <textarea
                            placeholder="Información adicional"
                            value={notas}
                            onChange={(event) =>
                                setNotas(event.target.value)
                            }
                        />
                    </label>

                    <div className="facturas-form-actions">
                        <button
                            type="submit"
                            disabled={guardando}
                        >
                            {guardando
                                ? "Registrando..."
                                : "Registrar Factura"}
                        </button>
                    </div>
                </form>

                {productosSeleccionados.length > 0 && (
                    <section className="productos-factura">
                        <div className="productos-factura-header">
                            <h2>Productos seleccionados</h2>

                            <strong>
                                Total: ₡{totalSeleccionado.toFixed(2)}
                            </strong>
                        </div>

                        <div className="facturas-table-wrapper">
                            <table className="facturas-tabla">
                                <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th>Subtotal</th>
                                    <th>Acción</th>
                                </tr>
                                </thead>

                                <tbody>
                                {productosSeleccionados.map((producto) => (
                                    <tr key={producto.id}>
                                        <td>{producto.nombre}</td>

                                        <td>
                                            ₡
                                            {Number(
                                                producto.precio || 0
                                            ).toFixed(2)}
                                        </td>

                                        <td>
                                            <input
                                                className="cantidad-producto"
                                                type="number"
                                                min="1"
                                                value={producto.cantidad}
                                                onChange={(event) =>
                                                    handleCantidadChange(
                                                        producto.id,
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </td>

                                        <td>
                                            ₡
                                            {(
                                                Number(producto.precio || 0) *
                                                Number(producto.cantidad || 0)
                                            ).toFixed(2)}
                                        </td>

                                        <td>
                                            <button
                                                type="button"
                                                className="btn-quitar"
                                                onClick={() =>
                                                    handleEliminarProducto(producto.id)
                                                }
                                            >
                                                Quitar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

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

                {ultimaFactura && (
                    <section className="ultima-factura">
                        <div className="ultima-factura-header">
                            <h2>Última Factura Registrada</h2>

                            <button
                                type="button"
                                className="btn-imprimir"
                                onClick={() =>
                                    handleImprimir(ultimaFactura.id)
                                }
                            >
                                Imprimir PDF
                            </button>
                        </div>

                        <div className="ultima-factura-grid">
                            <p>
                                <strong>Número:</strong>{" "}
                                {ultimaFactura.numero || ultimaFactura.id}
                            </p>

                            <p>
                                <strong>Cliente:</strong>{" "}
                                {ultimaFactura.cliente?.nombre ||
                                    "No disponible"}
                            </p>

                            <p>
                                <strong>Correo:</strong>{" "}
                                {ultimaFactura.correoManual ||
                                    ultimaFactura.cliente?.correo ||
                                    ultimaFactura.cliente?.email ||
                                    "No disponible"}
                            </p>

                            <p>
                                <strong>Teléfono:</strong>{" "}
                                {ultimaFactura.cliente?.telefono ||
                                    "No disponible"}
                            </p>

                            <p>
                                <strong>Empresa:</strong>{" "}
                                {ultimaFactura.empresa || "No registrada"}
                            </p>

                            <p>
                                <strong>Dirección:</strong>{" "}
                                {ultimaFactura.direccion || "No registrada"}
                            </p>

                            <p>
                                <strong>Método de pago:</strong>{" "}
                                {ultimaFactura.metodoPago || "No registrado"}
                            </p>

                            <p>
                                <strong>Total:</strong> ₡
                                {Number(
                                    ultimaFactura.montoTotal || 0
                                ).toFixed(2)}
                            </p>
                        </div>

                        {ultimaFactura.notas && (
                            <p className="ultima-factura-notas">
                                <strong>Notas:</strong> {ultimaFactura.notas}
                            </p>
                        )}
                    </section>
                )}

                <section className="facturas-listado">
                    <h2>Listado de Facturas</h2>

                    <div
                        className="facturas-tabla-container"
                        ref={tablaRef}
                    >
                        <table className="facturas-tabla">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Número</th>
                                <th>Fecha</th>
                                <th>Total</th>
                                <th>Acciones</th>
                            </tr>
                            </thead>

                            <tbody>
                            {facturas.length > 0 ? (
                                facturas.map((factura) => (
                                    <tr key={factura.id}>
                                        <td>{factura.id}</td>

                                        <td>
                                            {factura.numero || `F-${factura.id}`}
                                        </td>

                                        <td>{factura.fecha || "-"}</td>

                                        <td>
                                            ₡
                                            {Number(
                                                factura.montoTotal || 0
                                            ).toFixed(2)}
                                        </td>

                                        <td>
                                            <div className="acciones-factura">
                                                <button
                                                    type="button"
                                                    className="btn-imprimir"
                                                    onClick={() =>
                                                        handleImprimir(factura.id)
                                                    }
                                                >
                                                    Imprimir
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn-eliminar"
                                                    onClick={() =>
                                                        handleEliminarFactura(factura.id)
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
                                        className="facturas-empty"
                                    >
                                        No hay facturas registradas.
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

export default Facturas;