// import React from "react";

// const ContentHero = ({
//   title,
//   subtitle,
//   type,
// }) => {
//   return (
//     <section className="content-hero">

//       <div className="content-hero-overlay"></div>

//       <div className="content-hero-content">

//         <span className="content-hero-label">
//           Prosper Foundation
//         </span>

//         <h1>{title}</h1>

//         <p>{subtitle}</p>

//         {type && (
//           <span className="hero-content-type">
//             {type}
//           </span>
//         )}

//       </div>
//     </section>
//   );
// };

// export default ContentHero;


import React from "react";
import {
  ArrowDown,
  Sparkles,
} from "lucide-react";

import "./ContentHero.css";

const ContentHero = ({
  eyebrow = "Prosper Foundation",
  title = "Explore Ideas That Inspire Transformation",
  description = "Discover thoughtful articles, stories, poems, research and publications bringing together psychology, spirituality, philosophy and deeper perspectives on life.",
  image,
  children,
}) => {
  return (
    <section className="content-hero">
      {image && (
        <img
          className="content-hero-background"
          src={image}
          alt=""
          aria-hidden="true"
        />
      )}

      <div className="content-hero-pattern" />

      <div className="content-hero-container">
        <div className="content-hero-content">
          <div className="content-hero-eyebrow">
            <Sparkles size={15} />
            {eyebrow}
          </div>

          <h1>{title}</h1>

          <p>{description}</p>

          {children && (
            <div className="content-hero-actions">
              {children}
            </div>
          )}
        </div>

        <div className="content-hero-decoration">
          <div className="content-hero-orbit orbit-one" />
          <div className="content-hero-orbit orbit-two" />
          <div className="content-hero-orbit orbit-three" />

          <div className="content-hero-glow">
            <Sparkles size={40} />
          </div>
        </div>
      </div>

      <div className="content-hero-scroll">
        <ArrowDown size={16} />
        <span>Explore</span>
      </div>
    </section>
  );
};

export default ContentHero;