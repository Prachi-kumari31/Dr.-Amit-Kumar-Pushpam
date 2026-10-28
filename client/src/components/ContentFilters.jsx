// import React from "react";
// import { FaSearch } from "react-icons/fa";

// const ContentFilters = ({
//   search,
//   setSearch,
//   category,
//   setCategory,
//   categories = [],
// }) => {
//   return (
//     <div className="content-filters">

//       <div className="content-search">
//         <FaSearch />

//         <input
//           type="text"
//           value={search}
//           placeholder="Search articles, stories, books..."
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />
//       </div>

//       <div className="content-categories">

//         <button
//           className={!category ? "active" : ""}
//           onClick={() => setCategory("")}
//         >
//           All
//         </button>

//         {categories.map((item) => (
//           <button
//             key={item}
//             className={
//               category === item
//                 ? "active"
//                 : ""
//             }
//             onClick={() =>
//               setCategory(item)
//             }
//           >
//             {item}
//           </button>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default ContentFilters;


import React from "react";
import {
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import "./ContentFilter.css";

const ContentFilter = ({
  search,
  setSearch,
  type,
  setType,
  category,
  setCategory,
  categories = [],
  showType = true,
  placeholder = "Search articles, stories, poems...",
}) => {
  const hasFilters =
    search ||
    type ||
    category;

  const clearFilters = () => {
    setSearch?.("");
    setType?.("");
    setCategory?.("");
  };

  return (
    <div className="content-filter">
      <div className="content-filter-search">
        <Search size={19} />

        <input
          type="text"
          value={search || ""}
          onChange={(event) =>
            setSearch?.(
              event.target.value
            )
          }
          placeholder={placeholder}
          aria-label="Search content"
        />

        {search && (
          <button
            type="button"
            className="content-filter-clear-search"
            onClick={() =>
              setSearch?.("")
            }
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="content-filter-controls">
        <div className="content-filter-label">
          <SlidersHorizontal
            size={16}
          />
          Filters
        </div>

        {showType && (
          <select
            value={type || ""}
            onChange={(event) =>
              setType?.(
                event.target.value
              )
            }
          >
            <option value="">
              All Types
            </option>

            <option value="blog">
              Blogs
            </option>

            <option value="article">
              Articles
            </option>

            <option value="story">
              Stories
            </option>

            <option value="poem">
              Poems
            </option>

            <option value="book">
              eBooks
            </option>

            <option value="publication">
              Publications
            </option>
          </select>
        )}

        {categories.length > 0 && (
          <select
            value={category || ""}
            onChange={(event) =>
              setCategory?.(
                event.target.value
              )
            }
          >
            <option value="">
              All Categories
            </option>

            {categories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}
          </select>
        )}

        {hasFilters && (
          <button
            type="button"
            className="content-filter-reset"
            onClick={
              clearFilters
            }
          >
            <X size={15} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ContentFilter;