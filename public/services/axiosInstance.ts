import axios from "axios";
import { getItem } from "./secureStore";

export const axiosInstance = axios.create({
  baseURL: "https://4615-36-90-31-203.ngrok-free.app",
});

axiosInstance.interceptors.request.use(async (config) => {
  const access_token = await getItem("access_token");
  config.headers["Content-Type"] = "application/json";
  if (access_token) {
    config.headers.Authorization = `${access_token}`;
  }
  return config;
});
