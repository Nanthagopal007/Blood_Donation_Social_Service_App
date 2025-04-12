import React from "react";
import StatsCard from "./StatsCard";
import "../../styles/DashBoard.css";
import SideBar from "./SideBar";

const DashBoard = () => {
  return (
    <div className="dashboard-container">
        {/* Sidebar - Takes full width on small screens, 4 columns on medium+ screens */}
        <div className="sidebar">
          <SideBar />
        </div>

        {/* Admin panel content - Takes full width on small screens, 8 columns on medium+ screens */}
        <div className="content">
          <h2 className="text-center ">Number of :</h2>
          <StatsCard />
        </div>
      </div>
  );
};

export default DashBoard;
