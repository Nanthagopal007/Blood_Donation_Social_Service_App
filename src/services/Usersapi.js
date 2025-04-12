import API from "../services/api";

// ✅ Helper to get token safely
export const getToken = () => {
  const token = localStorage.getItem("token");
  return token && token.startsWith("Bearer ") ? token.split(" ")[1] : token || "";
};

// ✅ Login User
export const loginUser = async (credentials) => {
  try {
    const response = await API.post("/api/users/login", credentials);

    if (response.data.token) {
      // ✅ Ensure token is stored without "Bearer "
      const token = response.data.token.replace("Bearer ", "");
      localStorage.setItem("token", token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("email", response.data.email);
    }

    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Login failed. Please try again.");
  }
};

// ✅ Register User
export const registerUser = async (userData) => {
  try {
    const response = await API.post("/api/users/register", userData);
    return response.data;
  } catch (error) {
    console.error("❌ Registration Error:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Registration failed. Try again.");
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
  //const token = getToken();
  try {
    const response = await API.get("/api/users/all");

    return response.data;
  } catch (error) {
    console.error("❌ Error fetching users:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Failed to fetch users");
  }
};

// ✅ Delete User (Admin Only)
export const deleteUser = async (userId) => {
  const token = getToken();
  try {
    await API.delete(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Ensure Authorization header is set with token
      },
    });
  } catch (error) {
    console.error("❌ Error deleting user:", error.response?.data?.message || error.message);
    throw new Error(error.response?.data?.message || "Error deleting user");
  }
};

// ✅ Logout User
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};
