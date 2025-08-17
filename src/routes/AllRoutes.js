import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ViewCart from "../pages/ViewCart";
import DashBoard from "../components/Dashboard/DashBoard";
import DonorList from "../components/ClientPage/home/DonorList";
import DonorTable from "../components/Dashboard/DonorTable";
import Users from "../components/Dashboard/Users";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
import Contact from "../pages/Contact";
import ContactUs from "../components/Dashboard/ContactUs";

const AllRoutes = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Routes>
      {/* ✅ Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* ✅ Default redirect based on auth */}
      <Route
        path="/"
        element={
          token
            ? role === "admin"
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/home" replace />
            : <Navigate to="/login" replace />
        }
      />

      {/* ✅ Protected Routes for Users */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donorlist" element={<DonorList />} />
      </Route>

      {/* ✅ Protected Routes for Admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/donors" element={<DonorTable />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Route>

      {/* ✅ Catch-All → Redirect properly */}
      <Route
        path="*"
        element={
          token
            ? role === "admin"
              ? <Navigate to="/dashboard" replace />
              : <Navigate to="/home" replace />
            : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
};

export default AllRoutes;
