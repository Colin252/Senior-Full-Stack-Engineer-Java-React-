export default function OrdersTable({ orders, onDelete }) {
  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product ID</th>
          <th>Quantity</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {orders.map((o) => (
          <tr key={o.id}>
            <td>{o.id}</td>
            <td>{o.productId}</td>
            <td>{o.quantity}</td>
            <td>{o.status || "PENDING"}</td>
            <td>
              <button onClick={() => onDelete(o.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}