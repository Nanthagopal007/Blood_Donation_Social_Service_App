import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../../styles/SideBar.css";

const SideBar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);  // State to toggle sidebar

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        alert("🚪 Logged out successfully!");
        navigate("/login");
        window.location.reload();
    };

    return (
        <>
            {/* Toggle Button for Mobile */}
            <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
                ☰
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isOpen ? "open" : ""}`}>
                <h3 className="ms-4"><i className="bi bi-person-circle pe-1"></i>Admin</h3>
                <ul>
                    <li>
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                            <i className="bi bi-house-door p-2"></i>Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/users" className={({ isActive }) => isActive ? "active" : ""}>
                            <i className="bi bi-people p-2"></i>Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/donors" className={({ isActive }) => isActive ? "active" : ""}>
                            <i className="bi bi-ticket-detailed p-2"></i>Donors
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contactus" className={({ isActive }) => isActive ? "active" : ""}>
                            <i className="bi bi-telephone p-2"></i>Contact Us
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={handleLogout} className="logoutbtn">
                            <i className="bi bi-box-arrow-left p-2"></i>LogOut
                        </button>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default SideBar;
