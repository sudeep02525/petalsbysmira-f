import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
  timeout: 10000,
});

// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Get the zustand store state from localStorage
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          const token = parsed?.state?.token;
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (e) {
          console.error("Failed to parse auth token", e);
        }
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
    // You can handle global 401s here
    return Promise.reject(error);
  }
);

export default axiosInstance;
