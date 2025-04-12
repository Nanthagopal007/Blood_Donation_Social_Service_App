import "../styles/UserDetails.css"
import { useCart } from "../context/CartContext";

const UserDetails = () => {
  const { users, handleDelete } = useCart(); // Get donors & cart from context

  return (
    <div className="container">

      {users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="card-container">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.name}</h3>
              <p>Email:</p>
              <p>{user.email}</p>
              <p>Role: {user.role}</p>
              <button className="delete-btn " onClick={() => handleDelete(user._id)}>
              <i className="bi bi-trash me-1 "></i>Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
