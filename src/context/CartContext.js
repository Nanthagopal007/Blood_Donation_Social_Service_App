import { createContext, useContext, useEffect, useState } from "react";
import { fetchDonors } from "../services/Donorapi";
import { fetchUsers as fetchUsersApi, deleteUser } from "../services/Usersapi";
import { fetchContacts } from "../services/Contactapi";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const auth = useAuth();
  const user = auth?.user || null;

  const [donors, setDonors] = useState([]);
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("myCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  // ✅ Add donor to cart
  const addCart = (donor) => {
    if (!donor || !donor._id) {
      alert("❌ Invalid donor!");
      return false;
    }
    const isAlreadyAdded = cart.some((item) => item._id === donor._id);
    if (isAlreadyAdded) {
      alert("⚠️ Donor is already in the cart!");
      return false;
    }
    setCart((prev) => [...prev, donor]);
    alert("✅ Donor added to cart successfully!");
    return true;
  };

  // ✅ Remove donor from cart
  const removeCart = (id) => {
    if (!id) {
      alert("❌ Invalid donor ID!");
      return false;
    }
    const isInCart = cart.some((item) => item._id === id);
    if (!isInCart) {
      alert("❌ Donor not found in the cart!");
      return false;
    }
    setCart((prev) => prev.filter((item) => item._id !== id));
    alert("🗑️ Donor removed from cart!");
    return true;
  };

  // ✅ Fetch donors
  const getDonors = async () => {
    try {
      const res = await fetchDonors();
      if (res.success) {
        setDonors(res.data);
      }
    } catch (error) {
      console.error("❌ Fetch Donors Error:", error.message);
    }
  };

  // ✅ Fetch all users (using correct API function)
  const loadUsers = async () => {
    try {
      const res = await fetchUsersApi(); // ✅ use imported fetchUsers
      if (res.success) {
        setUsers(res.data);
      }
    } catch (error) {
      console.error("❌ Error fetching users:", error.message);
    }
  };

  // ✅ Delete user
  const handleDelete = async (userId) => {
    try {
      const res = await deleteUser(userId);
      if (res.success) {
        setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userId));
      }
    } catch (error) {
      console.error("❌ Error deleting user:", error.message);
    }
  };

  // ✅ Fetch contacts
  const loadContacts = async () => {
    try {
      const res = await fetchContacts();
      if (res.success) {
        setContacts(res.data);
      }
    } catch (error) {
      console.error("❌ Error fetching contacts:", error.message);
    }
  };

  // ✅ Select contact
  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  // ✅ Effects
  useEffect(() => {
    getDonors();
    loadUsers(); // ✅ corrected
    loadContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem("myCart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        donors,
        setDonors,
        cart,
        setCart,
        addCart,
        removeCart,
        user,
        users,
        loadUsers,   // ✅ provide correct fn
        handleDelete,
        contacts,
        selectedContact,
        handleSelectContact,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
