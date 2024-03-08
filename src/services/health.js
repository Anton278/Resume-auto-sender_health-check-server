import { api } from "../http/api.js";

class HealthService {
  async get() {
    const res = await api.get("/health");
    return res.data;
  }
}

const healthService = new HealthService();
export default healthService;
