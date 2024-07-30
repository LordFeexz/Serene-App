import axios from "axios";
import { getItem } from "./secureStore";

const axiosInstance = axios.create({
  baseURL: "http://16.171.26.154:3001/api/v1",
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
