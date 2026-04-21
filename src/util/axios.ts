import axios, { AxiosHeaders, type AxiosInstance } from "axios";
import { API_URL } from "./config";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    if (config.headers instanceof AxiosHeaders) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      config.headers = new AxiosHeaders({
        ...(config.headers as Record<string, string> | undefined),
        Authorization: `Bearer ${token}`,
      });
    }
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export { axiosInstance as axios };
