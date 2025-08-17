import "../styles/ContactDetails.css"; // Import CSS for styling
import { useCart } from "../../../context/CartContext";

const ContactDetails = () => {

    const { contacts, selectedContact, handleSelectContact } = useCart();

    return (
        <div className="contact-container mt-5">
            <h2 className="text-center">☎️ Contact Us</h2>

            <div className="contact-list">
                {contacts.length > 0 ? (
                    contacts.map((contact) => (
                        <div
                            key={contact._id}
                            className={`contact-card ${selectedContact?._id === contact._id ? "selected" : ""}`}
                            onClick={() => handleSelectContact(contact)}
                        >
                            <h5>{contact.name}</h5>
                            <p>{contact.email}</p>
                            <p>{contact.phone}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No contacts available.</p>
                )}
            </div>

            {selectedContact && (
                <div className="contact-info-card">
                    <h4>Selected Contact</h4>
                    <p><strong>Name:</strong> {selectedContact.name}</p>
                    <p><strong>Email:</strong> {selectedContact.email}</p>
                    <p><strong>Phone:</strong> {selectedContact.phone}</p>
                </div>
            )}
        </div>
    );
};

export default ContactDetails;
