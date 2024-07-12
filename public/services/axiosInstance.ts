import axios from "axios";
import { getItem } from "./secureStore";

const axiosInstance = axios.create({
  baseURL: "https://de47-36-77-146-113.ngrok-free.app/api/v1",
});

axiosInstance.interceptors.request.use(async (config) => {
  const access_token = await getItem("access_token");
  config.headers["Content-Type"] = "application/json";
  if (access_token) {
    config.headers.Authorization = `${access_token}`;
  }
  return config;
});
export { axiosInstance };
