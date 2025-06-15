import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import "../styles/contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: "error", message: "Please fill out all fields." });
      return;
    }

    try {
      await addDoc(collection(db, "contactMessages"), {
        ...formData,
        timestamp: new Date().toISOString(),
      });
      setStatus({ type: "success", message: "Message sent successfully!" });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({ type: "error", message: "Failed to send message." });
    }
  };

  return (
    <div className="contact-container">
      <h2>Contact MealMaster</h2>
      <p>Have questions or feedback? We'd love to hear from you.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Your email address"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          name="message"
          placeholder="Your message..."
          rows="5"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit">Send Message</button>
      </form>

      {status && (
        <div className={`status-message ${status.type}`}>{status.message}</div>
      )}
    </div>
  );
};

export default ContactUs;
