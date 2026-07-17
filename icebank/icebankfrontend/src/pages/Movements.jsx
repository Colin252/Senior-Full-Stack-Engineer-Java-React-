import { useEffect, useState } from "react";
import api from "../services/api";

export default function Movements() {
  const [accounts, setAccounts] = useState([]);
  const [selected, setSelected] = useState("");
  const [movements, setMovements] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [loadingMovements, setLoadingMovements] = useState(false);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId") || "3";

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    try {
      setLoadingAccounts(true);
      setError("");

      const response = await api.get(`/accounts/user/${userId}`);
      setAccounts(response.data || []);
    } catch (err) {
      console.error("ERROR LOADING ACCOUNTS:", err);
      setError("No fue posible cargar las cuentas.");
    } finally {
      setLoadingAccounts(false);
    }
  }

  async function loadMovements(accountId) {
    if (!accountId) {
      setMovements([]);
      return;
    }

    try {
      setLoadingMovements(true);
      setError("");

      const response = await api.get(
        `/transactions/account/${accountId}`
      );

      setMovements(response.data || []);
    } catch (err) {
      console.error("MOVEMENTS ERROR:", err);
      setError("No fue posible cargar los movimientos.");
    } finally {
      setLoadingMovements(false);
    }
  }

  function handleAccountChange(e) {
    const accountId = e.target.value;

    setSelected(accountId);
    loadMovements(accountId);
  }

  return (
    <div className="page">
      <h1>Movimientos</h1>

      <p>
        Consulta el historial de transacciones de cada cuenta.
      </p>

      {error && (
        <p className="error-message">{error}</p>
      )}

      <form>
        <label>
          Seleccione una cuenta

          <select
            value={selected}
            onChange={handleAccountChange}
            disabled={loadingAccounts}
          >
            <option value="">
              {loadingAccounts
                ? "Cargando cuentas..."
                : "Seleccione una cuenta"}
            </option>

            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.id}
              >
                {account.accountNumber} — ₡
                {Number(account.balance || 0).toFixed(2)}
              </option>
            ))}
          </select>
        </label>
      </form>

      <h2>Lista de movimientos</h2>

      {!selected ? (
        <div className="empty-state">
          Selecciona una cuenta para ver sus movimientos.
        </div>
      ) : loadingMovements ? (
        <p>Cargando movimientos...</p>
      ) : movements.length === 0 ? (
        <div className="empty-state">
          No hay movimientos registrados para esta cuenta.
        </div>
      ) : (
        <div className="cards-grid">
          {movements.map((movement) => (
            <div
              className="card"
              key={movement.id}
            >
              <h3>{movement.type}</h3>

              <strong>
                ₡{Number(movement.amount || 0).toFixed(2)}
              </strong>

              <p>
                {movement.description || "Sin descripción"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}