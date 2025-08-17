import API from "./api";

// ✅ Fetch all contacts
export const fetchContacts = async () => {
  try {
    const response = await API.get("/contacts"); // → /api/contacts via api.js baseURL
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "❌ Fetch Contacts Error:",
      error.response?.data?.message || error.message
    );
    return { success: false, data: [] };
  }
};

// ✅ Add a new contact
export const addContact = async (contactData) => {
  try {
    const response = await API.post("/contacts", contactData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "❌ Add Contact Error:",
      error.response?.data?.message || error.message
    );
    return { success: false, data: null };
  }
};

// ✅ Delete contact
export const deleteContact = async (id) => {
  try {
    await API.delete(`/contacts/${id}`);
    return { success: true };
  } catch (error) {
    console.error(
      "❌ Delete Contact Error:",
      error.response?.data?.message || error.message
    );
    return { success: false, error: error.response?.data?.message || "Delete failed" };
  }
};
