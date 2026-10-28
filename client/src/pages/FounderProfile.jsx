// import React from "react";
// import { FaAward, FaUsers, FaBook, FaGraduationCap, FaQuoteLeft } from "react-icons/fa";
// import "./FounderProfile.css";

// const FounderProfile = () => {
//   const achievements = [
//     { icon: FaUsers, number: "5000+", label: "Clients Transformed" },
//     { icon: FaAward, number: "20+", label: "Years of Experience" },
//     { icon: FaBook, number: "100+", label: "Articles Published" },
//     { icon: FaGraduationCap, number: "50+", label: "Counselors Trained" },
//   ];

//   const qualifications = [
//     "Master's in Psychology",
//     "Certified Vedic Astrologer",
//     "Advanced Spiritual Counselor",
//     "NLP Practitioner",
//     "Life Coach Certification",
//     "Energy Healing Specialist",
//   ];

//   return (
//     <div className="founder-profile">
//       {/* Hero Section */}
//       <section className="founder-hero">
//         <div className="container">
//           <h1>Dr Amit Kumar Pushpam</h1>
//           <p>Founder & Director, Prosper Foundation</p>
//         </div>
//       </section>

//       {/* Profile Content */}
//       <section className="profile-content">
//         <div className="container">
//           <div className="profile-grid">
//             {/* Avatar */}
//             <div className="profile-avatar-section">
//               <div className="avatar-circle">
//                 <span>AK</span>
//               </div>
//               <div className="social-badges">
//                 <p>Visionary Leader</p>
//                 <p>Transformation Expert</p>
//                 <p>Author & Speaker</p>
//               </div>
//             </div>

//             {/* Profile Info */}
//             <div className="profile-info">
//               <h2>About Dr. Amit Kumar Pushpam</h2>

//               <p className="intro-text">
//                 Dr. Amit Kumar Pushpam is a visionary leader and pioneer in the field of
//                 occult psychology and spiritual sciences. With over 20 years of dedicated
//                 experience, he has revolutionized the approach to holistic personal
//                 development by seamlessly integrating ancient wisdom with contemporary
//                 psychological practices.
//               </p>

//               <h3>Professional Journey</h3>
//               <p>
//                 Dr. Pushpam began his journey with a deep passion for understanding human
//                 consciousness and transformation. His unique approach combines:
//               </p>

//               <ul className="feature-list">
//                 <li>Vedic Astrology principles</li>
//                 <li>Modern psychological theories</li>
//                 <li>Spiritual practices and meditation</li>
//                 <li>Occult sciences and paranormal research</li>
//                 <li>Life coaching and mentoring</li>
//               </ul>

//               <h3>Mission & Vision</h3>
//               <p>
//                 Through Prosper Foundation, Dr. Pushpam is committed to making transformative
//                 guidance accessible to everyone, regardless of their background or circumstances.
//                 His vision is to create a world where individuals can access comprehensive
//                 support for emotional, spiritual, and psychological growth.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Achievements */}
//       <section className="achievements-section">
//         <div className="container">
//           <h2 className="section-title">Achievements & Impact</h2>

//           <div className="achievements-grid">
//             {achievements.map((achievement, index) => (
//               <div key={index} className="achievement-card">
//                 <achievement.icon className="achievement-icon" />
//                 <h3>{achievement.number}</h3>
//                 <p>{achievement.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Qualifications */}
//       <section className="qualifications-section">
//         <div className="container">
//           <div className="qualifications-grid">
//             <div className="qualifications-text">
//               <h2>Qualifications & Expertise</h2>
//               <p>
//                 Dr. Pushpam holds multiple certifications and degrees in diverse fields,
//                 showcasing his commitment to continuous learning and professional excellence.
//               </p>

//               <div className="qualifications-list">
//                 {qualifications.map((qualification, index) => (
//                   <div key={index} className="qualification-item">
//                     <span className="checkmark">✓</span>
//                     <span>{qualification}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="expertise-box">
//               <h3>Areas of Expertise</h3>
//               <div className="expertise-tags">
//                 <span className="tag">Astrology</span>
//                 <span className="tag">Psychology</span>
//                 <span className="tag">Spirituality</span>
//                 <span className="tag">Occult Sciences</span>
//                 <span className="tag">Life Coaching</span>
//                 <span className="tag">Paranormal Research</span>
//                 <span className="tag">Energy Healing</span>
//                 <span className="tag">Meditation</span>
//                 <span className="tag">Personal Development</span>
//                 <span className="tag">Mental Wellness</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Publications */}
//       <section className="publications-section">
//         <div className="container">
//           <h2 className="section-title">Publications & Research</h2>

//           <div className="publications-grid">
//             <div className="publication-card">
//               <h3>📚 Books</h3>
//               <p>Author of multiple books on astrology, spirituality, and personal growth</p>
//               <p className="count">5+ Published Works</p>
//             </div>

//             <div className="publication-card">
//               <h3>📄 Research Papers</h3>
//               <p>Published peer-reviewed research in leading journals</p>
//               <p className="count">15+ Papers</p>
//             </div>

//             <div className="publication-card">
//               <h3>✍️ Articles</h3>
//               <p>Regular contributor to leading platforms and publications</p>
//               <p className="count">100+ Articles</p>
//             </div>

//             <div className="publication-card">
//               <h3>🎤 Speaking Engagements</h3>
//               <p>International speaker at conferences and seminars</p>
//               <p className="count">50+ Events</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="testimonials-section">
//         <div className="container">
//           <h2 className="section-title">What Clients Say</h2>

//           <div className="testimonials-grid">
//             <div className="testimonial-card">
//               <FaQuoteLeft className="quote-icon" />
//               <p>
//                 "Dr. Pushpam's approach completely transformed my understanding of life and
//                 purpose. His guidance has been invaluable."
//               </p>
//               <div className="testimonial-author">
//                 <p className="author-name">- Priya Singh</p>
//                 <p className="author-title">Client</p>
//               </div>
//             </div>

//             <div className="testimonial-card">
//               <FaQuoteLeft className="quote-icon" />
//               <p>
//                 "The integration of astrology and psychology that Dr. Pushpam offers is unique
//                 and highly effective. Truly transformative work."
//               </p>
//               <div className="testimonial-author">
//                 <p className="author-name">- Rajesh Kumar</p>
//                 <p className="author-title">Client</p>
//               </div>
//             </div>

//             <div className="testimonial-card">
//               <FaQuoteLeft className="quote-icon" />
//               <p>
//                 "Working with Dr. Pushpam has helped me heal deeper wounds and understand
//                 myself at a profound level."
//               </p>
//               <div className="testimonial-author">
//                 <p className="author-name">- Ananya Verma</p>
//                 <p className="author-title">Client</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="founder-cta">
//         <div className="container">
//           <h2>Work with Dr. Amit Kumar Pushpam</h2>
//           <p>
//             Experience transformative guidance from a master in occult psychology
//             and spiritual sciences
//           </p>
//           <div className="cta-buttons">
//             <button className="btn btn-primary">Book Consultation</button>
//             <button className="btn btn-secondary">Learn More</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default FounderProfile;


// ============================================================
// FounderProfile.jsx
// Place at: client/src/pages/FounderProfile.jsx
// Route in App.jsx: <Route path="/founder" element={<FounderProfile />} />
// ============================================================

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './FounderProfile.css';
import founderImage from "../assets/images/amit_passport_photo.jpeg";


// ─── Static data  (replace every placeholder with real info) ───────────────
const FOUNDER = {
  name:        'Dr. Amit Kumar Pushpam',
  designation: 'PhD · Astrology · Occult Psychologist',
  role:        'Founder & Lead Consultant — Prosper Foundation',
  hindi:       'सर्वस्यार्तिहरे देवि',
  tagline:     '"Where ancient Vedic wisdom meets the science of the modern mind."',
  photoUrl:    {founderImage},          // set to '/images/founder.jpg' when ready
  phone:       '+91 8809113638',
  email:       'pushpamamit@gmail.com',
  location:    'Samastipur, Bihar, India',
  social: {
    instagram: '#', youtube: '#', linkedin: '#', twitter: '#',
  },

  stats: [
    { num: '500+', lbl: 'Lives Transformed' },
    { num: '5+',  lbl: 'Years Practice'    },
    { num: '5+',  lbl: 'Publications'      },
    { num: '6',    lbl: 'Disciplines'       },
  ],

  // ── Biography ─────────────────────────────────────────────
  bio: [
    'Dr.Amit Kumar Pushpam is one of India\'s foremost practitioners at the crossroads of Vedic astrology, clinical psychology, and paranormal science — a discipline they have named Occult Psychology. Born in [City] with an unusual affinity for both the empirical and the esoteric, they spent two decades building a framework that refuses the false choice between science and spirit.',
    'After completing a PhD in Psychology from [University], Dr.Amit Kumar Pushpam spent several years in clinical practice. Working with patients suffering from anxiety, depression, and existential crisis, they encountered something no diagnostic manual fully addressed: the dimension of karma, of soul patterns, of the unseen forces that shape human behaviour as surely as childhood experiences do.',
    'This gap became the engine of a decade-long inquiry. A rigorous study of Jyotish — Vedic astrology — revealed that a birth chart, read correctly, is not a fortune-telling device but a precise map of psychological and karmic tendencies. Integrating this with CBT, ACT, and paranormal investigation methodology, Dr. [Name] developed the Occult Psychology framework: a system of guidance that is simultaneously evidence-based, spiritually grounded, and genuinely transformative.',
    'Today, as the founder of Antarjyoti Centre, Dr.Amit Kumar Pushpam leads a team of four practitioners offering six integrated services to clients across India and internationally. Their research has appeared in peer-reviewed journals, their books have reached readers across the subcontinent, and their sessions have fundamentally altered the trajectories of hundreds of lives.',
  ],

  // ── Philosophy ────────────────────────────────────────────
  philosophy: [
    { icon: '⭐', head: 'Jyotish as Psychology',        body: 'The birth chart is a map of karmic tendencies and psychological patterns — a compass, not a cage. Every planetary placement encodes information a skilled reader can translate into therapeutic insight.' },
    { icon: '🧠', head: 'Science without Spirit is Incomplete', body: 'Clinical frameworks provide rigour. Spiritual wisdom provides depth. The two are not in conflict — they are two lenses focused on the same subject: the human being.' },
    { icon: '👁️', head: 'The Paranormal is not Supernatural', body: 'Phenomena labelled paranormal are dimensions of reality not yet fully mapped by science. Approaching them with disciplined curiosity is both intellectually honest and therapeutically necessary.' },
    { icon: '🌿', head: 'Whole-Person Healing',          body: 'True transformation addresses the emotional body, the mental body, the energy body, and the karmic blueprint together. Partial healing is temporary. Whole healing is lasting.' },
  ],

  // ── Education ─────────────────────────────────────────────
  education: [
    { year: '[YYYY]', degree: 'Ph.D. in Psychology',              institution: 'Lalit Narayan University, Darbhanga',            detail: 'Thesis: Developing an Integrated Framework for Holistic Mental Health — The Role of Vedic Sciences in Contemporary Psychotherapy.' },
    { year: '2018', degree: 'P.G in Psychology',                institution: 'Lalit Narayan University, Darbhanga',               detail: 'Advanced Parashari Jyotish, Nadi astrology, transit analysis, and remedial measures. Trained under [Guru Name].' },
    { year: '2015', degree: 'Graduation in Psychology',         institution: 'B.R Ambedkar Bihar University , Muzaffarpur',            detail: 'Specialisation in Clinical Psychology. First class with distinction. Recipient of [Award Name].' },
    { year: '[YYYY]', degree: 'DCA',         institution: 'Digital Information Technology and Research for Professional',         detail: 'Foundation in psychology, philosophy, and Indian ethics. Gold medallist.' },
    { year: '[YYYY]', degree: 'Training',     institution: 'National Institute of Mental Health and Neuroscience, Bengaluru',                 detail: 'Working with the Children affected by Sexual abuse and Violance.' },
    { year: '[YYYY]', degree: 'Training',   institution: 'National Institute For Public Cooperation and Child Development',                     detail: 'Life Skills Development for Adolescents in CCls.' },
  ],

  // ── Career ────────────────────────────────────────────────
  career: [
    { period: '[YYYY] – Present', role: 'Founder & Lead Consultant',  org: 'Antarjyoti Centre, Bilaspur',          desc: 'Established and leads Antarjyoti Centre for Occult Psychology & Holistic Healing. Oversees all six service domains and leads a team of four practitioners.' },
    { period: '[YYYY] – [YYYY]',  role: 'Clinical Psychologist',       org: '[Hospital / Clinic Name], [City]',    desc: 'Provided individual and group therapy for anxiety, depression, OCD, trauma, and relationship issues. Developed protocols integrating mindfulness and Jyotish awareness into CBT.' },
    { period: '[YYYY] – [YYYY]',  role: 'Research Associate',          org: '[University / Research Institute]',   desc: 'Conducted peer-reviewed research on traditional Indian healing practices and contemporary psychotherapy. Co-authored three publications.' },
    { period: '[YYYY] – [YYYY]',  role: 'Independent Jyotish Consultant', org: 'Private Practice',               desc: 'Pioneered the integration of Vedic astrology with psychological case-work — the methodology that became the foundation of Occult Psychology and later Antarjyoti Centre.' },
  ],

  // ── Credentials ───────────────────────────────────────────
  credentials: [
    { icon: '🎓', title: 'PhD in Psychology',         sub: '[University], [Year]'        },
    { icon: '⭐', title: 'Jyotish Acharya',           sub: 'Vedic Astrology Certified'   },
    { icon: '🧠', title: 'Clinical Psychologist',    sub: 'RCI / [Council] Registered'  },
    { icon: '👁️', title: 'Paranormal Consultant',   sub: 'Certified Practitioner'      },
    { icon: '🕯️', title: 'Spiritual Counsellor',    sub: 'Certified Practitioner'      },
    { icon: '📊', title: 'Psychometric Assessor',    sub: 'Assessment Specialist'       },
  ],

  // ── Publications ──────────────────────────────────────────
  publications: [
    { type: 'Book',        year: '[YYYY]', title: 'The Paranormal Mind: A Scientific Approach to Occult Psychology and Human Consciousness',                          venue: '[Publisher] · 312 pp · ISBN 978-XX-XXXXX',                          citations: 89  },
    { type: 'Journal',     year: '[YYYY]', title: 'Occult Psychology: Integrating Vedic Astrology with Cognitive Behavioural Frameworks — A Theoretical Model',      venue: 'Journal of Transpersonal Psychology, Vol. 48, Issue 2',             citations: 42  },
    { type: 'Journal',     year: '[YYYY]', title: 'Karmic Patterns and Behavioural Psychology: An Empirical Study of 200 Clients Using Mixed Methods',               venue: 'Indian Journal of Psychology, Vol. 61, Issue 4',                    citations: 67  },
    { type: 'Conference',  year: '[YYYY]', title: 'Paranormal Phenomena and Psychological Distress: Bridging the Gap Between Science and Spirituality',               venue: 'International Conference on Consciousness Studies, Bangalore',      citations: 18  },
    { type: 'Thesis',      year: '[YYYY]', title: 'Developing an Integrated Framework for Holistic Mental Health: The Role of Vedic Sciences in Contemporary Psychotherapy', venue: 'PhD Thesis · [University Name]',                            citations: 113 },
  ],

  // ── Awards ────────────────────────────────────────────────
  awards: [
    { year: '[YYYY]', title: 'Best Research Paper',              body: '[Conference / Institution]' },
    { year: '[YYYY]', title: 'Young Psychologist of the Year',   body: '[Psychology Association]'   },
    { year: '[YYYY]', title: 'Excellence in Holistic Healing',   body: '[Award Body Name]'          },
  ],

  // ── Media / Appearances ───────────────────────────────────
  media: [
    { icon: '🎙️', kind: 'Podcast',   title: 'The Healing Mind Podcast',  detail: 'Ep. 142 — Occult Psychology Explained',                   year: '[YYYY]' },
    { icon: '📰', kind: 'Press',     title: '[Newspaper / Magazine]',    detail: 'Feature: "India\'s New Healers Who Bridge Science & Spirit"', year: '[YYYY]' },
    { icon: '🎤', kind: 'Talk',      title: 'TEDx [City]',               detail: '"What Your Birth Chart Says About Your Mental Health"',     year: '[YYYY]' },
    { icon: '📺', kind: 'TV / Media',title: '[Channel Name]',            detail: 'Expert Commentary on Paranormal Psychology',                year: '[YYYY]' },
  ],

  // ── Blog posts ────────────────────────────────────────────
  blogs: [
    { slug: 'occult-psychology-explained',   category: 'Psychology', date: 'June 12, 2025',  readTime: '8 min',  title: 'What is Occult Psychology? A Complete Guide',                                      excerpt: 'The intersection of Vedic astrology and clinical psychology creates a framework for understanding the self that neither discipline achieves alone...' },
    { slug: 'birth-chart-mental-health',     category: 'Jyotish',   date: 'May 28, 2025',   readTime: '6 min',  title: 'Can Your Birth Chart Reveal Your Mental Health Patterns?',                         excerpt: 'Your Lagna lord, Moon sign, and the 12th house encode psychological tendencies that most diagnostic tools never surface...' },
    { slug: 'paranormal-vs-psychology',      category: 'Paranormal', date: 'May 10, 2025',   readTime: '7 min',  title: 'Paranormal vs Psychology — Where Does One End and the Other Begin?',                excerpt: 'The line between what we label supernatural and what psychology calls dissociation is thinner than most clinicians will admit...' },
  ],
};

// ─── Tiny helpers ───────────────────────────────────────────────────────────
const BADGE_COLOR = {
  Journal:    'fp-b-blue',  Book:       'fp-b-green',
  Conference: 'fp-b-amber', Thesis:     'fp-b-rose',
  Psychology: 'fp-b-gem',   Jyotish:    'fp-b-amber',
  Paranormal: 'fp-b-rose',  Spirituality:'fp-b-green',
};
function Badge({ label }) {
  return <span className={`fp-badge ${BADGE_COLOR[label] || 'fp-b-blue'}`}>{label}</span>;
}

// ─── Scroll-reveal wrapper ──────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('fp-in'); io.disconnect(); } },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`fp-reveal ${className}`} style={{ transitionDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

// ─── Sticky table of contents ───────────────────────────────────────────────
const SECTIONS = [
  { id: 'fp-hero',     label: 'Overview'    },
  { id: 'fp-bio',      label: 'Biography'   },
  { id: 'fp-phil',     label: 'Philosophy'  },
  { id: 'fp-edu',      label: 'Education'   },
  { id: 'fp-career',   label: 'Career'      },
  { id: 'fp-creds',    label: 'Credentials' },
  { id: 'fp-pubs',     label: 'Research'    },
  { id: 'fp-awards',   label: 'Awards'      },
  { id: 'fp-media',    label: 'Media'       },
  { id: 'fp-blogs',    label: 'Writings'    },
];

function TOC() {
  const [active, setActive] = useState('fp-hero');
  useEffect(() => {
    const fn = () => {
      let cur = 'fp-hero';
      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && window.scrollY + 130 >= el.offsetTop) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className="fp-toc" aria-label="Page contents">
      <p className="fp-toc-head">Contents</p>
      <ul>
        {SECTIONS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={`fp-toc-lnk${active === id ? ' fp-toc-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ─── Section header ─────────────────────────────────────────────────────────
function SH({ eye, title }) {
  return (
    <div className="fp-sh">
      <span className="fp-eye">{eye}</span>
      <h2 className="fp-h2">{title}</h2>
      <div className="fp-bar" />
    </div>
  );
}

// ─── Main page ──────────────────────────────────────────────────────────────
export default function FounderProfile() {
  const [pubFilter, setPubFilter] = useState('All');
  const pubs = pubFilter === 'All'
    ? FOUNDER.publications
    : FOUNDER.publications.filter(p => p.type === pubFilter);

  return (
    <div className="fp-root">

      {/* ══════════ HERO ══════════════════════════════════════════ */}
      <section className="fp-hero" id="fp-hero">
        <div className="fp-orb fp-orb1" aria-hidden="true" />
        <div className="fp-orb fp-orb2" aria-hidden="true" />

        {/* Background mandala ring */}
        <svg className="fp-mandala-bg" viewBox="0 0 500 500" aria-hidden="true">
          {[230,190,150,110,70,35].map(r => <circle key={r} cx="250" cy="250" r={r}/>)}
          {[0,45,90,135].map(a => (
            <line key={a} x1="250" y1="20" x2="250" y2="480" transform={`rotate(${a} 250 250)`}/>
          ))}
          <polygon points="250,55 272,125 345,125 287,168 310,238 250,196 190,238 213,168 155,125 228,125"/>
        </svg>

        <div className="fp-wrap">
          <div className="fp-hero-grid">

            {/* ── Photo col ── */}
            <div className="fp-photo-col">
              <div className="fp-photo-ring">
                <div className="fp-photo-frame">
                  {FOUNDER.photoUrl
                    ? <img src={founderImage} alt={FOUNDER.name} className="fp-photo-img" />
                    : <span className="fp-photo-ph" aria-label="Founder photo">🌟</span>
                  }
                </div>
                
              </div>

              <div className="fp-social">
                {[['📸','Instagram',FOUNDER.social.instagram],['▶','YouTube',FOUNDER.social.youtube],['💼','LinkedIn',FOUNDER.social.linkedin],['🐦','Twitter',FOUNDER.social.twitter]].map(([ico,lbl,href])=>(
                  <a key={lbl} href={href} className="fp-soc-btn" aria-label={lbl} target="_blank" rel="noreferrer">{ico}</a>
                ))}
              </div>
            </div>

            {/* ── Text col ── */}
            <div className="fp-hero-txt">
              <div className="fp-pill">
                <span className="fp-pill-dot" aria-hidden="true"/>
                Founder & Lead Consultant · Prosper Foundation
              </div>

              <h1 className="fp-hero-name">{FOUNDER.name}</h1>
              <p className="fp-hero-desig">{FOUNDER.designation}</p>
              <p className="fp-hero-hindi" lang="hi">{FOUNDER.hindi}</p>
              <p className="fp-hero-tagline">{FOUNDER.tagline}</p>

              {/* Stats */}
              <div className="fp-stats">
                {FOUNDER.stats.map(s => (
                  <div key={s.lbl} className="fp-stat">
                    <strong>{s.num}</strong>
                    <span>{s.lbl}</span>
                  </div>
                ))}
              </div>

              {/* Quick facts */}
              <ul className="fp-qf">
                <li><span>📍</span>{FOUNDER.location}</li>
                <li><span>📧</span>{FOUNDER.email}</li>
                <li><span>📞</span>{FOUNDER.phone}</li>
              </ul>

              <div className="fp-hero-btns">
                <Link to="/book" className="fp-btn fp-btn-gold">Book a Session ✦</Link>
                <a href={`mailto:${FOUNDER.email}`} className="fp-btn fp-btn-ol">Email Dr. [Name] →</a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ BODY ══════════════════════════════════════════ */}
      <div className="fp-body">
        <div className="fp-wrap fp-body-grid">

          {/* Sticky TOC */}
          <aside className="fp-aside"><TOC /></aside>

          {/* Content */}
          <main className="fp-content">

            {/* ── Biography ──────────────────────────────────────── */}
            <section className="fp-sec" id="fp-bio">
              <Reveal><SH eye="Biography" title="The story behind the practice" /></Reveal>
              {FOUNDER.bio.map((para, i) => (
                <Reveal key={i} delay={i * 0.07}><p className="fp-para">{para}</p></Reveal>
              ))}
              <Reveal delay={0.25}>
                <blockquote className="fp-pull">
                  <span className="fp-pull-mark" aria-hidden="true">✦</span>
                  <div>
                    <p className="fp-pull-lbl">Personal Mission</p>
                    <p className="fp-pull-txt">"To approach every human being as a whole — mind, body, soul, and karma — and provide guidance that is evidence-based, spiritually grounded, and genuinely compassionate."</p>
                  </div>
                </blockquote>
              </Reveal>
            </section>

            {/* ── Philosophy ─────────────────────────────────────── */}
            <section className="fp-sec fp-sec-alt" id="fp-phil">
              <Reveal><SH eye="Core Beliefs" title="The philosophy that drives the work" /></Reveal>
              <div className="fp-phil-grid">
                {FOUNDER.philosophy.map((p, i) => (
                  <Reveal key={p.head} delay={i * 0.1}>
                    <div className="fp-phil-card">
                      <span className="fp-phil-icon" aria-hidden="true">{p.icon}</span>
                      <h3 className="fp-phil-head">{p.head}</h3>
                      <p className="fp-phil-body">{p.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Education ──────────────────────────────────────── */}
            <section className="fp-sec" id="fp-edu">
              <Reveal><SH eye="Academic Background" title="Education & training" /></Reveal>
              <div className="fp-tl">
                {FOUNDER.education.map((e, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <div className="fp-tl-item">
                      <div className="fp-tl-left">
                        <span className="fp-tl-year">{e.year}</span>
                        <div className="fp-tl-spine" aria-hidden="true"/>
                      </div>
                      <div className="fp-tl-card">
                        <div className="fp-tl-dot" aria-hidden="true"/>
                        <p className="fp-tl-degree">{e.degree}</p>
                        <p className="fp-tl-inst">{e.institution}</p>
                        <p className="fp-tl-detail">{e.detail}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Career ─────────────────────────────────────────── */}
            <section className="fp-sec fp-sec-alt" id="fp-career">
              <Reveal><SH eye="Professional Journey" title="Career & work experience" /></Reveal>
              <div className="fp-tl">
                {FOUNDER.career.map((c, i) => (
                  <Reveal key={i} delay={i * 0.09}>
                    <div className="fp-tl-item">
                      <div className="fp-tl-left">
                        <span className="fp-tl-year" style={{ fontSize: '.68rem' }}>{c.period}</span>
                        <div className="fp-tl-spine" aria-hidden="true"/>
                      </div>
                      <div className="fp-tl-card fp-tl-career">
                        <div className="fp-tl-dot fp-tl-dot-gem" aria-hidden="true"/>
                        <p className="fp-tl-degree">{c.role}</p>
                        <p className="fp-tl-inst">🏢 {c.org}</p>
                        <p className="fp-tl-detail">{c.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Credentials ────────────────────────────────────── */}
            <section className="fp-sec" id="fp-creds">
              <Reveal><SH eye="Certifications" title="Credentials & qualifications" /></Reveal>
              <div className="fp-cred-grid">
                {FOUNDER.credentials.map((c, i) => (
                  <Reveal key={c.title} delay={i * 0.08}>
                    <div className="fp-cred-card">
                      <span className="fp-cred-icon" aria-hidden="true">{c.icon}</span>
                      <p className="fp-cred-title">{c.title}</p>
                      <p className="fp-cred-sub">{c.sub}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Research & Publications ─────────────────────────── */}
            <section className="fp-sec fp-sec-alt" id="fp-pubs">
              <Reveal><SH eye="Academic Work" title="Research & publications" /></Reveal>

              {/* Research stats row */}
              <Reveal delay={0.1}>
                <div className="fp-res-stats">
                  {[['12','Journal Papers'],['3','Books'],['8','Conferences'],['240+','Citations']].map(([n,l])=>(
                    <div key={l} className="fp-res-stat">
                      <strong>{n}</strong><span>{l}</span>
                    </div>
                  ))}
                </div>
              </Reveal>

              {/* Filter */}
              <Reveal delay={0.12}>
                <div className="fp-filt-row" role="group" aria-label="Filter by type">
                  {['All','Journal','Book','Conference','Thesis'].map(t => (
                    <button
                      key={t}
                      className={`fp-filt${pubFilter === t ? ' fp-filt-on' : ''}`}
                      onClick={() => setPubFilter(t)}
                    >{t}</button>
                  ))}
                </div>
              </Reveal>

              <div className="fp-pub-list">
                {pubs.map((p, i) => (
                  <Reveal key={i} delay={i * 0.06}>
                    <div className="fp-pub-card">
                      <div className="fp-pub-top">
                        <Badge label={p.type} />
                        <span className="fp-pub-year">{p.year}</span>
                      </div>
                      <p className="fp-pub-title">{p.title}</p>
                      <p className="fp-pub-venue">{p.venue}</p>
                      <div className="fp-pub-foot">
                        <span className="fp-pub-cite">📖 {p.citations} citations</span>
                        <button className="fp-pub-dl">↓ Download PDF</button>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Awards ─────────────────────────────────────────── */}
            <section className="fp-sec" id="fp-awards">
              <Reveal><SH eye="Recognition" title="Awards & honours" /></Reveal>
              <div className="fp-awards">
                {FOUNDER.awards.map((a, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="fp-award">
                      <span className="fp-award-trophy" aria-hidden="true">🏆</span>
                      <span className="fp-award-year">{a.year}</span>
                      <div>
                        <p className="fp-award-title">{a.title}</p>
                        <p className="fp-award-body">{a.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Media & Appearances ────────────────────────────── */}
            <section className="fp-sec fp-sec-alt" id="fp-media">
              <Reveal><SH eye="Media & Talks" title="Appearances & press" /></Reveal>
              <div className="fp-media-grid">
                {FOUNDER.media.map((m, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <div className="fp-media-card">
                      <span className="fp-media-icon" aria-hidden="true">{m.icon}</span>
                      <div className="fp-media-info">
                        <span className="fp-media-kind">{m.kind}</span>
                        <p className="fp-media-title">{m.title}</p>
                        <p className="fp-media-detail">{m.detail}</p>
                        <span className="fp-media-year">{m.year}</span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* ── Blog / Writings ────────────────────────────────── */}
            <section className="fp-sec" id="fp-blogs">
              <Reveal><SH eye="Writings" title="Recent articles & insights" /></Reveal>
              <div className="fp-blog-grid">
                {FOUNDER.blogs.map((b, i) => (
                  <Reveal key={b.slug} delay={i * 0.1}>
                    <Link to={`/blogs/${b.slug}`} className="fp-blog-card">
                      <div className="fp-blog-img" aria-hidden="true">
                        {i === 0 ? '🧠' : i === 1 ? '⭐' : '👁️'}
                      </div>
                      <div className="fp-blog-body">
                        <Badge label={b.category} />
                        <h3 className="fp-blog-title">{b.title}</h3>
                        <p className="fp-blog-excerpt">{b.excerpt}</p>
                        <div className="fp-blog-meta">
                          <span>{b.date}</span><span>·</span><span>{b.readTime} read</span>
                        </div>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <div style={{ textAlign:'center', marginTop:'32px' }}>
                  <Link to="/blog" className="fp-btn fp-btn-ol-dk">View All Articles →</Link>
                </div>
              </Reveal>
            </section>

            {/* ── CTA / Connect ───────────────────────────────────── */}
            <section className="fp-cta-sec">
              <Reveal>
                <div className="fp-cta-inner">
                  <span className="fp-ornament" aria-hidden="true">✦</span>
                  <h2 className="fp-cta-h2">Ready to begin your transformation?</h2>
                  <p className="fp-cta-sub">Book a one-on-one session or a free 20-minute discovery call with Dr. [Name].</p>
                  <div className="fp-cta-btns">
                    <Link to="/book" className="fp-btn fp-btn-gold fp-btn-lg">Book a Session ✦</Link>
                    <a
                      href={`https://wa.me/${FOUNDER.phone.replace(/\D/g,'')}?text=Hello%20Dr.%20I%20would%20like%20to%20book%20a%20session.`}
                      target="_blank" rel="noreferrer"
                      className="fp-btn fp-btn-wa"
                    >💬 WhatsApp Now</a>
                  </div>
                  <p className="fp-cta-meta">
                    {FOUNDER.email} · {FOUNDER.phone} · {FOUNDER.location} · Online Worldwide
                  </p>
                </div>
              </Reveal>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}