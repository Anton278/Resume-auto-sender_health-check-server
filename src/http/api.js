import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "https://localhost:5001"
      : "https://localhost:5000",
});
