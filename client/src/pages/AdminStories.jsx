// import React, { useEffect, useState } from "react";
// import {
//   FaPlus,
//   FaSearch,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaBookOpen,
//   FaSyncAlt,
// } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";
// import AdminLayout from "../components/AdminLayout";
// import { apiFetch } from "../utils/api";

// import "./AdminStories.css";

// const AdminStories = () => {
//   const navigate = useNavigate();

//   const [stories, setStories] = useState([]);
//   const [search, setSearch] = useState("");
//   const [status, setStatus] = useState("all");
//   const [loading, setLoading] = useState(true);

//   const fetchStories = async () => {
//     try {
//       setLoading(true);

//       const response = await apiFetch(
//         "/stories/admin/all"
//       );

//       setStories(response?.data || []);
//     } catch (error) {
//       console.error(
//         "Fetch stories error:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStories();
//   }, []);

//   const handleDelete = async (id) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to delete this story?"
//       )
//     ) {
//       return;
//     }

//     try {
//       await apiFetch(`/stories/${id}`, {
//         method: "DELETE",
//       });

//       fetchStories();
//     } catch (error) {
//       console.error(
//         "Delete story error:",
//         error
//       );
//     }
//   };

//   const filteredStories = stories.filter(
//     (story) => {
//       const matchesSearch =
//         story.title
//           ?.toLowerCase()
//           .includes(search.toLowerCase());

//       const matchesStatus =
//         status === "all" ||
//         story.status === status;

//       return (
//         matchesSearch &&
//         matchesStatus
//       );
//     }
//   );

//   return (
//     <AdminLayout>
//       <div className="admin-content">

//         <div className="stories-header">

//           <div>
//             {/* <span className="section-eyebrow">
//               CONTENT MANAGEMENT
//             </span> */}

//             <h1>
//               Stories
//             </h1>

//             <p>
//               Write, publish and manage
//               stories for your readers.
//             </p>
//           </div>

//           <button
//             className="create-story-btn"
//             onClick={() =>
//               navigate("/admin/stories/new")
//             }
//           >
//             <FaPlus />
//             New Story
//           </button>

//         </div>


//         <div className="story-toolbar">

//           <div className="story-search">
//             <FaSearch />

//             <input
//               type="text"
//               placeholder="Search stories..."
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//             />
//           </div>

//           <select
//             value={status}
//             onChange={(e) =>
//               setStatus(e.target.value)
//             }
//             className="story-filter"
//           >
//             <option value="all">
//               All Stories
//             </option>

//             <option value="published">
//               Published
//             </option>

//             <option value="draft">
//               Draft
//             </option>
//           </select>

//           <button
//             className="story-refresh"
//             onClick={fetchStories}
//           >
//             <FaSyncAlt />
//           </button>

//         </div>


//         {loading ? (
//           <div className="stories-loading">
//             <FaSyncAlt />
//             <p>
//               Loading stories...
//             </p>
//           </div>
//         ) : (

//           <div className="stories-grid">

//             {filteredStories.map(
//               (story) => (

//                 <article
//                   className="story-admin-card"
//                   key={story._id}
//                 >

//                   <div className="story-card-image">

//                     {story.coverImage ? (
//                       <img
//                         src={story.coverImage}
//                         alt={story.title}
//                       />
//                     ) : (
//                       <div className="story-image-placeholder">
//                         <FaBookOpen />
//                       </div>
//                     )}

//                     <span
//                       className={`story-status ${story.status}`}
//                     >
//                       {story.status}
//                     </span>

//                   </div>


//                   <div className="story-card-content">

//                     <h2>
//                       {story.title}
//                     </h2>

//                     <p>
//                       {story.excerpt ||
//                         "No excerpt added."}
//                     </p>


//                     <div className="story-card-meta">

//                       <span>
//                         {story.views || 0}
//                         {" "}views
//                       </span>

//                       <span>
//                         {story.likes || 0}
//                         {" "}likes
//                       </span>

//                     </div>


//                     <div className="story-card-actions">

//                       <button
//                         className="edit-story"
//                         onClick={() =>
//                           navigate(
//                             `/admin/stories/edit/${story._id}`
//                           )
//                         }
//                       >
//                         <FaEdit />
//                         Edit
//                       </button>

//                       <button
//                         className="view-story"
//                         onClick={() =>
//                           window.open(
//                             `/stories/${story._id}`,
//                             "_blank"
//                           )
//                         }
//                       >
//                         <FaEye />
//                       </button>

//                       <button
//                         className="delete-story"
//                         onClick={() =>
//                           handleDelete(
//                             story._id
//                           )
//                         }
//                       >
//                         <FaTrash />
//                       </button>

//                     </div>

//                   </div>

//                 </article>

//               )
//             )}

//           </div>

//         )}

//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminStories;



import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaHeart,
  FaComment,
  FaBookOpen,
  FaFeatherAlt,
  FaGlobe,
  FaFileAlt,
  FaSyncAlt,
} from "react-icons/fa";

import {
  getAdminStories,
  publishStory,
  unpublishStory,
  deleteStory,
} from "../api/storyApi";

import AdminLayout from "../components/AdminLayout";

import "./AdminStories.css";


export default function AdminStories() {
  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [typeFilter, setTypeFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");


  /* =========================================================
     FETCH ADMIN CONTENT
  ========================================================= */

  const loadContent = async (
    showRefresh = false
  ) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const data =
        await getAdminStories({
          type: typeFilter,
          status: statusFilter,
        });

      /*
       * getAdminStories ALWAYS returns an array.
       */
      const safeData =
        Array.isArray(data)
          ? data
          : [];

      console.log(
        "ADMIN STORIES:",
        safeData
      );

      setItems(safeData);

    } catch (err) {
      console.error(
        "Admin stories fetch error:",
        err
      );

      setItems([]);

      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load stories."
      );

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  /* =========================================================
     INITIAL LOAD
  ========================================================= */

  useEffect(() => {
    loadContent();
  }, [typeFilter, statusFilter]);


  /* =========================================================
     FILTER
  ========================================================= */

  const filteredItems =
    useMemo(() => {
      const safeItems =
        Array.isArray(items)
          ? items
          : [];

      const searchValue =
        search
          .trim()
          .toLowerCase();

      return safeItems.filter(
        (item) => {
          const title =
            String(
              item?.title || ""
            ).toLowerCase();

          const excerpt =
            String(
              item?.excerpt || ""
            ).toLowerCase();

          const category =
            String(
              item?.category || ""
            ).toLowerCase();

          const matchesSearch =
            !searchValue ||
            title.includes(
              searchValue
            ) ||
            excerpt.includes(
              searchValue
            ) ||
            category.includes(
              searchValue
            );

          return matchesSearch;
        }
      );
    }, [
      items,
      search,
    ]);


  /* =========================================================
     PUBLISH
  ========================================================= */

  const handlePublish =
    async (id) => {
      try {
        setError("");

        await publishStory(id);

        await loadContent();

      } catch (err) {
        console.error(
          "Publish error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to publish."
        );
      }
    };


  /* =========================================================
     UNPUBLISH
  ========================================================= */

  const handleUnpublish =
    async (id) => {
      try {
        setError("");

        await unpublishStory(id);

        await loadContent();

      } catch (err) {
        console.error(
          "Unpublish error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to unpublish."
        );
      }
    };


  /* =========================================================
     DELETE
  ========================================================= */

  const handleDelete =
    async (id) => {
      const confirmed =
        window.confirm(
          "Delete this content permanently?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setError("");

        await deleteStory(id);

        await loadContent();

      } catch (err) {
        console.error(
          "Delete error:",
          err
        );

        setError(
          err?.response?.data?.message ||
          err?.message ||
          "Unable to delete."
        );
      }
    };


  /* =========================================================
     CREATE
  ========================================================= */

  const handleCreate =
    () => {
      window.location.href =
        "/admin/stories/new";
    };


  /* =========================================================
     COUNTS
  ========================================================= */

  const total =
    Array.isArray(items)
      ? items.length
      : 0;

  const storyCount =
    Array.isArray(items)
      ? items.filter(
          (item) =>
            item?.contentType ===
            "story"
        ).length
      : 0;

  const poemCount =
    Array.isArray(items)
      ? items.filter(
          (item) =>
            item?.contentType ===
            "poem"
        ).length
      : 0;

  const publishedCount =
    Array.isArray(items)
      ? items.filter(
          (item) =>
            item?.status ===
            "published"
        ).length
      : 0;


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="editorial-page">

      {/* HEADER */}

      <header className="editorial-header">

        <div>

          <div className="editorial-eyebrow">
            EDITORIAL STUDIO
          </div>

          <h1>
            Stories & Poems
          </h1>

          <p>
            Create, refine and publish
            meaningful writing for the
            Prosper Foundation community.
          </p>

        </div>

        <button
          type="button"
          className="create-content-btn"
          onClick={handleCreate}
        >
          <FaPlus />
          Create
        </button>

      </header>


      {/* STATS */}

      <section className="editorial-stats">

        <div>
          <FaFileAlt />

          <strong>
            {total}
          </strong>

          <span>
            Total
          </span>
        </div>


        <div>
          <FaBookOpen />

          <strong>
            {storyCount}
          </strong>

          <span>
            Stories
          </span>
        </div>


        <div>
          <FaFeatherAlt />

          <strong>
            {poemCount}
          </strong>

          <span>
            Poems
          </span>
        </div>


        <div>
          <FaGlobe />

          <strong>
            {publishedCount}
          </strong>

          <span>
            Published
          </span>
        </div>

      </section>


      {/* ERROR */}

      {error && (
        <div className="editorial-error">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              loadContent(true)
            }
          >
            Try again
          </button>

        </div>
      )}


      {/* TOOLBAR */}

      <section className="editorial-toolbar">

        <div className="editorial-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search stories and poems..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>


        <select
          value={typeFilter}
          onChange={(e) =>
            setTypeFilter(
              e.target.value
            )
          }
        >

          <option value="all">
            All content
          </option>

          <option value="story">
            Stories
          </option>

          <option value="poem">
            Poems
          </option>

        </select>


        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
        >

          <option value="all">
            All status
          </option>

          <option value="draft">
            Drafts
          </option>

          <option value="published">
            Published
          </option>

        </select>


        <button
          type="button"
          className="refresh-content-btn"
          onClick={() =>
            loadContent(true)
          }
          disabled={loading || refreshing}
        >

          <FaSyncAlt
            className={
              refreshing
                ? "refresh-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}

        </button>

      </section>


      {/* CONTENT */}

      {loading ? (

        <div className="editorial-loading">
          Loading editorial library...
        </div>

      ) : (

        <section className="editorial-grid">

          {filteredItems.length ===
          0 ? (

            <div className="editorial-empty">

              <FaBookOpen />

              <h3>
                {items.length === 0
                  ? "No content found"
                  : "Nothing matches your search"}
              </h3>

              <p>
                {items.length === 0
                  ? "Create your first story or poem."
                  : "Try changing your search or filters."}
              </p>

            </div>

          ) : (

            filteredItems.map(
              (item) => {

                const id =
                  item?._id ||
                  item?.id;

                const type =
                  item?.contentType ||
                  "story";

                const status =
                  item?.status ||
                  "draft";

                return (

                  <article
                    className="editorial-card"
                    key={id}
                  >

                    {/* COVER */}

                    <div className="editorial-cover">

                      {item?.coverImage ? (

                        <img
                          src={
                            item.coverImage
                          }
                          alt={
                            item.title ||
                            "Story"
                          }
                        />

                      ) : (

                        <div className="cover-placeholder">

                          {type ===
                          "poem" ? (
                            <FaFeatherAlt />
                          ) : (
                            <FaBookOpen />
                          )}

                        </div>

                      )}

                      <span
                        className={`content-type ${type}`}
                      >
                        {type}
                      </span>

                    </div>


                    {/* BODY */}

                    <div className="editorial-card-body">

                      <span
                        className={`editorial-status ${status}`}
                      >
                        {status}
                      </span>


                      <h2>
                        {item?.title ||
                          "Untitled content"}
                      </h2>


                      <p>
                        {item?.excerpt ||
                          "No excerpt available."}
                      </p>


                      <div className="editorial-meta">

                        <span>
                          <FaEye />
                          {item?.views || 0}
                        </span>

                        <span>
                          <FaHeart />
                          {item?.likes || 0}
                        </span>

                        <span>
                          <FaComment />
                          {Array.isArray(
                            item?.comments
                          )
                            ? item.comments.length
                            : 0}
                        </span>

                      </div>


                      {/* ACTIONS */}

                      <div className="editorial-actions">

                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            (window.location.href =
                              `/admin/stories/edit/${id}`)
                          }
                        >
                          <FaEdit />
                          Edit
                        </button>


                        {status ===
                        "published" ? (

                          <button
                            type="button"
                            className="unpublish-btn"
                            onClick={() =>
                              handleUnpublish(
                                id
                              )
                            }
                          >
                            Draft
                          </button>

                        ) : (

                          <button
                            type="button"
                            className="publish-btn"
                            onClick={() =>
                              handlePublish(
                                id
                              )
                            }
                          >
                            Publish
                          </button>

                        )}


                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            handleDelete(
                              id
                            )
                          }
                        >
                          <FaTrash />
                        </button>

                      </div>

                    </div>

                  </article>

                );
              }
            )

          )}

        </section>

      )}

    </div>
  );
}