import { useEffect, useState } from "react";
import userService from "../../services/userService";
import productService from "../../services/productService";
import orderService from "../../services/orderService";
import paymentService from "../../services/paymentService";

export default function Reports() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);
      setError("");

      const [
        usersResponse,
        productsResponse,
        ordersResponse,
        paymentsResponse
      ] = await Promise.all([
        userService.getAll(),
        productService.getAll(),
        orderService.getAll(),
        paymentService.getAll()
      ]);

      setUsers(
        Array.isArray(usersResponse.data) ? usersResponse.data : []
      );

      setProducts(
        Array.isArray(productsResponse.data) ? productsResponse.data : []
      );

      setOrders(
        Array.isArray(ordersResponse.data) ? ordersResponse.data : []
      );

      setPayments(
        Array.isArray(paymentsResponse.data) ? paymentsResponse.data : []
      );
    } catch (err) {
      console.error("Error loading reports:", err);
      setError("Unable to load ERP reports.");
    } finally {
      setLoading(false);
    }
  }

  const totalInventoryValue = products.reduce(
    (total, product) =>
      total +
      Number(product.price || 0) * Number(product.stock || 0),
    0
  );

  const totalRevenue = payments.reduce(
    (total, payment) => total + Number(payment.amount || 0),
    0
  );

  return (
    <div>
      <h1>Reports</h1>
      <p>General operational report for ICEOPS ERP.</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="button" onClick={loadReports}>
        Refresh Reports
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
              gap: 16,
              marginTop: 20,
              marginBottom: 24
            }}
          >
            <div style={cardStyle}>
              <h3>Users</h3>
              <strong>{users.length}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Products</h3>
              <strong>{products.length}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Orders</h3>
              <strong>{orders.length}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Payments</h3>
              <strong>{payments.length}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Inventory Value</h3>
              <strong>${totalInventoryValue.toFixed(2)}</strong>
            </div>

            <div style={cardStyle}>
              <h3>Total Revenue</h3>
              <strong>${totalRevenue.toFixed(2)}</strong>
            </div>
          </div>

          <h2>Orders Report</h2>

          {orders.length === 0 ? (
            <p>No orders registered.</p>
          ) : (
            <table border="1" cellPadding="8">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Product ID</th>
                  <th>Quantity</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>{order.productId}</td>
                    <td>{order.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <h2>Payments Report</h2>

          {payments.length === 0 ? (
            <p>No payments registered.</p>
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