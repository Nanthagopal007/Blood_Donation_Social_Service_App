import React, { useState } from "react";
import { addContact } from "../services/Contactapi";
import "../styles/ContactForm.css";

const ContactForm = () => {
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newContact = await addContact(contact);
            if (newContact) {
                alert("✅ Thank You for Submitting! Our Team Will Contact You Soon...");
                setContact({ name: "", email: "", phone: "" }); // Reset form
            }
        } catch (error) {
            alert("❌ Failed to add contact: " + error.message);
        }
    };

    return (

        <div className="mb-5">
            <h2 className="text-center mt-3">Contact Us</h2>
            <p className="text-center text-secondary ">Fill The Form Our Team Will Contact You...</p>
            <form onSubmit={handleSubmit} className="contact-form">
                <label>Full Name</label>
                <input type="text" name="name" value={contact.name} placeholder="Full Name" onChange={handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={contact.email} placeholder="Email" onChange={handleChange} required />
                <label>Phone</label>
                <input type="text" name="phone" value={contact.phone} placeholder="Phone" onChange={handleChange} required />
                <button type="submit">Add Contact</button>
            </form>
        </div>
    );
};

export default ContactForm;
