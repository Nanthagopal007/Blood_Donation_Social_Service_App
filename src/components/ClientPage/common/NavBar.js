import "../../../styles/NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import Brand from "../../../assets/Brand.jpeg";

const NavBar = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    alert("Logged Out Successfully!");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        {/* Brand */}
        <NavLink className="navbar-brand" to="/home">
          <img src={Brand} alt="Brand Logo" className="brand-logo" />
        </NavLink>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item position-relative">
              <NavLink
                to="/viewcart"
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                Saved
                {cart.length > 0 && (
                  <span className="cart-badge">{cart.length}</span>
                )}
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light ms-2 mt-2 mt-lg-0"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
