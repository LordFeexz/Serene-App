import axios from "axios";
import { getItem } from "./secureStore";

const axiosInstance = axios.create({
  baseURL: "https://serene-app.onrender.com/api/v1",
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
