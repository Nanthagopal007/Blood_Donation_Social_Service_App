import API from "./api";

// ✅ Fetch all donors
export const fetchDonors = async () => {
  try {
    const response = await API.get("/donors"); // frontend calls /api/donors via api.js baseURL
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Fetch Donors Error:", error.response?.data?.message || error.message);
    return { success: false, data: [] };
  }
};

// ✅ Add a new donor
export const addDonor = async (donorData) => {
  try {
    const response = await API.post("/donors", donorData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Add Donor Error:", error.response?.data?.message || error.message);
    return { success: false, data: null };
  }
};

// ✅ Update donor
export const updateDonor = async (id, updatedData) => {
  try {
    const response = await API.put(`/donors/${id}`, updatedData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error("❌ Update Donor Error:", error.response?.data?.message || error.message);
    return { success: false, error: error.response?.data?.message || "Update failed" };
  }
};

// ✅ Delete donor
export const deleteDonor = async (id) => {
  try {
    await API.delete(`/donors/${id}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Delete Donor Error:", error.response?.data?.message || error.message);
    return { success: false, error: error.response?.data?.message || "Delete failed" };
  }
};
