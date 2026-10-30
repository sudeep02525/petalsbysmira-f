import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "",
  timeout: 30000,
  withCredentials: true,
});

// Request interceptor to attach private access token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Add Private Access Token if it exists
      const privateAccessToken = localStorage.getItem("privateAccessToken");
      if (privateAccessToken) {
        config.headers["x-private-access-token"] = privateAccessToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined") {
      if (error.response?.status === 401 && error.config?.headers?.["x-private-access-token"]) {
        localStorage.removeItem("privateAccessToken");
        window.dispatchEvent(new Event("private-access-expired"));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
