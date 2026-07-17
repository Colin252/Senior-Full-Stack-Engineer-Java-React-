import { useEffect, useState } from "react";
import orderService from "../../services/orderService";

export default function Orders() {
  const emptyOrder = {
    userId: "",
    productId: "",
    quantity: ""
  };

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(emptyOrder);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      setLoading(true);

      const response = await orderService.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error("Error loading orders:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setOrder({
      ...order,
      [name]: value === "" ? "" : Number(value)
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (editingId !== null) {
        await orderService.update(editingId, order);
      } else {
        await orderService.create(order);
      }

      setOrder(emptyOrder);
      setEditingId(null);

      await loadOrders();
    } catch (error) {
      console.error("Error saving order:", error);
    }
  }

  function editOrder(item) {
    setEditingId(item.id);

    setOrder({
      userId: item.userId,
      productId: item.productId,
      quantity: item.quantity
    });
  }

  async function deleteOrder(id) {
    if (!window.confirm("Delete this order?")) {
      return;
    }

    try {
      await orderService.delete(id);

      if (editingId === id) {
        setEditingId(null);
        setOrder(emptyOrder);
      }

      await loadOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  }

  return (
    <div>
      <h1>Orders</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="userId"
          placeholder="User ID"
          value={order.userId}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="number"
          name="productId"
          placeholder="Product ID"
          value={order.productId}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={order.quantity}
          onChange={handleChange}
          min="1"
          required
        />

        <button type="submit">
          {editingId !== null ? "Update Order" : "Create Order"}
        </button>

        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setOrder(emptyOrder);
            }}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders registered.</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.userId}</td>
                <td>{item.productId}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    type="button"
                    onClick={() => editOrder(item)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteOrder(item.id)}
                    style={{ marginLeft: 10 }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}