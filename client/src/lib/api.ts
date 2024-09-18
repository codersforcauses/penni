import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_BACKEND_URL });

export default api;

const LocalBaseURL = "http://170.64.220.156:8000/api"; // local use
export { LocalBaseURL };

const axiosInstance = axios.create({
  baseURL: LocalBaseURL,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<any>) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, redirecting to login...");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export { axiosInstance };
