import "../styles/NavBar.css";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Brand from "../assets/Brand.jpeg"

const NavBar = () => {
  const { cart } = useCart(); // ✅ Get cart from context
  const navigate = useNavigate(); // ✅ For redirection

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear Token
    localStorage.removeItem("role"); // Clear Role
    localStorage.removeItem("email"); // Clear Email
    alert("Logged Out Successfully!");
    navigate("/login"); // Redirect to Login Page
  };

  return (
    <div className="container-fluid bg-success">
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          {/* Brand on the left */}
          <NavLink className="navbar-brand text-white" to="/home">
            <img className="Brand" src={Brand} alt="donor img" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav items aligned to right */}
          <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavbar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link text-white active-grey" : "nav-link text-white"
                  }
                  to="/home"
                >
                  HOME
                </NavLink>

              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link text-white active-grey" : "nav-link text-white"
                  }
                  to="/about"
                >
                  ABOUT
                </NavLink>
              </li>
              <li className="nav-item">
                {/* <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link text-white active-grey" : "nav-link text-white"
                  }
                  to="/contact"
                >
                  CONTACT
                </NavLink> */}
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link text-white active-grey" : "nav-link text-white"
                  }
                  to="/viewcart"
                >
                  SAVED
                  {cart.length > 0 && (
                    <sup className="text sup ms-1">{cart.length}</sup>
                  )}
                </NavLink>
              </li>
              <li className="nav-item">
                <button className="logout" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
