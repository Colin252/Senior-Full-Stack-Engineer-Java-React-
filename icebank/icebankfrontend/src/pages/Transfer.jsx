import { useEffect, useState } from "react";
import api from "../services/api";

export default function Transfer() {
  const [accounts, setAccounts] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const userId = localStorage.getItem("userId") || "3";

  useEffect(() => {
    loadAccounts();
  }, []);

  async function loadAccounts() {
    try {
      const response = await api.get(`/accounts/user/${userId}`);
      setAccounts(response.data || []);
    } catch (error) {
      console.error("LOAD ACCOUNTS ERROR:", error);
      setMessage("No fue posible cargar las cuentas.");
    }
  }

  async function handleTransfer(e) {
    e.preventDefault();
    setMessage("");

    const numericAmount = Number(amount);

    if (!from) {
      setMessage("Debes seleccionar la cuenta de origen.");
      return;
    }

    if (!to.trim()) {
      setMessage("Debes ingresar la cuenta destino.");
      return;
    }

    if (from === to.trim()) {
      setMessage("No puedes transferir a la misma cuenta.");
      return;
    }

    const accountPattern = /^IBK-\d{6}$/;

    if (!accountPattern.test(to.trim())) {
      setMessage("La cuenta destino debe tener el formato IBK-XXXXXX.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setMessage("El monto debe ser mayor a cero.");
      return;
    }

    const originAccount = accounts.find(
      (account) => account.accountNumber === from
    );

    if (
      originAccount &&
      numericAmount > Number(originAccount.balance || 0)
    ) {
      setMessage("Saldo insuficiente.");
      return;
    }

    try {
      setSending(true);

      await api.post("/transactions/transfer", {
        from,
        to: to.trim(),
        amount: numericAmount
      });

      setMessage("Transferencia realizada correctamente.");
      setAmount("");
      setTo("");

      await loadAccounts();
    } catch (error) {
      console.error("TRANSFER ERROR:", error);

      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error;

      setMessage(
        backendMessage
          ? `Error: ${backendMessage}`
          : "No fue posible realizar la transferencia."
      );
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="page">
      <h1>Transferencias</h1>

      <p>
        Envía fondos entre cuentas IceBank de forma rápida y segura.
      </p>

      <form onSubmit={handleTransfer}>
        <label>
          Cuenta de origen

          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
          >
            <option value="">Selecciona una cuenta</option>

            {accounts.map((account) => (
              <option
                key={account.id}
                value={account.accountNumber}
              >
                {account.accountNumber} — ₡
                {Number(account.balance || 0).toFixed(2)}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cuenta destino

          <input
            type="text"
            placeholder="IBK-XXXXXX"
            value={to}
            onChange={(e) => setTo(e.target.value.toUpperCase())}
            required
          />
        </label>

        <label>
          Monto

          <input
            type="number"
            min="0.01"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </label>

        <button type="submit" disabled={sending}>
          {sending ? "Procesando..." : "Enviar Transferencia"}
        </button>
      </form>

      {message && (
        <div
          className={
            message.startsWith("Transferencia")
              ? "success-message"
              : "error-message"
          }
        >
          {message}
        </div>
      )}
    </div>
  );
}