import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/Usersapi";
import "../../styles/Login.css";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Adjust this based on your API response structure
            const response = await loginUser(formData);
            const { token, role, email } = response?.data || response;

            if (!token) throw new Error("Invalid credentials or missing token");

            // Store in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            localStorage.setItem("email", email);

            alert("✅ Login Successful!");

            // Navigate based on role
            navigate(role === "admin" ? "/dashboard" : "/home");
        } catch (error) {
            console.error("Login Error:", error); // For debugging
            setError(error.response?.data?.message || "Login failed! Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center min-vh-100">
            <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                <form className="form" onSubmit={handleSubmit}>
                    <p className="heading">Sign in</p>
                    <p>Login to your account</p>

                    {error && <p className="error-message">{error}</p>}

                    <label className="label">Email</label>
                    <input
                        className="input"
                        name="email"
                        placeholder="Email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        autoComplete="username"
                    />

                    <div className="password-container">
                        <label className="label">Password</label>
                        <input
                            className="input"
                            name="password"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                        <span className="toggle-password pt-4" onClick={togglePasswordVisibility}>
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>

                    <button type="submit" className="btn" disabled={loading}>
                        {loading ? "Logging in..." : "SIGN IN"}
                    </button>

                    <p className="register-link">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
