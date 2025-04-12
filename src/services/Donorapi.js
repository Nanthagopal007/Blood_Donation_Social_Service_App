import API from "../services/api";

// ✅ Fetch all donors
export const fetchDonors = async () => {
  try {
    const response = await API.get("/api/donors");
    return response.data;
  } catch (error) {
    console.error("❌ Fetch Donors Error:", error.response?.data?.message || error.message);
    return [];
  }
};

// ✅ Add a new donor
export const addDonor = async (donorData) => {
  try {
    const response = await API.post("/api/donors", donorData, {
      headers: { "Content-Type": "application/json" },
    });

    if (response.status === 201) {
      console.log("✅ Donor added successfully:", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("❌ Error adding donor:", error.response?.data?.message || error.message);
    return null;
  }
};

// ✅ Update donor
export const updateDonor = async (id, updatedData) => {
  try {
    const response = await API.put(`/api/donors/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("❌ Update Donor Error:", error.response?.data?.message || error.message);
    throw error.response?.data?.message || "Update failed!";
  }
};

// ✅ Delete donor
export const deleteDonor = async (id) => {
  try {
    await API.delete(`/api/donors/${id}`);
    return true;
  } catch (error) {
    console.error("❌ Delete Donor Error:", error.response?.data?.message || error.message);
    return false;
  }
};
