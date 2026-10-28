import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import "./Counselling.css";

const Counselling = () => {
  const [expanded, setExpanded] = useState(null);

  const counsellingTypes = [
    {
      id: 1,
      icon: "🧠",
      title: "Psychological Counselling",
      description:
        "Professional therapy sessions for stress, anxiety, depression, and emotional well-being.",
      details: `Our psychological counselling sessions are designed to help you manage mental health challenges and improve emotional resilience. We use evidence-based approaches such as CBT, mindfulness, and supportive therapy.`,
      benefits: [
        "Emotional clarity and stress reduction",
        "Improved coping strategies",
        "Better relationships",
        "Enhanced mental health",
      ],
      pricing: [
        { plan: "Single Session", amount: "₹500" },
        { plan: "5 Sessions Package", amount: "₹2,100" },
        { plan: "10 Sessions Premium", amount: "₹4,000" },
      ],
    },
    {
      id: 2,
      icon: "✨",
      title: "Spiritual Counselling",
      description:
        "Guidance for inner peace, mindfulness, meditation, and spiritual awakening.",
      details: `Spiritual counselling helps you connect with your inner self, find meaning, and cultivate mindfulness. Our sessions include meditation practices, chakra balancing, and energy healing guidance.`,
      benefits: [
        "Inner peace and mindfulness",
        "Purpose discovery",
        "Spiritual alignment",
        "Higher consciousness connection",
      ],
      pricing: [
        { plan: "Single Session", amount: "₹500" },
        { plan: "5 Sessions Package", amount: "₹2,100" },
        { plan: "10 Sessions Premium", amount: "₹4,000" },
      ],
    },
    {
      id: 3,
      icon: "💞",
      title: "Relationship & Family Counselling",
      description:
        "Support for couples, families, and individuals to build healthier relationships.",
      details: `Our relationship counselling focuses on communication, conflict resolution, and emotional bonding. We help couples and families strengthen their connections and overcome challenges.`,
      benefits: [
        "Better communication",
        "Conflict resolution",
        "Stronger family bonds",
        "Healthier relationships",
      ],
      pricing: [
        { plan: "Single Session", amount: "₹500" },
        { plan: "5 Sessions Package", amount: "₹2,100" },
        { plan: "10 Sessions Premium", amount: "₹4,000" },
      ],
    },
    {
      id: 4,
      icon: "📚",
      title: "Career & Academic Counselling",
      description:
        "Helping students and professionals make informed career and education choices.",
      details: `Career counselling provides clarity on academic paths, career options, and skill development. We use aptitude tests, personality assessments, and mentoring to guide your journey.`,
      benefits: [
        "Career clarity",
        "Skill identification",
        "Academic guidance",
        "Confidence building",
      ],
      pricing: [
        { plan: "Single Session", amount: "₹500" },
        { plan: "5 Sessions Package", amount: "₹2,100" },
        { plan: "10 Sessions Premium", amount: "₹4,000" },
      ],
    },
    {
      id: 5,
      icon: "🌱",
      title: "Personal Growth Counselling",
      description:
        "Empowering individuals to discover purpose, values, and self-confidence.",
      details: `Personal growth counselling helps you explore your values, strengths, and goals. We focus on self-awareness, leadership skills, and building confidence for a fulfilling life.`,
      benefits: [
        "Self-discovery",
        "Confidence building",
        "Value alignment",
        "Personal leadership",
      ],
      pricing: [
        { plan: "Single Session", amount: "₹500" },
        { plan: "5 Sessions Package", amount: "₹2,100" },
        { plan: "10 Sessions Premium", amount: "₹4,000" },
      ],
    },
  ];

  return (
    <div className="counselling-page">
      {/* Hero Section */}
      <section className="counselling-hero">
        <div className="container">
          <h1>Counselling Services</h1>
          <p>
            Discover holistic counselling solutions designed to bring clarity,
            healing, and transformation to your life.
          </p>
          <Link to="/book-session" className="btn btn-primary">
            Book a Counselling Session ✦
          </Link>
        </div>
      </section>

      {/* Counselling Types */}
      <section className="counselling-types">
        <div className="container">
          <h2>Types of Counselling We Offer</h2>
          <div className="accordion">
            {counsellingTypes.map((type) => (
              <div key={type.id} className="accordion-item">
                <button
                  className="accordion-header"
                  onClick={() =>
                    setExpanded(expanded === type.id ? null : type.id)
                  }
                >
                  <div className="header-content">
                    <span className="icon">{type.icon}</span>
                    <div className="header-text">
                      <h3>{type.title}</h3>
                      <p>{type.description}</p>
                    </div>
                  </div>
                  <FaChevronDown
                    className={`chevron ${expanded === type.id ? "open" : ""}`}
                  />
                </button>

                {expanded === type.id && (
                  <div className="accordion-content">
                    <p className="details">{type.details}</p>
                    <div className="benefits">
                      <h4>Benefits:</h4>
                      <ul>
                        {type.benefits.map((b, i) => (
                          <li key={i}>✓ {b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="pricing">
                      <h4>Pricing:</h4>
                      <ul>
                        {type.pricing.map((p, i) => (
                          <li key={i}>
                            <strong>{p.plan}:</strong> {p.amount}
                          </li>
                        ))}
                      </ul>
                      <button className="btn btn-primary">Book Now</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="counselling-cta">
        <div className="container">
          <h2>Ready to Begin Your Healing Journey?</h2>
          <p>
            Choose the counselling service that resonates with you and take the
            first step toward transformation.
          </p>
          <Link to="/book-session" className="btn btn-primary">
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Counselling;

