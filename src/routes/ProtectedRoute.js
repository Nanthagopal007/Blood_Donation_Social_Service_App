// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ allowedRoles }) => {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   console.log("🔍 Debug: Token ->", token);
//   console.log("🔍 Debug: Role ->", role);

//   if (!token) {
//     console.warn("🚨 No token found! Redirecting to login.");
//     return <Navigate to="/login" replace />;
//   }

//   if (!role || !allowedRoles.includes(role)) {
//     console.warn("🚨 Unauthorized role! Redirecting to correct home.");
//     return role === "admin" 
//       ? <Navigate to="/dashboard" replace /> 
//       : <Navigate to="/home" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but role mismatch
  if (!allowedRoles.includes(role)) {
    console.warn("Unauthorized role! Redirecting to correct home.");

    return role === "admin"
      ? <Navigate to="/dashboard" replace />
      : <Navigate to="/home" replace />;
  }

  // ✅ Role allowed → show child route
  return <Outlet />;
};

export default ProtectedRoute;
