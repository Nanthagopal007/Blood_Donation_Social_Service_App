import axios from "axios";

// ✅ Create API instance
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://blood-donate-app.onrender.com";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Important
});




// ✅ Add request interceptor to automatically attach token if available
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Automatically adds the token here
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
