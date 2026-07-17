import gateway from "../api/gateway";

const analyticsService = {
  getAll() {
    return gateway.get("/analytics");
  }
};

export default analyticsService;