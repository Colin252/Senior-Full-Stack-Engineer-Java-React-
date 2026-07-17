import api from "../api/gateway";

const orderService = {
  getAll: () => api.get("/orders"),

  getById: (id) => api.get(`/orders/${id}`),

  create: (order) => api.post("/orders", order),

  update: (id, order) => api.put(`/orders/${id}`, order),

  delete: (id) => api.delete(`/orders/${id}`),
};

export default orderService;