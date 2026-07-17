import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/tablaFinanzas.css";

export default function Resumen() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadResumen();
  }, []);

  async function loadResumen() {
    try {
      setError("");

      const response = await api.get(
        "/contabilidad/resumen"
      );

      setData(response.data);
    } catch (err) {
      console.error("RESUMEN ERROR:", err);
      setError("No fue posible cargar el resumen contable.");
    }
  }

  if (error) {
    return (
      <div className="page">
        <h1>Resumen Contable</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page">
        <h1>Resumen Contable</h1>
        <p>Cargando información...</p>
      </div>
    );
  }

  const ingresosPorMes =
    Object.entries(data.ingresosPorMes || {});

  const gastosPorMes =
    Object.entries(data.gastosPorMes || {});

  return (
    <div className="page">
      <h1>Resumen Contable</h1>

      <p>
        Comparación mensual de ingresos y gastos.
      </p>

      <h2>Ingresos por mes</h2>

      {ingresosPorMes.length === 0 ? (
        <div className="empty-state">
          No hay ingresos mensuales registrados.
        </div>
      ) : (
        <table className="fin-table">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {ingresosPorMes.map(([month, total]) => (
              <tr key={month}>
                <td>{month}</td>

                <td className="fin-ingreso">
                  ₡{Number(total || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Gastos por mes</h2>

      {gastosPorMes.length === 0 ? (
        <div className="empty-state">
          No hay gastos mensuales registrados.
        </div>
      ) : (
        <table className="fin-table">
          <thead>
            <tr>
              <th>Mes</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {gastosPorMes.map(([month, total]) => (
              <tr key={month}>
                <td>{month}</td>

                <td className="fin-gasto">
                  ₡{Number(total || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}