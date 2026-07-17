import { useEffect, useState } from "react";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";

export default function Accounting() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccountingData();
  }, []);

  async function loadAccountingData() {
    try {
      const [ordersResponse, paymentsResponse] = await Promise.all([
        orderService.getAll(),
        paymentService.getAll()
      ]);

      setOrders(ordersResponse.data);
      setPayments(paymentsResponse.data);
    } catch (error) {
      console.error("Error loading accounting data:", error);
    } finally {
      setLoading(false);
    }
  }

  const totalRevenue = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  const completedPayments = payments.filter(
    (payment) =>
      payment.status === "PAID" ||
      payment.status === "COMPLETED"
  ).length;

  const pendingPayments = payments.filter(
    (payment) =>
      payment.status !== "PAID" &&
      payment.status !== "COMPLETED"
  ).length;

  if (loading) {
    return <p>Loading accounting data...</p>;
  }

  return (
    <div>
      <h1>Accounting</h1>

      <div style={{ display: "flex", gap: 20, marginBottom: 30 }}>
        <div>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>

        <div>
          <h3>Total Payments</h3>
          <p>{payments.length}</p>
        </div>

        <div>
          <h3>Total Revenue</h3>
          <p>${totalRevenue.toFixed(2)}</p>
        </div>

        <div>
          <h3>Completed Payments</h3>
          <p>{completedPayments}</p>
        </div>

        <div>
          <h3>Pending Payments</h3>
          <p>{pendingPayments}</p>
        </div>
      </div>

      <h2>Payment History</h2>

      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Order ID</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.length === 0 ? (
            <tr>
              <td colSpan="4">No payments registered.</td>
            </tr>
          ) : (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.orderId}</td>
                <td>${Number(payment.amount).toFixed(2)}</td>
                <td>{payment.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}