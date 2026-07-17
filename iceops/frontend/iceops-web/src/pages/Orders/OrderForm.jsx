import { useState } from "react";

export default function OrderForm({ onCreate }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    if (!productId || !quantity) return;

    onCreate({
      productId,
      quantity: Number(quantity),
    });

    setProductId("");
    setQuantity("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Create Order</h3>

      <input
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Create Order
      </button>
    </div>
  );
}