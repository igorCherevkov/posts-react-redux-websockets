import axios from "axios";

export const $host = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

$host.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});
