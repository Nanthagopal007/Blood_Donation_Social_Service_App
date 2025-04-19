import React from "react";
import { useCart } from "../../context/CartContext";
import "../../styles/StatsCard.css"

const StatsCard = () => {
  const { donors,users } = useCart();  // Removed cart as it's unused

  return (
    <div className="stats-container">
      <div className="stats-card">
        <h3>Total Donors</h3>
        <p>{donors.length}</p>
      </div>
      <div className="stats-card">
        <h3>Users</h3>
        <p>{users.length}</p> {/* Change this dynamically if needed */}
      </div>
      {/* <div className="stats-card">
        <h3>Contact Us</h3>
        <p>{contacts.length}</p> 
      </div> */}
    </div>
  );
};

export default StatsCard;
