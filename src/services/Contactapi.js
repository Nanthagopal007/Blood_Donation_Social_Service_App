import API from "../services/api";

// ✅ Fetch all contacts
export const fetchContacts = async () => {
  try {
    const response = await API.get("/api/contacts");
    return response.data;
  } catch (error) {
    console.error("❌ Fetch Contacts Error:", error.response?.data?.message || error.message);
    return [];
  }
};

// ✅ Fetch Contact by ID
export const fetchContactById = async (id) => {
  try {
    const response = await API.get(`/api/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error("❌ Fetch Contact By ID Error:", error.response?.data?.message || error.message);
    return null;
  }
};

// ✅ Add a new contact
export const addContact = async (contactData) => {
  try {
    const response = await API.post("/api/contacts", contactData);  // Removed redundant headers
    return response.data;
  } catch (error) {
    console.error("❌ Error adding contact:", error.response?.data?.message || error.message);
    return null;
  }
};

// ✅ Delete Contact
export const deleteContact = async (id) => {
  try {
    await API.delete(`/api/contacts/${id}`);  // Removed redundant headers
    console.log(`✅ Contact with ID ${id} deleted successfully.`);
    return true;
  } catch (error) {
    console.error("❌ Delete Contact Error:", error.response?.data?.message || error.message);
    return false;
  }
};
