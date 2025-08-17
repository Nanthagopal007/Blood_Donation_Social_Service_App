import SideBar from "./SideBar";
import UserDetail from "../Dashboard/UserDetails";
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
        <h2 className="text-center text-success">Users Lists</h2>
        <UserDetail />
      </div>
    </div>
  );
};

export default Users;
