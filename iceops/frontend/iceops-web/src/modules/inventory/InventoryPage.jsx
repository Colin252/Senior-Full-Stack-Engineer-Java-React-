import { useEffect, useState } from "react";

import {
  getInventory,
  setStock,
  increaseStock,
  decreaseStock
} from "./inventoryService";

import InventoryForm from "./InventoryForm";
import InventoryTable from "./InventoryTable";

export default function InventoryPage() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadInventory() {
    try {
      const response = await getInventory();
      setInventory(response.data);
    } catch (error) {
      console.error("Error loading inventory:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInventory();
  }, []);

  async function handleSetStock(productId, quantity) {
    try {
      await setStock(productId, quantity);
      await loadInventory();
    } catch (error) {
      console.error("Error setting stock:", error);
    }
  }

  async function handleIncrease(productId) {
    try {
      await increaseStock(productId, 1);
      await loadInventory();
    } catch (error) {
      console.error("Error increasing stock:", error);
    }
  }

  async function handleDecrease(productId) {
    try {
      await decreaseStock(productId, 1);
      await loadInventory();
    } catch (error) {
      console.error("Error decreasing stock:", error);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Inventory Module</h2>

      <InventoryForm onSetStock={handleSetStock} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <InventoryTable
          data={inventory}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
        />
      )}
    </div>
  );
}