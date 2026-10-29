import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const response = await fetch("https://dr-amit-kumar-pushpam-1.onrender.com/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      }),
    });

    // Get backend response even when status is 400/500
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || data.error || "Something went wrong. Please try again."
      );
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  } catch (err) {
    console.error("Contact form error:", err);

    setError(
      err.message ||
        "Unable to send your message right now. Please try again later."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <main className="contact-page">

      {/* ================= HERO ================= */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span className="contact-label">CONTACT US</span>

          <h1>We’re Here to Help</h1>

          <p>
            Have a question or want to know more about our services?
            Feel free to get in touch with us.
          </p>
        </div>
      </section>

      {/* ================= CONTACT INFORMATION ================= */}
      <section className="contact-details">
        <div className="contact-container">

          <div className="contact-details-header">
            <h2>Get in Touch</h2>
            <p>
              Reach out to us through any of the following options.
            </p>
          </div>

          <div className="contact-info-grid">

            {/* Phone */}
            <div className="contact-info-card">
              <div className="contact-icon">
                <FaPhone />
              </div>

              <div>
                <h3>Call Us</h3>

                <a href="tel:+919XXXXXXXXX">
                  +91 8809113638
                </a>

                <p>Monday – Friday, 10 AM – 6 PM</p>
              </div>
            </div>

            {/* Email */}
            <div className="contact-info-card">
              <div className="contact-icon">
                <FaEnvelope />
              </div>

              <div>
                <h3>Email Us</h3>

                <a href="mailto:info@prosperfoundation.org">
                 pushpamamit@gmail.com
                </a>

                <p>We usually respond within 24 hours.</p>
              </div>
            </div>

            {/* Location */}
            <div className="contact-info-card">
              <div className="contact-icon">
                <FaMapMarkerAlt />
              </div>

              <div>
                <h3>Our Location</h3>

                <p className="location-text">
                  Vaishali, Bihar, India
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CONTACT FORM ================= */}
      <section className="contact-form-section">
        <div className="contact-container">

          <div className="contact-form-layout">

            {/* Left Content */}
            <div className="contact-form-intro">
              <span className="small-heading">
                SEND US A MESSAGE
              </span>

              <h2>
                Let’s Start a Conversation
              </h2>

              <p>
                Whether you have a question about our services,
                want to schedule a consultation, or simply want
                to learn more, we're happy to hear from you.
              </p>

              <div className="working-hours">
                <FaClock />

                <div>
                  <strong>Working Hours</strong>
                  <p>
                    Monday – Friday: 10:00 AM – 6:00 PM
                  </p>
                  <p>
                    Saturday: 11:00 AM – 3:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrapper">

              {submitted ? (
                <div className="success-message">

                  <FaCheckCircle />

                  <h3>Message Sent Successfully</h3>

                  <p>
                    Thank you for reaching out to us.
                    Our team will get back to you soon.
                  </p>

                </div>
              ) : (
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                >

                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name <span>*</span>
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address <span>*</span>
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Phone - OPTIONAL */}
                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Subject */}
                  <div className="form-group">
                    <label htmlFor="subject">
                      Subject <span>*</span>
                    </label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What would you like to know?"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="message">
                      Message <span>*</span>
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows="5"
                      required
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="form-error">
                      {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>

                  <p className="form-note">
                    Your information will be kept confidential
                    and used only to respond to your inquiry.
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="contact-faq">
        <div className="contact-container">

          <div className="contact-details-header">
            <h2>Frequently Asked Questions</h2>
            <p>
              A few things you may want to know before contacting us.
            </p>
          </div>

          <div className="faq-grid">

            <div className="faq-card">
              <h3>How quickly will I receive a response?</h3>
              <p>
                We generally respond to inquiries within 24 hours
                during our working hours.
              </p>
            </div>

            <div className="faq-card">
              <h3>Can I schedule a consultation online?</h3>
              <p>
                Yes. You can contact us through this form or use
                our booking option to schedule a consultation.
              </p>
            </div>

            <div className="faq-card">
              <h3>Is my information confidential?</h3>
              <p>
                Yes. Information shared with us is treated with
                appropriate confidentiality and care.
              </p>
            </div>

            <div className="faq-card">
              <h3>Do I need to provide my phone number?</h3>
              <p>
                Yes. Your phone number is important for us to contact you.
                .
              </p>
            </div>
             <div className="faq-card"> 
              <h3>How can I contact you?</h3> 
               <p> You can reach us via phone, email, or by filling out the 
                  contact form above. We typically respond within 24 hours.
                </p> 
              </div> 
              <div className="faq-card">
                 <h3>What are your response times?</h3>
                  <p> We aim to respond to all inquiries within 24 hours
                     during business hours. For urgent matters, please call
                     us directly. 
                  </p> 

            </div>

          </div>

        </div>
      </section>

    </main>
  );
};

export default Contact;