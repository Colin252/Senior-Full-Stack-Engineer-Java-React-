import { useEffect, useState } from "react";
import api from "../services/api";

export default function EstadoResultados() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEstadoResultados();
  }, []);

  async function loadEstadoResultados() {
    try {
      setError("");

      const response = await api.get(
        "/contabilidad/estado-resultados"
      );

      setData(response.data);
    } catch (err) {
      console.error("ESTADO RESULTADOS ERROR:", err);
      setError(
        "No fue posible cargar el estado de resultados."
      );
    }
  }

  if (error) {
    return (
      <div className="page">
        <h1>Estado de Resultados</h1>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="page">
        <h1>Estado de Resultados</h1>
        <p>Cargando información...</p>
      </div>
    );
  }

  const ingresos = Number(data.ingresos || 0);
  const gastos = Number(data.gastos || 0);
  const utilidad = Number(data.utilidad || 0);

  return (
    <div className="page">
      <h1>Estado de Resultados</h1>

      <p>
        Resumen de ingresos, gastos y utilidad neta.
      </p>

      <div className="cards-grid">
        <div className="card">
          <h3>Ingresos</h3>

          <strong className="success-message">
            ₡{ingresos.toFixed(2)}
          </strong>
        </div>

        <div className="card">
          <h3>Gastos</h3>

          <strong className="error-message">
            ₡{gastos.toFixed(2)}
          </strong>
        </div>

        <div className="card">
          <h3>Utilidad</h3>

          <strong
            className={
              utilidad >= 0
                ? "success-message"
                : "error-message"
            }
          >
            ₡{utilidad.toFixed(2)}
          </strong>
        </div>
      </div>
    </div>
  );
}