import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import ViewCart from "../pages/ViewCart";
import DashBoard from "../components/Dashboard/DashBoard";
import DonorList from "../components/DonorList";
import DonorTable from "../components/Dashboard/DonorTable";
import Users from "../components/Dashboard/Users";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../components/Authentication/Login";
import Register from "../components/Authentication/Register";
// import Contact from "../pages/Contact";
// import ContactUs from "../components/Dashboard/ContactUs";



const AllRoutes = () => {
  return (
    <Routes>
      {/* ✅ Public Routes (No Protection) */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} /> {/* ✅ Redirect guests to login */}

      {/* ✅ Protected Routes for Users */}
      <Route element={<ProtectedRoute allowedRoles={["user"]} />}>
        <Route path="/home" element={<Home />} />
        <Route path="/viewcart" element={<ViewCart />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/donorlist" element={<DonorList />} />
      </Route>

      {/* ✅ Protected Routes for Admin */}
      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/donors" element={<DonorTable />} />
        {/* <Route path="/contactus" element={<ContactUs />} /> */}
      </Route>

      {/* ✅ Catch-All Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AllRoutes;
