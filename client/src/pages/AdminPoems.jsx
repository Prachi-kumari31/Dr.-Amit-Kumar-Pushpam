// import React, { useEffect, useState } from "react";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaEyeSlash,
//   FaSearch,
//   FaSyncAlt,
//   FaTimes,
//   FaSave,
//   FaBookOpen,
// } from "react-icons/fa";
// import AdminLayout from "../components/AdminLayout";
// import { apiFetch } from "../utils/api";
// import "./AdminPoems.css";

// const AdminPoems = () => {
//   const [poems, setPoems] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [actionLoading, setActionLoading] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const [formData, setFormData] = useState({
//     title: "",
//     author: "",
//     category: "",
//     excerpt: "",
//     content: "",
//     coverImage: "",
//     tags: "",
//     isPublished: false,
//   });

//   // =====================================================
//   // FETCH POEMS
//   // =====================================================

//   const fetchPoems = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await apiFetch("/poems/admin");

//       setPoems(response?.data || []);
//     } catch (err) {
//       console.error("Fetch poems error:", err);
//       setError(err.message || "Unable to load poems.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPoems();
//   }, []);

//   // =====================================================
//   // FORM HANDLING
//   // =====================================================

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       author: "",
//       category: "",
//       excerpt: "",
//       content: "",
//       coverImage: "",
//       tags: "",
//       isPublished: false,
//     });

//     setEditingId(null);
//     setShowForm(false);
//   };

//   // =====================================================
//   // ADD POEM
//   // =====================================================

//   const handleAddPoem = () => {
//     resetForm();
//     setShowForm(true);
//     setError("");
//     setSuccess("");
//   };

//   // =====================================================
//   // EDIT POEM
//   // =====================================================

//   const handleEdit = (poem) => {
//     setEditingId(poem._id);

//     setFormData({
//       title: poem.title || "",
//       author: poem.author || "",
//       category: poem.category || "",
//       excerpt: poem.excerpt || "",
//       content: poem.content || "",
//       coverImage: poem.coverImage || "",
//       tags: poem.tags
//         ? Array.isArray(poem.tags)
//           ? poem.tags.join(", ")
//           : poem.tags
//         : "",
//       isPublished: poem.isPublished || false,
//     });

//     setShowForm(true);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   // =====================================================
//   // SAVE POEM
//   // =====================================================

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!formData.title.trim()) {
//       setError("Please enter poem title.");
//       return;
//     }

//     if (!formData.content.trim()) {
//       setError("Please write the poem content.");
//       return;
//     }

//     try {
//       setActionLoading(true);
//       setError("");
//       setSuccess("");

//       const payload = {
//         ...formData,

//         tags:
//           formData.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter(Boolean),
//       };

//       if (editingId) {
//         await apiFetch(`/poems/${editingId}`, {
//           method: "PUT",
//           body: JSON.stringify(payload),
//         });

//         setSuccess("Poem updated successfully.");
//       } else {
//         await apiFetch("/poems", {
//           method: "POST",
//           body: JSON.stringify(payload),
//         });

//         setSuccess("Poem created successfully.");
//       }

//       resetForm();
//       await fetchPoems();
//     } catch (err) {
//       console.error("Save poem error:", err);

//       setError(
//         err.message ||
//           `Unable to ${
//             editingId ? "update" : "create"
//           } poem.`
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // =====================================================
//   // PUBLISH / UNPUBLISH
//   // =====================================================

//   const handlePublishToggle = async (poem) => {
//     try {
//       setActionLoading(true);
//       setError("");
//       setSuccess("");

//       await apiFetch(`/poems/${poem._id}/publish`, {
//         method: "PUT",
//         body: JSON.stringify({
//           isPublished: !poem.isPublished,
//         }),
//       });

//       setSuccess(
//         poem.isPublished
//           ? "Poem unpublished successfully."
//           : "Poem published successfully."
//       );

//       await fetchPoems();
//     } catch (err) {
//       console.error("Publish poem error:", err);

//       setError(
//         err.message || "Unable to change poem status."
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // =====================================================
//   // DELETE
//   // =====================================================

//   const handleDelete = async (id) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to permanently delete this poem?"
//     );

//     if (!confirmed) return;

//     try {
//       setActionLoading(true);
//       setError("");
//       setSuccess("");

//       await apiFetch(`/poems/${id}`, {
//         method: "DELETE",
//       });

//       setSuccess("Poem deleted successfully.");

//       await fetchPoems();
//     } catch (err) {
//       console.error("Delete poem error:", err);

//       setError(
//         err.message || "Unable to delete poem."
//       );
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // =====================================================
//   // FILTER
//   // =====================================================

//   const filteredPoems = poems.filter((poem) => {
//     const search = searchTerm.toLowerCase();

//     const matchesSearch =
//       poem.title?.toLowerCase().includes(search) ||
//       poem.author?.toLowerCase().includes(search) ||
//       poem.category?.toLowerCase().includes(search);

//     const matchesStatus =
//       statusFilter === "all" ||
//       (statusFilter === "published" &&
//         poem.isPublished) ||
//       (statusFilter === "draft" &&
//         !poem.isPublished);

//     return matchesSearch && matchesStatus;
//   });

//   const publishedCount = poems.filter(
//     (poem) => poem.isPublished
//   ).length;

//   const draftCount = poems.filter(
//     (poem) => !poem.isPublished
//   ).length;

//   // =====================================================
//   // UI
//   // =====================================================

//   return (
//     <AdminLayout>
//       <div className="admin-poems">

//         {/* =========================================
//             HEADER
//         ========================================= */}

//         <div className="poems-page-header">

//           <div className="poems-header-content">

//             <div className="poems-eyebrow">
//               CREATIVE CONTENT MANAGEMENT
//             </div>

//             <h1>
//               Poems
//             </h1>

//             <p>
//               Create, manage and publish poems
//               for your readers.
//             </p>

//           </div>

//           <button
//             className="add-poem-btn"
//             onClick={handleAddPoem}
//           >
//             <FaPlus />
//             Add New Poem
//           </button>

//         </div>

//         {/* =========================================
//             STATISTICS
//         ========================================= */}

//         <div className="poem-stats">

//           <div className="poem-stat-card">

//             <div className="stat-icon">
//               <FaBookOpen />
//             </div>

//             <div>
//               <span className="poem-stat-number">
//                 {poems.length}
//               </span>

//               <span className="poem-stat-label">
//                 Total Poems
//               </span>
//             </div>

//           </div>

//           <div className="poem-stat-card published">

//             <div className="stat-icon">
//               <FaEye />
//             </div>

//             <div>
//               <span className="poem-stat-number">
//                 {publishedCount}
//               </span>

//               <span className="poem-stat-label">
//                 Published
//               </span>
//             </div>

//           </div>

//           <div className="poem-stat-card draft">

//             <div className="stat-icon">
//               <FaEyeSlash />
//             </div>

//             <div>
//               <span className="poem-stat-number">
//                 {draftCount}
//               </span>

//               <span className="poem-stat-label">
//                 Drafts
//               </span>
//             </div>

//           </div>

//         </div>

//         {/* =========================================
//             SUCCESS
//         ========================================= */}

//         {success && (
//           <div className="poems-success">
//             <span>✓</span>
//             {success}
//           </div>
//         )}

//         {/* =========================================
//             ERROR
//         ========================================= */}

//         {error && (
//           <div className="poems-error">

//             <span>
//               {error}
//             </span>

//             <button
//               onClick={() => setError("")}
//             >
//               <FaTimes />
//             </button>

//           </div>
//         )}

//         {/* =========================================
//             FORM
//         ========================================= */}

//         {showForm && (
//           <div className="poem-form-card">

//             <div className="poem-form-header">

//               <div>
//                 <span className="form-eyebrow">
//                   {editingId
//                     ? "EDIT POEM"
//                     : "NEW POEM"}
//                 </span>

//                 <h2>
//                   {editingId
//                     ? "Edit your poem"
//                     : "Create a new poem"}
//                 </h2>

//                 <p>
//                   Add your poem details and
//                   publish it for readers.
//                 </p>
//               </div>

//               <button
//                 className="close-form-btn"
//                 onClick={resetForm}
//                 type="button"
//               >
//                 <FaTimes />
//               </button>

//             </div>

//             <form
//               className="poem-form"
//               onSubmit={handleSubmit}
//             >

//               <div className="form-grid">

//                 {/* TITLE */}

//                 <div className="form-field full">

//                   <label>
//                     Poem Title *
//                   </label>

//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     placeholder="Enter poem title"
//                   />

//                 </div>

//                 {/* AUTHOR */}

//                 <div className="form-field">

//                   <label>
//                     Author
//                   </label>

//                   <input
//                     type="text"
//                     name="author"
//                     value={formData.author}
//                     onChange={handleChange}
//                     placeholder="Author name"
//                   />

//                 </div>

//                 {/* CATEGORY */}

//                 <div className="form-field">

//                   <label>
//                     Category
//                   </label>

//                   <input
//                     type="text"
//                     name="category"
//                     value={formData.category}
//                     onChange={handleChange}
//                     placeholder="e.g. Love, Life, Nature"
//                   />

//                 </div>

//                 {/* COVER IMAGE */}

//                 <div className="form-field full">

//                   <label>
//                     Cover Image URL
//                   </label>

//                   <input
//                     type="text"
//                     name="coverImage"
//                     value={formData.coverImage}
//                     onChange={handleChange}
//                     placeholder="Enter image URL"
//                   />

//                 </div>

//                 {/* EXCERPT */}

//                 <div className="form-field full">

//                   <label>
//                     Short Description
//                   </label>

//                   <textarea
//                     name="excerpt"
//                     value={formData.excerpt}
//                     onChange={handleChange}
//                     rows="3"
//                     placeholder="Write a short description..."
//                   />

//                 </div>

//                 {/* CONTENT */}

//                 <div className="form-field full">

//                   <label>
//                     Poem Content *
//                   </label>

//                   <textarea
//                     className="poem-content-editor"
//                     name="content"
//                     value={formData.content}
//                     onChange={handleChange}
//                     rows="14"
//                     placeholder={`Write your poem here...

// Example:

// In the silence of the night,
// A thousand dreams take flight,
// The stars whisper stories above,
// And the heart remembers love...`}
//                   />

//                   <span className="editor-hint">
//                     Keep line breaks between verses
//                     to preserve the poem's formatting.
//                   </span>

//                 </div>

//                 {/* TAGS */}

//                 <div className="form-field full">

//                   <label>
//                     Tags
//                   </label>

//                   <input
//                     type="text"
//                     name="tags"
//                     value={formData.tags}
//                     onChange={handleChange}
//                     placeholder="love, life, nature, emotions"
//                   />

//                   <span className="editor-hint">
//                     Separate multiple tags using commas.
//                   </span>

//                 </div>

//               </div>

//               {/* PUBLISH */}

//               <div className="publish-option">

//                 <label className="publish-checkbox">

//                   <input
//                     type="checkbox"
//                     name="isPublished"
//                     checked={
//                       formData.isPublished
//                     }
//                     onChange={handleChange}
//                   />

//                   <span className="custom-checkbox"></span>

//                   <div>

//                     <strong>
//                       Publish this poem
//                     </strong>

//                     <small>
//                       Published poems will be
//                       visible on the public website.
//                     </small>

//                   </div>

//                 </label>

//               </div>

//               {/* FORM ACTIONS */}

//               <div className="poem-form-actions">

//                 <button
//                   type="button"
//                   className="cancel-poem-btn"
//                   onClick={resetForm}
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   className="save-poem-btn"
//                   disabled={actionLoading}
//                 >

//                   {actionLoading ? (
//                     <>
//                       <FaSyncAlt className="refresh-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FaSave />
//                       {editingId
//                         ? "Update Poem"
//                         : "Save Poem"}
//                     </>
//                   )}

//                 </button>

//               </div>

//             </form>

//           </div>
//         )}

//         {/* =========================================
//             FILTERS
//         ========================================= */}

//         <div className="poems-toolbar">

//           <div className="poem-search">

//             <FaSearch />

//             <input
//               type="text"
//               placeholder="Search poems..."
//               value={searchTerm}
//               onChange={(e) =>
//                 setSearchTerm(e.target.value)
//               }
//             />

//           </div>

//           <div className="poem-filter">

//             <select
//               value={statusFilter}
//               onChange={(e) =>
//                 setStatusFilter(e.target.value)
//               }
//             >
//               <option value="all">
//                 All Poems
//               </option>

//               <option value="published">
//                 Published
//               </option>

//               <option value="draft">
//                 Drafts
//               </option>
//             </select>

//           </div>

//           <button
//             className="refresh-poems-btn"
//             onClick={fetchPoems}
//             disabled={loading}
//           >
//             <FaSyncAlt
//               className={
//                 loading
//                   ? "refresh-spin"
//                   : ""
//               }
//             />

//             Refresh
//           </button>

//           <span className="poem-result-count">
//             {filteredPoems.length} poems
//           </span>

//         </div>

//         {/* =========================================
//             POEMS
//         ========================================= */}

//         {loading ? (
//           <div className="poems-loading">

//             <FaSyncAlt className="refresh-spin" />

//             <p>
//               Loading poems...
//             </p>

//           </div>
//         ) : filteredPoems.length === 0 ? (

//           <div className="poems-empty">

//             <FaBookOpen />

//             <h3>
//               No poems found
//             </h3>

//             <p>
//               Create your first poem to
//               start building your collection.
//             </p>

//             <button
//               onClick={handleAddPoem}
//             >
//               <FaPlus />
//               Create First Poem
//             </button>

//           </div>

//         ) : (

//           <div className="poems-grid">

//             {filteredPoems.map((poem) => (

//               <article
//                 className="poem-card"
//                 key={poem._id}
//               >

//                 {/* COVER */}

//                 <div className="poem-card-cover">

//                   {poem.coverImage ? (
//                     <img
//                       src={poem.coverImage}
//                       alt={poem.title}
//                     />
//                   ) : (
//                     <div className="poem-placeholder">
//                       <FaBookOpen />
//                     </div>
//                   )}

//                   <span
//                     className={`poem-status ${
//                       poem.isPublished
//                         ? "published"
//                         : "draft"
//                     }`}
//                   >
//                     {poem.isPublished
//                       ? "Published"
//                       : "Draft"}
//                   </span>

//                 </div>

//                 {/* CONTENT */}

//                 <div className="poem-card-content">

//                   <div className="poem-category">

//                     {poem.category ||
//                       "Poetry"}

//                   </div>

//                   <h3>
//                     {poem.title}
//                   </h3>

//                   {poem.author && (
//                     <p className="poem-author">
//                       By {poem.author}
//                     </p>
//                   )}

//                   <p className="poem-excerpt">
//                     {poem.excerpt ||
//                       poem.content?.substring(
//                         0,
//                         120
//                       )}
//                     {poem.content?.length > 120
//                       ? "..."
//                       : ""}
//                   </p>

//                   <div className="poem-card-footer">

//                     <span>
//                       {poem.createdAt
//                         ? new Date(
//                             poem.createdAt
//                           ).toLocaleDateString()
//                         : ""}
//                     </span>

//                   </div>

//                 </div>

//                 {/* ACTIONS */}

//                 <div className="poem-card-actions">

//                   <button
//                     className="poem-edit-btn"
//                     onClick={() =>
//                       handleEdit(poem)
//                     }
//                     disabled={actionLoading}
//                   >
//                     <FaEdit />
//                     Edit
//                   </button>

//                   <button
//                     className={`poem-publish-btn ${
//                       poem.isPublished
//                         ? "unpublish"
//                         : ""
//                     }`}
//                     onClick={() =>
//                       handlePublishToggle(
//                         poem
//                       )
//                     }
//                     disabled={actionLoading}
//                   >
//                     {poem.isPublished ? (
//                       <>
//                         <FaEyeSlash />
//                         Unpublish
//                       </>
//                     ) : (
//                       <>
//                         <FaEye />
//                         Publish
//                       </>
//                     )}
//                   </button>

//                   <button
//                     className="poem-delete-btn"
//                     onClick={() =>
//                       handleDelete(
//                         poem._id
//                       )
//                     }
//                     disabled={actionLoading}
//                   >
//                     <FaTrash />
//                   </button>

//                 </div>

//               </article>

//             ))}

//           </div>

//         )}

//       </div>
//     </AdminLayout>
//   );
// };

// export default AdminPoems;

import React, {
  useEffect,
  useState,
} from "react";

import api from "../api/api";

import "./AdminPoems.css";

export default function AdminPoems() {
  const [poems, setPoems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadPoems = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/poems/admin/all",
          {
            headers: {
              Authorization: `Bearer ${
                localStorage.getItem(
                  "adminToken"
                ) || ""
              }`,
            },
          }
        );

      setPoems(
        response.data?.data || []
      );
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Unable to load poems"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPoems();
  }, []);

  const deletePoem = async (
    id
  ) => {
    if (
      !window.confirm(
        "Delete this poem?"
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/poems/${id}`,
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem(
                "adminToken"
              ) || ""
            }`,
          },
        }
      );

      loadPoems();
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Unable to delete poem"
      );
    }
  };

  return (
    <div className="admin-poems-page">
      <div className="poems-header">
        <span>CREATIVE LIBRARY</span>

        <h1>Poems</h1>

        <p>
          Manage the poetry collection
          published on Prosper Foundation.
        </p>
      </div>

      {error && (
        <div className="poems-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="poems-loading">
          Loading poems...
        </div>
      ) : poems.length === 0 ? (
        <div className="poems-empty">
          No poems available.
        </div>
      ) : (
        <div className="poems-grid">
          {poems.map((poem) => (
            <article
              className="admin-poem-card"
              key={poem._id}
            >
              {poem.coverImage && (
                <img
                  src={poem.coverImage}
                  alt={poem.title}
                />
              )}

              <div className="poem-card-body">
                <span
                  className={`poem-status ${poem.status}`}
                >
                  {poem.status}
                </span>

                <h2>{poem.title}</h2>

                <p>
                  {poem.excerpt ||
                    "No excerpt available."}
                </p>

                <div className="poem-meta">
                  <span>
                    👁 {poem.views || 0}
                  </span>

                  <span>
                    ❤️ {poem.likes || 0}
                  </span>
                </div>

                <div className="poem-actions">
                  <button
                    onClick={() =>
                      (window.location.href = `/admin/poems/edit/${poem._id}`)
                    }
                    className="poem-edit"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deletePoem(
                        poem._id
                      )
                    }
                    className="poem-delete"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}