import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/tablaFinanzas.css";

export default function LibroDiario() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLibroDiario();
  }, []);

  async function loadLibroDiario() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/contabilidad/libro-diario"
      );

      setRows(
        Array.isArray(response.data)
          ? response.data
          : []
      );
    } catch (err) {
      console.error("LIBRO DIARIO ERROR:", err);
      setError("No fue posible cargar el libro diario.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Libro Diario</h1>

      <p>
        Registro cronológico de los movimientos contables.
      </p>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Cargando movimientos...</p>
      ) : rows.length === 0 ? (
        <div className="empty-state">
          No hay movimientos registrados.
        </div>
      ) : (
        <table className="fin-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Cuenta</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Monto</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>

                <td>
                  {transaction.account?.accountNumber || "-"}
                </td>

                <td>{transaction.type}</td>

                <td>
                  {transaction.description || "Sin descripción"}
                </td>

                <td>
                  ₡{Number(transaction.amount || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}