import { createContext, useContext, useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser, getCurrentUser } from "../services/Usersapi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Register
  const signup = async (formData) => {
    const res = await registerUser(formData);
    if (res.success) {
      localStorage.setItem("token", res.token);
      setUser(res.user);
    }
    return res;
  };

  // ✅ Login
  const login = async (formData) => {
    const res = await loginUser(formData);
    if (res.success) {
      localStorage.setItem("token", res.token);
      setUser(res.user);
    }
    return res;
  };

  // ✅ Logout
  const logout = async () => {
    await logoutUser();
    setUser(null);
  };

  // ✅ Get current user from token
  const loadUser = async () => {
    try {
      const res = await getCurrentUser();
      if (res.success) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
