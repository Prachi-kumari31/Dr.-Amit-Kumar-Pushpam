// import React, {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import {
//   FaPlus,
//   FaSearch,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaEyeSlash,
//   FaSyncAlt,
//   FaBookOpen,
// } from "react-icons/fa";

// import {
//   useNavigate,
//   useSearchParams,
// } from "react-router-dom";

// import AdminLayout from "../components/AdminLayout";
// import { apiFetch } from "../utils/api";

// // import "./AdminPublications.css";

// const TYPES = [
//   {
//     value: "blog",
//     label: "Blogs",
//   },
//   {
//     value: "story",
//     label: "Stories",
//   },
//   {
//     value: "poem",
//     label: "Poems",
//   },
//   {
//     value: "book",
//     label: "Books",
//   },
//   {
//     value: "article",
//     label: "Articles",
//   },
//   {
//     value: "publication",
//     label: "Publications",
//   },
// ];

// const AdminPublications = () => {
//   const navigate = useNavigate();

//   const [searchParams] =
//     useSearchParams();

//   const selectedType =
//     searchParams.get("type") ||
//     "all";

//   const [items, setItems] =
//     useState([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [search, setSearch] =
//     useState("");

//   const [status, setStatus] =
//     useState("all");

//   const fetchItems = async () => {
//     try {
//       setLoading(true);

//       const query =
//         new URLSearchParams();

//       if (selectedType !== "all") {
//         query.set(
//           "type",
//           selectedType
//         );
//       }

//       if (status !== "all") {
//         query.set(
//           "status",
//           status
//         );
//       }

//       if (search.trim()) {
//         query.set(
//           "search",
//           search
//         );
//       }

//       const response =
//         await apiFetch(
//           `/publications/admin/all?${query.toString()}`
//         );

//       setItems(
//         response.data || []
//       );
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchItems();
//   }, [
//     selectedType,
//     status,
//     search,
//   ]);

//   const handlePublish = async (
//     item
//   ) => {
//     try {
//       await apiFetch(
//         `/publications/${item._id}/publish`,
//         {
//           method: "PUT",
//         }
//       );

//       fetchItems();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const handleDelete = async (
//     id
//   ) => {
//     if (
//       !window.confirm(
//         "Delete this content permanently?"
//       )
//     ) {
//       return;
//     }

//     try {
//       await apiFetch(
//         `/publications/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       fetchItems();
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   const title =
//     selectedType === "all"
//       ? "Books & Publications"
//       : TYPES.find(
//           (type) =>
//             type.value ===
//             selectedType
//         )?.label ||
//         "Content";

//   return (
//     <AdminLayout>
//       <div className="admin-publications">

//         <header className="content-header">

//           <div>
//             <span className="eyebrow">
//               CONTENT STUDIO
//             </span>

//             <h1>{title}</h1>

//             <p>
//               Create, edit, publish and
//               manage your content.
//             </p>
//           </div>

//           <button
//             className="create-content-btn"
//             onClick={() =>
//               navigate(
//                 `/admin/publications/new?type=${
//                   selectedType === "all"
//                     ? "blog"
//                     : selectedType
//                 }`
//               )
//             }
//           >
//             <FaPlus />
//             Create Content
//           </button>

//         </header>

//         <div className="content-toolbar">

//           <div className="content-search">
//             <FaSearch />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               placeholder="Search content..."
//             />
//           </div>

//           <select
//             value={selectedType}
//             onChange={(e) =>
//               navigate(
//                 `/admin/publications?type=${e.target.value}`
//               )
//             }
//           >
//             <option value="all">
//               All Content
//             </option>

//             {TYPES.map(
//               (type) => (
//                 <option
//                   key={type.value}
//                   value={type.value}
//                 >
//                   {type.label}
//                 </option>
//               )
//             )}
//           </select>

//           <select
//             value={status}
//             onChange={(e) =>
//               setStatus(
//                 e.target.value
//               )
//             }
//           >
//             <option value="all">
//               All Status
//             </option>

//             <option value="published">
//               Published
//             </option>

//             <option value="draft">
//               Draft
//             </option>
//           </select>

//           <button
//             onClick={fetchItems}
//             className="refresh-btn"
//           >
//             <FaSyncAlt />
//           </button>

//         </div>

//         {loading ? (
//           <div className="content-loading">
//             <FaSyncAlt />
//             <p>
//               Loading content...
//             </p>
//           </div>
//         ) : items.length ===
//           0 ? (
//           <div className="empty-content">
//             <FaBookOpen />

//             <h2>
//               No content found
//             </h2>

//             <p>
//               Create your first
//               publication.
//             </p>
//           </div>
//         ) : (
//           <div className="content-grid">

//             {items.map(
//               (item) => (
//                 <article
//                   key={item._id}
//                   className="admin-content-card"
//                 >

//                   <div className="content-cover">

//                     {item.coverImage ? (
//                       <img
//                         src={
//                           item.coverImage
//                         }
//                         alt={
//                           item.title
//                         }
//                       />
//                     ) : (
//                       <div className="cover-placeholder">
//                         <FaBookOpen />
//                       </div>
//                     )}

//                     <span
//                       className={`status ${
//                         item.isPublished
//                           ? "published"
//                           : "draft"
//                       }`}
//                     >
//                       {item.isPublished
//                         ? "Published"
//                         : "Draft"}
//                     </span>

//                   </div>

//                   <div className="content-card-body">

//                     <span className="content-type">
//                       {
//                         TYPES.find(
//                           (type) =>
//                             type.value ===
//                             item.type
//                         )?.label
//                       }
//                     </span>

//                     <h2>
//                       {item.title}
//                     </h2>

//                     <p>
//                       {item.excerpt ||
//                         "No description available."}
//                     </p>

//                     <div className="content-meta">
//                       <span>
//                         👁 {item.views}
//                       </span>

//                       <span>
//                         ♥ {item.likes}
//                       </span>

//                       <span>
//                         💬{" "}
//                         {
//                           item.comments
//                             ?.length ||
//                           0
//                         }
//                       </span>
//                     </div>

//                     <div className="content-actions">

//                       <button
//                         onClick={() =>
//                           navigate(
//                             `/admin/publications/edit/${item._id}`
//                           )
//                         }
//                       >
//                         <FaEdit />
//                         Edit
//                       </button>

//                       <button
//                         onClick={() =>
//                           handlePublish(
//                             item
//                           )
//                         }
//                       >
//                         {item.isPublished ? (
//                           <>
//                             <FaEyeSlash />
//                             Unpublish
//                           </>
//                         ) : (
//                           <>
//                             <FaEye />
//                             Publish
//                           </>
//                         )}
//                       </button>

//                       <button
//                         className="delete"
//                         onClick={() =>
//                           handleDelete(
//                             item._id
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

// export default AdminPublications;


import React, {
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/api";

import "./AdminPublications.css";

const config = () => ({
  headers: {
    Authorization: `Bearer ${
      localStorage.getItem(
        "adminToken"
      ) || ""
    }`,
  },
});

export default function AdminPublications() {
  const [items, setItems] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

    const navigate = useNavigate();

  const load = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          "/publications/admin/all",
          config()
        );

      setItems(
        response.data?.data || []
      );
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Unable to load publications"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const togglePublish = async (
    id
  ) => {
    try {
      await api.put(
        `/publications/${id}/publish`,
        {},
        config()
      );

      load();
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Unable to change publication status"
      );
    }
  };

  const deleteItem = async (
    id
  ) => {
    if (
      !window.confirm(
        "Delete this publication?"
      )
    ) {
      return;
    }

    try {
      await api.delete(
        `/publications/${id}`,
        config()
      );

      load();
    } catch (err) {
      setError(
        err?.response?.data
          ?.message ||
          "Unable to delete publication"
      );
    }
  };

  return (
    <div className="admin-publications-page">
      
<div className="publication-admin-header">
  <span>RESEARCH & PUBLICATIONS</span>

  <h1>Publications</h1>

  <p>
    Manage articles, research
    papers, books and publications.
  </p>

  <button
    type="button"
    onClick={() =>
      navigate("/admin/publications/new")
    }
  >
    + Create Publication
  </button>
</div>


      {error && (
        <div className="publication-admin-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="publication-admin-loading">
          Loading...
        </div>
      ) : (
        <div className="publication-admin-table-wrap">
          <table className="publication-admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Category</th>
                <th>Status</th>
                <th>Views</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {items.map((item) => (
                <tr
                  key={item._id}
                >
                  <td>
                    <strong>
                      {item.title}
                    </strong>

                    <small>
                      {
                        item.excerpt
                      }
                    </small>
                  </td>

                  <td>
                    {item.type}
                  </td>

                  <td>
                    {item.category ||
                      "General"}
                  </td>

                  <td>
                    <span
                      className={
                        item.isPublished
                          ? "pub-status published"
                          : "pub-status draft"
                      }
                    >
                      {item.isPublished
                        ? "Published"
                        : "Draft"}
                    </span>
                  </td>

                  <td>
                    {item.views ||
                      0}
                  </td>

                  <td>
                    <div className="pub-actions">
                         <button
  type="button"
  onClick={() =>
    navigate(
      `/admin/publications/edit/${item._id}`
    )
  }
>
  Edit
</button>

                      <button
                        onClick={() =>
                          togglePublish(
                            item._id
                          )
                        }
                      >
                        {item.isPublished
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                      <button
                        className="pub-delete"
                        onClick={() =>
                          deleteItem(
                            item._id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {items.length === 0 && (
            <div className="publication-admin-empty">
              No publications found.
            </div>
          )}
        </div>
      )}
    </div>
  );
}