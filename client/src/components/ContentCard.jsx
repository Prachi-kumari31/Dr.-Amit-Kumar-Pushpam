// import React from "react";
// import {
//   FaArrowRight,
//   FaClock,
//   FaEye,
//   FaBookOpen,
// } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const ContentCard = ({ item, type }) => {
//   const slug =
//     item.slug ||
//     item._id;

//   const image =
//     item.coverImage ||
//     item.coverImage ||
//     item.image;

//   const title =
//     item.title ||
//     "Untitled";

//   const excerpt =
//     item.excerpt ||
//     item.description ||
//     "Explore this publication from Prosper Foundation.";

//   const date =
//     item.publishedAt ||
//     item.createdAt;

//   return (
//     <article className="content-card">

//       <Link
//         to={`/${type}/${slug}`}
//         className="content-card-image"
//       >
//         {image ? (
//           <img
//             src={image}
//             alt={title}
//             loading="lazy"
//           />
//         ) : (
//           <div className="content-image-placeholder">
//             <FaBookOpen />
//           </div>
//         )}

//         {item.category && (
//           <span className="content-category">
//             {item.category}
//           </span>
//         )}
//       </Link>

//       <div className="content-card-body">

//         <div className="content-meta">

//           {date && (
//             <span>
//               {new Date(date).toLocaleDateString(
//                 "en-IN",
//                 {
//                   day: "2-digit",
//                   month: "short",
//                   year: "numeric",
//                 }
//               )}
//             </span>
//           )}

//           {item.readingTime && (
//             <>
//               <span>•</span>
//               <span>
//                 <FaClock />
//                 {item.readingTime} min
//               </span>
//             </>
//           )}

//           {item.views !== undefined && (
//             <>
//               <span>•</span>
//               <span>
//                 <FaEye />
//                 {item.views}
//               </span>
//             </>
//           )}

//         </div>

//         <h2>
//           <Link to={`/${type}/${slug}`}>
//             {title}
//           </Link>
//         </h2>

//         <p>{excerpt}</p>

//         {item.tags?.length > 0 && (
//           <div className="content-tags">
//             {item.tags.slice(0, 3).map(
//               (tag) => (
//                 <span key={tag}>
//                   #{tag}
//                 </span>
//               )
//             )}
//           </div>
//         )}

//         <Link
//           to={`/${type}/${slug}`}
//           className="read-more-btn"
//         >
//           Read More
//           <FaArrowRight />
//         </Link>

//       </div>
//     </article>
//   );
// };

// export default ContentCard;


import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Eye,
  ArrowUpRight,
  BookOpen,
  Feather,
  FileText,
  Sparkles,
} from "lucide-react";

import "./ContentCard.css";

const typeIcons = {
  blog: FileText,
  article: FileText,
  story: Feather,
  poem: Feather,
  book: BookOpen,
  publication: Sparkles,
};

const ContentCard = ({
  item,
  type,
  linkTo,
  showViews = true,
  className = "",
}) => {
  if (!item) return null;

  const itemType =
    type ||
    item.type ||
    "content";

  const Icon =
    typeIcons[itemType] || FileText;

  const id =
    item._id ||
    item.id;

  const title =
    item.title ||
    "Untitled";

  const excerpt =
    item.excerpt ||
    item.description ||
    "";

  const image =
    item.coverImage ||
    item.coverImage||
    item.image ||
    "";

  const author =
    item.author?.name ||
    item.author?.fullName ||
    item.author?.username ||
    item.author ||
    "Prosper Foundation";

  const date =
    item.publishedAt ||
    item.createdAt;

  const formattedDate = date
    ? new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "";

  const href =
    linkTo ||
    `/content/${item.slug || id}`;

  return (
    <article
      className={`content-card ${className}`}
    >
      <Link
        to={href}
        className="content-card-image-link"
      >
        <div className="content-card-image">
          {image ? (
            <img
              src={image}
              alt={title}
              loading="lazy"
              onError={(event) => {
                event.currentTarget.style.display =
                  "none";
              }}
            />
          ) : (
            <div className="content-card-placeholder">
              <Icon size={42} />
            </div>
          )}

          <div className="content-card-overlay" />

          <span className="content-card-type">
            <Icon size={14} />
            {itemType}
          </span>

          {item.isFeatured && (
            <span className="content-card-featured">
              <Sparkles size={13} />
              Featured
            </span>
          )}

          <span className="content-card-arrow">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </Link>

      <div className="content-card-body">
        <div className="content-card-meta">
          {formattedDate && (
            <span>
              <Calendar size={14} />
              {formattedDate}
            </span>
          )}

          {item.readTime && (
            <span>
              <Clock size={14} />
              {item.readTime} min read
            </span>
          )}

          {showViews &&
            typeof item.views ===
              "number" && (
              <span>
                <Eye size={14} />
                {item.views}
              </span>
            )}
        </div>

        <Link
          to={href}
          className="content-card-title"
        >
          {title}
        </Link>

        {excerpt && (
          <p className="content-card-excerpt">
            {excerpt.length > 150
              ? `${excerpt.substring(
                  0,
                  150
                )}...`
              : excerpt}
          </p>
        )}

        <div className="content-card-footer">
          <div className="content-card-author">
            <div className="content-card-author-avatar">
              {author
                .charAt(0)
                .toUpperCase()}
            </div>

            <span>{author}</span>
          </div>

          <Link
            to={href}
            className="content-card-read"
          >
            Read
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ContentCard;