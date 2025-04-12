import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log("🔍 Debug: Token ->", token);
  console.log("🔍 Debug: Role ->", role);

  if (!token) {
    console.warn("🚨 No token found! Redirecting to login.");
    return <Navigate to="/login" replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    console.warn("🚨 Unauthorized role! Redirecting to home.");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
