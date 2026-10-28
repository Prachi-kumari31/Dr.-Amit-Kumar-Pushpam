import React from "react";
import { Link, useParams } from "react-router-dom";
import "./ServiceDetail.css";
import AstronomicalImage from "../assets/images/astronomy.jpg";
import CounsellingImage from "../assets/images/Donation_box_image.png";
import ParnormalInvestigator from "../assets/images/Paranormal.jpeg"
import MoralValueImage from "../assets/images/MoralValue.jpeg"; 
import SpiritualImage from "../assets/images/spiritual.jpeg"

const servicesData = {
 counselling: {
  number: "01",
  category: "PSYCHOLOGICAL & PERSONAL WELL-BEING",
  title: "Counselling",
  subtitle:
    "A confidential and supportive space to explore personal concerns, emotions, relationships, life challenges, and important decisions.",
  image: CounsellingImage,

  introTitle: "A safe space to understand yourself",
  intro:
    "Counselling provides an opportunity to discuss personal concerns, emotional experiences, relationships, life transitions, and everyday challenges in a respectful and confidential setting. The focus is on listening, reflection, self-understanding, and developing practical ways to approach the concerns that matter to you.",

  benefits: [
    {
      title: "Emotional awareness",
      description:
        "Develop greater awareness of your thoughts, emotions, reactions, and personal experiences."
    },
    {
      title: "Personal concerns",
      description:
        "Explore personal difficulties and situations that may be affecting your everyday life."
    },
    {
      title: "Relationship concerns",
      description:
        "Reflect on communication, relationships, interpersonal situations, and emotional patterns."
    },
    {
      title: "Stress and life challenges",
      description:
        "Explore practical and constructive ways of understanding everyday stress and life challenges."
    },
    {
      title: "Self-understanding",
      description:
        "Create space to reflect on your experiences, choices, strengths, and areas for personal growth."
    },
    {
      title: "Life transitions",
      description:
        "Receive supportive guidance while navigating changes, uncertainty, and important life decisions."
    }
  ],

  usefulFor: [
    "Personal concerns",
    "Emotional challenges",
    "Relationship concerns",
    "Stress and life situations",
    "Self-understanding",
    "Life transitions"
  ]
},
 "astrological-consultancy": {
  number: "02",
  category: "ASTROLOGY & OCCULT CONSULTANCY",
  title: "Astrological Consultancy",
  subtitle:
    "A personalised space to explore life questions, recurring patterns, possibilities, and personal direction through astrological perspectives.",
  image: AstronomicalImage,

  introTitle: "Explore another perspective on your life journey",
  intro:
    "Astrological consultancy offers a traditional interpretive framework for reflecting on personal circumstances, recurring themes, possibilities, and important questions in life. Consultations are intended as a reflective source of guidance and should be understood within the broader context of personal choice, circumstances, and individual judgement.",

  benefits: [
    {
      title: "Personalised consultation",
      description:
        "Discuss your questions and areas of concern through an individualised astrological consultation."
    },
    {
      title: "Life patterns",
      description:
        "Explore recurring themes and tendencies through an astrological perspective."
    },
    {
      title: "Career reflection",
      description:
        "Consider astrological perspectives while reflecting on professional direction and possibilities."
    },
    {
      title: "Relationship insights",
      description:
        "Explore relationship themes and compatibility through traditional astrological interpretation."
    },
    {
      title: "Important decisions",
      description:
        "Use consultation as one reflective perspective when considering significant personal decisions."
    },
    {
      title: "Personal reflection",
      description:
        "Use astrology as a traditional framework for self-reflection and understanding."
    }
  ],

  usefulFor: [
    "Career-related questions",
    "Relationship concerns",
    "Life transitions",
    "Personal reflection",
    "Important decisions",
    "Astrological exploration"
  ]
},

 "paranormal-investigator": {
  number: "03",
  category: "PARANORMAL STUDIES & CONSULTATION",
  title: "Paranormal Investigation & Consultation",
  subtitle:
    "A structured approach to documenting and examining unusual, unexplained, or anomalous experiences without assuming a predetermined explanation.",
  image: ParnormalInvestigator,

  introTitle: "Explore unusual experiences with curiosity and care",
  intro:
    "Paranormal investigation focuses on the careful discussion, observation, documentation, and contextual examination of reported unusual or anomalous experiences. The approach encourages curiosity and critical thinking while considering psychological, environmental, cultural, and other possible explanations.",

  benefits: [
    {
      title: "Experience documentation",
      description:
        "Record reported experiences, observations, circumstances, and available information in a structured manner."
    },
    {
      title: "Case consultation",
      description:
        "Discuss unusual experiences in a calm, respectful, and non-sensational environment."
    },
    {
      title: "Contextual examination",
      description:
        "Consider the surrounding circumstances, environment, perceptions, and available evidence related to a reported experience."
    },
    {
      title: "Psychological perspective",
      description:
        "Consider psychological and behavioural perspectives alongside other possible explanations."
    },
    {
      title: "Structured investigation",
      description:
        "Approach reported anomalous experiences through observation, documentation, questioning, and systematic inquiry."
    },
    {
      title: "Evidence-conscious exploration",
      description:
        "Distinguish between documented observations, personal interpretations, traditional beliefs, and scientifically established evidence."
    }
  ],

  usefulFor: [
    "Reported unusual experiences",
    "Unexplained occurrences",
    "Paranormal case discussion",
    "Experience documentation",
    "Anomalous experiences",
    "Research-oriented exploration"
  ]
},
 "psychological-assessment": {
  number: "04",
  category: "PSYCHOLOGICAL ASSESSMENT",
  title: "Psychological Assessment",
  subtitle:
    "Structured psychological assessment to explore selected aspects of behaviour, personality, abilities, and psychological functioning.",
  image: "/images/psychological-assessment.jpg",

  introTitle: "Understand yourself through structured assessment",
  intro:
    "Psychological assessment uses structured tools and methods to explore selected aspects of an individual's psychological functioning. Depending on the purpose and assessment used, it may provide information related to personality, behaviour, cognitive abilities, emotional patterns, or other areas of psychological functioning.",

  benefits: [
    {
      title: "Structured evaluation",
      description:
        "Use appropriate assessment methods to explore specific psychological characteristics or areas of functioning."
    },
    {
      title: "Personality exploration",
      description:
        "Gain structured insights into selected personality characteristics and individual differences."
    },
    {
      title: "Behavioural understanding",
      description:
        "Explore behavioural tendencies and patterns through appropriate assessment approaches."
    },
    {
      title: "Cognitive abilities",
      description:
        "Where appropriate, selected assessments may provide information about specific cognitive abilities."
    },
    {
      title: "Self-awareness",
      description:
        "Use assessment findings as a starting point for reflection and greater personal understanding."
    },
    {
      title: "Professional interpretation",
      description:
        "Understand assessment findings within the context of the purpose, limitations, and appropriate interpretation of the assessment."
    }
  ],

  usefulFor: [
    "Personality exploration",
    "Behavioural understanding",
    "Cognitive assessment",
    "Self-understanding",
    "Educational guidance",
    "Personal development"
  ]
},
"moral-value-and-education": {
  number: "05",
  category: "EDUCATION & VALUE DEVELOPMENT",
  title: "Moral Value & Education",
  subtitle:
    "Encouraging ethical awareness, responsible thinking, character development, life skills, and meaningful personal growth.",
  image: MoralValueImage,

  introTitle: "Education that develops more than knowledge",
  intro:
    "Moral and value-based education focuses on developing ethical awareness, responsible thinking, empathy, discipline, character, and positive social behaviour. Through educational guidance and learning-oriented programmes, the aim is to connect knowledge with responsible personal and social development.",

  benefits: [
    {
      title: "Value-based learning",
      description:
        "Explore values that support responsible and meaningful personal development."
    },
    {
      title: "Character development",
      description:
        "Encourage positive character traits, discipline, responsibility, and constructive behaviour."
    },
    {
      title: "Ethical awareness",
      description:
        "Develop thoughtful understanding of ethics, choices, responsibilities, and social relationships."
    },
    {
      title: "Life skills",
      description:
        "Build practical skills that support communication, decision-making, emotional awareness, and everyday functioning."
    },
    {
      title: "Empathy and respect",
      description:
        "Encourage compassion, respect, cooperation, and positive relationships."
    },
    {
      title: "Personal development",
      description:
        "Connect education and values with long-term personal and social growth."
    }
  ],

  usefulFor: [
    "Students",
    "Parents",
    "Educators",
    "Young adults",
    "Life-skills development",
    "Character development"
  ]
},

  "spiritual-guidance": {
  number: "06",
  category: "SPIRITUALITY & INNER DEVELOPMENT",
  title: "Spiritual Guidance",
  subtitle:
    "A reflective space for exploring meaning, purpose, inner awareness, spiritual questions, and personal growth.",
  image: SpiritualImage,

  introTitle: "A space for reflection, meaning, and inner awareness",
  intro:
    "Spiritual guidance provides a supportive environment for individuals who wish to explore questions of meaning, purpose, consciousness, inner development, and spirituality. The approach respects individual beliefs and encourages thoughtful reflection rather than imposing a particular belief system.",

  benefits: [
    {
      title: "Inner awareness",
      description:
        "Develop greater awareness of your thoughts, experiences, values, and inner life."
    },
    {
      title: "Meaning and purpose",
      description:
        "Create space to reflect on questions of purpose, direction, values, and what matters to you."
    },
    {
      title: "Spiritual exploration",
      description:
        "Explore spiritual questions and experiences in a respectful and non-judgmental environment."
    },
    {
      title: "Reflection and mindfulness",
      description:
        "Encourage thoughtful reflection, awareness, and observation of your inner experiences."
    },
    {
      title: "Personal growth",
      description:
        "Explore personal development through reflection, awareness, and meaningful learning."
    },
    {
      title: "Respect for individual beliefs",
      description:
        "Engage with spiritual questions while respecting different traditions, perspectives, and personal beliefs."
    }
  ],

  usefulFor: [
    "Spiritual exploration",
    "Questions about meaning and purpose",
    "Inner reflection",
    "Personal growth",
    "Self-discovery",
    "Exploration of consciousness"
  ]
},
};

const ServiceDetail = () => {
  const { serviceSlug } = useParams();

  const service = servicesData[serviceSlug];

  if (!service) {
    return (
      <div className="service-not-found">
        <h1>Service Not Found</h1>
        <p>The service you are looking for does not exist.</p>
        <Link to="/services">Explore Our Services</Link>
      </div>
    );
  }

  return (
    <main className="service-page">
{/* =====================================================
          HERO
===================================================== */}
<section
  className="service-hero"
  style={{
    backgroundImage: `url(${service.image})`,
  }}
>
  {/* Overlay */}
  <div className="service-hero-overlay"></div>

  <div className="service-hero-container">
    <div className="service-hero-content">
      {/* Breadcrumb */}
      <div className="service-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/services">Services</Link>
        <span>/</span>
        <span>{service.title}</span>
      </div>

      {/* Number + Category */}
      {/* <div className="service-number">{service.number}</div> */}
      <span className="service-eyebrow">{service.category}</span>

      {/* Title + Subtitle */}
      <h1>{service.title}</h1>
      <p className="service-hero-description">{service.subtitle}</p>

      {/* Buttons */}
      <div className="service-hero-buttons">
        <Link to="/book-session" className="service-primary-btn">
          Book a Session <span>→</span>
        </Link>
        <a href="#pricing" className="service-secondary-btn">
          View Pricing
        </a>
      </div>

      {/* Trust Row */}
      <div className="service-trust-row">
        <div><span>✦</span> Confidential</div>
        <div><span>✦</span> Personalised</div>
        <div><span>✦</span> Thoughtful</div>
      </div>
    </div>
  </div>
</section>


      {/* =====================================================
          INTRO
      ===================================================== */}
      <section className="service-intro">

        <div className="service-container">

          <div className="intro-label">
            <span>01</span>
            <small>ABOUT THE SERVICE</small>
          </div>

          <div className="intro-content">

            <h2>
              {service.introTitle}
              <span>.</span>
            </h2>

            <p>
              {service.intro}
            </p>

            <div className="intro-line" />

            <p className="intro-small">
              Every session is approached with sensitivity,
              respect, and an understanding that every individual's
              journey is different.
            </p>

          </div>

        </div>

      </section>

{/* =====================================================
    BENEFITS
===================================================== */}
<section className="service-benefits">

  {/* Decorative background */}
  <div className="benefits-bg-circle benefits-bg-circle-1"></div>
  <div className="benefits-bg-circle benefits-bg-circle-2"></div>

  <div className="service-container">

    {/* ================= SECTION HEADER ================= */}
    <div className="section-heading benefits-heading">

      <div className="heading-label">
        <span className="heading-line"></span>
        <span>WHAT YOU CAN EXPLORE</span>
        <span className="heading-line"></span>
      </div>

      <h2>
        How this service can
        <em> support you</em>
      </h2>

      <p>
        Explore the areas where this service may provide
        clarity, reflection, support, or meaningful guidance.
      </p>

    </div>


    {/* ================= BENEFITS GRID ================= */}
    <div className="benefits-grid">

      {service.benefits.map((benefit, index) => (

        <article
          className="benefit-card"
          key={index}
        >

          {/* Top decoration */}
          <div className="benefit-card-top">

            <span className="benefit-number">
              {String(index + 1).padStart(2, "0")}
            </span>

            <span className="benefit-mini-line"></span>

          </div>


          {/* Icon */}
          <div className="benefit-icon-wrap">

            <div className="benefit-icon">
              ✦
            </div>

          </div>


          {/* Content */}
          <div className="benefit-content">

             <h3>
                    {typeof benefit === "string"
                      ? benefit
                      : benefit.title}
                  </h3>

                  <p>
                    {typeof benefit === "string"
                      ? "A thoughtful area of support designed to encourage clarity, reflection and personal understanding."
                      : benefit.description}
                  </p>

          </div>


          {/* Bottom */}
          <div className="benefit-card-bottom">

            <span className="benefit-explore">
              Explore
            </span>

            <span className="benefit-arrow">
              ↗
            </span>

          </div>


          {/* Hover decoration */}
          <div className="benefit-glow"></div>

        </article>

      ))}

    </div>


    {/* ================= BOTTOM MESSAGE ================= */}
    <div className="benefits-bottom">

      <div className="benefits-bottom-icon">
        ✦
      </div>

      <div>
        <strong>
          Your journey is personal.
        </strong>

        <span>
          Choose the areas that feel most meaningful to you.
        </span>
      </div>

    </div>

  </div>

</section>

{/* =========================================================
    SESSION PRICING
   ========================================================= */}
<section className="session-pricing-section">
  <div className="session-pricing-container">

    {/* Section Heading */}
    <div className="pricing-heading">
      <span className="pricing-eyebrow">
        INVEST IN YOUR JOURNEY
      </span>

      <h2>
        Choose the session{" "}
        <span>that suits you</span>
      </h2>

      <p>
        Begin with one session or choose our multiple-session plan
        for continued guidance and support.
      </p>
    </div>

    {/* Pricing Cards */}
    <div className="pricing-cards">

      {/* ================= SINGLE SESSION ================= */}
      <div className="pricing-card">

        <div className="pricing-card-top">
          <div>
            <span className="pricing-label">
              START HERE
            </span>

            <h3>Single Session</h3>
          </div>

          <div className="pricing-icon">
            ✦
          </div>
        </div>

        <div className="pricing-description">
          A focused one-to-one session designed around
          your individual needs and concerns.
        </div>

        {/* Price */}
        <div className="pricing-price">
          <span className="currency">₹</span>
          <span className="amount">500</span>
        </div>

        <div className="price-subtext">
          per session
        </div>

        {/* Divider */}
        <div className="pricing-divider"></div>

        {/* Features */}
        <ul className="pricing-features">
          <li>
            <span>✓</span>
            One personalised session
          </li>

          <li>
            <span>✓</span>
            Individual guidance
          </li>

          <li>
            <span>✓</span>
            Focused discussion
          </li>

          <li>
            <span>✓</span>
            Practical recommendations
          </li>
        </ul>

        {/* Button */}
        <button
          className="pricing-btn pricing-btn-outline"
          onClick={() => {
            // Replace with your booking navigation
            window.location.href = "/book-session";
          }}
        >
          Book Single Session
          <span>→</span>
        </button>

        <p className="pricing-note">
          Ideal for first-time consultations
        </p>

      </div>


      {/* ================= 5 SESSION PLAN ================= */}
      <div className="pricing-card pricing-card-popular">

        {/* Popular Badge */}
        <div className="popular-badge">
          MOST POPULAR
        </div>

        <div className="pricing-card-top">
          <div>
            <span className="pricing-label">
              CONTINUED SUPPORT
            </span>

            <h3>5 Session Journey</h3>
          </div>

          <div className="pricing-icon pricing-icon-gold">
            ✦
          </div>
        </div>

        <div className="pricing-description">
          A deeper journey of continued guidance,
          reflection and personal growth.
        </div>

        {/* Price */}
        <div className="pricing-price">
          <span className="currency">₹</span>
          <span className="amount">2,100</span>
        </div>

        <div className="price-subtext">
          ₹420 per session
        </div>

        {/* Saving */}
        <div className="saving-badge">
          Save ₹400
        </div>

        <div className="pricing-divider"></div>

        {/* Features */}
        <ul className="pricing-features">
          <li>
            <span>✓</span>
            Five personalised sessions
          </li>

          <li>
            <span>✓</span>
            Continued guidance & support
          </li>

          <li>
            <span>✓</span>
            Progress-based discussions
          </li>

          <li>
            <span>✓</span>
            Personalised recommendations
          </li>
        </ul>

        {/* Button */}
        <button
          className="pricing-btn pricing-btn-filled"
          onClick={() => {
            // Replace with your booking navigation
            window.location.href = "/book-session";
          }}
        >
          Begin Your Journey
          <span>→</span>
        </button>

        <p className="pricing-note">
          Best value for continued guidance
        </p>

      </div>

    </div>

    {/* Bottom Note */}
    <div className="pricing-bottom-note">
      <span>✦</span>
      Every session is approached with confidentiality,
      care and individual attention.
      <span>✦</span>
    </div>

  </div>
</section>


      {/* =====================================================
          WHO IS IT FOR
      ===================================================== */}
      <section className="service-useful">

        <div className="service-container useful-layout">

          <div className="useful-heading">

            <span>IS THIS FOR YOU?</span>

            <h2>
              When this service
              <em> may be helpful</em>
            </h2>

            <p>
              You may consider this service if you are looking
              for a thoughtful space to explore one or more of
              the following areas.
            </p>

            <Link
              to="/book-session"
              className="useful-btn"
            >
              Discuss Your Needs →
            </Link>

          </div>


          <div className="useful-list">

            {service.usefulFor.map((item, index) => (

              <div
                className="useful-item"
                key={index}
              >

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>
                  {item}
                </strong>

                <i>↗</i>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          PROCESS
      ===================================================== */}
      <section className="service-process">

        <div className="service-container">

          <div className="section-heading center">

            <span>HOW IT WORKS</span>

            <h2>
              Your journey,
              <em> simply explained</em>
            </h2>

          </div>


          <div className="process-grid">

            <div className="process-card">
              <span>01</span>
              <h3>Book</h3>
              <p>
                Select a suitable session and send us your
                booking request.
              </p>
            </div>

            <div className="process-card">
              <span>02</span>
              <h3>Connect</h3>
              <p>
                Attend your session in a comfortable and
                supportive environment.
              </p>
            </div>

            <div className="process-card">
              <span>03</span>
              <h3>Explore</h3>
              <p>
                Discuss your concerns, questions, goals,
                and areas you wish to understand.
              </p>
            </div>

            <div className="process-card">
              <span>04</span>
              <h3>Reflect</h3>
              <p>
                Take meaningful insights from the session
                into your personal journey.
              </p>
            </div>

          </div>

        </div>

      </section>

      <section className="service-disclaimer">
  <div className="service-container">
    <h3>Important Information</h3>

    <p>
      This Website provides counselling, educational,
      consultative, and research-oriented services. These services
      are not a substitute for medical, psychiatric, or emergency
      care. Psychological services offered through this platform
      should not be understood as clinical diagnosis or treatment.
    </p>

    <p>
      In matters involving astrology, spirituality, occult traditions,
      or reported anomalous experiences, interpretations are presented
      as perspectives for reflection and should not be treated as
      scientifically established facts.
    </p>
  </div>
</section>


      {/* =====================================================
          CTA
      ===================================================== */}
      <section className="service-cta">

        <div className="service-container">

          <div className="cta-content">

            <span>READY TO BEGIN?</span>

            <h2>
              Take the next step
              <em> toward yourself.</em>
            </h2>

            <p>
              Whether you are looking for clarity, reflection,
              understanding, or continued guidance, your journey
              can begin with a single conversation.
            </p>

            <Link
              to="/book-session"
              className="cta-button"
            >
              Book Your Session
              <span>→</span>
            </Link>

          </div>

          <div className="cta-symbol">
            ✦
          </div>

        </div>

      </section>

    </main>
  );
};

export default ServiceDetail;