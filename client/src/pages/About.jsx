import { useEffect} from "react";
import { Link } from "react-router-dom";
import { FaBullseye, FaLightbulb, FaHeart, FaUsers, FaCheck, FaStar, FaClock, FaUserShield } from "react-icons/fa";
import "./About.css";
import libraryImage from "../assets/images/library.jpeg";
/* ── Scroll reveal hook ─────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".ab-reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("ab-in"); io.unobserve(e.target); } }),
      { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Counter animation ──────────────────────────────────── */
function useCounter() {
  useEffect(() => {
    const counters = document.querySelectorAll(".ab-count-num");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || "";
        let cur = 0;
        const step = Math.ceil(target / 60);
        const timer = setInterval(() => {
          cur = Math.min(cur + step, target);
          el.textContent = cur + suffix;
          if (cur >= target) clearInterval(timer);
        }, 28);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const VALUES = [
  { icon: FaBullseye, title: "Purpose-Driven",   desc: "Every service is designed with your transformation as our primary goal.",                                color: "#C9A84C" },
  { icon: FaLightbulb,title: "Evidence-Based",   desc: "Combining ancient wisdom with modern psychological and scientific approaches.",                          color: "#5C3D8F" },
  { icon: FaHeart,     title: "Compassionate",    desc: "We provide judgment-free, empathetic support tailored to your unique needs.",                           color: "#C9A84C" },
  { icon: FaUsers,     title: "Community",        desc: "Building a supportive community of individuals on similar transformation journeys.",                     color: "#5C3D8F" },
];

const TEAM = [
  { name: "Expert Name 1", title: "Astrological Specialist",  desc: "20+ years of experience in Vedic astrology",                         emoji: "⭐" },
  { name: "Expert Name 2", title: "Clinical Psychologist",    desc: "Licensed therapist with specialization in holistic wellness",         emoji: "🧠" },
  { name: "Expert Name 3", title: "Spiritual Counselor",      desc: "Certified spiritual guide and meditation trainer",                    emoji: "🕯️" },
];

const WHY = [
  { icon: FaStar,       title: "Expert Guidance",       desc: "Highly qualified professionals with decades of combined experience"       },
  { icon: FaBullseye,   title: "Personalized Approach", desc: "Customized solutions tailored to your specific needs and goals"           },
  { icon: FaLightbulb,  title: "Holistic Solutions",    desc: "Integrated approach combining psychology, spirituality, and wellness"     },
  { icon: FaUserShield, title: "Confidentiality",       desc: "Private and secure sessions with complete confidentiality"               },
  { icon: FaClock,      title: "Flexible Scheduling",   desc: "Online and in-person consultations at times convenient for you"          },
  { icon: FaCheck,      title: "Proven Results",        desc: "95% client satisfaction rate with measurable life improvements"          },
];

const STATS = [
  { target: 500, suffix: "+", label: "Lives Transformed" },
  { target: 10,  suffix: "+", label: "Years of Practice"  },
  { target: 95,  suffix: "%", label: "Client Satisfaction"},
  { target: 6,   suffix: "",  label: "Disciplines"         },
];

export default function About() {
  useReveal();
  useCounter();

  return (
    <div className="ab-root">

   {/* ================= ABOUT HERO ================= */}

<section
  className="ab-hero"
  style={{
    backgroundImage: `
      linear-gradient(rgba(15,28,55,.72), rgba(15,28,55,.78)),
      url(${libraryImage})
    `,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="ab-container">

    <span className="ab-small-title">
      ABOUT PROSPER FOUNDATION
    </span>

    <h4 className="ab-hero-title">
     Building a future through knowledge, compassion, and human transformation.
    </h4>

  </div>

</section>
      {/* ══════════ STATS STRIP ═══════════════════════════════ */}
      <div className="ab-stats-strip">
        <div className="ab-container">
          <div className="ab-stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="ab-stat">
                <strong
                  className="ab-count-num"
                  data-target={s.target}
                  data-suffix={s.suffix}
                >0{s.suffix}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ WHO WE ARE ════════════════════════════════ */}
      <section className="ab-sec ab-who">
        <div className="ab-container">
          <div className="ab-who-grid">
            {/* Image side */}
            <div className="ab-reveal">
              <div className="ab-who-img-wrap">
                <div className="ab-who-img">
                  <span aria-hidden="true">✨</span>
                  {/* Replace span with: <img src="/images/about.jpg" alt="Prosper Foundation" /> */}
                </div>
                {/* Floating accent cards */}
                <div className="ab-who-float ab-who-float1" aria-hidden="true">
                  <span>🌟</span>
                  <div>
                    <strong>500+ Lives</strong>
                    <span>Transformed</span>
                  </div>
                </div>
                <div className="ab-who-float ab-who-float2" aria-hidden="true">
                  <span>⭐</span>
                  <div>
                    <strong>10+ Years</strong>
                    <span>of Excellence</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Text side */}
            <div className="ab-reveal ab-d1">
              <span className="ab-eye">Who We Are</span>
              <h2 className="ab-h2">A bridge between <em>ancient wisdom</em> & modern science</h2>
              <div className="ab-gold-bar" />
              <p className="ab-para">
                Prosper Foundation is a pioneering organisation dedicated to the integration
                of occult psychology, spiritual wisdom, and modern psychological practices
                to facilitate holistic personal development.
              </p>
              <p className="ab-para">
                Founded with a vision to create meaningful transformation, we combine
                cutting-edge psychological research with ancient spiritual knowledge to
                provide comprehensive guidance tailored to each individual's unique journey.
              </p>
              <Link to="/founder" className="ab-btn ab-btn-gold" style={{ marginTop: "8px" }}>
                Meet Our Founder →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MISSION / VISION / COMMITMENT ════════════ */}
      <section className="ab-sec ab-mvv">
        <div className="ab-container">
          <div className="ab-sec-header ab-reveal">
            <span className="ab-eye">Our Foundation</span>
            <h2 className="ab-h2">Mission, Vision & Commitment</h2>
            <div className="ab-gold-bar ab-gold-bar-c" />
          </div>
          <div className="ab-mvv-grid">
            {[
              { icon: "🎯", title: "Our Mission",    color: "#C9A84C", text: "To provide transformative guidance that bridges ancient spiritual knowledge with contemporary psychological understanding, making holistic healing accessible to all." },
              { icon: "🌟", title: "Our Vision",     color: "#5C3D8F", text: "A world where individuals can access comprehensive guidance for holistic growth, emotional balance, and spiritual awakening — free from judgment." },
              { icon: "💖", title: "Our Commitment", color: "#C9A84C", text: "Ethical, compassionate, and evidence-based services that promote long-term transformation and sustainable personal growth for every client." },
            ].map((m, i) => (
              <div key={m.title} className={`ab-mvv-card ab-reveal ab-d${i}`}>
                <div className="ab-mvv-icon" style={{ background: `${m.color}18` }}>{m.icon}</div>
                <h3 className="ab-mvv-title" style={{ color: m.color }}>{m.title}</h3>
                <p className="ab-mvv-body">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CORE VALUES ═══════════════════════════════ */}
      <section className="ab-sec ab-values">
        <div className="ab-container">
          <div className="ab-sec-header ab-reveal">
            <span className="ab-eye">What Drives Us</span>
            <h2 className="ab-h2">Our Core Values</h2>
            <p className="ab-sec-sub">Principles that guide everything we do</p>
            <div className="ab-gold-bar ab-gold-bar-c" />
          </div>
          <div className="ab-val-grid">
            {VALUES.map((v, i) => (
              <div key={v.title} className={`ab-val-card ab-reveal ab-d${i % 3}`}>
                <div className="ab-val-icon-wrap" style={{ background: `${v.color}15` }}>
                  <v.icon className="ab-val-icon" style={{ color: v.color }} aria-hidden="true" />
                </div>
                <h3 className="ab-val-title">{v.title}</h3>
                <p className="ab-val-body">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ TEAM ═════════════════════════════════════ */}
      <section className="ab-sec ab-team">
        <div className="ab-container">
          <div className="ab-sec-header ab-reveal">
            <span className="ab-eye">The People</span>
            <h2 className="ab-h2">Our Dedicated Team</h2>
            <p className="ab-sec-sub">Experienced professionals committed to your transformation</p>
            <div className="ab-gold-bar ab-gold-bar-c" />
          </div>
          <div className="ab-team-grid">
            {TEAM.map((m, i) => (
              <div key={m.name} className={`ab-team-card ab-reveal ab-d${i}`}>
                <div className="ab-team-photo">
                  <span aria-hidden="true">{m.emoji}</span>
                  {/* Replace with: <img src={`/images/team-${i+1}.jpg`} alt={m.name} /> */}
                </div>
                <div className="ab-team-body">
                  <h3 className="ab-team-name">{m.name}</h3>
                  <p className="ab-team-title">{m.title}</p>
                  <p className="ab-team-desc">{m.desc}</p>
                  <Link to="/book-session" className="ab-team-btn">Book Session →</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ WHY CHOOSE US ════════════════════════════ */}
      <section className="ab-sec ab-why">
        <div className="ab-container">
          <div className="ab-sec-header ab-reveal">
            <span className="ab-eye">Why Us</span>
            <h2 className="ab-h2">Why Choose Prosper Foundation?</h2>
            <div className="ab-gold-bar ab-gold-bar-c" />
          </div>
          <div className="ab-why-grid">
            {WHY.map((w, i) => (
              <div key={w.title} className={`ab-why-card ab-reveal ab-d${i % 3}`}>
                <div className="ab-why-icon-wrap" aria-hidden="true">
                  <w.icon className="ab-why-icon" />
                </div>
                <h3 className="ab-why-title">{w.title}</h3>
                <p className="ab-why-body">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ QUOTE STRIP ══════════════════════════════ */}
      <div className="ab-quote-strip">
        <div className="ab-container">
          <p className="ab-quote-text ab-reveal">
            "I approach life's challenges through <strong>occult psychology</strong> — seeking
            transformative solutions that promote <strong>emotional balance</strong>,
            spiritual awareness, and holistic growth."
          </p>
          <p className="ab-quote-attr ab-reveal ab-d1">— Dr. [Founder Name], Prosper Foundation</p>
        </div>
      </div>

      {/* ══════════ CTA ══════════════════════════════════════ */}
      <section className="ab-cta">
        <div className="ab-cta-orb ab-cta-orb1" aria-hidden="true" />
        <div className="ab-cta-orb ab-cta-orb2" aria-hidden="true" />
        <div className="ab-container ab-cta-inner">
          <span className="ab-ornament ab-reveal" aria-hidden="true">✦</span>
          <h2 className="ab-cta-h2 ab-reveal ab-d1">Begin Your Transformation Today</h2>
          <p className="ab-cta-sub ab-reveal ab-d2">
            Connect with our team and start your journey towards holistic growth, spiritual clarity, and lasting peace.
          </p>
          <div className="ab-cta-btns ab-reveal ab-d3">
            <Link to="/book-session" className="ab-btn ab-btn-gold ab-btn-lg">Book a Session ✦</Link>
            <Link to="/contact"      className="ab-btn ab-btn-ghost-light">Get in Touch</Link>
          </div>
        </div>
      </section>

    </div>
  );
}