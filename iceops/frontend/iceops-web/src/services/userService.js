import gateway from "../api/gateway";

const userService = {
  async getAll() {
    const response = await gateway.get("/users");
    return response.data;
  },

  async getById(id) {
    const response = await gateway.get(`/users/${id}`);
    return response.data;
  },

  async create(user) {
    const response = await gateway.post("/users", user);
    return response.data;
  },

  async update(id, user) {
    const response = await gateway.put(`/users/${id}`, user);
    return response.data;
  },

  async delete(id) {
    await gateway.delete(`/users/${id}`);
  },
};

export default userService;