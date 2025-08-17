import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import "../../../styles/DonorList.css";
import img from "../../../assets/Brand.jpeg";
import Filter from "./Filter";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const DonorList = () => {
  const { donors, cart, addCart, removeCart } = useCart();
  const [selectedType, setSelectedType] = useState("All");

  const handleFilterChange = (type) => {
    setSelectedType(type);
  };

  const filteredDonors =
    selectedType === "All"
      ? donors
      : donors.filter((donor) => donor.bloodType === selectedType);

  // Show loader if donors are not loaded yet
  if (!Array.isArray(donors) || donors.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className="donor-list-container">
      {/* Filter Component */}
      <Filter selectedType={selectedType} onFilterChange={handleFilterChange} />

      {/* Donor Cards */}
      <div className="donor-cards-wrapper">
        {filteredDonors.map((donor) => {
          const isInCart = cart.some((c) => c._id === donor._id);

          return (
            <div key={donor._id} className="donor-card">
              <img
                src={donor.image || img}
                className="donor-img"
                alt={`${donor.firstName} ${donor.lastName}`}
              />

              <div className="card-body">
                <h5 className="card-title">
                  {donor.firstName} {donor.lastName}
                </h5>
                <p className="card-text">
                  <strong>Area:</strong> {donor.area}
                </p>
                <p className="card-text">
                  <strong>Phone:</strong> {donor.phone}
                </p>
                <p className="card-text">
                  <strong>Blood Type:</strong> {donor.bloodType}
                </p>

                <span
                  className={`donor-status ${
                    donor.status === "Available" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {donor.status}
                </span>

                <div className="d-flex justify-content-center mt-3 gap-2 flex-wrap">
                  <a
                    href={`tel:+91${donor?.phone}`}
                    className="btnphone"
                    aria-label={`Call ${donor.firstName}`}
                  >
                    <i className="bi bi-telephone-forward"></i>
                  </a>

                  {isInCart ? (
                    <button
                      className="btnremove"
                      onClick={() => removeCart(donor._id)}
                    >
                      Remove -
                    </button>
                  ) : (
                    <button
                      className="btnsave"
                      onClick={() => addCart(donor)}
                    >
                      Save +
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonorList;
