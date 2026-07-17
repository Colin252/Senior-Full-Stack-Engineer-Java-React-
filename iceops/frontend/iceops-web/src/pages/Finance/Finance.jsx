import { useEffect, useState } from "react";
import paymentService from "../../services/paymentService";

export default function Finance() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    try {
      setLoading(true);
      setError("");

      const response = await paymentService.getAll();
      setPayments(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Error loading finance data:", err);
      setError("Unable to load finance data.");
    } finally {
      setLoading(false);
    }
  }

  function normalizeStatus(status) {
    return String(status ?? "").trim().toUpperCase();
  }

  const totalRevenue = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  const completedPayments = payments.filter(
    (payment) => normalizeStatus(payment.status) === "COMPLETED"
  ).length;

  const pendingPayments = payments.filter(
    (payment) => normalizeStatus(payment.status) !== "COMPLETED"
  ).length;

  return (
    <div>
      <h1>Finance</h1>
      <p>Financial overview of ICEOPS ERP</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 16,
              marginBottom: 24
            }}
          >
            <div style={cardStyle}>
              <h3>Total Revenue</h3>
              <strong>${totalRevenue.toFixed(2)}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Total Payments</h3>
              <strong>{payments.length}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Completed</h3>
              <strong>{completedPayments}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Pending</h3>
              <strong>{pendingPayments}</strong>
            </div>
          </div>

          <button type="button" onClick={loadPayments}>
            Refresh Finance
          </button>

          <h2>Financial Transactions</h2>

          {payments.length === 0 ? (
            <p>No financial transactions registered.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Order ID</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.orderId}</td>
                    <td>${Number(payment.amount || 0).toFixed(2)}</td>
                    <td>{payment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
}

const cardStyle = {
  border: "1px solid #cccccc",
  borderRadius: 8,
  padding: 16,
  backgroundColor: "#ffffff"
};