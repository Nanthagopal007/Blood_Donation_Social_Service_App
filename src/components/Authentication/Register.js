import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/Usersapi";
import styles from "../../styles/Register.module.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";

    if (name === "name") {
      if (value.trim().length < 4) {
        errorMsg = "Name must be at least 4 characters long";
      } else if (!/^[A-Z]/.test(value)) {
        errorMsg = "First letter must be capital";
      }
    }

    if (name === "email") {
      if (value.length < 6) {
        errorMsg = "Email must be at least 6 characters";
      } else if (!value.endsWith("@gmail.com")) {
        errorMsg = "Email must end with @gmail.com";
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        errorMsg = "Password must be at least 6 characters";
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name" && value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    if (name === "email") {
      value = value.toLowerCase();
    }

    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    Object.keys(formData).forEach((field) =>
      validateField(field, formData[field])
    );

    if (Object.values(errors).some((err) => err)) return;

    setLoading(true);
    try {
      await registerUser(formData);
      alert("✅ Registration Successful! Please Login.");
      navigate("/login");
    } catch (error) {
      setErrors({ api: error.response?.data?.message || "Registration failed! Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container-fluid ${styles.cf}`}>
  <form className={styles.form} onSubmit={handleSubmit}>
    <p className={styles.heading}>Sign up</p>
    <p className={styles.subheading}>Create your own account now...</p>

    {errors.api && <p className={styles.errorMessage}>{errors.api}</p>}

    <label>Username</label>
    <input
      className={styles.input}
      name="name"
      placeholder="Username"
      type="text"
      value={formData.name}
      onChange={handleChange}
    />
    {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}

    <label>Email</label>
    <input
      className={styles.input}
      name="email"
      placeholder="Email"
      type="email"
      value={formData.email}
      onChange={handleChange}
    />
    {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}

    <label>Password</label>
    <input
      className={styles.input}
      name="password"
      placeholder="Password"
      type="password"
      value={formData.password}
      onChange={handleChange}
    />
    {errors.password && <p className={styles.errorMessage}>{errors.password}</p>}

    <label>Select your role</label>
    <select
      className={`${styles.input} ${styles.selectInput}`}
      name="role"
      value={formData.role}
      onChange={handleChange}
    >
      <option value="user">Donor</option>
    </select>

    <button type="submit" className={styles.btn} disabled={loading}>
      {loading ? "Registering..." : "SIGN UP"}
    </button>

    <p className={styles.link}>
      Already have an account? <Link to="/login" className={styles.signinLink}>Sign In</Link>
    </p>
  </form>
</div>

  );
};

export default Register;
