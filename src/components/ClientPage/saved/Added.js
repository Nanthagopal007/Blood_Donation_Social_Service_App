import { useCart } from "../../../context/CartContext";
import img from "../../../assets/bloodhand.jpeg";
import styles from "../../../styles/Added.module.css";

const Added = () => {
  const { cart, removeCart } = useCart();

  return (
    <div className={styles.addedContainer}>
      <h3 className="text-center mb-4 text-danger">Saved Donors...</h3>

      {Array.isArray(cart) && cart.length > 0 ? (
        <div className={styles.addedCardsWrapper}>
          {cart.map((product) => (
            <div key={product?._id || Math.random()} className={styles.donorCard}>
              <img
                src={product?.image || img}
                className={styles.donorImg}
                alt={product?.firstName || "Unknown"}
              />
              <div className={styles.cardBody}>
                <h5 className={styles.cardTitle}>
                  {product?.firstName} {product?.lastName}
                </h5>
                <p className={styles.cardText}>
                  <strong>Area:</strong> {product?.area || "N/A"}
                </p>
                <p className={styles.cardText}>
                  <strong>Phone:</strong> {product?.phone || "N/A"}
                </p>
                <p className={styles.cardText}>
                  <strong>Blood Type:</strong> {product?.bloodType || "N/A"}
                </p>
                <p className={styles.statusAvailable}>
                  <strong>Available</strong>
                </p>

                <div className={styles.buttonGroup}>
                  <a
                    href={`tel:+91${product?.phone}`}
                    className={styles.btnPhone}
                    aria-label={`Call ${product?.firstName}`}
                  >
                    <i className="bi bi-telephone-forward"></i>
                  </a>
                  <button
                    className={styles.btnClear}
                    onClick={() => removeCart(product._id)}
                  >
                    Remove -
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No donors added to cart.</p>
      )}
    </div>
  );
};

export default Added;
