import { useCart } from '../../../context/CartContext';
import img from "../../../assets/bloodhand.jpeg";
import "../../../styles/Added.css";

const Added = () => {
  const { cart, removeCart } = useCart();

  return (
    <div className="added-container">
      <h3 className="text-center mb-4 text-danger ">Saved Donors...</h3>

      {Array.isArray(cart) && cart.length > 0 ? (
        <div className="added-cards-wrapper">
          {cart.map((product) => (
            <div key={product?._id || Math.random()} className="donor-card">
              <img
                src={product?.image || img}
                className="card-img-top donor-img"
                alt={product?.firstName || "Unknown"}
              />
              <div className="card-body">
                <h5 className="card-title text-danger fw-bold">
                  {product?.firstName} {product?.lastName}
                </h5>
                <p className="card-text"><strong>Area:</strong> {product?.area || "N/A"}</p>
                <p className="card-text"><strong>Phone:</strong> {product?.phone || "N/A"}</p>
                <p className="card-text"><strong>Blood Type:</strong> {product?.bloodType || "N/A"}</p>
                <p className="card-text text-success"><strong>Available</strong></p>

                <div className="d-flex justify-content-center mt-3">
                  <a href={`tel:+91${product?.phone}`} className="btnphone">
                  <i className="bi bi-telephone-forward me-2"></i>

                  </a>
                  <button className="btnclear" onClick={() => removeCart(product._id)}>
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
