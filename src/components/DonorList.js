import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/DonorList.css";
import img from "../assets/bloodhand.jpeg";
import Filter from "./Filter";

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

  return (

    <div className="donor-list-container">
      <Filter selectedType={selectedType} onFilterChange={handleFilterChange} />

      {Array.isArray(filteredDonors) && filteredDonors.length === 0 ? (
        <p className="text-center text-muted">No donors available.</p>
      ) : (
        <div className="donor-cards-wrapper">
          {filteredDonors.map((donor) => {
            const isInCart = cart.some((c) => c._id === donor._id);

            return (
              <div key={donor._id} className="donor-card">
                <img
                  src={donor.image || img}
                  className="card-img-top donor-img"
                  alt={donor.firstName}
                />
                <div className="card-body">
                  <h5 className="card-title text-danger fw-bold">
                    {donor.firstName} {donor.lastName}
                  </h5>
                  <p className="card-text"><strong>Area:</strong> {donor.area}</p>
                  <p className="card-text"><strong>Phone:</strong> {donor.phone}</p>
                  <p className="card-text"><strong>Blood Type:</strong> {donor.bloodType}</p>
                  <p className="card-text text-success"><strong>Available</strong></p>

                  <span className={`badge px-3 py-2 donor-status ${donor.status === "Available" ? "bg-success" : "bg-danger"}`}>
                    {donor.status}
                  </span>

                  <div className="d-flex justify-content-center mt-3">
                    <a href={`tel:+91${donor?.phone}`} className="btnphone">
                      <i className="bi bi-telephone-forward me-2"></i>
                    </a>

                    {isInCart ? (
                      <button className="btnremove" onClick={() => removeCart(donor._id)}>Remove -</button>
                    ) : (
                      <button className="btnsave" onClick={() => addCart(donor)}>Save +</button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DonorList;
