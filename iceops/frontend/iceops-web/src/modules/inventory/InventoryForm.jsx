import { useState } from "react";

export default function InventoryForm({ onSetStock }) {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = () => {
    if (!productId || !quantity) return;
    onSetStock(productId, quantity);
    setProductId("");
    setQuantity("");
  };

  return (
    <div style={{ marginBottom: 20 }}>
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
        Set Stock
      </button>
    </div>
  );
}