import { loginUser } from "../../services/Usersapi";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import styles from "../../styles/Login.module.css"; // <-- CSS Module

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser(formData);
      alert("✅ Login Successful!");
      navigate(data.role === "admin" ? "/dashboard" : "/home", { replace: true });
    } catch (err) {
  setError(err.message); // will now correctly show "Password mismatch" or "Email not registered"
  console.error(err);
}
 finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container-fluid pt-5 ${styles.cf}`}>
      <div className={styles.loginContainer}>
        <h2 className={styles.loginTitle}>USER LOGIN</h2>
        {error && <p className={styles.errorMessage}>{error}</p>}
        <form className={styles.loginForm} onSubmit={handleSubmit}>
          <label className={styles.label}>Email</label>
          <input
            className={styles.loginInput}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label className={styles.label}>Password</label>
          <input
            className={styles.loginInput}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <p className={styles.signupText}>
            Do you have an account? <Link to="/register" className={styles.signupLink}>Sign Up</Link>
          </p>

          <button className={styles.loginButton} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
