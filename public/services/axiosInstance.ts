import axios from "axios";
import { getItem } from "./secureStore";

export const axiosInstance = axios.create({
  baseURL: "https://42jz4hld-3001.asse.devtunnels.ms/api/v1",
});

axiosInstance.interceptors.request.use(async (config) => {
  const access_token = await getItem("access_token");
  config.headers["Content-Type"] = "application/json";
  if (access_token) {
    config.headers.Authorization = `${access_token}`;
  }
  return config;
});
