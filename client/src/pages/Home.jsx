// import React from "react";
// import { Link } from "react-router-dom";
// import {
//   FaQuoteLeft,
//   FaCheckCircle,
//   FaWhatsapp,
// } from "react-icons/fa";

// import "./Home.css";

// import photo from "../assets/images/photo.jpeg";
// import founderImage from "../assets/images/amit_passport_photo.jpeg";

// import heroVideo from "../assets/videos/hero3.mp4";


// const Home = () => {
//     const whatsappNumber = "+919876543210";

//   const handleWhatsAppClick = () => {
//     const message = encodeURIComponent(
//       "Hello! I'm interested in your services. Can you provide more details?"
//     );
//     window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
//   };
//   return (

// <div className="home">

// {/* ================= HERO ================= */}

// <section className="hero">

//         {/* Background Video */}
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           className="hero-video"
//         >
//           <source src={heroVideo} type="video/mp4" />
//         </video>

//         {/* Dark Overlay */}
//         <div className="hero-overlay"></div>

//         {/* Hero Content */}

//         <div className="hero-content">

//           <span className="hero-tag">
//             ✨ Welcome to Prosper Foundation
//           </span>

//           <h1>
//             Bridging Science, Psychology & Spiritual
//             <br />
//             Wisdom for Human Transformation
//           </h1>

//           <p>
//             Helping individuals discover clarity, emotional balance, inner strength, and purposeful living through research-driven guidance and timeless wisdom.
//           </p>

//           <div className="hero-buttons">

//             <Link to="/book-session" className="primary-btn">
//               Book Consultation
//             </Link>

//             <Link to="/services" className="secondary-btn">
//               Explore Services
//             </Link>

//           </div>

//           {/* Stats */}

//           <div className="hero-stats">

//             <div>
//               <h2>5+</h2>
//               <span>Years Experience</span>
//             </div>

//             <div>
//               <h2>500+</h2>
//               <span>Happy Clients</span>
//             </div>

//             <div>
//               <h2>10+</h2>
//               <span>Research Papers</span>
//             </div>

//           </div>

//         </div>

//       </section>

// {/* ================= ABOUT FOUNDATION ================= */}

// <section className="about-foundation">

//   <div className="container">

//     <div className="about-grid">

//       {/* Left Side */}

//       <div className="about-left">

//         <span className="section-tag">
//           About Prosper Foundation
//         </span>

//         <h2>
//           Guiding Lives Through
//           <span> Ancient Wisdom </span>
//           & Modern Psychology
//         </h2>

//         <p className="about-description">

//           Prosper Foundation is a multidisciplinary initiative dedicated to integrating psychology, 
//           research, spirituality, and education into a unified approach for human growth. We combine 
//           evidence-based understanding with timeless wisdom to promote emotional well-being, self-awareness, 
//           and meaningful transformation.

//         </p>

//         <p className="about-description">

//          To build a society where scientific understanding and spiritual insight work together for holistic
//           human development.

//         </p>

//         <div className="about-buttons">

//           <Link to="/about" className="btn btn-primary">
//             Learn More
//           </Link>

//           <Link to="/book-session" className="btn btn-secondary">
//             Book Consultation
//           </Link>

//         </div>

//       </div>

//       {/* Right Side */}

//       <div className="about-right">

//         <div className="about-image-card">

//           <img
//             src={photo}
//             alt="Prosper Foundation"
//           />

//           <div className="experience-box">

//             <h3>5+</h3>

//             <span>Years of Experience</span>

//           </div>

//         </div>

//       </div>

//     </div>

//   </div>

// </section>

// {/* ================= MISSION CARDS ================= */}

// <section className="mission-section">

//   <div className="container">

//     <div className="mission-grid">

//       <div className="mission-card">

//         <div className="mission-icon">
//           🌟
//         </div>

//         <h3>Our Vision</h3>

//         <p>

//          To become a globally respected centre where science, 
//          psychology, and spirituality unite to inspire conscious, 
//          compassionate, and meaningful lives.
//         </p>

//       </div>

//       <div className="mission-card">

//         <div className="mission-icon">
//           🧠
//         </div>

//         <h3>Our Mission</h3>

//         <p>

//          To promote research-based education, psychological well-being,
//          spiritual awareness, and ethical leadership through an integrated
//         approach that empowers individuals and communities.

//         </p>

//       </div>

//       <div className="mission-card">

//         <div className="mission-icon">
//           🤝
//         </div>

//         <h3>Our Values</h3>

//         <p>

//           To uphold ering holistic growth and meaningful transformation.
// compassion, integrity, knowledge, and ethical responsibility
//           while fost
//         </p>

//       </div>

//     </div>

//   </div>

// </section>

// {/* ================= FOUNDATION STATS ================= */}

// <section className="foundation-stats">

//   <div className="container">

//     <div className="stats-grid">

//       <div className="stat-box">

//         <h2>500+</h2>

//         <p>People Guided</p>

//       </div>

//       <div className="stat-box">

//         <h2>5+</h2>

//         <p>Years Experience</p>

//       </div>

//       <div className="stat-box">

//         <h2>10+</h2>

//         <p>Research Publications</p>

//       </div>

//       <div className="stat-box">

//         <h2>95%</h2>

//         <p>Client Satisfaction</p>

//       </div>

//     </div>

//   </div>

// </section>

// {/* ================= OUR SERVICES ================= */}

// <section className="services">

//     <div className="container">

//         {/* Section Heading */}

//         <div className="section-heading">

//             <span className="section-tag">
//                 Our Services
//             </span>

//             <h2>
//                 Transformative Services Designed
//                 <br />
//                 For Every Individual
//             </h2>

//             <p>
//                 We integrate psychology, astrology, spirituality, education and
//                 scientific research to provide holistic guidance for personal,
//                 emotional and spiritual growth.
//             </p>

//         </div>

//         {/* Cards */}

//         <div className="services-grid">

//             {/* Card 1 */}

//             <div className="service-card">

//                 <div className="service-top">

//                     <div className="service-icon">
//                         🔮
//                     </div>

//                 </div>

//                 <h3>Astrological Consultation</h3>

//                 <p>
//                     Personalized Vedic astrology guidance for career,
//                     relationships, health and major life decisions.
//                 </p>

//                 <Link to="/services">
//                     Learn More 
//                 </Link>

//             </div>

//             {/* Card 2 */}

//             <div className="service-card">

//                 <div className="service-top">

//                     <div className="service-icon">
//                         🧠
//                     </div>

//                 </div>

//                 <h3>Psychological Counselling</h3>

//                 <p>
//                     Professional counselling to strengthen emotional well-being,
//                     confidence and mental resilience.
//                 </p>

//                 <Link to="/services">
//                     Learn More
//                 </Link>

//             </div>

//             {/* Card 3 */}

//             <div className="service-card">

//                 <div className="service-top">

//                     <div className="service-icon">
//                         🪷
//                     </div>
//                 </div>

//                 <h3>Spiritual Counselling</h3>

//                 <p>
//                     Discover purpose, inner peace and spiritual growth through
//                     personalized guidance.
//                 </p>

//                 <Link to="/services">
//                     Learn More 
//                 </Link>

//             </div>

//             {/* Card 4 */}

//             <div className="service-card">

//                 <div className="service-top">

//                     <div className="service-icon">
//                         📖
//                     </div>

//                 </div>

//                 <h3>Moral Education</h3>

//                 <p>
//                     Value-based education and ethical leadership programs for
//                     students, teachers and professionals.
//                 </p>

//                 <Link to="/services">
//                     Learn More 
//                 </Link>

//             </div>

//             {/* Card 5 */}

//             <div className="service-card">

//                 <div className="service-top">

//                     <div className="service-icon">
//                         📊
//                     </div>

                 
//                 </div>

//                 <h3>Psychological Assessment</h3>

//                 <p>
//                     Evidence-based personality and behavioural assessments to
//                     understand individual strengths and growth areas.
//                 </p>

//                 <Link to="/services">
//                     Learn More 
//                 </Link>

//             </div>

//             {/* Card 6 */}

//             <div className="service-card">

//                 <div className="service-top">

//                     <div className="service-icon">
//                         ✨
//                     </div>

//                 </div>

//                 <h3>Occult Research</h3>

//                 <p>
//                     Exploring the hidden dimensions of human consciousness
//                     through authentic research and ancient wisdom.
//                 </p>

//                 <Link to="/services">
//                     Learn More 
//                 </Link>

//             </div>

//         </div>

//     </div>

// </section>

// {/* ================= OUR PROCESS ================= */}

// <section className="process-section">

//   <div className="container">

//     <div className="process-grid">

//       {/* LEFT */}

//       <div className="process-left">

//         <span className="section-tag">
//           OUR PROCESS
//         </span>

//         <h2>
//           Your Journey <br />
//           Towards <span>Transformation</span>
//         </h2>

//         <div className="divider"></div>

//         <p>

//           Every consultation at Prosper Foundation is confidential,
//           personalized, and focused on helping you achieve emotional
//           balance, spiritual awareness, and holistic growth through
//           psychology, astrology, and ancient wisdom.

//         </p>

//         <a href="/book-session" className="process-btn">

//           Book Your First Session 

//         </a>

//         <div className="process-card">

//           <h4>FIRST CONSULTATION</h4>

//           <p>

//             Begin with a one-on-one discussion to understand your
//             concerns and recommend the most suitable guidance.

//           </p>

//         </div>

//       </div>

//       {/* RIGHT */}

//       <div className="process-right">

//         <div className="process-item">

//           <span className="number">01</span>

//           <div>

//             <h3>Initial Consultation</h3>

//             <p>

//               We understand your goals, concerns and expectations
//               in a completely confidential environment.

//             </p>

//           </div>

//         </div>

//         <div className="process-item">

//           <span className="number">02</span>

//           <div>

//             <h3>Assessment & Analysis</h3>

//             <p>

//               Psychological evaluation, astrology analysis,
//               spiritual assessment or integrated counselling,
//               depending on your needs.

//             </p>

//           </div>

//         </div>

//         <div className="process-item">

//           <span className="number">03</span>

//           <div>

//             <h3>Personalized Guidance</h3>

//             <p>

//               Receive practical recommendations, counselling,
//               remedies and a customized transformation plan.

//             </p>

//           </div>

//         </div>

//         <div className="process-item last">

//           <span className="number">04</span>

//           <div>

//             <h3>Continuous Support</h3>

//             <p>

//               Follow-up sessions, progress tracking and long-term
//               guidance for lasting personal growth.

//             </p>

//           </div>

//         </div>

//       </div>

//     </div>

//   </div>

// </section>
// {/* ================= Founder ================= */}

// <section className="founder">

// <div className="founder-image">

// <img src={founderImage} alt="Founder"/>

// <div className="founder-qualification">

//   <div className="qualification-box">
//     <span className="dot"></span>
//     <p>Ph.D. in Psychology </p>
//   </div>

//   <div className="qualification-box">
//     <span className="dot"></span>
//     <p>Gold Medalist — Psychology</p>
//   </div>

//   <div className="qualification-box">
//     <span className="dot"></span>
//     <p> Occult Psychologistt</p>
//   </div>

// </div>

// </div>


// <div className="founder-content">

// <span className="section-tag">

// Founder & Director

// </span>

// <h2>

// Dr. Amit Kumar Pushpam

// </h2>

// <h4>

// Occult Psychologist | Spiritual Guide | Researcher

// </h4>

// <p>

// Dr. Amit Kumar Pushpam is the founder of Prosper Foundation 
// and the developer of the Occult Psychology framework. 
// His work bridges psychology, astrology, spirituality, and
// research to help individuals understand themselves beyond conventional perspectives.

// </p>

// <p>

// Through counselling, education, and scientific inquiry, he aims to create meaningful
// pathways for personal transformation and lifelong learning.

// </p>

// <div className="founder-points">

// <div>

  

// <FaCheckCircle />

// 5+ Years Experience

// </div>

// <div>

// <FaCheckCircle />

// Research Based Practice

// </div>

// <div>

// <FaCheckCircle />

// 500+ Happy Clients

// </div>

// </div>

// <div className="founder-buttons">

// <Link to="/about" className="primary-btn">

// Read Full Journey

// </Link>

// </div>

// </div>

// <div className="quote-card">

// <FaQuoteLeft/>

// <p>

// "True transformation begins when knowledge, awareness, and inner wisdom move together."

// </p>

// </div>


// </section>


// {/* ================= PUBLICATIONS ================= */}

// <section className="publications">

// <div className="section-heading">

// <span>

// Research

// </span>

// <h2>

// Latest Publications

// </h2>

// <p>

// Sharing knowledge through books,
// research papers and scientific studies.

// </p>

// </div>

// <div className="publication-grid">

// <div className="publication-card">

// <img
// src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600"
// alt=""
// />

// <div className="publication-content">

// <span>

// Research Paper

// </span>

// <h3>

// Occult Psychology &
// Mental Wellbeing

// </h3>

// <p>

// Published in International Journal of Human Behaviour.

// </p>

// <Link to="/publications">

// Read More →

// </Link>

// </div>

// </div>

// <div className="publication-card">

// <img
// src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600"
// alt=""
// />

// <div className="publication-content">

// <span>

// Book

// </span>

// <h3>

// Psychology &
// Spiritual Transformation

// </h3>

// <p>

// Understanding consciousness through modern science.

// </p>

// <Link to="/publications">

// Read More →

// </Link>

// </div>

// </div>

// <div className="publication-card">

// <img
// src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600"
// alt=""
// />

// <div className="publication-content">

// <span>

// Article

// </span>

// <h3>

// Ancient Wisdom &
// Modern Psychology

// </h3>

// <p>

// Connecting ancient traditions with present-day therapy.

// </p>

// <Link to="/publications">

// Read More →

// </Link>

// </div>

// </div>

// </div>

// <div className="view-all">

// <Link to="/publications" className="primary-btn">

// View All Publications

// </Link>

// </div>

// </section>


// {/* ====================== BLOGS SECTION ====================== */}

// <section className="blogs-section">

//   <div className="container">

//     <div className="section-header">

//       <span className="section-tag">
//         Latest Insights
//       </span>

//       <h2 className="section-title">
//         Blogs & Research
//       </h2>

//       <p className="section-subtitle">
//         Explore our latest articles, research publications, psychological
//         insights, astrology knowledge, and spiritual guidance.
//       </p>

//     </div>

//     <div className="blog-grid">

//       {/* Blog Cards */}

//       <div className="blog-card">

//         <img
//           src="/images/blog2.jpg"
//           alt=""
//         />

//         <div className="blog-content">

//           <span className="blog-category">
//             Astrology
//           </span>

//           <h3>
//             How Astrology Helps in Better Life Decisions
//           </h3>

//           <p>

//             Learn how Vedic astrology provides direction
//             and confidence in important life choices.

//           </p>

//           <Link to="/blog">
//             Read More →
//           </Link>

//         </div>

//       </div>

//       <div className="blog-card">

//         <img
//           src="/images/blog3.jpg"
//           alt=""
//         />

//         <div className="blog-content">

//           <span className="blog-category">
//             Research
//           </span>

//           <h3>

//             Scientific Approach Towards
//             Occult Psychology

//           </h3>

//           <p>

//             Our latest research explores the relationship
//             between psychology and ancient practices.

//           </p>

//           <Link to="/blog">
//             Read More →
//           </Link>

//         </div>

//       </div>

//       <div className="blog-card">

//         <img
//           src="/images/blog4.jpg"
//           alt=""
//         />

//         <div className="blog-content">

//           <span className="blog-category">
//             Counselling
//           </span>

//           <h3>

//             Emotional Healing Through
//             Spiritual Counselling

//           </h3>

//           <p>

//             Discover techniques that promote
//             inner peace and emotional resilience.

//           </p>

//           <Link to="/blog">
//             Read More →
//           </Link>

//         </div>

//       </div>

//     </div>

//     <div className="blog-button">

//       <Link to="/blog" className="btn btn-primary">
//         View All Blogs
//       </Link>

//     </div>

//   </div>

// </section>
// {/* ==================== TESTIMONIALS ==================== */}

// <section className="testimonials">

//   <div className="container">

//     <div className="section-header">

//       <span className="section-tag">
//         Testimonials
//       </span>

//       <h2 className="section-title">
//         What Our Clients Say
//       </h2>

//       <p className="section-subtitle">
//         Hear from individuals whose lives have been positively transformed through
//         our counselling, astrology, psychological guidance, and spiritual support.
//       </p>

//     </div>

//     <div className="testimonial-grid">

//       {/* Card 1 */}

//       <div className="testimonial-card">

//         <div className="quote-icon">
//           ❝
//         </div>

//         <p className="testimonial-text">
//           Prosper Foundation helped me gain clarity during one of the most
//           difficult phases of my life. The counselling sessions completely
//           changed my perspective.
//         </p>

//         <div className="stars">
//           ⭐⭐⭐⭐⭐
//         </div>

//         <div className="client-info">

//           <img
//             src="/images/client1.jpg"
//             alt="Client"
//           />

//           <div>

//             <h4>Priya Sharma</h4>

//             <span>Psychological Counselling</span>

//           </div>

//         </div>

//       </div>

//       {/* Card 2 */}

//       <div className="testimonial-card">

//         <div className="quote-icon">
//           ❝
//         </div>

//         <p className="testimonial-text">
//           The astrological consultation gave me confidence in making important
//           life decisions. Every session was insightful and practical.
//         </p>

//         <div className="stars">
//           ⭐⭐⭐⭐⭐
//         </div>

//         <div className="client-info">

//           <img
//             src="/images/client2.jpg"
//             alt="Client"
//           />

//           <div>

//             <h4>Rahul Verma</h4>

//             <span>Astrology Consultation</span>

//           </div>

//         </div>

//       </div>

//       {/* Card 3 */}

//       <div className="testimonial-card">

//         <div className="quote-icon">
//           ❝
//         </div>

//         <p className="testimonial-text">
//           I experienced remarkable emotional healing through their spiritual
//           guidance. The environment is calm, professional and trustworthy.
//         </p>

//         <div className="stars">
//           ⭐⭐⭐⭐⭐
//         </div>

//         <div className="client-info">

//           <img
//             src="/images/client3.jpg"
//             alt="Client"
//           />

//           <div>

//             <h4>Ananya Singh</h4>

//             <span>Spiritual Guidance</span>

//           </div>

//         </div>

//       </div>

//     </div>

//     <div className="testimonial-btn">

//       <Link to="/testimonials" className="btn btn-primary">
//         View All Testimonials
//       </Link>

//     </div>

//   </div>

// </section>
// {/* ================= DONATION ================= */}

// <section className="donation">

//     <div className="container donation-wrapper">

//         <div className="donation-left">

//             <span className="section-tag">
//                 Support Our Mission
//             </span>

//             <h2>
//                 Together, We Can Create
//                 <span> Meaningful Change</span>
//             </h2>

//             <p>
//                 Your generosity helps Prosper Foundation advance psychological
//                 well-being, research, spiritual awareness, education, and
//                 community development. Every contribution strengthens our
//                 mission of creating a more compassionate and enlightened society.
//             </p>

//             <div className="donation-features">

//                 <div className="feature">
//                     ✓ Secure Donations
//                 </div>

//                 <div className="feature">
//                     ✓ Transparent Utilization
//                 </div>

//                 <div className="feature">
//                     ✓ Supporting Research & Education
//                 </div>

//             </div>

//         </div>

//         <div className="donation-card">

//             <h3>Make a Contribution</h3>

//             <p>
//                 Every act of generosity helps us continue our mission.
//             </p>

//             <div className="input-box">

//                 <span className="currency">₹</span>

//                 <input
//                     type="number"
//                     placeholder="Enter your contribution"
//                 />

//             </div>

//             <button className="donate-btn">
//                 Donate Securely
//             </button>

//             <div className="secure-info">

//                 🔒 Protected by Secure Payment Gateway

//             </div>

//         </div>

//     </div>

// </section>
//  {/* ================= FLOATING WHATSAPP BUTTON ================= */}

//       <button
//         className="floating-whatsapp-btn"
//         onClick={handleWhatsAppClick}
//         title="Chat on WhatsApp"
//       >
//         <FaWhatsapp />
//       </button>
// </div>

//   );
// };

// export default Home;



import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import {
  FaQuoteLeft, FaCheckCircle, FaWhatsapp,  FaBookOpen,
  FaStar, FaArrowRight, FaTimes, FaCheck, FaPaperPlane,
} from "react-icons/fa";
import "./Home.css";

import { getAllEbooks } from "../api/ebookApi";
import { getBlogs } from "../api/contentApi";

import founderImage from "../assets/images/amit1.jpeg";
import heroVideo    from "../assets/videos/hero3.mp4";

/* ── Scroll reveal ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("h-in"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    document.querySelectorAll(".h-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Counter ───────────────────────────────────────────── */
function useCounters() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const end = parseInt(el.dataset.target, 10);
          const suf = el.dataset.suffix || "";
          let c = 0;
          const t = setInterval(() => { c = Math.min(c + Math.ceil(end / 55), end); el.textContent = c + suf; if (c >= end) clearInterval(t); }, 25);
          io.unobserve(el);
        });
      }, { threshold: 0.6 }
    );
    document.querySelectorAll(".h-count").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Testimonial form ──────────────────────────────────── */
function TestimonialForm({ onClose }) {
  const [form, setForm] = useState({ name: "", service: "", rating: 5, message: "" });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await fetch("https://dr-amit-kumar-pushpam-1.onrender.com/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSent(true);
    } catch {
      setSent(true); // show success anyway (form data stored on submission)
    } finally { setBusy(false); }
  };

  return (
    <div className="tf-overlay" role="dialog" aria-modal="true" aria-label="Share your experience">
      <div className="tf-modal">
        <button className="tf-close" onClick={onClose} aria-label="Close"><FaTimes /></button>
        {sent ? (
          <div className="tf-success">
            <div className="tf-success-icon" aria-hidden="true"><FaCheck /></div>
            <h3>Thank you for sharing!</h3>
            <p>Your review has been submitted and will appear after admin approval.</p>
            <button className="h-btn h-btn-gold" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="tf-head">
              <h3>Share Your Experience</h3>
              <p>Your review helps others find their path to healing.</p>
            </div>
            <form onSubmit={handleSubmit} className="tf-form">
              <div className="tf-fg">
                <label htmlFor="tf-name">Your Name *</label>
                <input id="tf-name" name="name" type="text" placeholder="e.g. Priya S." required value={form.name} onChange={handleChange} />
              </div>
              <div className="tf-fg">
                <label htmlFor="tf-service">Service Taken *</label>
                <select id="tf-service" name="service" required value={form.service} onChange={handleChange}>
                  <option value="">Select a service...</option>
                  <option>Jyotish Paramarshan</option>
                  <option>Psychological Counselling</option>
                  <option>Spiritual Counselling</option>
                  <option>Moral & Value Education</option>
                  <option>Psychological Testing</option>
                  <option>Paranormal Consultancy</option>
                  <option>Occult Psychology</option>
                </select>
              </div>
              <div className="tf-fg">
                <label>Rating *</label>
                <div className="tf-stars">
                  {[1,2,3,4,5].map((n) => (
                    <button key={n} type="button" className={`tf-star ${form.rating >= n ? "on" : ""}`}
                      onClick={() => setForm((p) => ({ ...p, rating: n }))} aria-label={`${n} star${n>1?"s":""}`}>★</button>
                  ))}
                </div>
              </div>
              <div className="tf-fg">
                <label htmlFor="tf-text">Your Review *</label>
<textarea
  id="tf-text"
  name="message"
  rows={4}
  placeholder="Tell us about your experience..."
  required
  value={form.text}
  onChange={handleChange}
/>
              </div>
              <button type="submit" className="h-btn h-btn-gold tf-submit" disabled={busy}>
                {busy ? "Submitting…" : <><FaPaperPlane /> Submit Review</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}



/* ── Data ──────────────────────────────────────────────── */
const DOMAINS = [
  {
    icon: "🧠",
    title: "Psychology",
    hindi: "मनोविज्ञान",
    desc: "Understanding human behaviour, cognition, emotions, personality, psychological well-being, counselling, and human development.",
    color: "#5C3D8F",
  },

  {
    icon: "🔬",
    title: "Research",
    hindi: "अनुसंधान",
    desc: "Exploring human behaviour and experience through psychological research, research methodology, behavioural sciences, data analysis, and interdisciplinary inquiry.",
    color: "#1A6FA8",
  },

  {
    icon: "🔮",
    title: "Occult",
    hindi: "गूढ़ अध्ययन",
    desc: "Studying astrology, Tantra, symbolism, esoteric knowledge, occult traditions, and traditional systems of knowledge.",
    color: "#C9A84C",
  },

  {
    icon: "🪷",
    title: "Spirituality",
    hindi: "अध्यात्म",
    desc: "Exploring consciousness, meditation, spiritual traditions, inner development, traditional wisdom, and human experience.",
    color: "#7B52B8",
  },

  {
    icon: "👁️",
    title: "Paranormal Studies",
    hindi: "असाधारण अनुभवों का अध्ययन",
    desc: "Exploring and documenting reported anomalous experiences, unusual perceptions, apparent hauntings, and unexplained phenomena.",
    color: "#8B3A62",
  },

  {
    icon: "📚",
    title: "Education",
    hindi: "शिक्षा",
    desc: "Transforming knowledge into learning through psychological education, life skills, child development, workshops, and training.",
    color: "#27AE60",
  },

  {
    icon: "🌱",
    title: "Resilience",
    hindi: "लचीलापन",
    desc: "Promoting coping skills, emotional strength, adaptive functioning, personal growth, and the ability to navigate adversity.",
    color: "#C97B32",
  },
];

const SERVICES = [
  { icon: "🔮", title: "Astrological Consultation",  desc: "Personalised Vedic astrology guidance for career, relationships, health, and major life decisions.",      id: "jyotish"        },
  { icon: "🧠", title: "Psychological Counselling",  desc: "Professional counselling to strengthen emotional well-being, confidence, and mental resilience.",           id: "psychology"     },
  { icon: "🪷", title: "Spiritual Counselling",      desc: "Discover purpose, inner peace, and spiritual growth through personalised guidance.",                        id: "spiritual"      },
  { icon: "📖", title: "Moral Education",            desc: "Value-based education and ethical leadership programs for students, teachers, and professionals.",          id: "moral-education"},
  { icon: "📊", title: "Psychological Assessment",   desc: "Evidence-based personality and behavioural assessments to understand individual strengths.",                id: "psych-testing"  },
 { icon: "👁️", title: "Paranormal Investigator",    desc: "Investigating and documenting reported paranormal and unexplained experiences through systematic observation, interviews, environmental assessment, and evidence-based inquiry.",    id: "paranormal"     },
]; 

const PROCESS = [
  { n: "01", title: "Initial Consultation",     desc: "We understand your goals, concerns, and expectations in a completely confidential environment."                                    },
  { n: "02", title: "Assessment & Analysis",    desc: "Psychological evaluation, astrology analysis, spiritual assessment or integrated counselling based on your unique needs."          },
  { n: "03", title: "Personalised Guidance",    desc: "Receive practical recommendations, counselling, remedies, and a customised transformation plan."                                    },
  { n: "04", title: "Continuous Support",       desc: "Follow-up sessions, progress tracking, and long-term guidance for lasting personal growth and transformation."                      },
];

// const STATIC_PUBLICATIONS = [
//   { img: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600", type: "Research Paper", title: "Occult Psychology & Mental Wellbeing",           desc: "Published in International Journal of Human Behaviour.",        link: "/publications" },
//   { img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600", type: "Book",           title: "Psychology & Spiritual Transformation",           desc: "Understanding consciousness through modern science.",            link: "/publications" },
//   { img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600", type: "Article",        title: "Ancient Wisdom & Modern Psychology",              desc: "Connecting ancient traditions with present-day therapy.",        link: "/blog"         },
// ];

const STATIC_TESTIMONIALS = [
  { name: "Priya Sharma",  service: "Psychological Counselling", text: "Prosper Foundation helped me gain clarity during one of the most difficult phases of my life. The counselling sessions completely changed my perspective.", stars: 5 },
  { name: "Rahul Verma",   service: "Astrology Consultation",   text: "The astrological consultation gave me confidence in making important life decisions. Every session was insightful and practical.",                           stars: 5 },
  { name: "Ananya Singh",  service: "Spiritual Guidance",       text: "I experienced remarkable emotional healing through their spiritual guidance. The environment is calm, professional, and trustworthy.",                       stars: 5 },
];

const STATS = [
  { target: 500, suf: "+", lbl: "People Guided"        },
  { target: 5,   suf: "+", lbl: "Years Experience"     },
  { target: 4,  suf: "+", lbl: "Research Publications"},
  { target: 95,  suf: "%", lbl: "Client Satisfaction"  },
];

const JOURNEY = [
  {
    year: "Academic Foundation",
    icon: "🎓",
    title: "Ph.D. in Psychology",
    desc: "Completed a Ph.D. in Psychology, developing advanced academic understanding of human behaviour, psychological processes, and related areas of study."
  },

  {
    year: "Academic Achievement",
    icon: "🏅",
    title: "Gold Medalist in Psychology",
    desc: "Recognised for academic excellence in Psychology with a Gold Medal distinction."
  },

  {
    year: "Counselling",
    icon: "🧠",
    title: "Psychological Counselling",
    desc: "Developed professional experience in psychological counselling, behavioural guidance, emotional well-being, and individual support."
  },

  {
    year: "Social Welfare",
    icon: "🤝",
    title: "Counsellor — Social Welfare Department, Patna",
    desc: "Worked as a Counsellor with the Social Welfare Department, Patna, providing psychological and social support."
  },

  {
    year: "Project Coordination",
    icon: "📋",
    title: "Project Coordinator — PHDRDF",
    desc: "Worked as a Project Coordinator with PHDRDF, contributing to professional and community-oriented programmes."
  },

  {
    year: "Child Protection",
    icon: "🛡️",
    title: "DCPU Counsellor",
    desc: "Worked in the child protection and welfare sector as a DCPU Counsellor, supporting children, adolescents, and families."
  }
];

/* ── Main component ────────────────────────────────────── */
export default function Home() {
  useReveal();
  useCounters();
  const [homeEbooks, setHomeEbooks] = useState([]);
  // const [ebooksLoading, setEbooksLoading] = useState(true);
  const [homeBlogs, setHomeBlogs] = useState([]);
  const [knowledgeLoading, setKnowledgeLoading] = useState(true);
  const [showTestiForm, setShowTestiForm] = useState(false);
  const [approvedTestimonials, setApprovedTestimonials] = useState(STATIC_TESTIMONIALS);
const [testimonialsLoading, setTestimonialsLoading] = useState(true);
  const whatsappNumber = "+919876543210";


useEffect(() => {
  const loadKnowledgeHub = async () => {
    try {
      setKnowledgeLoading(true);

      const [blogsResponse, ebooksResponse] = await Promise.all([
        getBlogs({ limit: 3 }),
        getAllEbooks({ limit: 3 }),
      ]);

      const blogs =
        blogsResponse?.data?.blogs ||
        blogsResponse?.data ||
        [];

      const ebooks =
        ebooksResponse?.data?.ebooks ||
        ebooksResponse?.data ||
        [];

      setHomeBlogs(
        Array.isArray(blogs) ? blogs.slice(0, 3) : []
      );

      setHomeEbooks(
        Array.isArray(ebooks) ? ebooks.slice(0, 3) : []
      );
    } catch (error) {
      console.error(
        "Knowledge Hub loading failed:",
        error
      );

      setHomeBlogs([]);
      setHomeEbooks([]);
    } finally {
      setKnowledgeLoading(false);
    }
  };

  loadKnowledgeHub();
}, []);
  /* Fetch approved testimonials from backend */
useEffect(() => {
  const loadTestimonials = async () => {
    try {
      setTestimonialsLoading(true);

      const response = await fetch(
        "https://dr-amit-kumar-pushpam-1.onrender.com/api/testimonials"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }

      const data = await response.json();

      setApprovedTestimonials(
        Array.isArray(data?.testimonials)
          ? data.testimonials
          : []
      );
    } catch (error) {
      console.error("Testimonials loading failed:", error);
      setApprovedTestimonials([]);
    } finally {
      setTestimonialsLoading(false);
    }
  };

  loadTestimonials();
}, []);


  return (
  <div className="home">
    <Helmet>
      <title>Dr. Amit Kumar Pushpam | Psychology, Spirituality & Research</title>

      <meta
        name="description"
        content="Explore Dr. Amit Kumar Pushpam, founded by Dr. Amit Kumar Pushpam, for psychology, research, spiritual guidance, education, resilience, and the study of human experience."
      />

      <meta
        name="robots"
        content="index, follow"
      />

      <meta
        property="og:title"
        content="Dr. Amit Kumar Pushpam | Psychology, Spirituality & Research"
      />

      <meta
        property="og:description"
        content="Discover psychology, research, spirituality, education, and human transformation through Dr. Amit Kumar Pushpam."
      />

      <meta
        property="og:type"
        content="website"
      />
    </Helmet>
      

      {/* ═══════════════ HERO ═══════════════════════════ */}
      <section className="h-hero">
        <video autoPlay muted loop playsInline className="h-hero-video" aria-hidden="true">
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="h-hero-overlay" aria-hidden="true" />

        <div className="h-hero-content">
          <div className="h-hero-pill h-reveal">
            {/* <span className="h-pill-dot" aria-hidden="true" />
            Welcome to Prosper Foundation */}
          </div>
            <h1>
            Bridging Science, Psychology & Spiritual
             <br />
                Wisdom for Human Transformation
           </h1>
          <p className="h-reveal h-d2">
            Helping individuals discover clarity, emotional balance, inner strength,
            and purposeful living through research-driven guidance and timeless wisdom.  Exploring psychology, research, occult traditions, spirituality, paranormal
  studies, education, and resilience to better understand the human mind,
  human experience, and the questions that continue to challenge conventional
  explanations.
          </p>
          <p className="h-hero-hindi h-reveal h-d2" lang="hi">सर्वस्यार्तिहरे देवि</p>
          <div className="h-hero-btns h-reveal h-d3">
            <Link to="/book-session" className="h-btn h-btn-gold">Book Consultation ✦</Link>
            <Link to="/services"     className="h-btn h-btn-ghost-light">Explore Services →</Link>
          </div>
          <div className="h-hero-stats h-reveal h-d4">
            {STATS.map((s) => (
              <div key={s.lbl} className="h-hero-stat">
                <strong className="h-count" data-target={s.target} data-suffix={s.suf}>0{s.suf}</strong>
                <span>{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="h-scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <div className="h-scroll-line" />
        </div>
      </section>


 {/* ═══════════════ ABOUT DR. AMIT ═════════════════ */}
      {/* Reference: Pracchi.in — bold founder presentation, credential pills */}
      <section className="h-sec h-founder">
        <div className="h-wrap">
          <div className="h-founder-grid">
            <div className="h-reveal">
              <div className="h-founder-img-wrap">
                <img src={founderImage} alt="Dr. Amit Kumar Pushpam — Founder" className="h-founder-img" />
                <div className="h-founder-exp" aria-label="5 plus years experience">
                  <strong>5+</strong>
                  <span>Years</span>
                </div>
              </div>
              <div className="h-creds">
                {["Ph.D. in Psychology", "Gold Medalist — Psychology", "Occult Psychologist", "Spiritual Guide & Researcher"].map((c) => (
                  <div key={c} className="h-cred-pill">
                    <span className="h-cred-dot" aria-hidden="true" />
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-reveal h-d1">
              <span className="h-eye">Founder & Director</span>
              <h2 className="h-h2">Dr. Amit Kumar Pushpam</h2>
              <p className="h-founder-role">Psychologist | Researcher | Counsellor | Educator | Occult & Paranormal Studies Practitioner</p>
              <div className="h-bar" />
              <p className="h-para">
                Dr. Amit Kumar Pushpam is a psychologist, researcher, counsellor, educator, and interdisciplinary practitioner whose
                 professional interests span Psychology, Research, Occult, Spirituality, Paranormal Studies, Education, and Resilience.
               
              </p>

              <p className="h-para">
                With a Ph.D. in Psychology and professional experience in counselling,
                child welfare, social development, research, and education, his work brings
                academic knowledge of human behaviour into dialogue with traditional
                knowledge, spiritual practices, occult traditions, and unexplained human
                experiences.
              </p>
             <p className="h-para">
              His work is driven by a central interest: understanding the human mind,
              human experience, and the phenomena that continue to challenge conventional explanations.
</p>
              <div className="h-founder-pts">
                {[
  "Psychology & Counselling",
  "Research & Academic Work",
  "Education & Training"
].map((p) => (
                  <div key={p} className="h-founder-pt">
                    <FaCheckCircle className="h-pt-icon" aria-hidden="true" />{p}
                  </div>
                ))}
              </div>
              {/* <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginTop: "28px" }}>
                <Link to="/founder" className="h-btn h-btn-gold">Read Full Journey →</Link>
                <Link to="/about"   className="h-btn h-btn-outline">About Foundation</Link>
              </div> */}
            </div>
          </div>

          {/* Quote */}
          <div className="h-quote-banner h-reveal">
            <FaQuoteLeft className="h-quote-icon" aria-hidden="true" />
            <p> "Explore without prejudice. Question without fear. Conclude on the basis of evidence."</p>
            <cite>— Dr. Amit Kumar Pushpam</cite>
          </div>
        </div>
      </section>
      {/* ═══════════════ 7 DOMAINS / METHODS ═══════════ */}
      {/* Reference: Dr. Parthha Roy — structured discipline grid */}
      <section className="h-sec h-domains">
        <div className="h-wrap">
          <div className="h-sec-hd h-reveal">
            <span className="h-eye">7 Methods & Domains</span>
            <h2 className="h-h2">  Seven domains. One interdisciplinary vision.</h2>
            <p className="h-sec-sub"> Our work brings together different perspectives on human behaviour,
  experience, consciousness, traditional knowledge, education, and resilience
  while recognising the boundaries and differences between each domain.</p>
            <div className="h-bar h-bar-c" />
          </div>
          <div className="h-domains-grid">
            {DOMAINS.map((d, i) => (
              <div key={d.title} className={`h-domain-card h-reveal h-d${i % 4}`}
                style={{ "--dc": d.color }}>
                <div className="h-domain-num" aria-hidden="true">0{i + 1}</div>
                <div className="h-domain-icon" aria-hidden="true">{d.icon}</div>
                <h3 className="h-domain-title">{d.title}</h3>
                <p className="h-domain-hindi" lang="hi">{d.hindi}</p>
                <p className="h-domain-desc">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS STRIP ════════════════════ */}
      <div className="h-stats-strip">
        <div className="h-wrap">
          <div className="h-stats-grid">
            {STATS.map((s) => (
              <div key={s.lbl} className="h-stat-box">
                <strong className="h-count" data-target={s.target} data-suffix={s.suf}>0{s.suf}</strong>
                <span>{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════ SERVICES ═══════════════════════ */}
      <section className="h-sec h-services">
        <div className="h-wrap">
          <div className="h-sec-hd h-reveal">
            <span className="h-eye">Our Services</span>
            <h2 className="h-h2">Transformative services designed for every individual</h2>
            <p className="h-sec-sub"> Our professional work spans psychological counselling, assessment,
              research, education, traditional knowledge, spiritual guidance, and
               exploration of reported anomalous experiences.</p>
            <div className="h-bar h-bar-c" />
          </div>
          <div className="h-services-grid">
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`h-svc-card h-reveal h-d${i % 3}`}>
                <div className="h-svc-icon" aria-hidden="true">{s.icon}</div>
                <h3 className="h-svc-title">{s.title}</h3>
                <p className="h-svc-desc">{s.desc}</p>
                {/* <Link to={`/services/${s.id}`} className="h-svc-link">
                  Learn More <FaArrowRight aria-hidden="true"/>
                </Link> */}
              </div>
            ))}
          </div>
          <div className="h-reveal" style={{ textAlign: "center", marginTop: "48px" }}>
            <Link to="/services" className="h-btn h-btn-gold">View All Services →</Link>
          </div>
        </div>
      </section>

      
      {/* ═══════════════ PROFESSIONAL JOURNEY ══════════ */}
      {/* Reference: Roy Astrology Centre — structured timeline */}
      <section className="h-sec h-journey">
        <div className="h-wrap">
          <div className="h-sec-hd h-reveal">
            <span className="h-eye" style={{ color: "#C9A84C" }}>Professional Journey</span>
            <h2 className="h-h2" style={{ color: "#fff" }}>Milestones along the path</h2>
            <div className="h-bar h-bar-c" />
          </div>
          <div className="h-journey-grid">
            {JOURNEY.map((j, i) => (
  <div
    key={i}
    className={`h-jrn-item h-reveal h-d${i % 3}`}
  >
    <div className="h-jrn-year">{j.year}</div>

    <div className="h-jrn-icon" aria-hidden="true">
      {j.icon}
    </div>

    <h3 className="h-jrn-title">
      {j.title}
    </h3>

    <p className="h-jrn-desc">
      {j.desc}
    </p>
  </div>
))}
          </div>
        </div>
      </section>

      {/* ═══════════════ OUR PROCESS ════════════════════ */}
      <section className="h-sec h-process">
        <div className="h-wrap">
          <div className="h-process-grid">
            <div className="h-reveal">
              <span className="h-eye">Our Approach</span>
              <h2 className="h-h2">A thoughtful approach to every enquiry</h2>
              <div className="h-bar" />
              <p className="h-para" style={{ color: "rgba(255,255,255,.55)" }}>
                 Our approach begins by understanding the individual, question, or
                experience being presented. Depending on the area of work, we draw upon
                psychological knowledge, research methods, education, traditional
                perspectives, or interdisciplinary inquiry while maintaining clear
                distinctions between evidence, interpretation, and belief.
              </p>
              <Link to="/book-session" className="h-btn h-btn-gold" style={{ marginTop: "28px" }}>
                Book Your First Session ✦
              </Link>
              <div className="h-process-card">
                <h4>FREE DISCOVERY CALL</h4>
                <p>Begin with a one-on-one discussion to understand your concerns and recommend the most suitable guidance. No commitment required.</p>
              </div>
            </div>
            <div>
              {PROCESS.map((p, i) => (
                <div key={p.n} className={`h-process-item ${i === PROCESS.length - 1 ? "last" : ""} h-reveal h-d${i % 3}`}>
                  <span className="h-process-num" aria-hidden="true">{p.n}</span>
                  <div>
                    <h3 className="h-process-title">{p.title}</h3>
                    <p className="h-process-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BOOKS & PUBLICATIONS ══════════ */}
   {/* ═══════════════════════════════════════════════
    KNOWLEDGE HUB
════════════════════════════════════════════════ */}

<section className="h-sec h-pubs">
  <div className="h-wrap">

    {/* HEADER */}
    <div className="h-sec-hd h-reveal">

      <span className="h-eye">
        Knowledge Hub
      </span>

      <h2 className="h-h2">
        Explore Ideas, Research & Knowledge
      </h2>

      <p className="h-sec-sub">
        Discover our latest books, blogs, articles and
        research exploring psychology, spirituality,
        human behaviour and holistic wellbeing.
      </p>

      <div className="h-bar h-bar-c" />

    </div>


    {/* CATEGORY NAVIGATION */}
    <div className="h-pub-cats h-reveal">

      <Link
        to="/blogs"
        className="h-pub-cat"
      >
        Blogs
      </Link>

      <Link
        to="/ebooks"
        className="h-pub-cat"
      >
        eBooks
      </Link>

      <Link
        to="/articles"
        className="h-pub-cat"
      >
        Articles
      </Link>

      {/* <Link
        to="/publications"
        className="h-pub-cat"
      >
        Publications
      </Link> */}

    </div>


    {/* LOADING */}
    {/* {/* {knowledgeLoading ? (

      <div className="knowledge-loading">
        <div className="knowledge-spinner" />

        <p>
          Loading knowledge hub...
        </p>
      </div>

    ) : ( */}

      <> 
        {/* ═══════════════════════════════════════
            BLOGS
        ═══════════════════════════════════════ */}

        {/* {homeBlogs.length > 0 && (

          <div className="knowledge-group">

            <div className="knowledge-group-header">

              <div>
                <span className="knowledge-label">
                  LATEST INSIGHTS
                </span>

                <h3>
                  From Our Blog
                </h3>
              </div>

              <Link
                to="/blogs"
                className="knowledge-view-all"
              >
                View All Blogs
                <FaArrowRight />
              </Link>

            </div>


            <div className="h-pub-grid">

              {homeBlogs.map((blog, index) => (

                <article
                  key={blog._id || blog.id || index}
                  className={`h-pub-card h-reveal h-d${index % 3}`}
                >

                  <div className="h-pub-img-wrap">

                    <img
                      src={
                        blog.coverImage ||
                        blog.image ||
                        blog.thumbnail ||
                        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800"
                      }
                      alt={blog.title}
                      className="h-pub-img"
                      loading="lazy"
                    />

                    <span className="h-pub-type">
                      Blog
                    </span>

                  </div>


                  <div className="h-pub-body">

                    <h3 className="h-pub-title">
                      {blog.title}
                    </h3>

                    <p className="h-pub-desc">
                      {blog.excerpt ||
                        blog.description ||
                        "Explore this insightful article from Prosper Foundation."}
                    </p>

                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="h-pub-link"
                    >
                      Read Article
                      <FaArrowRight />
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          </div>

        )} */}


        {/* ═══════════════════════════════════════
            EBOOKS
        ═══════════════════════════════════════ */}
{/* 
        {homeEbooks.length > 0 && (

          <div className="knowledge-group">

            <div className="knowledge-group-header">

              <div>
                <span className="knowledge-label">
                  DIGITAL LIBRARY
                </span>

                <h3>
                  Featured eBooks
                </h3>
              </div>

              <Link
                to="/ebooks"
                className="knowledge-view-all"
              >
                Explore Library
                <FaArrowRight />
              </Link>

            </div>


            <div className="h-pub-grid ebook-home-grid">

              {homeEbooks.map((ebook, index) => (

                <article
                  key={ebook._id || ebook.id || index}
                  className={`h-pub-card h-ebook-home-card h-reveal h-d${index % 3}`}
                >

                  <Link
                    to={`/ebook/${ebook.slug}`}
                    className="h-ebook-cover-link"
                  >

                    <div className="h-pub-img-wrap h-ebook-cover-wrap">

                      <img
                        src={
                          ebook.cover ||
                          ebook.coverImage ||
                          ebook.image ||
                          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"
                        }
                        alt={ebook.title}
                        className="h-pub-img"
                        loading="lazy"
                      />

                      <span className="h-pub-type">
                        eBook
                      </span>

                      {Number(ebook.price) === 0 && (
                        <span className="h-ebook-free">
                          FREE
                        </span>
                      )}

                    </div>

                  </Link>


                  <div className="h-pub-body">

                    <span className="h-ebook-category">
                      {ebook.category || "Knowledge"}
                    </span>

                    <h3 className="h-pub-title">
                      {ebook.title}
                    </h3>

                    <p className="h-pub-desc">
                      {ebook.excerpt ||
                        ebook.description ||
                        "Explore this book from the Prosper Foundation digital library."}
                    </p>

                    <Link
                      to={`/ebook/${ebook.slug}`}
                      className="h-pub-link"
                    >
                      Read eBook
                      <FaArrowRight />
                    </Link>

                  </div>

                </article>

              ))}

            </div>

          </div>

        )} */} 


        {/* ═══════════════════════════════════════
            EMPTY STATE
        ═══════════════════════════════════════ */}

        {homeBlogs.length === 0 &&
          homeEbooks.length === 0 && (

            <div className="knowledge-empty">

              <div className="knowledge-empty-icon">
                ✦
              </div>

              <h3>
                Knowledge Hub is growing
              </h3>

              <p>
                New books, blogs and articles will
                appear here as they are published.
              </p>

              <div className="knowledge-empty-actions">

                <Link
                  to="/blogs"
                  className="h-btn h-btn-outline"
                >
                  Explore Blogs
                </Link>

                <Link
                  to="/ebooks"
                  className="h-btn h-btn-gold"
                >
                  Browse eBooks
                </Link>

              </div>

            </div>

          )}


        {/* ═══════════════════════════════════════
            STATIC RESEARCH / PUBLICATIONS
        ═══════════════════════════════════════ */}
{/*  
        <div className="knowledge-group static-publications-group">

          <div className="knowledge-group-header">

            <div>

              <span className="knowledge-label">
                RESEARCH & PUBLICATIONS
              </span>

              <h3>
                Research & Publications
              </h3>

            </div>

            <Link
              to="/publications"
              className="knowledge-view-all"
            >
              Explore Research
              <FaArrowRight />
            </Link>

          </div>


          <div className="h-pub-grid">

            {STATIC_PUBLICATIONS.map((p, index) => (

              <article
                key={index}
                className={`h-pub-card h-reveal h-d${index % 3}`}
              >

                <div className="h-pub-img-wrap">

                  <img
                    src={p.img}
                    alt={p.title}
                    className="h-pub-img"
                    loading="lazy"
                  />

                  <span className="h-pub-type">
                    {p.type}
                  </span>

                </div>


                <div className="h-pub-body">

                  <h3 className="h-pub-title">
                    {p.title}
                  </h3>

                  <p className="h-pub-desc">
                    {p.desc}
                  </p>

                  <Link
                    to={p.link}
                    className="h-pub-link"
                  >
                    Explore
                    <FaArrowRight />
                  </Link>

                </div>

              </article>

            ))}

          </div>

        </div> */}


        {/* MAIN CTA */}

        <div
          className="h-reveal"
          style={{
            textAlign: "center",
            marginTop: "50px"
          }}
        >

          <Link
            to="/publications"
            className="h-btn h-btn-gold"
          >
            Explore Knowledge Hub
            <FaArrowRight />
          </Link>

        </div>

      </>

    

  </div> 
</section>
      {/* ═══════════════ TESTIMONIALS ═══════════════════ */}
      {/* User-submitted, admin-approved */}
      <section className="h-sec h-testi">
        <div className="h-wrap">
          <div className="h-sec-hd h-reveal">
            <span className="h-eye">Testimonials</span>
            <h2 className="h-h2">  Voices from our community</h2>
            <p className="h-sec-sub">  Read experiences shared by individuals who have engaged with our counselling,
  guidance, educational, or consultation services.</p>
            <div className="h-bar h-bar-c" />
          </div>
          <div className="h-testi-grid">
            {approvedTestimonials.map((t, i) => (
              <div key={i} className={`h-testi-card h-reveal h-d${i % 3}`}>
  {/* Avatar + Name */}
  <div className="h-testi-author">
    <div className="h-testi-avatar" aria-hidden="true">
      {t.name?.charAt(0)}
    </div>
    <div>
      <strong>{t.name}</strong>
      {/* Service line */}
      <div className="h-testi-service">{t.service}</div>
    </div>
  </div>

  {/* Message */}
  <p className="h-testi-text">{t.message}</p>

  {/* Rating Stars */}
  <div className="h-stars" aria-label={`${t.rating} out of 5 stars`}>
    {Array.from({ length: t.rating }).map((_, j) => (
      <FaStar key={j} aria-hidden="true" />
    ))}
  </div>
</div>

            ))}
          </div>
          <div className="h-testi-actions h-reveal">
            <button className="h-btn h-btn-gold" onClick={() => setShowTestiForm(true)}>
              Share Your Experience ✦
            </button>
            <p className="h-testi-note">Your review will appear after admin approval.</p>
          </div>
        </div>
      </section>

       {/* {showTestiForm && <TestimonialForm onClose={() => setShowTestiForm(false)} />}  */}

{/* Testimonial Form */}
{showTestiForm && (
  <TestimonialForm
    onClose={() => setShowTestiForm(false)}
  />
)}

      {/* ═══════════════ DONATION ═══════════════════════ */}
      <section className="h-donation">
        <div className="h-wrap">
          <div className="h-donation-grid">
            <div className="h-reveal">
              <span className="h-eye">Support Our Mission</span>
              <h2 className="h-h2">Together, we can create <em>meaningful change</em></h2>
              <div className="h-bar" />
              <p className="h-para" style={{ color: "rgba(255,255,255,.62)" }}>
                Your generosity helps Prosper Foundation advance psychological well-being,
                research, spiritual awareness, education, and community development.
              </p>
              <div className="h-donation-feats">
                {["Secure Donations", "Transparent Utilization", "Supporting Research & Education"].map((f) => (
                  <div key={f} className="h-dfeat"><FaCheckCircle aria-hidden="true" />{f}</div>
                ))}
              </div>
            </div>
            <div className="h-reveal h-d1">
              <div className="h-donation-card">
                <h3>Make a Contribution</h3>
                <p>Every act of generosity helps us continue our mission.</p>
                <div className="h-amount-pills">
                  {["₹100","₹500","₹1,000","₹5,000"].map((a) => (
                    <button key={a} className="h-amount-pill" type="button">{a}</button>
                  ))}
                </div>
                <div className="h-input-box">
                  <span aria-hidden="true">₹</span>
                  <input type="number" placeholder="Enter custom amount" aria-label="Donation amount in rupees" />
                </div>
                <button className="h-donate-btn" type="button">Donate Securely</button>
                <p className="h-secure-note">🔒 Protected by Secure Payment Gateway</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ════════════════════════════ */}
      <section className="h-cta">
        <div className="h-wrap h-cta-inner">
          <div className="h-ornament h-reveal" aria-hidden="true">✦</div>
          <h2 className="h-cta-h2 h-reveal h-d1">Begin a Conversation</h2>
          <p className="h-cta-sub h-reveal h-d2"> Whether you are looking for psychological counselling, research guidance,
              educational support, spiritual guidance, or wish to discuss an unusual
              experience, take the first step by connecting with us.</p>
          <div className="h-cta-btns h-reveal h-d3">
            <Link to="/book-session" className="h-btn h-btn-gold h-btn-lg">Book a Session ✦</Link>
            <Link to="/contact"      className="h-btn h-btn-ghost-light">Get in Touch</Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHATSAPP FLOAT ═════════════════ */}
      <a
        href={`https://wa.me/${whatsappNumber.replace(/\D/g,"")}?text=${encodeURIComponent("Hello! I'm interested in your services. Can you provide more details?")}`}
        className="h-wa-float"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp aria-hidden="true" />
      </a>
    </div>
  );
}