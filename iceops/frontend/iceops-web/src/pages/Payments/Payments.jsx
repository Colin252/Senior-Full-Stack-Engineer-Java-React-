import { useEffect, useState } from "react";
import paymentService from "../../services/paymentService";

export default function Payments() {
  const emptyPayment = {
    orderId: "",
    amount: "",
    status: ""
  };

  const [payments, setPayments] = useState([]);
  const [payment, setPayment] = useState(emptyPayment);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {
    try {
      const response = await paymentService.getAll();
      setPayments(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setPayment({
      ...payment,
      [name]:
        name === "status"
          ? value
          : Number(value)
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId) {
        await paymentService.update(editingId, payment);
      } else {
        await paymentService.create(payment);
      }

      setPayment(emptyPayment);
      setEditingId(null);
      loadPayments();
    } catch (error) {
      console.error(error);
    }
  }

  function editPayment(item) {
    setEditingId(item.id);

    setPayment({
      orderId: item.orderId,
      amount: item.amount,
      status: item.status
    });
  }

  async function deletePayment(id) {
    if (!window.confirm("Delete this payment?")) return;

    try {
      await paymentService.delete(id);
      loadPayments();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Payments</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="orderId"
          placeholder="Order ID"
          value={payment.orderId}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={payment.amount}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="status"
          placeholder="Status"
          value={payment.status}
          onChange={handleChange}
          required
        />

        <button type="submit">
          {editingId ? "Update Payment" : "Create Payment"}
        </button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>Order</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.orderId}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => editPayment(item)}>Edit</button>{" "}
                  <button onClick={() => deletePayment(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}