import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/tablaFinanzas.css";

export default function LibroMayor() {
  const [mayor, setMayor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadLibroMayor();
  }, []);

  async function loadLibroMayor() {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/contabilidad/libro-mayor"
      );

      setMayor(response.data || {});
    } catch (err) {
      console.error("LIBRO MAYOR ERROR:", err);
      setError("No fue posible cargar el libro mayor.");
    } finally {
      setLoading(false);
    }
  }

  const accounts = Object.entries(mayor);

  return (
    <div className="page">
      <h1>Libro Mayor</h1>

      <p>
        Movimientos contables agrupados por cuenta.
      </p>

      {error && (
        <p className="error-message">{error}</p>
      )}

      {loading ? (
        <p>Cargando información...</p>
      ) : accounts.length === 0 ? (
        <div className="empty-state">
          No hay datos disponibles.
        </div>
      ) : (
        accounts.map(([accountNumber, movements]) => (
          <section
            key={accountNumber}
            className="card"
            style={{ marginBottom: 24 }}
          >
            <h2>Cuenta: {accountNumber}</h2>

            <table className="fin-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Descripción</th>
                  <th>Monto</th>
                </tr>
              </thead>

              <tbody>
                {movements.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.date}</td>

                    <td>{transaction.type}</td>

                    <td>
                      {transaction.description ||
                        "Sin descripción"}
                    </td>

                    <td>
                      ₡
                      {Number(
                        transaction.amount || 0
                      ).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))
      )}
    </div>
  );
}