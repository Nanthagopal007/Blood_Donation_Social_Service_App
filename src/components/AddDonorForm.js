import React, { useState } from "react";
import { addDonor } from "../services/Donorapi";
import "../styles/AddDonorForm.css";

const AddDonorForm = () => {
    const [donor, setDonor] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        area: "",
        gender: "",
        bloodType: "",
        status: false,
    });

    const handleChange = (e) => {
        setDonor({ ...donor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newDonor = await addDonor(donor);
            if (newDonor) {
                alert("✅ Thank You For Registered!");
                setDonor({
                    firstName: "",
                    lastName: "",
                    phone: "",
                    area: "",
                    gender: "",
                    bloodType: "",
                    status: false,
                });
            }
        } catch (error) {
            alert("❌ Failed to add donor: " + error.message);
        }
    };

    return (
        <div className="about-container">
            <div className="row">
                <div className="col">
                    <section className="about-section">
                        <h2>How It Works?</h2>
                        <ul>
                            <li><strong>Register:</strong> Sign up and become a donor.</li>
                            <li><strong>Find a Donor:</strong> Search for donors in your area.</li>
                            <li><strong>Contact & Donate:</strong> Connect and arrange a donation.</li>
                        </ul>
                    </section>
                    <section className="about-section call-to-action mt-5">
                        <h2>Be a Hero, Donate Blood</h2>
                        <p>
                            A few minutes of your time could mean a lifetime for someone else.
                            Join our community and make a difference today!
                        </p>
                        <button className="cta-button">Be as a Donor</button>
                    </section>

                </div>
                <div className="col">
                    <form onSubmit={handleSubmit} className="form-container">
                        <h3 className="text-danger">Register as a Donor</h3>
                        <label>First Name</label>
                        <input type="text" name="firstName" value={donor.firstName} placeholder="Enter Your First Name" onChange={handleChange} required />
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={donor.lastName} placeholder="Enter Your Initial Only" onChange={handleChange} required />
                        <label>Phone</label>
                        <input type="text" name="phone" value={donor.phone} placeholder="10-digits only" onChange={handleChange} required />
                        <label>Area</label>
                        <input type="text" name="area" value={donor.area} placeholder="Enter Your Area" onChange={handleChange} required />
                        <select name="gender" value={donor.gender} onChange={handleChange} required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        <select name="bloodType" value={donor.bloodType} onChange={handleChange} required>
                            <option value="">Select Blood Type</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                        </select>
                        <button type="submit">Donate Now</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddDonorForm;
