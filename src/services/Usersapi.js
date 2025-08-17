import axios from "axios";

// ✅ Correct base API instance
const API = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://blood-donate-api.onrender.com" // 👈 Replace with your backend deployment URL
      : "http://localhost:5000", // 👈 Local dev backend
  headers: { "Content-Type": "application/json" },
});

// ✅ Helper to get token safely
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : "";
};

// ✅ Login User
export const loginUser = async (formData) => {
  try {
    const response = await API.post("/api/users/login", formData);

    if (response.data.token) {
      // Store token without "Bearer " prefix
      localStorage.setItem("token", response.data.token.replace("Bearer ", ""));
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);
    }

    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data?.message || "Login failed. Please try again.");
    } else if (err.request) {
      throw new Error("Unable to connect to server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/api/users/register", userData);
    return response.data;
  } catch (err) {
    if (err.response) {
      throw new Error(err.response.data?.message || "Registration failed. Try again.");
    } else if (err.request) {
      throw new Error("Unable to connect to server. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred. Please try again.");
    }
  }
};

// ✅ Get Current User
export const getCurrentUser = () => {
  const token = getToken();
  const role = localStorage.getItem("role");
  const email = localStorage.getItem("email");

  return token && role ? { token, role, email } : null;
};

// ✅ Get All Users (Admin Only)
export const getAllUsers = async () => {
  const token = getToken();
  try {
    const response = await API.get("/api/users/all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (err) {
    if (err.response) throw new Error(err.response.data?.message || "Failed to fetch users");
    else throw new Error("Unable to connect to server. Please try again later.");
  }
};

// ✅ Delete User (Admin Only)
export const deleteUser = async (userId) => {
  const token = getToken();
  try {
    await API.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (err) {
    if (err.response) throw new Error(err.response.data?.message || "Error deleting user");
    else throw new Error("Unable to connect to server. Please try again later.");
  }
};

// ✅ Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};
