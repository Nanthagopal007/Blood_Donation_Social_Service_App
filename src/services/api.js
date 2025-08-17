import axios from "axios";

// ✅ Decide baseURL depending on environment
const API_BASE_URL =
  process.env.REACT_APP_API_URL || // take from .env if available
  (process.env.NODE_ENV === "production"
    ? "https://blood-donate-api.onrender.com" // 👈 your deployed backend URL
    : "http://localhost:5000");               // 👈 local backend for dev

// ✅ Create API instance
const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // if you ever use cookies for auth
});

// ✅ Request interceptor to attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
