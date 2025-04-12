import React from "react";
import SideBar from "./SideBar";
import UserDetail from "../UserDetails";
import "../../styles/Users.css"; // Import the CSS file

const Users = () => {
  return (
    <div className="users-container">
      {/* Sidebar Section */}
      <div className="sidebar">
        <SideBar />
      </div>

      {/* Content Section */}
      <div className="content">
        <h2>Users Lists</h2>
        <UserDetail />
      </div>
    </div>
  );
};

export default Users;
