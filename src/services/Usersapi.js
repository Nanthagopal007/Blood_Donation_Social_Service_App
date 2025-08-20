import API from "./api";

// ====================== REGISTER ======================
export const registerUser = async (data) => {
  try {
    const res = await API.post("/users/register", data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || "Registration failed",
    };
  }
};

// ====================== LOGIN ======================
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
    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }
    throw new Error("Unable to connect to server");
  }
};

// ====================== FETCH ALL USERS (Admin only) ======================
export const fetchUsers = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/users/all", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ attach token
      },
    });

    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      data: [],
      error: err.response?.data?.message || "Fetch failed",
    };
  }
};

// ====================== DELETE USER (Admin only) ======================
export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ attach token
      },
    });

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || "Delete failed",
    };
  }
};

// ====================== GET CURRENT USER ======================
export const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get("/users/current", {
      headers: {
        Authorization: `Bearer ${token}`, // ✅ attach token
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Unauthorized");
  }
};

// ====================== LOGOUT ======================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("email");
};

export default API;
