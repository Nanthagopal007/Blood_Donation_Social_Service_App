import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Register
export const registerUser = async (data) => {
  try {
    const res = await API.post("/users/register", data);
    return { success: true, data: res.data };
  } catch (error) {
    return { success: false, error: error.response?.data?.message || "Registration failed" };
  }
};

// Login
export const loginUser = async (formData) => {
  try {
    const res = await API.post("/users/login", formData);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);
    }
    return res.data;
  } catch (err) {
    if (err.response?.data?.message) throw new Error(err.response.data.message);
    else throw new Error("Unable to connect to server");
  }
};

// Get current user
export const getCurrentUser = async () => {
  try {
    const res = await API.get("/users/current");
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Unauthorized");
  }
};

// Fetch all users (Admin)
export const fetchUsers = async () => {
  try {
    const res = await API.get("/users/all");
    return { success: true, data: res.data };
  } catch (err) {
    return { success: false, data: [], error: err.response?.data?.message || "Fetch failed" };
  }
};

// Delete user (Admin)
export const deleteUser = async (id) => {
  try {
    await API.delete(`/users/${id}`);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || "Delete failed" };
  }
};

// Logout
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};

export default API;
