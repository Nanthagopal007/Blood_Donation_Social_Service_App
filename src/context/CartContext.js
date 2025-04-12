import { createContext, useContext, useEffect, useState } from "react";
import { fetchDonors } from "../services/Donorapi";
import { getAllUsers, deleteUser } from "../services/Usersapi";
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

  // ✅ Donor-related
  const addCart = (donor) => {
    if (!donor || !donor._id) {
      alert("❌ Invalid donor!");
      return;
    }
    const isAlreadyAdded = cart.some((item) => item._id === donor._id);
    if (isAlreadyAdded) {
      alert("⚠️ Donor is already in the cart!");
    } else {
      setCart([...cart, donor]);
      alert("✅ Donor added to cart successfully!");
    }
  };

  const removeCart = (id) => {
    if (!id) {
      alert("❌ Invalid donor ID!");
      return;
    }
    const isInCart = cart.some((item) => item._id === id);
    if (!isInCart) {
      alert("❌ Donor not found in the cart!");
      return;
    }
    setCart(cart.filter((item) => item._id !== id));
    alert("🗑️ Donor removed from cart!");
  };

  const getDonors = async () => {
    try {
      const data = await fetchDonors();
      setDonors(data);
    } catch (error) {
      console.error("Fetch Donors Error:", error.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const userData = await getAllUsers();
      console.log("Fetched Users:", userData);
      setUsers(userData);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const loadContacts = async () => {
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error.message);
    }
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
  };

  // ✅ Effects
  useEffect(() => {
    getDonors();
    fetchUsers();
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
        fetchUsers,
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

export const useCart = () => {
  return useContext(CartContext);
};
