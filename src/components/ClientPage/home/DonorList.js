import { useState } from "react";
import { useCart } from "../../../context/CartContext";
import styles from "../../../styles/DonorList.module.css";
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

  // Loader when donors are not ready
  if (!Array.isArray(donors) || donors.length === 0) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "40px" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div className={styles.donorListContainer}>
      {/* Filter Component */}
      <Filter selectedType={selectedType} onFilterChange={handleFilterChange} />

      {/* Donor Cards */}
      <div className={styles.donorCardsWrapper}>
        {filteredDonors.map((donor) => {
          const isInCart = cart.some((c) => c._id === donor._id);

          return (
            <div key={donor._id} className={styles.donorCard}>
              <img
                src={donor.image || img}
                className={styles.donorImg}
                alt={`${donor.firstName} ${donor.lastName}`}
              />

              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>
                  {donor.firstName} {donor.lastName}
                </h5>
                <p className={styles.cardText}>
                  <strong>Area:</strong> {donor.area}
                </p>
                <p className={styles.cardText}>
                  <strong>Phone:</strong> {donor.phone}
                </p>
                <p className={styles.cardText}>
                  <strong>Blood Type:</strong> {donor.bloodType}
                </p>

                <div className={styles.buttonGroup}>
                  <a
                    href={`tel:+91${donor?.phone}`}
                    className={styles.btnPhone}
                    aria-label={`Call ${donor.firstName}`}
                  >
                    <i className="bi bi-telephone-forward"></i>
                  </a>

                  {isInCart ? (
                    <button
                      className={styles.btnRemove}
                      onClick={() => removeCart(donor._id)}
                    >
                      Remove -
                    </button>
                  ) : (
                    <button
                      className={styles.btnSave}
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
