export default function InventoryTable({ data, onIncrease, onDecrease }) {
  return (
    <table border="1" cellPadding="10" width="100%">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.price}</td>
            <td>{item.stock}</td>
            <td>
              <button onClick={() => onIncrease(item.id)}>
                +
              </button>{" "}
              <button onClick={() => onDecrease(item.id)}>
                -
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}