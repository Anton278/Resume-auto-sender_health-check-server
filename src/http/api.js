import axios from "axios";

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? process.env.DEV_MAIN_SERVER
      : process.env.PROD_MAIN_SERVER,
});
