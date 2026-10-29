import React, { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCheckCircle,
  FaLaptop,
  FaMapMarkerAlt,
  FaShieldAlt,
  FaArrowRight,
  FaSpinner,
} from "react-icons/fa";
import "./BookSession.css";

const API_URL =
  import.meta.env.VITE_API_URL || "https://dr-amit-kumar-pushpam-1.onrender.com/api";

const BookSession = () => {
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    sessionDuration: "60",
    sessionMode: "online",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(null);

  const services = [
    {
      value: "astrology",
      label: "Astrological Consultation",
    },
    {
      value: "psychology",
      label: "Psychological Counseling",
    },
    {
      value: "spiritual",
      label: "Spiritual Counselling",
    },
    {
      value: "moral",
      label: "Moral Education & Value Based Guidance",
    },
    {
      value: "testing",
      label: "Psychological Testing and Assessment",
    },
    {
      value: "paranormal",
      label: "Paranormal Consultancy",
    },
  ];

  const durations = [
    {
      value: "30",
      label: "30 Minutes",
    },
    {
      value: "60",
      label: "60 Minutes",
    },
    {
      value: "90",
      label: "90 Minutes",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit your booking request."
        );
      }

      setBooking(data.booking);
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error("Booking submission error:", err);

      setError(
        err.message ||
          "Something went wrong. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setBooking(null);

    setFormData({
      name: "",
      email: "",
      phone: "",
      serviceType: "",
      sessionDuration: "60",
      sessionMode: "online",
      preferredDate: "",
      preferredTime: "",
      notes: "",
    });

    setError("");
  };

  const selectedService = services.find(
    (service) => service.value === formData.serviceType
  );

  return (
    <div className="book-session">

      {/* ================= HERO ================= */}

      <section className="book-session-hero">
        <div className="hero-overlay"></div>

        <div className="container hero-content">
          {/* <span className="hero-label">
            PROSPER FOUNDATION
          </span> */}

          <h1>
            Book Your <span>Session</span>
          </h1>

          <p>
            Take the first step toward clarity, balance
            and meaningful personal growth.
          </p>

          <div className="hero-trust">
            <span>
              <FaShieldAlt />
              Confidential
            </span>

            <span>
              <FaCheckCircle />
              Personalized
            </span>

            <span>
              <FaClock />
              Flexible Scheduling
            </span>
          </div>
        </div>
      </section>

  {/* How It Works */}
<section className="booking-process-section">
  <div className="booking-process-container">

    <div className="booking-process-header">
      <div className="process-heading">
        <span className="process-eyebrow">HOW IT WORKS</span>

        <h2>
          Your journey begins
          <br />
          with a simple request.
        </h2>
      </div>

      <div className="process-intro">
        <p>
          Choose the consultation that feels right for you, select a
          convenient date and time, and send your request. Our team will
          review the details and contact you to confirm your appointment.
        </p>
      </div>
    </div>

    <div className="process-steps">

      {/* Step 1 */}
      <div className="process-step">
        {/* <div className="step-number">
          01
        </div> */}

        <div className="step-icon">
          <span>01</span>
        </div>

        <div className="step-content">
          <h3>Choose a service</h3>
          <p>
            Select the consultation that best matches your needs.
          </p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="process-step">
        {/* <div className="step-number">
          02
        </div> */}

        <div className="step-icon">
          <span>02</span>
        </div>

        <div className="step-content">
          <h3>Pick your schedule</h3>
          <p>
            Choose your preferred date and available time.
          </p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="process-step">
        {/* <div className="step-number">
          03
        </div> */}

        <div className="step-icon">
          <span>03</span>
        </div>

        <div className="step-content">
          <h3>Get confirmation</h3>
          <p>
            Our team will review your request and contact you shortly.
          </p>
        </div>
      </div>

    </div>

    <div className="process-note">
      <span className="note-dot"></span>
      Your appointment is confirmed only after our team contacts you.
    </div>

  </div>
</section>

      {/* ================= FORM ================= */}

      <section className="booking-form-section">
        <div className="container">

          {submitted && booking ? (
            <div className="booking-success">

              <div className="success-icon">
                <FaCheckCircle />
              </div>

              <span className="success-label">
                REQUEST RECEIVED
              </span>

              <h2>
                Thank you, {booking.name}.
              </h2>

              <p>
                Your session request has been successfully
                submitted. Our team will review it and contact
                you to confirm the appointment.
              </p>

              <div className="booking-summary">

                <div>
                  <span>Service</span>
                  <strong>
                    {
                      services.find(
                        (service) =>
                          service.value === booking.serviceType
                      )?.label
                    }
                  </strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>
                    {booking.preferredDate}
                  </strong>
                </div>

                <div>
                  <span>Preferred Time</span>
                  <strong>
                    {booking.preferredTime}
                  </strong>
                </div>

                <div>
                  <span>Mode</span>
                  <strong>
                    {booking.sessionMode === "online"
                      ? "Online Session"
                      : "In-Person Session"}
                  </strong>
                </div>

              </div>

              <div className="success-note">
                <FaClock />
                <span>
                  Your request is currently marked as{" "}
                  <strong>New</strong>.
                  You will receive confirmation after
                  administrative review.
                </span>
              </div>

              <button
                className="new-booking-btn"
                onClick={resetForm}
              >
                Book Another Session
                <FaArrowRight />
              </button>

            </div>
          ) : (
            <div className="booking-layout">

              {/* LEFT SIDE */}

              <div className="booking-sidebar">

                <span className="section-label">
                  SESSION REQUEST
                </span>

                <h2>
                  Tell us how
                  <br />
                  we can help.
                </h2>

                <p>
                  Please provide a few details about the
                  session you would like to schedule.
                </p>

                <div className="sidebar-feature">
                  <FaShieldAlt />

                  <div>
                    <h4>Private & Confidential</h4>
                    <p>
                      Your information is handled with care
                      and confidentiality.
                    </p>
                  </div>
                </div>

                <div className="sidebar-feature">
                  <FaClock />

                  <div>
                    <h4>Flexible Sessions</h4>
                    <p>
                      Choose a duration and schedule that
                      works best for you.
                    </p>
                  </div>
                </div>

                <div className="sidebar-feature">
                  <FaCheckCircle />

                  <div>
                    <h4>Personalized Approach</h4>
                    <p>
                      Each session is tailored to your
                      individual requirements.
                    </p>
                  </div>
                </div>

              </div>

              {/* FORM */}

              <div className="booking-form-card">

                <div className="form-heading">
                  <span>01</span>

                  <div>
                    <h3>Personal Information</h3>
                    <p>Tell us how we can reach you.</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>

                  <div className="form-grid">

                    <div className="form-group">
                      <label htmlFor="name">
                        <FaUser />
                        Full Name *
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

                    <div className="form-group">
                      <label htmlFor="email">
                        <FaEnvelope />
                        Email Address *
                      </label>

                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">
                        <FaPhone />
                        Phone Number *
                      </label>

                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                      />

                      <small>
                        Enter a valid 10-digit mobile number.
                      </small>
                    </div>

                  </div>

                  {/* SERVICE */}

                  <div className="form-heading form-heading-margin">
                    <span>02</span>

                    <div>
                      <h3>Choose Your Session</h3>
                      <p>
                        Select the service and preferred format.
                      </p>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="form-group full-width">
                      <label htmlFor="serviceType">
                        Select Service *
                      </label>

                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">
                          Choose a service...
                        </option>

                        {services.map((service) => (
                          <option
                            key={service.value}
                            value={service.value}
                          >
                            {service.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="sessionDuration">
                        <FaClock />
                        Session Duration *
                      </label>

                      <select
                        id="sessionDuration"
                        name="sessionDuration"
                        value={formData.sessionDuration}
                        onChange={handleChange}
                        required
                      >
                        {durations.map((duration) => (
                          <option
                            key={duration.value}
                            value={duration.value}
                          >
                            {duration.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>
                        Session Mode *
                      </label>

                      <div className="mode-options">

                        <label
                          className={`mode-option ${
                            formData.sessionMode === "online"
                              ? "active"
                              : ""
                          }`}
                        >
                          <input
                            type="radio"
                            name="sessionMode"
                            value="online"
                            checked={
                              formData.sessionMode === "online"
                            }
                            onChange={handleChange}
                          />

                          <FaLaptop />

                          <span>Online</span>
                        </label>

                        {/* <label
                          className={`mode-option ${
                            formData.sessionMode === "in-person"
                              ? "active"
                              : ""
                          }`}
                        > */}
                          {/* <input
                            type="radio"
                            name="sessionMode"
                            value="in-person"
                            checked={
                              formData.sessionMode ===
                              "in-person"
                            }
                            onChange={handleChange}
                          />

                          <FaMapMarkerAlt />

                          <span>In-Person</span>
                        </label> */}

                      </div>
                    </div>

                  </div>

                  {/* DATE TIME */}

                  <div className="form-heading form-heading-margin">
                    <span>03</span>

                    <div>
                      <h3>Preferred Schedule</h3>
                      <p>
                        Choose your preferred appointment slot.
                      </p>
                    </div>
                  </div>

                  <div className="form-grid">

                    <div className="form-group">
                      <label htmlFor="preferredDate">
                        <FaCalendarAlt />
                        Preferred Date *
                      </label>

                      <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={today}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="preferredTime">
                        <FaClock />
                        Preferred Time *
                      </label>

                      <input
                        type="time"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        required
                      />
                    </div>

                  </div>

                  {/* NOTES */}

                  <div className="form-heading form-heading-margin">
                    <span>04</span>

                    <div>
                      <h3>Additional Information</h3>
                      <p>
                        Anything else you would like us to know?
                      </p>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">
                      Additional Notes
                    </label>

                    <textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Share any additional information, concerns or goals..."
                      rows="5"
                    />
                  </div>

                  {error && (
                    <div className="booking-error">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="submit-booking-btn"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <FaSpinner className="spinner" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        Submit Booking Request
                        <FaArrowRight />
                      </>
                    )}
                  </button>

                  <p className="form-note">
                    By submitting this form, you agree to our
                    Terms of Service and Privacy Policy.
                  </p>

                </form>
              </div>

            </div>
          )}

          {/* ================= PRICING ================= */}
{/* 
          {!submitted && (
            <section className="pricing-section">

              <div className="pricing-header">
                <span className="section-label">
                  SESSION OPTIONS
                </span>

                <h2>Simple & Transparent Pricing</h2>

                <p>
                  Final pricing may vary depending on the
                  service and consultant.
                </p>
              </div>

              <div className="pricing-cards">

                <div className="pricing-card">
                  <span className="pricing-duration">
                    30 MINUTES
                  </span>

                  <h3>Quick Consultation</h3>

                  <div className="price">
                    ₹1,000 – ₹1,500
                  </div>

                  <p>
                    Ideal for focused questions and
                    brief consultations.
                  </p>
                </div>

                <div className="pricing-card featured">
                  <div className="popular-badge">
                    MOST POPULAR
                  </div>

                  <span className="pricing-duration">
                    60 MINUTES
                  </span>

                  <h3>Standard Session</h3>

                  <div className="price">
                    ₹2,000 – ₹3,000
                  </div>

                  <p>
                    A balanced session for detailed
                    consultation and guidance.
                  </p>
                </div>

                <div className="pricing-card">
                  <span className="pricing-duration">
                    90 MINUTES
                  </span>

                  <h3>Extended Session</h3>

                  <div className="price">
                    ₹2,500 – ₹4,000
                  </div>

                  <p>
                    Suitable for in-depth consultation
                    and comprehensive discussion.
                  </p>
                </div>

              </div>

              <p className="pricing-note">
                Final pricing will be confirmed by our
                team before your appointment.
              </p>

            </section>
          )} */}

        </div>
      </section>

      {/* ================= FAQ ================= */}

      <section className="booking-faq">

        <div className="container">

          <div className="faq-heading">
            <span className="section-label">
              HAVE QUESTIONS?
            </span>

            <h2>Before your session</h2>
          </div>

          <div className="faq-grid">

            <div className="faq-item">
              <h3>How does booking work?</h3>
              <p>
                Submit your preferred service, date and time.
                Our team will review your request and contact
                you for confirmation.
              </p>
            </div>

            <div className="faq-item">
              <h3>Can I reschedule my session?</h3>
              <p>
                Yes. Please contact us as early as possible
                if you need to change your appointment.
              </p>
            </div>

            <div className="faq-item">
              <h3>Are sessions confidential?</h3>
              <p>
                Yes. We treat information shared during
                enquiries and sessions with appropriate
                confidentiality.
              </p>
            </div>

            <div className="faq-item">
              <h3>Do you offer online sessions?</h3>
              <p>
                Yes. You can select online 
                during the booking process.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
};

export default BookSession;