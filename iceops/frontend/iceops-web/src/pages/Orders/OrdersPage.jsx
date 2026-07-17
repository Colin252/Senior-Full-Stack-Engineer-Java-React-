import { useEffect, useState } from "react";

import {
  getOrders,
  createOrder,
  deleteOrder,
  checkInventory,
  decreaseStock
} from "./orderService";

import OrderForm from "./OrderForm";
import OrdersTable from "./OrdersTable";

export default function OrdersPage() {

  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const res = await getOrders();
    setOrders(res.data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // 🔥 ERP CORE LOGIC
  const handleCreate = async (data) => {
    try {
      // 1. CHECK INVENTORY
      const inventoryRes = await checkInventory(data.productId);
      const stock = inventoryRes.data?.quantity || 0;

      if (stock < data.quantity) {
        alert("❌ Not enough stock!");
        return;
      }

      // 2. CREATE ORDER (PENDING)
      const orderRes = await createOrder({
        ...data,
        status: "CONFIRMED"
      });

      // 3. DECREASE INVENTORY
      await decreaseStock(data.productId, data.quantity);

      // 4. REFRESH UI
      loadOrders();

    } catch (err) {
      console.error("Order failed:", err);
      alert("Order failed!");
    }
  };

  const handleDelete = async (id) => {
    await deleteOrder(id);
    loadOrders();
  };

  return (
    <div style={{ padding: 20 }}>

      <h2>🧾 ORDER MODULE (ERP INTEGRATED)</h2>

      <OrderForm onCreate={handleCreate} />

      <OrdersTable
        orders={orders}
        onDelete={handleDelete}
      />

    </div>
  );
}