import React from "react";
import { Link } from "react-router-dom";
import {
  FaComments,
  FaStar,
  FaSearch,
  FaBrain,
  FaGraduationCap,
  FaPrayingHands,
  FaArrowRight,
  FaCheckCircle,
  FaQuoteLeft,
} from "react-icons/fa";

import "./Services.css";

const Services = () => {
  const services = [
    {
      id: "counselling",
      number: "01",
      icon: FaComments,
      title: "Counselling",
      shortTitle: "Emotional & Personal Counselling",
      description:
        "A supportive and confidential space to understand personal challenges, emotions, relationships, and life situations with greater clarity.",
      points: [
        "Personal guidance",
        "Emotional support",
        "Relationship guidance",
        "Life challenges",
      ],
      path: "/services/counselling",
    },

    {
      id: "astrological-consultancy",
      number: "02",
      icon: FaStar,
      title: "Astrological Consultancy",
      shortTitle: "Guidance Through Astrology",
      description:
        "Explore astrological perspectives to reflect on important areas of life and gain a deeper understanding of possibilities, patterns, and personal direction.",
      points: [
        "Birth chart guidance",
        "Life direction",
        "Personal insights",
        "Astrological consultation",
      ],
      path: "/services/astrological-consultancy",
    },

    {
      id: "paranormal-investigator",
      number: "03",
      icon: FaSearch,
      title: "Paranormal Investigator",
      shortTitle: "Investigation & Consultation",
      description:
        "Approaching unusual or unexplained experiences with careful observation, documentation, discussion, and a structured investigative perspective.",
      points: [
        "Case consultation",
        "Investigation",
        "Experience assessment",
        "Documentation",
      ],
      path: "/services/paranormal-investigator",
    },

    {
      id: "psychological-assessment",
      number: "04",
      icon: FaBrain,
      title: "Psychological Assessment",
      shortTitle: "Testing & Assessment",
      description:
        "Structured psychological assessment and testing to help understand cognitive, emotional, behavioural, and personality-related aspects.",
      points: [
        "Psychological testing",
        "Behavioural assessment",
        "Personality assessment",
        "Structured evaluation",
      ],
      path: "/services/psychological-assessment",
    },

    {
      id: "moral-value-and-education",
      number: "05",
      icon: FaGraduationCap,
      title: "Moral Value & Education",
      shortTitle: "Values, Character & Learning",
      description:
        "Guidance focused on developing positive values, responsible thinking, ethical awareness, character, and meaningful personal growth.",
      points: [
        "Value-based guidance",
        "Character development",
        "Ethical awareness",
        "Personal growth",
      ],
      path: "/services/moral-value-and-education",
    },

    {
      id: "spiritual-guidance",
      number: "06",
      icon: FaPrayingHands,
      title: "Spiritual Guidance",
      shortTitle: "Inner Awareness & Growth",
      description:
        "A reflective approach to spirituality, inner awareness, purpose, balance, and personal growth while respecting individual beliefs and perspectives.",
      points: [
        "Inner reflection",
        "Spiritual awareness",
        "Purpose & direction",
        "Holistic growth",
      ],
      path: "/services/spiritual-guidance",
    },
  ];

  return (
    <main className="services-page">

      {/* =====================================================
          HERO
          ===================================================== */}
      <section className="services-hero">
        <div className="services-hero-glow glow-one"></div>
        <div className="services-hero-glow glow-two"></div>

        <div className="services-hero-pattern"></div>

        <div className="services-container services-hero-content">

          <div className="services-hero-text">

            <span className="services-eyebrow">
              <span className="eyebrow-line"></span>
              OUR SERVICES
              <span className="eyebrow-line"></span>
            </span>

            <h1>
             Explore Psychology, Counselling,
              <span>Education & Interdisciplinary Guidance</span>
            </h1>

            <p>
             Explore professional services spanning psychological counselling,
             psychological assessment, education, astrological consultancy,
             spiritual guidance, and structured exploration of unusual and
             anomalous experiences.
            </p>

            <div className="services-hero-buttons">
              <a href="#all-services" className="services-primary-btn">
                Explore Services
                <FaArrowRight />
              </a>

              <Link
                to="/book-session"
                className="services-secondary-btn"
              >
                Book a Session
              </Link>
            </div>

          </div>

          {/* Decorative visual */}
          <div className="services-hero-art">

            <div className="hero-orbit orbit-one"></div>
            <div className="hero-orbit orbit-two"></div>

            <div className="hero-center-circle">
              <div className="hero-center-inner">
                <span>✦</span>
                <strong>Dr. Amit</strong>
                <small>Kumar Pushpam</small>
              </div>
            </div>

            <div className="floating-symbol symbol-one">✦</div>
            <div className="floating-symbol symbol-two">☼</div>
            <div className="floating-symbol symbol-three">◈</div>
            <div className="floating-symbol symbol-four">✧</div>

          </div>

        </div>
      </section>


      {/* =====================================================
          INTRODUCTION
          ===================================================== */}
      <section className="services-intro">
        <div className="services-container">

          <div className="services-intro-grid">

            <div className="services-intro-left">
              <span className="services-small-label">
                A HOLISTIC APPROACH
              </span>

              <h2>
                Different paths,
                <br />
                <span>one purpose.</span>
              </h2>
            </div>

            <div className="services-intro-right">
              <p>
                At Dr.Amit Kumar Pushpam, different questions may require different
                perspectives. Our work brings together psychology, counselling,
                research, education, traditional knowledge, spirituality, and the
                structured study of reported anomalous experiences.
              </p>

              <div className="intro-highlight">
                <FaCheckCircle />
                <span>
                  Every service is approached with respect, confidentiality,
                  individual attention, and clear distinction between evidence,
                  interpretation, and belief.
                </span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          SERVICES
          ===================================================== */}
      <section
        className="services-list-section"
        id="all-services"
      >
        <div className="services-container">

          <div className="services-section-heading">

            <span className="services-small-label">
              WHAT WE OFFER
            </span>

            <h2>
              Explore Our
              <span> Services</span>
            </h2>

            <p>
              Choose the area that best matches your needs and explore
              detailed information about the service.
            </p>

            <div className="gold-divider">
              <span></span>
              <i>✦</i>
              <span></span>
            </div>

          </div>


          <div className="services-grid">

            {services.map((service) => {

              const Icon = service.icon;

              return (
                <article
                  className="service-modern-card"
                  key={service.id}
                >

                  {/* Card glow */}
                  <div className="card-glow"></div>

                  {/* Number */}
                  <div className="service-card-number">
                    {service.number}
                  </div>

                  {/* Icon */}
                  <div className="service-card-icon">
                    <Icon />
                  </div>

                  {/* Content */}
                  <div className="service-card-content">

                    <span className="service-card-mini-title">
                      {service.shortTitle}
                    </span>

                    <h3>{service.title}</h3>

                    <p>{service.description}</p>

                    <div className="service-card-points">

                      {service.points.map((point) => (
                        <span key={point}>
                          <FaCheckCircle />
                          {point}
                        </span>
                      ))}

                    </div>

                  </div>

                  {/* Bottom */}
                  <div className="service-card-bottom">

                    <Link to={service.path}>
                      Explore Service
                      <span>
                        <FaArrowRight />
                      </span>
                    </Link>

                  </div>

                </article>
              );
            })}

          </div>

        </div>
      </section>


      {/* =====================================================
          PHILOSOPHY
          ===================================================== */}
      <section className="services-philosophy">

        <div className="services-philosophy-overlay"></div>

        <div className="services-container">

          <div className="philosophy-content">

            <FaQuoteLeft className="philosophy-quote" />

            <span className="services-small-label">
              OUR PHILOSOPHY
            </span>

            <h2>
              Understanding begins
              <br />
              with <span>listening.</span>
            </h2>

            <p>
              Every person, question, and experience has its own context.
              Our approach begins by listening carefully, understanding the
              concern, and choosing an appropriate perspective for the situation.
              Where psychological or research-based approaches are relevant,
              we use them thoughtfully while also recognising the distinction
              between evidence, interpretation, tradition, and personal belief.
            </p>

            <div className="philosophy-line"></div>

            <strong>
              Dr. Amit Kumar Pushpam
            </strong>

          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
          ===================================================== */}
      <section className="services-cta">

        <div className="services-cta-decoration decoration-left">
          ✦
        </div>

        <div className="services-cta-decoration decoration-right">
          ✧
        </div>

        <div className="services-container">

          <div className="services-cta-content">

            <span className="services-small-label">
              TAKE THE NEXT STEP
            </span>

            <h2>
              Ready to begin your
              <span> journey?</span>
            </h2>

            <p>
              Explore the service that feels right for you or connect with us
              to discuss how we can help.
            </p>

            <div className="cta-buttons">

              <Link
                to="/book-session"
                className="services-primary-btn"
              >
                Book a Session
                <FaArrowRight />
              </Link>

              <Link
                to="/contact"
                className="services-outline-btn"
              >
                Contact Us
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Services;