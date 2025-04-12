import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/Usersapi";
import "../../styles/Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await registerUser(formData);
      alert("✅ Registration Successful! Please Login.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container-fluid'>
      <div className='row justify-content-center'>
        <div className='col-12 col-sm-8 col-md-6 col-lg-4 mt-5 pt-5'>
          <form className="form" onSubmit={handleSubmit}>
            <p className="heading">Sign up</p>
            <p className='subheading'>Create your own account now...</p>

            {error && <p className="error-message">{error}</p>}

            <label>Username</label>
            <input
              className="input"
              name="name"
              placeholder="Username"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label className='email'>Email</label>
            <input
              className="input"
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label className='password'>Password</label>
            <input
              className="input"
              name="password"
              placeholder="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Select your role</label>
            <select
              className="input select-input"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="user">Donor</option>
              <option value="admin">Admin</option>
            </select>

            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Registering..." : "SIGN UP"}
            </button>

            <p className="link mt-3">
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
