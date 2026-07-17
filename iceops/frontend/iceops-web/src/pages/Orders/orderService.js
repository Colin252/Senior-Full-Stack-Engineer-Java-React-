import api from "../../api/gateway";

// 📦 Orders
export const getOrders = () => api.get("/orders");
export const createOrder = (data) => api.post("/orders", data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// 📦 INVENTORY INTEGRATION (CLAVE)
export const checkInventory = (productId) =>
  api.get(`/inventory/product/${productId}`);

export const decreaseStock = (productId, quantity) =>
  api.post(`/inventory/decrease?productId=${productId}&amount=${quantity}`);