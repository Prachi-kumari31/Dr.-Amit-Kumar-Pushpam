// import React, {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import {
//   FaArrowLeft,
//   FaImage,
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaListUl,
//   FaListOl,
//   FaSave,
//   FaPaperPlane,
// } from "react-icons/fa";

// import {
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// import AdminLayout from "../components/AdminLayout";
// import { apiFetch } from "../utils/api";

// import "./AdminStoryEditor.css";


// const AdminStoryEditor = () => {

//   const navigate = useNavigate();
//   const { id } = useParams();

//   const editorRef = useRef(null);
//   const imageInputRef = useRef(null);

//   const isEditing = Boolean(id);

//   const [title, setTitle] =
//     useState("");

//   const [excerpt, setExcerpt] =
//     useState("");

//   const [coverImage, setCoverImage] =
//     useState("");

//   const [status, setStatus] =
//     useState("draft");

//   const [saving, setSaving] =
//     useState(false);


//   /* =========================
//      LOAD STORY
//   ========================= */

//   useEffect(() => {

//     if (!isEditing) return;

//     const loadStory = async () => {

//       try {

//         const response =
//           await apiFetch(
//             "/stories/admin/all"
//           );

//         const story =
//           response.data.find(
//             (item) =>
//               item._id === id
//           );

//         if (!story) return;

//         setTitle(story.title || "");
//         setExcerpt(
//           story.excerpt || ""
//         );
//         setCoverImage(
//           story.coverImage || ""
//         );
//         setStatus(
//           story.status || "draft"
//         );

//         if (editorRef.current) {
//           editorRef.current.innerHTML =
//             story.content || "";
//         }

//       } catch (error) {

//         console.error(
//           "Load story error:",
//           error
//         );

//       }

//     };

//     loadStory();

//   }, [id, isEditing]);


//   /* =========================
//      EDITOR COMMAND
//   ========================= */

//   const execCommand = (
//     command,
//     value = null
//   ) => {

//     editorRef.current?.focus();

//     document.execCommand(
//       command,
//       false,
//       value
//     );

//   };


//   /* =========================
//      IMAGE UPLOAD
//   ========================= */

//   const handleImageUpload = (
//     event
//   ) => {

//     const file =
//       event.target.files?.[0];

//     if (!file) return;

//     const reader =
//       new FileReader();

//     reader.onload = () => {

//       const image =
//         `<img src="${reader.result}" alt="Story image" style="max-width:100%;border-radius:12px;margin:20px 0;" />`;

//       editorRef.current.focus();

//       document.execCommand(
//         "insertHTML",
//         false,
//         image
//       );

//     };

//     reader.readAsDataURL(file);

//   };


//   /* =========================
//      COVER IMAGE
//   ========================= */

//   const handleCoverImage = (
//     event
//   ) => {

//     const file =
//       event.target.files?.[0];

//     if (!file) return;

//     const reader =
//       new FileReader();

//     reader.onload = () => {
//       setCoverImage(
//         reader.result
//       );
//     };

//     reader.readAsDataURL(file);

//   };


//   /* =========================
//      SAVE
//   ========================= */

//   const saveStory = async (
//     publish = false
//   ) => {

//     try {

//       setSaving(true);

//       const content =
//         editorRef.current?.innerHTML ||
//         "";

//       if (!title.trim()) {
//         alert(
//           "Please enter story title."
//         );
//         return;
//       }

//       if (!content.trim()) {
//         alert(
//           "Please write story content."
//         );
//         return;
//       }

//       const payload = {

//         title,

//         excerpt,

//         content,

//         coverImage,

//         status:
//           publish
//             ? "published"
//             : status,

//       };


//       if (isEditing) {

//         await apiFetch(
//           `/stories/${id}`,
//           {
//             method: "PUT",
//             body: JSON.stringify(
//               payload
//             ),
//           }
//         );

//       } else {

//         await apiFetch(
//           "/stories",
//           {
//             method: "POST",
//             body: JSON.stringify(
//               payload
//             ),
//           }
//         );

//       }

//       navigate(
//         "/admin/stories"
//       );

//     } catch (error) {

//       console.error(
//         "Save story error:",
//         error
//       );

//       alert(
//         error.message ||
//         "Unable to save story."
//       );

//     } finally {

//       setSaving(false);

//     }

//   };


//   return (

//     <AdminLayout>

//       <div className="story-editor-page">

//         {/* HEADER */}

//         <div className="editor-header">

//           <button
//             className="back-editor"
//             onClick={() =>
//               navigate(
//                 "/admin/stories"
//               )
//             }
//           >
//             <FaArrowLeft />
//             Stories
//           </button>

//           <div>

//             <span>
//               STORY EDITOR
//             </span>

//             <h1>
//               {isEditing
//                 ? "Edit Story"
//                 : "Create New Story"}
//             </h1>

//           </div>

//           <div className="editor-actions">

//             <button
//               className="save-draft"
//               disabled={saving}
//               onClick={() =>
//                 saveStory(false)
//               }
//             >
//               <FaSave />
//               Save Draft
//             </button>

//             <button
//               className="publish-story"
//               disabled={saving}
//               onClick={() =>
//                 saveStory(true)
//               }
//             >
//               <FaPaperPlane />
//               Publish
//             </button>

//           </div>

//         </div>


//         {/* MAIN */}

//         <div className="story-editor-layout">

//           <main className="editor-main">

//             <input
//               className="story-title-input"
//               placeholder="Story title..."
//               value={title}
//               onChange={(e) =>
//                 setTitle(
//                   e.target.value
//                 )
//               }
//             />

//             <textarea
//               className="story-excerpt-input"
//               placeholder="Write a short introduction or excerpt..."
//               value={excerpt}
//               onChange={(e) =>
//                 setExcerpt(
//                   e.target.value
//                 )
//               }
//             />


//             {/* TOOLBAR */}

//             <div className="editor-toolbar">

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "bold"
//                   )
//                 }
//               >
//                 <FaBold />
//               </button>

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "italic"
//                   )
//                 }
//               >
//                 <FaItalic />
//               </button>

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "underline"
//                   )
//                 }
//               >
//                 <FaUnderline />
//               </button>

//               <span />

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "justifyLeft"
//                   )
//                 }
//               >
//                 <FaAlignLeft />
//               </button>

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "justifyCenter"
//                   )
//                 }
//               >
//                 <FaAlignCenter />
//               </button>

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "justifyRight"
//                   )
//                 }
//               >
//                 <FaAlignRight />
//               </button>

//               <span />

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "insertUnorderedList"
//                   )
//                 }
//               >
//                 <FaListUl />
//               </button>

//               <button
//                 onClick={() =>
//                   execCommand(
//                     "insertOrderedList"
//                   )
//                 }
//               >
//                 <FaListOl />
//               </button>

//               <span />

//               <button
//                 onClick={() =>
//                   imageInputRef.current?.click()
//                 }
//               >
//                 <FaImage />
//               </button>

//               <input
//                 ref={imageInputRef}
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={
//                   handleImageUpload
//                 }
//               />

//             </div>


//             {/* EDITOR */}

//             <div
//               ref={editorRef}
//               className="story-content-editor"
//               contentEditable
//               suppressContentEditableWarning
//               data-placeholder="Start writing your story..."
//             />

//           </main>


//           {/* SIDEBAR */}

//           <aside className="editor-sidebar">

//             <div className="editor-panel">

//               <h3>
//                 Publishing
//               </h3>

//               <label>
//                 Status
//               </label>

//               <select
//                 value={status}
//                 onChange={(e) =>
//                   setStatus(
//                     e.target.value
//                   )
//                 }
//               >
//                 <option value="draft">
//                   Draft
//                 </option>

//                 <option value="published">
//                   Published
//                 </option>

//               </select>

//             </div>


//             <div className="editor-panel">

//               <h3>
//                 Cover Image
//               </h3>

//               <button
//                 className="cover-upload"
//                 onClick={() =>
//                   document
//                     .getElementById(
//                       "cover-image-input"
//                     )
//                     .click()
//                 }
//               >

//                 {coverImage ? (
//                   <img
//                     src={coverImage}
//                     alt="Cover"
//                   />
//                 ) : (
//                   <>
//                     <FaImage />
//                     <span>
//                       Choose image
//                     </span>
//                   </>
//                 )}

//               </button>

//               <input
//                 id="cover-image-input"
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={
//                   handleCoverImage
//                 }
//               />

//             </div>

//           </aside>

//         </div>

//       </div>

//     </AdminLayout>

//   );

// };

// export default AdminStoryEditor;

// import React, {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import { useNavigate, useParams } from "react-router-dom";

// import {
//   FaArrowLeft,
//   FaBold,
//   FaItalic,
//   FaUnderline,
//   FaStrikethrough,
//   FaAlignLeft,
//   FaAlignCenter,
//   FaAlignRight,
//   FaAlignJustify,
//   FaListUl,
//   FaListOl,
//   FaQuoteLeft,
//   FaLink,
//   FaImage,
//   FaMinus,
//   FaUndo,
//   FaRedo,
//   FaSave,
//   FaEye,
//   FaCloud,
//   FaCheck,
//   FaTimes,
//   FaBookOpen,
//   FaFeatherAlt,
//   FaFilePdf,
// } from "react-icons/fa";

// import {
//   getAdminStory,
//   createStory,
//   updateStory,
// } from "../api/storyApi";

// import "./AdminStoryEditor.css";

// const defaultForm = {
//   title: "",
//   excerpt: "",
//   content: "",
//   contentType: "story",
//   coverImage: "",
//   category: "",
//   tags: [],
//   status: "draft",
//   isFeatured: false,
//   allowComments: true,
//   authorName: "Prosper Foundation",
//   seoTitle: "",
//   seoDescription: "",
// };

// const exec = (command, value = null) => {
//   document.execCommand(command, false, value);
// };

// export default function AdminStoryEditor({
//   storyId: propStoryId,
// }) {
//   const navigate = useNavigate();
//   const params = useParams();

//   const storyId =
//     propStoryId || params.id;

//   const editorRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const [form, setForm] =
//     useState(defaultForm);

//   const [loading, setLoading] =
//     useState(Boolean(storyId));

//   const [saving, setSaving] =
//     useState(false);

//   const [autoSaving, setAutoSaving] =
//     useState(false);

//   const [error, setError] =
//     useState("");

//   const [success, setSuccess] =
//     useState("");

//   const [preview, setPreview] =
//     useState(false);

//   const [lastSaved, setLastSaved] =
//     useState(null);

//   const [tagsInput, setTagsInput] =
//     useState("");

//   const [wordCount, setWordCount] =
//     useState(0);

//   const [selectedImage, setSelectedImage] =
//     useState("");

//   /* =====================================================
//      LOAD STORY
//   ===================================================== */

//   useEffect(() => {
//     if (!storyId) {
//       setLoading(false);
//       return;
//     }

//     const loadStory = async () => {
//       try {
//         setLoading(true);
//         setError("");

//         const response =
//           await getAdminStory(storyId);

//         const story =
//           response?.data;

//         if (!story) {
//           setError(
//             "Story or poem not found."
//           );
//           return;
//         }

//         const nextForm = {
//           ...defaultForm,
//           ...story,

//           contentType:
//             story.contentType ||
//             story.type ||
//             "story",

//           tags:
//             Array.isArray(story.tags)
//               ? story.tags
//               : [],

//           status:
//             story.status === "published"
//               ? "published"
//               : "draft",
//         };

//         setForm(nextForm);

//         setTagsInput(
//           (story.tags || []).join(", ")
//         );

//         setTimeout(() => {
//           if (editorRef.current) {
//             editorRef.current.innerHTML =
//               story.content || "";

//             updateWordCount(
//               story.content || ""
//             );
//           }
//         }, 100);
//       } catch (err) {
//         setError(
//           err?.response?.data?.message ||
//             "Unable to load content."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadStory();
//   }, [storyId]);

//   /* =====================================================
//      WORD COUNT
//   ===================================================== */

//   const updateWordCount = (html = "") => {
//     const text = html
//       .replace(/<[^>]*>/g, " ")
//       .replace(/&nbsp;/g, " ")
//       .replace(/\s+/g, " ")
//       .trim();

//     const count = text
//       ? text.split(" ").length
//       : 0;

//     setWordCount(count);
//   };

//   /* =====================================================
//      EDITOR INPUT
//   ===================================================== */

//   const handleEditorInput = () => {
//     const html =
//       editorRef.current?.innerHTML || "";

//     setForm((prev) => ({
//       ...prev,
//       content: html,
//     }));

//     updateWordCount(html);
//   };

//   /* =====================================================
//      FORM CHANGE
//   ===================================================== */

//   const handleChange = (e) => {
//     const {
//       name,
//       value,
//       type,
//       checked,
//     } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]:
//         type === "checkbox"
//           ? checked
//           : value,
//     }));
//   };

//   /* =====================================================
//      BLOCK FORMAT
//   ===================================================== */

//   const applyBlock = (tag) => {
//     editorRef.current?.focus();

//     exec(
//       "formatBlock",
//       tag
//     );

//     handleEditorInput();
//   };

//   /* =====================================================
//      FONT FAMILY
//   ===================================================== */

//   const applyFont = (font) => {
//     editorRef.current?.focus();

//     exec(
//       "fontName",
//       font
//     );

//     handleEditorInput();
//   };

//   /* =====================================================
//      FONT SIZE
//   ===================================================== */

//   const applyFontSize = (size) => {
//     editorRef.current?.focus();

//     exec(
//       "fontSize",
//       size
//     );

//     handleEditorInput();
//   };

//   /* =====================================================
//      LINK
//   ===================================================== */

//   const createLink = () => {
//     const url =
//       window.prompt(
//         "Enter URL"
//       );

//     if (!url) return;

//     editorRef.current?.focus();

//     exec(
//       "createLink",
//       url
//     );

//     handleEditorInput();
//   };

//   /* =====================================================
//      IMAGE FROM DEVICE
//   ===================================================== */

//   const openImagePicker = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageUpload = (
//     event
//   ) => {
//     const file =
//       event.target.files?.[0];

//     if (!file) return;

//     if (
//       !file.type.startsWith(
//         "image/"
//       )
//     ) {
//       setError(
//         "Please select a valid image file."
//       );

//       return;
//     }

//     const reader =
//       new FileReader();

//     reader.onload = () => {
//       const imageUrl =
//         reader.result;

//       setSelectedImage(
//         imageUrl
//       );

//       editorRef.current?.focus();

//       exec(
//         "insertImage",
//         imageUrl
//       );

//       handleEditorInput();
//     };

//     reader.readAsDataURL(file);

//     event.target.value = "";
//   };

//   /* =====================================================
//      DIVIDER
//   ===================================================== */

//   const insertDivider = () => {
//     editorRef.current?.focus();

//     exec(
//       "insertHTML",
//       "<hr>"
//     );

//     handleEditorInput();
//   };

//   /* =====================================================
//      TAGS
//   ===================================================== */

//   const updateTags = () => {
//     const tags =
//       tagsInput
//         .split(",")
//         .map((tag) =>
//           tag.trim()
//         )
//         .filter(Boolean);

//     setForm((prev) => ({
//       ...prev,
//       tags,
//     }));
//   };

//   /* =====================================================
//      PREPARE PAYLOAD
//   ===================================================== */

//   const getPayload = (
//     publish = false
//   ) => {
//     const content =
//       editorRef.current?.innerHTML ||
//       form.content ||
//       "";

//     const tags =
//       tagsInput
//         .split(",")
//         .map((tag) =>
//           tag.trim()
//         )
//         .filter(Boolean);

//     return {
//       title:
//         form.title.trim(),

//       excerpt:
//         form.excerpt?.trim() || "",

//       content,

//       contentType:
//         form.contentType === "poem"
//           ? "poem"
//           : "story",

//       coverImage:
//         form.coverImage?.trim() || "",

//       category:
//         form.category?.trim() || "",

//       tags,

//       status: publish
//         ? "published"
//         : "draft",

//       isFeatured:
//         Boolean(form.isFeatured),

//       allowComments:
//         Boolean(form.allowComments),

//       authorName:
//         form.authorName ||
//         "Prosper Foundation",

//       seoTitle:
//         form.seoTitle || "",

//       seoDescription:
//         form.seoDescription || "",
//     };
//   };

//   /* =====================================================
//      SAVE DRAFT
//   ===================================================== */

//   const saveDraft = async () => {
//     try {
//       setSaving(true);
//       setError("");
//       setSuccess("");

//       const payload =
//         getPayload(false);

//       if (!payload.title) {
//         setError(
//           "Please enter a title before saving."
//         );

//         return;
//       }

//       if (!payload.content.trim()) {
//         setError(
//           "Please add some content before saving."
//         );

//         return;
//       }

//       let response;

//       if (storyId) {
//         response =
//           await updateStory(
//             storyId,
//             payload
//           );
//       } else {
//         response =
//           await createStory(
//             payload
//           );
//       }

//       const saved =
//         response?.data;

//       if (!saved?._id) {
//         throw new Error(
//           "Draft could not be saved."
//         );
//       }

//       setForm((prev) => ({
//         ...prev,
//         ...saved,
//         contentType:
//           saved.contentType ||
//           prev.contentType,
//       }));

//       setLastSaved(
//         new Date()
//       );

//       setSuccess(
//         "Draft saved successfully."
//       );

//       /*
//        * IMPORTANT:
//        * If this is a new story,
//        * redirect to edit page.
//        */

//       if (!storyId) {
//         navigate(
//           `/admin/stories/edit/${saved._id}`,
//           {
//             replace: true,
//           }
//         );
//       }
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           err.message ||
//           "Unable to save draft."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =====================================================
//      PUBLISH
//   ===================================================== */

//   const publish = async () => {
//     try {
//       setSaving(true);
//       setError("");
//       setSuccess("");

//       const payload =
//         getPayload(true);

//       if (!payload.title) {
//         setError(
//           "Please enter a title before publishing."
//         );

//         return;
//       }

//       if (!payload.content.trim()) {
//         setError(
//           "Please add content before publishing."
//         );

//         return;
//       }

//       let response;

//       if (storyId) {
//         response =
//           await updateStory(
//             storyId,
//             payload
//           );
//       } else {
//         response =
//           await createStory(
//             payload
//           );
//       }

//       const saved =
//         response?.data;

//       if (!saved?._id) {
//         throw new Error(
//           "Publishing failed."
//         );
//       }

//       setForm((prev) => ({
//         ...prev,
//         ...saved,
//         contentType:
//           saved.contentType ||
//           prev.contentType,
//         status: "published",
//       }));

//       setLastSaved(
//         new Date()
//       );

//       setSuccess(
//         "Published successfully."
//       );

//       /*
//        * New content -> edit page
//        */

//       if (!storyId) {
//         navigate(
//           `/admin/stories/edit/${saved._id}`,
//           {
//             replace: true,
//           }
//         );
//       }
//     } catch (err) {
//       setError(
//         err?.response?.data?.message ||
//           err.message ||
//           "Unable to publish content."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* =====================================================
//      PREVIEW
//   ===================================================== */

//   const togglePreview = () => {
//     if (!preview) {
//       const content =
//         editorRef.current?.innerHTML ||
//         "";

//       setForm((prev) => ({
//         ...prev,
//         content,
//       }));
//     }

//     setPreview(
//       (prev) => !prev
//     );

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   /* =====================================================
//      AUTO SAVE
//   ===================================================== */

//   useEffect(() => {
//     if (
//       !storyId ||
//       loading ||
//       saving ||
//       preview ||
//       !form.content
//     ) {
//       return;
//     }

//     const timer =
//       setTimeout(async () => {
//         try {
//           setAutoSaving(true);

//           const payload =
//             getPayload(false);

//           await updateStory(
//             storyId,
//             payload
//           );

//           setLastSaved(
//             new Date()
//           );
//         } catch (err) {
//           console.error(
//             "Autosave failed:",
//             err
//           );
//         } finally {
//           setAutoSaving(false);
//         }
//       }, 5000);

//     return () =>
//       clearTimeout(timer);
//   }, [
//     form.title,
//     form.excerpt,
//     form.content,
//     form.contentType,
//     form.coverImage,
//     form.category,
//     form.status,
//     form.isFeatured,
//     form.allowComments,
//     tagsInput,
//     storyId,
//     loading,
//     saving,
//     preview,
//   ]);

//   /* =====================================================
//      TOOLBAR BUTTON
//   ===================================================== */

//   const toolbarButton = (
//     icon,
//     title,
//     onClick
//   ) => (
//     <button
//       type="button"
//       title={title}
//       className="toolbar-btn"
//       onMouseDown={(e) =>
//         e.preventDefault()
//       }
//       onClick={onClick}
//     >
//       {icon}
//     </button>
//   );

//   /* =====================================================
//      READING TIME
//   ===================================================== */

//   const readingTime =
//     Math.max(
//       1,
//       Math.ceil(
//         wordCount / 200
//       )
//     );

//   /* =====================================================
//      LOADING
//   ===================================================== */

//   if (loading) {
//     return (
//       <div className="editor-loading-screen">
//         <div className="editor-spinner" />

//         <h3>
//           Loading editor...
//         </h3>

//         <p>
//           Preparing your editorial workspace.
//         </p>
//       </div>
//     );
//   }

//   /* =====================================================
//      UI
//   ===================================================== */

//   return (
//     <div className="story-editor-page">

//       {/* =================================================
//           TOP BAR
//       ================================================= */}

//       <header className="editor-topbar">

//         <div className="editor-top-left">

//           <button
//             type="button"
//             className="back-button"
//             onClick={() =>
//               navigate(
//                 "/admin/stories"
//               )
//             }
//           >
//             <FaArrowLeft />

//             <span>
//               Library
//             </span>
//           </button>

//           <div className="editor-heading">
//             <span>
//               EDITORIAL STUDIO
//             </span>

//             <strong>
//               {form.contentType ===
//               "poem"
//                 ? "Poem Editor"
//                 : "Story Editor"}
//             </strong>
//           </div>

//         </div>

//         {/* =================================================
//             SAVE STATUS
//         ================================================= */}

//         <div className="editor-save-state">

//           {autoSaving ? (
//             <>
//               <FaCloud />
//               <span>
//                 Auto-saving...
//               </span>
//             </>
//           ) : saving ? (
//             <>
//               <FaCloud />
//               <span>
//                 Saving...
//               </span>
//             </>
//           ) : lastSaved ? (
//             <>
//               <FaCheck />
//               <span>
//                 Saved{" "}
//                 {lastSaved.toLocaleTimeString(
//                   "en-IN",
//                   {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   }
//                 )}
//               </span>
//             </>
//           ) : (
//             <>
//               <FaCloud />
//               <span>
//                 Draft
//               </span>
//             </>
//           )}

//         </div>

//         {/* =================================================
//             IMPORTANT ACTION BUTTONS
//         ================================================= */}

//         <div className="editor-top-actions">

//           {/* PREVIEW */}

//           <button
//             type="button"
//             className="editor-action preview-action"
//             onClick={togglePreview}
//             disabled={saving}
//           >
//             {preview ? (
//               <FaTimes />
//             ) : (
//               <FaEye />
//             )}

//             <span>
//               {preview
//                 ? "Back to Edit"
//                 : "Preview"}
//             </span>
//           </button>

//           {/* SAVE DRAFT */}

//           <button
//             type="button"
//             className="editor-action draft-action"
//             onClick={saveDraft}
//             disabled={saving}
//           >
//             <FaSave />

//             <span>
//               {saving
//                 ? "Saving..."
//                 : "Save Draft"}
//             </span>
//           </button>

//           {/* PUBLISH */}

//           <button
//             type="button"
//             className="editor-action publish-action"
//             onClick={publish}
//             disabled={saving}
//           >
//             <FaCheck />

//             <span>
//               {saving
//                 ? "Publishing..."
//                 : "Publish"}
//             </span>
//           </button>

//         </div>
//       </header>

//       {/* =================================================
//           MESSAGES
//       ================================================= */}

//       {error && (
//         <div className="editor-message error">
//           <strong>
//             Error
//           </strong>

//           <span>
//             {error}
//           </span>

//           <button
//             type="button"
//             onClick={() =>
//               setError("")
//             }
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {success && (
//         <div className="editor-message success">
//           <FaCheck />

//           <span>
//             {success}
//           </span>

//           <button
//             type="button"
//             onClick={() =>
//               setSuccess("")
//             }
//           >
//             ×
//           </button>
//         </div>
//       )}

//       {/* =================================================
//           PREVIEW
//       ================================================= */}

//       {preview ? (
//         <main className="editor-preview-page">

//           <div className="preview-wrapper">

//             {form.coverImage && (
//               <img
//                 className="preview-cover"
//                 src={
//                   form.coverImage
//                 }
//                 alt={
//                   form.title
//                 }
//               />
//             )}

//             <div className="preview-content-header">

//               <span
//                 className={`preview-badge ${form.contentType}`}
//               >
//                 {form.contentType ===
//                 "poem" ? (
//                   <>
//                     <FaFeatherAlt />
//                     POEM
//                   </>
//                 ) : (
//                   <>
//                     <FaBookOpen />
//                     STORY
//                   </>
//                 )}
//               </span>

//               {form.category && (
//                 <span className="preview-category">
//                   {form.category}
//                 </span>
//               )}

//             </div>

//             <h1>
//               {form.title ||
//                 "Untitled"}
//             </h1>

//             {form.excerpt && (
//               <p className="preview-excerpt">
//                 {form.excerpt}
//               </p>
//             )}

//             <div className="preview-meta">

//               <span>
//                 {wordCount} words
//               </span>

//               <span>
//                 {readingTime} min read
//               </span>

//               <span>
//                 {form.authorName ||
//                   "Prosper Foundation"}
//               </span>

//             </div>

//             <div
//               className={`preview-content ${
//                 form.contentType ===
//                 "poem"
//                   ? "poem-preview-content"
//                   : ""
//               }`}
//               dangerouslySetInnerHTML={{
//                 __html:
//                   form.content ||
//                   "<p>No content yet.</p>",
//               }}
//             />

//           </div>
//         </main>
//       ) : (

//         /* =================================================
//            EDITOR
//         ================================================= */

//         <main className="editor-layout">

//           {/* =================================================
//               MAIN EDITOR
//           ================================================= */}

//           <section className="editor-main">

//             <div className="editor-paper">

//               <input
//                 className="editor-title"
//                 name="title"
//                 value={
//                   form.title
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder={
//                   form.contentType ===
//                   "poem"
//                     ? "Give your poem a title..."
//                     : "Give your story a title..."
//                 }
//               />

//               <textarea
//                 className="editor-excerpt"
//                 name="excerpt"
//                 value={
//                   form.excerpt
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Write a short excerpt or introduction..."
//                 rows="3"
//               />

//               {/* =================================================
//                   TOOLBAR
//               ================================================= */}

//               <div className="editor-toolbar">

//                 <div className="toolbar-group">

//                   <select
//                     defaultValue="p"
//                     title="Text style"
//                     onChange={(e) =>
//                       applyBlock(
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option value="p">
//                       Paragraph
//                     </option>

//                     <option value="h1">
//                       Heading 1
//                     </option>

//                     <option value="h2">
//                       Heading 2
//                     </option>

//                     <option value="h3">
//                       Heading 3
//                     </option>

//                     <option value="blockquote">
//                       Quote
//                     </option>
//                   </select>

//                   {/* FONT FAMILY */}

//                   <select
//                     defaultValue="Georgia"
//                     title="Font family"
//                     onChange={(e) =>
//                       applyFont(
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option value="Arial">
//                       Arial
//                     </option>

//                     <option value="Georgia">
//                       Georgia
//                     </option>

//                     <option value="Times New Roman">
//                       Times New Roman
//                     </option>

//                     <option value="Verdana">
//                       Verdana
//                     </option>

//                     <option value="Trebuchet MS">
//                       Trebuchet MS
//                     </option>

//                     <option value="Courier New">
//                       Courier New
//                     </option>

//                     <option value="Garamond">
//                       Garamond
//                     </option>

//                   </select>

//                   {/* FONT SIZE */}

//                   <select
//                     defaultValue="3"
//                     title="Font size"
//                     onChange={(e) =>
//                       applyFontSize(
//                         e.target.value
//                       )
//                     }
//                   >
//                     <option value="1">
//                       10 px
//                     </option>

//                     <option value="2">
//                       13 px
//                     </option>

//                     <option value="3">
//                       16 px
//                     </option>

//                     <option value="4">
//                       18 px
//                     </option>

//                     <option value="5">
//                       24 px
//                     </option>

//                     <option value="6">
//                       32 px
//                     </option>

//                     <option value="7">
//                       40 px
//                     </option>

//                   </select>

//                 </div>

//                 <div className="toolbar-divider" />

//                 <div className="toolbar-group">

//                   {toolbarButton(
//                     <FaBold />,
//                     "Bold",
//                     () => {
//                       exec("bold");
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaItalic />,
//                     "Italic",
//                     () => {
//                       exec("italic");
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaUnderline />,
//                     "Underline",
//                     () => {
//                       exec("underline");
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaStrikethrough />,
//                     "Strikethrough",
//                     () => {
//                       exec(
//                         "strikeThrough"
//                       );
//                       handleEditorInput();
//                     }
//                   )}

//                 </div>

//                 <div className="toolbar-divider" />

//                 <div className="toolbar-group">

//                   {toolbarButton(
//                     <FaAlignLeft />,
//                     "Align left",
//                     () => {
//                       exec(
//                         "justifyLeft"
//                       );
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaAlignCenter />,
//                     "Center",
//                     () => {
//                       exec(
//                         "justifyCenter"
//                       );
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaAlignRight />,
//                     "Align right",
//                     () => {
//                       exec(
//                         "justifyRight"
//                       );
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaAlignJustify />,
//                     "Justify",
//                     () => {
//                       exec(
//                         "justifyFull"
//                       );
//                       handleEditorInput();
//                     }
//                   )}

//                 </div>

//                 <div className="toolbar-divider" />

//                 <div className="toolbar-group">

//                   {toolbarButton(
//                     <FaListUl />,
//                     "Bullet list",
//                     () => {
//                       exec(
//                         "insertUnorderedList"
//                       );
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaListOl />,
//                     "Numbered list",
//                     () => {
//                       exec(
//                         "insertOrderedList"
//                       );
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaQuoteLeft />,
//                     "Quote",
//                     () =>
//                       applyBlock(
//                         "blockquote"
//                       )
//                   )}

//                   {toolbarButton(
//                     <FaLink />,
//                     "Add link",
//                     createLink
//                   )}

//                   {toolbarButton(
//                     <FaImage />,
//                     "Insert image",
//                     openImagePicker
//                   )}

//                   {toolbarButton(
//                     <FaMinus />,
//                     "Divider",
//                     insertDivider
//                   )}

//                 </div>

//                 <div className="toolbar-divider" />

//                 <div className="toolbar-group">

//                   {toolbarButton(
//                     <FaUndo />,
//                     "Undo",
//                     () => {
//                       exec("undo");
//                       handleEditorInput();
//                     }
//                   )}

//                   {toolbarButton(
//                     <FaRedo />,
//                     "Redo",
//                     () => {
//                       exec("redo");
//                       handleEditorInput();
//                     }
//                   )}

//                 </div>

//               </div>

//               {/* Hidden device image input */}

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 hidden
//                 onChange={
//                   handleImageUpload
//                 }
//               />

//               {/* =================================================
//                   RICH EDITOR
//               ================================================= */}

//               <div
//                 ref={editorRef}
//                 className={`rich-editor ${
//                   form.contentType ===
//                   "poem"
//                     ? "poem-editor"
//                     : ""
//                 }`}
//                 contentEditable
//                 suppressContentEditableWarning
//                 onInput={
//                   handleEditorInput
//                 }
//                 data-placeholder={
//                   form.contentType ===
//                   "poem"
//                     ? "Start writing your poem..."
//                     : "Start writing your story..."
//                 }
//               />

//               {/* =================================================
//                   BOTTOM STATUS
//               ================================================= */}

//               <div className="editor-bottom">

//                 <span>
//                   {wordCount} words
//                 </span>

//                 <span>
//                   {readingTime} min read
//                 </span>

//                 <span>
//                   {form.contentType ===
//                   "poem"
//                     ? "Poem"
//                     : "Story"}
//                 </span>

//               </div>

//             </div>

//           </section>

//           {/* =================================================
//               SIDEBAR
//           ================================================= */}

//           <aside className="editor-sidebar">

//             {/* PUBLICATION */}

//             <div className="sidebar-card">

//               <div className="sidebar-card-title">
//                 <FaBookOpen />

//                 <h3>
//                   Publication
//                 </h3>
//               </div>

//               <label>
//                 Content type

//                 <select
//                   name="contentType"
//                   value={
//                     form.contentType
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 >
//                   <option value="story">
//                     Story
//                   </option>

//                   <option value="poem">
//                     Poem
//                   </option>
//                 </select>
//               </label>

//               <label>
//                 Status

//                 <select
//                   name="status"
//                   value={
//                     form.status
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 >
//                   <option value="draft">
//                     Draft
//                   </option>

//                   <option value="published">
//                     Published
//                   </option>
//                 </select>
//               </label>

//               <label className="checkbox-row">

//                 <input
//                   type="checkbox"
//                   name="isFeatured"
//                   checked={
//                     Boolean(
//                       form.isFeatured
//                     )
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 />

//                 <span>
//                   Feature this content
//                 </span>

//               </label>

//               <label className="checkbox-row">

//                 <input
//                   type="checkbox"
//                   name="allowComments"
//                   checked={
//                     Boolean(
//                       form.allowComments
//                     )
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 />

//                 <span>
//                   Allow comments
//                 </span>

//               </label>

//             </div>

//             {/* COVER IMAGE */}

//             <div className="sidebar-card">

//               <div className="sidebar-card-title">

//                 <FaImage />

//                 <h3>
//                   Cover Image
//                 </h3>

//               </div>

//               <input
//                 name="coverImage"
//                 value={
//                   form.coverImage
//                 }
//                 onChange={
//                   handleChange
//                 }
//                 placeholder="Paste image URL..."
//               />

//               <button
//                 type="button"
//                 className="device-image-btn"
//                 onClick={
//                   openImagePicker
//                 }
//               >
//                 <FaImage />

//                 Choose from device
//               </button>

//               {form.coverImage && (
//                 <img
//                   className="cover-preview"
//                   src={
//                     form.coverImage
//                   }
//                   alt="Cover preview"
//                 />
//               )}

//               {selectedImage && (
//                 <small>
//                   Image inserted into
//                   editor.
//                 </small>
//               )}

//             </div>

//             {/* ORGANIZATION */}

//             <div className="sidebar-card">

//               <div className="sidebar-card-title">

//                 <FaFeatherAlt />

//                 <h3>
//                   Organization
//                 </h3>

//               </div>

//               <label>
//                 Category

//                 <input
//                   name="category"
//                   value={
//                     form.category
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   placeholder="Life, Spirituality..."
//                 />
//               </label>

//               <label>
//                 Tags

//                 <input
//                   value={
//                     tagsInput
//                   }
//                   onChange={(e) =>
//                     setTagsInput(
//                       e.target.value
//                     )
//                   }
//                   onBlur={
//                     updateTags
//                   }
//                   placeholder="hope, life, wisdom"
//                 />
//               </label>

//               <label>
//                 Author

//                 <input
//                   name="authorName"
//                   value={
//                     form.authorName
//                   }
//                   onChange={
//                     handleChange
//                   }
//                 />
//               </label>

//             </div>

//             {/* SEO */}

//             <div className="sidebar-card">

//               <div className="sidebar-card-title">

//                 <FaFilePdf />

//                 <h3>
//                   SEO
//                 </h3>

//               </div>

//               <label>
//                 SEO title

//                 <input
//                   name="seoTitle"
//                   value={
//                     form.seoTitle
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   placeholder="SEO title..."
//                 />
//               </label>

//               <label>
//                 SEO description

//                 <textarea
//                   name="seoDescription"
//                   value={
//                     form.seoDescription
//                   }
//                   onChange={
//                     handleChange
//                   }
//                   rows="4"
//                   placeholder="SEO description..."
//                 />

//               </label>

//             </div>

//             {/* =================================================
//                 MOBILE ACTIONS
//             ================================================= */}

//             <div className="mobile-editor-actions">

//               <button
//                 type="button"
//                 onClick={
//                   togglePreview
//                 }
//                 disabled={saving}
//               >
//                 <FaEye />
//                 Preview
//               </button>

//               <button
//                 type="button"
//                 onClick={
//                   saveDraft
//                 }
//                 disabled={saving}
//               >
//                 <FaSave />
//                 Save Draft
//               </button>

//               <button
//                 type="button"
//                 onClick={
//                   publish
//                 }
//                 disabled={saving}
//               >
//                 <FaCheck />
//                 Publish
//               </button>

//             </div>

//           </aside>

//         </main>
//       )}

//       {/* =================================================
//           FLOATING MOBILE ACTION BAR
//       ================================================= */}

//       {!preview && (
//         <div className="mobile-bottom-actions">

//           <button
//             type="button"
//             onClick={
//               togglePreview
//             }
//             disabled={saving}
//           >
//             <FaEye />
//             <span>
//               Preview
//             </span>
//           </button>

//           <button
//             type="button"
//             onClick={
//               saveDraft
//             }
//             disabled={saving}
//           >
//             <FaSave />
//             <span>
//               Save Draft
//             </span>
//           </button>

//           <button
//             type="button"
//             onClick={
//               publish
//             }
//             disabled={saving}
//           >
//             <FaCheck />
//             <span>
//               Publish
//             </span>
//           </button>

//         </div>
//       )}

//     </div>
//   );
// }



import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaBold,
  FaItalic,
  FaUnderline,
  FaStrikethrough,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaQuoteLeft,
  FaLink,
  FaImage,
  FaMinus,
  FaUndo,
  FaRedo,
  FaSave,
  FaEye,
  FaCloud,
  FaCheck,
  FaTimes,
  FaBookOpen,
  FaFeatherAlt,
  FaFilePdf,
  FaUpload,
  FaTrash,
} from "react-icons/fa";

import {
  getAdminStory,
  createStory,
  updateStory,
  uploadStoryPdf,
} from "../api/storyApi";
import "./AdminStoryEditor.css";

const defaultForm = {
  title: "",
  excerpt: "",
  content: "",
  contentType: "story",

  coverImage: "",

  category: "",
  tags: [],

  status: "draft",

  isFeatured: false,
  allowComments: true,

  authorName: "Prosper Foundation",

  seoTitle: "",
  seoDescription: "",

  pdfUrl: "",
  pdfName: "",
};

const exec = (
  command,
  value = null
) => {
  document.execCommand(
    command,
    false,
    value
  );
};

const getResponseData = (response) => {
  if (!response) return null;

  if (
    response.data &&
    response.data._id
  ) {
    return response.data;
  }

  if (
    response.data?.data &&
    response.data.data._id
  ) {
    return response.data.data;
  }

  if (response._id) {
    return response;
  }

  return response.data || response;
};

export default function AdminStoryEditor({
  storyId: propStoryId,
}) {
  const navigate = useNavigate();
  const params = useParams();

  const storyId =
    propStoryId || params.id;

  const editorRef = useRef(null);

  const imageInputRef =
    useRef(null);

  const pdfInputRef =
    useRef(null);

  const [form, setForm] =
    useState(defaultForm);

  const [loading, setLoading] =
    useState(Boolean(storyId));

  const [saving, setSaving] =
    useState(false);

  const [preview, setPreview] =
    useState(false);

  const [autoSaving, setAutoSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [tagsInput, setTagsInput] =
    useState("");

  const [wordCount, setWordCount] =
    useState(0);

  const [lastSaved, setLastSaved] =
    useState(null);

  /* =====================================================
     LOAD
  ===================================================== */

  useEffect(() => {
    if (!storyId) {
      setLoading(false);
      return;
    }

    const loadStory = async () => {
      try {
        setLoading(true);
        setError("");

        const response =
          await getAdminStory(storyId);

        const story =
          getResponseData(response);

        if (!story) {
          throw new Error(
            "Content not found."
          );
        }

        const nextForm = {
          ...defaultForm,
          ...story,

          contentType:
            story.contentType ||
            story.type ||
            "story",

          tags: Array.isArray(
            story.tags
          )
            ? story.tags
            : [],

          status:
            story.status ===
            "published"
              ? "published"
              : "draft",

          pdfUrl:
            story.pdfUrl ||
            story.originalPdf ||
            story.pdf ||
            "",

          pdfName:
            story.pdfName ||
            "",
        };

        setForm(nextForm);

        setTagsInput(
          nextForm.tags.join(", ")
        );

        setTimeout(() => {
          if (editorRef.current) {
            editorRef.current.innerHTML =
              story.content || "";

            updateWordCount(
              story.content || ""
            );
          }
        }, 100);
      } catch (err) {
        console.error(err);

        setError(
          err?.response?.data
            ?.message ||
            err.message ||
            "Unable to load content."
        );
      } finally {
        setLoading(false);
      }
    };

    loadStory();
  }, [storyId]);

  /* =====================================================
     WORD COUNT
  ===================================================== */

  const updateWordCount = (
    html = ""
  ) => {
    const temp =
      document.createElement(
        "div"
      );

    temp.innerHTML = html;

    const text =
      temp.textContent ||
      temp.innerText ||
      "";

    const words =
      text
        .replace(/\s+/g, " ")
        .trim();

    setWordCount(
      words
        ? words.split(" ").length
        : 0
    );
  };

  /* =====================================================
     EDITOR INPUT
  ===================================================== */

  const handleEditorInput =
    () => {
      const html =
        editorRef.current
          ?.innerHTML || "";

      setForm((prev) => ({
        ...prev,
        content: html,
      }));

      updateWordCount(html);
    };

  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  /* =====================================================
     FORMAT
  ===================================================== */

  const applyBlock = (tag) => {
    editorRef.current?.focus();

    exec(
      "formatBlock",
      tag
    );

    handleEditorInput();
  };

  const applyFont = (font) => {
    editorRef.current?.focus();

    exec(
      "fontName",
      font
    );

    handleEditorInput();
  };

  const applyFontSize = (
    size
  ) => {
    editorRef.current?.focus();

    exec(
      "fontSize",
      size
    );

    handleEditorInput();
  };

  /* =====================================================
     LINK
  ===================================================== */

  const createLink = () => {
    const url =
      window.prompt(
        "Enter URL"
      );

    if (!url) return;

    editorRef.current?.focus();

    exec(
      "createLink",
      url
    );

    handleEditorInput();
  };

  /* =====================================================
     IMAGE
  ===================================================== */

  const openImagePicker = () => {
    imageInputRef.current?.click();
  };

  const handleImageUpload = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      const imageUrl =
        reader.result;

      editorRef.current?.focus();

      exec(
        "insertImage",
        imageUrl
      );

      handleEditorInput();
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  
  /* =====================================================
     COVER IMAGE
  ===================================================== */

  const handleCoverImage = (
    event
  ) => {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
      setError(
        "Please select a valid image."
      );
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        coverImage:
          reader.result,
      }));
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  /* =====================================================
   PDF
===================================================== */

const openPdfPicker = () => {
  if (saving) return;

  pdfInputRef.current?.click();
};

const handlePdfUpload = async (file) => {
  try {
    setError("");
    setSuccess("");

    if (!(file instanceof File)) {
      setError(
        "Please select a PDF file."
      );
      return;
    }

    const isPdf =
      file.type === "application/pdf" ||
      file.name
        ?.toLowerCase()
        .endsWith(".pdf");

    if (!isPdf) {
      setError(
        "Only PDF files are allowed."
      );
      return;
    }

    if (file.size <= 0) {
      setError(
        "The selected PDF file is empty."
      );
      return;
    }

    if (
      file.size >
      20 * 1024 * 1024
    ) {
      setError(
        "PDF must be 20 MB or smaller."
      );
      return;
    }

    setSaving(true);

    console.log(
      "Uploading PDF:",
      {
        name: file.name,
        type: file.type,
        size: file.size,
      }
    );

    const response =
      await uploadStoryPdf(
        file,
        form.contentType ===
        "poem"
          ? "poem"
          : "story"
      );

    console.log(
      "PDF upload raw response:",
      response
    );

    const data =
      response?.data?.data ||
      response?.data ||
      response;

    if (!data) {
      throw new Error(
        "PDF upload returned an empty response."
      );
    }

    const extractedContent =
      data.content || "";

    if (
      extractedContent &&
      editorRef.current
    ) {
      editorRef.current.innerHTML =
        extractedContent;
    }

    setForm((prev) => ({
      ...prev,

      content:
        extractedContent ||
        prev.content,

      pdfUrl:
        data.originalPdfUrl ||
        data.pdfUrl ||
        "",

      pdfName:
        data.originalPdfName ||
        data.pdfName ||
        file.name,

      pdfSize:
        Number(
          data.originalPdfSize ??
          data.pdfSize ??
          file.size
        ) || file.size,

      pdfAvailable: true,
    }));

    updateWordCount(
      extractedContent ||
      form.content ||
      ""
    );

    setSuccess(
      extractedContent
        ? "PDF uploaded and content extracted successfully."
        : "PDF uploaded successfully."
    );

    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }

  } catch (error) {

    console.error(
      "PDF upload failed:",
      error?.response?.data ||
      error
    );

    setError(
      error?.response?.data?.message ||
      error?.message ||
      "Unable to upload PDF."
    );

  } finally {
    setSaving(false);
  }
};
const removePdf = () => {

  setForm(
    (prev) => ({
      ...prev,

      pdfUrl: "",

      pdfName: "",
    })
  );

  setSuccess(
    "PDF removed from this story."
  );
};
  /* =====================================================
     DIVIDER
  ===================================================== */

  const insertDivider = () => {
    editorRef.current?.focus();

    exec(
      "insertHTML",
      "<hr>"
    );

    handleEditorInput();
  };

  /* =====================================================
     TAGS
  ===================================================== */

  const updateTags = () => {
    const tags =
      tagsInput
        .split(",")
        .map((tag) =>
          tag.trim()
        )
        .filter(Boolean);

    setForm((prev) => ({
      ...prev,
      tags,
    }));
  };

  /* =====================================================
     PAYLOAD
  ===================================================== */

  const getPayload = (
  publish = false
) => {

  const content =
    editorRef.current
      ?.innerHTML ||
    form.content ||
    "";


  const tags =
    tagsInput
      .split(",")
      .map((tag) =>
        tag.trim()
      )
      .filter(Boolean);


  return {

    title:
      form.title.trim(),

    excerpt:
      form.excerpt?.trim() ||
      "",

    content,

    contentType:
      form.contentType ===
      "poem"
        ? "poem"
        : "story",

    coverImage:
      form.coverImage || "",

    category:
      form.category?.trim() ||
      "",

    tags,

    status:
      publish
        ? "published"
        : "draft",

    isFeatured:
      Boolean(
        form.isFeatured
      ),

    allowComments:
      Boolean(
        form.allowComments
      ),

    authorName:
      form.authorName ||
      "Prosper Foundation",

    seoTitle:
      form.seoTitle || "",

    seoDescription:
      form.seoDescription ||
      "",

    // IMPORTANT
    // This is now a normal URL,
    // NOT Base64.

    pdfUrl:
      form.pdfUrl || "",

    pdfName:
      form.pdfName || "",
  };
};

  /* =====================================================
     SAVE DRAFT
  ===================================================== */

  const saveDraft = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload =
        getPayload(false);

      if (!payload.title) {
        setError(
          "Please enter a title."
        );
        return;
      }

      if (!payload.content.trim()) {
        setError(
          "Please add content."
        );
        return;
      }

      let response;

      if (storyId) {
        response =
          await updateStory(
            storyId,
            payload
          );
      } else {
        response =
          await createStory(
            payload
          );
      }

      const saved =
        getResponseData(response);

      if (!saved?._id) {
        throw new Error(
          "Draft could not be saved."
        );
      }

      setForm((prev) => ({
        ...prev,
        ...saved,

        pdfUrl:
          saved.pdfUrl ||
          prev.pdfUrl,

        pdfName:
          saved.pdfName ||
          prev.pdfName,
      }));

      setLastSaved(
        new Date()
      );

      setSuccess(
        "Draft saved successfully."
      );

      if (!storyId) {
        navigate(
          `/admin/stories/edit/${saved._id}`,
          {
            replace: true,
          }
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data
          ?.message ||
          err.message ||
          "Unable to save draft."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     PUBLISH
  ===================================================== */

  const publish = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload =
        getPayload(true);

      if (!payload.title) {
        setError(
          "Please enter a title."
        );
        return;
      }

      if (!payload.content.trim()) {
        setError(
          "Please add content."
        );
        return;
      }

      let response;

      if (storyId) {
        response =
          await updateStory(
            storyId,
            payload
          );
      } else {
        response =
          await createStory(
            payload
          );
      }

      const saved =
        getResponseData(response);

      if (!saved?._id) {
        throw new Error(
          "Publishing failed."
        );
      }

      setForm((prev) => ({
        ...prev,
        ...saved,
        status: "published",
      }));

      setLastSaved(
        new Date()
      );

      setSuccess(
        "Content published successfully."
      );

      if (!storyId) {
        navigate(
          `/admin/stories/edit/${saved._id}`,
          {
            replace: true,
          }
        );
      }
    } catch (err) {
      console.error(err);

      setError(
        err?.response?.data
          ?.message ||
          err.message ||
          "Unable to publish."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =====================================================
     PREVIEW
  ===================================================== */

  const togglePreview = () => {
    if (!preview) {
      handleEditorInput();
    }

    setPreview(
      (prev) => !prev
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =====================================================
     AUTOSAVE
  ===================================================== */

  useEffect(() => {
    if (
      !storyId ||
      loading ||
      saving ||
      preview ||
      !form.content
    ) {
      return;
    }

    const timer =
      setTimeout(async () => {
        try {
          setAutoSaving(true);

          const payload =
            getPayload(false);

          await updateStory(
            storyId,
            payload
          );

          setLastSaved(
            new Date()
          );
        } catch (err) {
          console.error(
            "Autosave failed:",
            err
          );
        } finally {
          setAutoSaving(false);
        }
      }, 5000);

    return () =>
      clearTimeout(timer);
  }, [
    storyId,
    loading,
    saving,
    preview,
    form.title,
    form.excerpt,
    form.content,
    form.contentType,
    form.coverImage,
    form.category,
    form.isFeatured,
    form.allowComments,
    form.authorName,
    form.seoTitle,
    form.seoDescription,
    form.pdfUrl,
    form.pdfName,
    tagsInput,
  ]);

  /* =====================================================
     TOOLBAR BUTTON
  ===================================================== */

  const toolbarButton = (
    icon,
    title,
    onClick
  ) => (
    <button
      type="button"
      title={title}
      className="toolbar-btn"
      onMouseDown={(e) =>
        e.preventDefault()
      }
      onClick={onClick}
    >
      {icon}
    </button>
  );

  const readingTime =
    Math.max(
      1,
      Math.ceil(
        wordCount / 200
      )
    );

  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <div className="editor-loading-screen">
        <div className="editor-spinner" />

        <h3>
          Loading Editorial Studio
        </h3>

        <p>
          Preparing your workspace...
        </p>
      </div>
    );
  }

  /* =====================================================
     UI
  ===================================================== */

  return (
    <div className="story-editor-page">

      <header className="editor-topbar">

        <div className="editor-top-left">

          <button
            className="back-button"
            type="button"
            onClick={() =>
              navigate(
                "/admin/stories"
              )
            }
          >
            <FaArrowLeft />
            Library
          </button>

          <div className="editor-heading">
            <span>
              PROSPER FOUNDATION
            </span>

            <strong>
              {form.contentType ===
              "poem"
                ? "Poem Editor"
                : "Story Editor"}
            </strong>
          </div>

        </div>

        <div className="editor-save-state">

          {autoSaving ? (
            <>
              <FaCloud />
              Auto-saving...
            </>
          ) : saving ? (
            <>
              <FaCloud />
              Saving...
            </>
          ) : lastSaved ? (
            <>
              <FaCheck />
              Saved{" "}
              {lastSaved.toLocaleTimeString(
                "en-IN",
                {
                  hour: "2-digit",
                  minute:
                    "2-digit",
                }
              )}
            </>
          ) : (
            <>
              <FaCloud />
              Draft
            </>
          )}

        </div>

        <div className="editor-top-actions">

          <button
            className="editor-action preview-action"
            onClick={
              togglePreview
            }
            disabled={saving}
          >
            {preview ? (
              <FaTimes />
            ) : (
              <FaEye />
            )}

            {preview
              ? "Back to Edit"
              : "Preview"}
          </button>

          <button
            className="editor-action draft-action"
            onClick={
              saveDraft
            }
            disabled={saving}
          >
            <FaSave />

            {saving
              ? "Saving..."
              : "Save Draft"}
          </button>

          <button
            className="editor-action publish-action"
            onClick={
              publish
            }
            disabled={saving}
          >
            <FaCheck />

            {saving
              ? "Publishing..."
              : "Publish"}
          </button>

        </div>
      </header>

      {error && (
        <div className="editor-message error">
          <strong>Error</strong>
          <span>{error}</span>

          <button
            onClick={() =>
              setError("")
            }
          >
            ×
          </button>
        </div>
      )}

      {success && (
        <div className="editor-message success">
          <FaCheck />

          <span>{success}</span>

          <button
            onClick={() =>
              setSuccess("")
            }
          >
            ×
          </button>
        </div>
      )}

      {preview ? (
        <main className="editor-preview-page">

          <div className="preview-wrapper">

            {form.coverImage && (
              <img
                src={
                  form.coverImage
                }
                className="preview-cover"
                alt={
                  form.title
                }
              />
            )}

            <div className="preview-content-header">

              <span
                className={`preview-badge ${form.contentType}`}
              >
                {form.contentType ===
                "poem" ? (
                  <>
                    <FaFeatherAlt />
                    POEM
                  </>
                ) : (
                  <>
                    <FaBookOpen />
                    STORY
                  </>
                )}
              </span>

              {form.category && (
                <span className="preview-category">
                  {form.category}
                </span>
              )}

            </div>

            <h1>
              {form.title ||
                "Untitled"}
            </h1>

            {form.excerpt && (
              <p className="preview-excerpt">
                {form.excerpt}
              </p>
            )}

            <div className="preview-meta">
              <span>
                {wordCount} words
              </span>

              <span>
                {readingTime} min read
              </span>

              <span>
                {form.authorName}
              </span>
            </div>

            <article
              className={`preview-content ${
                form.contentType ===
                "poem"
                  ? "poem-preview-content"
                  : ""
              }`}
              dangerouslySetInnerHTML={{
                __html:
                  form.content ||
                  "<p>No content yet.</p>",
              }}
            />

           {form.pdfUrl && (
  <div className="preview-pdf-box">

    <FaFilePdf />

    <div>
      <strong>
        Original PDF
      </strong>

      <span>
        {form.pdfName ||
          "Original document"}
      </span>
    </div>

    <a
      href={form.pdfUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      View PDF
    </a>

  </div>
)}

          </div>

        </main>
      ) : (
        <main className="editor-layout">

          <section className="editor-main">

            <div className="editor-paper">

              <input
                className="editor-title"
                name="title"
                value={
                  form.title
                }
                onChange={
                  handleChange
                }
                placeholder={
                  form.contentType ===
                  "poem"
                    ? "Give your poem a title..."
                    : "Give your story a title..."
                }
              />

              <textarea
                className="editor-excerpt"
                name="excerpt"
                value={
                  form.excerpt
                }
                onChange={
                  handleChange
                }
                placeholder="Write a short excerpt..."
              />

              <div className="editor-toolbar">

                <div className="toolbar-group">

                  <select
                    defaultValue="p"
                    onChange={(e) =>
                      applyBlock(
                        e.target.value
                      )
                    }
                  >
                    <option value="p">
                      Paragraph
                    </option>

                    <option value="h1">
                      Heading 1
                    </option>

                    <option value="h2">
                      Heading 2
                    </option>

                    <option value="h3">
                      Heading 3
                    </option>

                    <option value="blockquote">
                      Quote
                    </option>
                  </select>

                  <select
                    defaultValue="Georgia"
                    onChange={(e) =>
                      applyFont(
                        e.target.value
                      )
                    }
                  >
                    <option value="Arial">
                      Arial
                    </option>

                    <option value="Georgia">
                      Georgia
                    </option>

                    <option value="Times New Roman">
                      Times New Roman
                    </option>

                    <option value="Verdana">
                      Verdana
                    </option>

                    <option value="Trebuchet MS">
                      Trebuchet MS
                    </option>

                    <option value="Courier New">
                      Courier New
                    </option>

                    <option value="Garamond">
                      Garamond
                    </option>
                  </select>

                  <select
                    defaultValue="3"
                    onChange={(e) =>
                      applyFontSize(
                        e.target.value
                      )
                    }
                  >
                    <option value="1">
                      10px
                    </option>

                    <option value="2">
                      13px
                    </option>

                    <option value="3">
                      16px
                    </option>

                    <option value="4">
                      18px
                    </option>

                    <option value="5">
                      24px
                    </option>

                    <option value="6">
                      32px
                    </option>

                    <option value="7">
                      40px
                    </option>
                  </select>

                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">

                  {toolbarButton(
                    <FaBold />,
                    "Bold",
                    () => {
                      exec("bold");
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaItalic />,
                    "Italic",
                    () => {
                      exec("italic");
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaUnderline />,
                    "Underline",
                    () => {
                      exec(
                        "underline"
                      );
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaStrikethrough />,
                    "Strike",
                    () => {
                      exec(
                        "strikeThrough"
                      );
                      handleEditorInput();
                    }
                  )}

                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">

                  {toolbarButton(
                    <FaAlignLeft />,
                    "Align left",
                    () => {
                      exec(
                        "justifyLeft"
                      );
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaAlignCenter />,
                    "Center",
                    () => {
                      exec(
                        "justifyCenter"
                      );
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaAlignRight />,
                    "Right",
                    () => {
                      exec(
                        "justifyRight"
                      );
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaAlignJustify />,
                    "Justify",
                    () => {
                      exec(
                        "justifyFull"
                      );
                      handleEditorInput();
                    }
                  )}

                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">

                  {toolbarButton(
                    <FaListUl />,
                    "Bullet list",
                    () => {
                      exec(
                        "insertUnorderedList"
                      );
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaListOl />,
                    "Numbered list",
                    () => {
                      exec(
                        "insertOrderedList"
                      );
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaQuoteLeft />,
                    "Quote",
                    () =>
                      applyBlock(
                        "blockquote"
                      )
                  )}

                  {toolbarButton(
                    <FaLink />,
                    "Link",
                    createLink
                  )}

                  {toolbarButton(
                    <FaImage />,
                    "Image",
                    openImagePicker
                  )}

                  {toolbarButton(
                    <FaMinus />,
                    "Divider",
                    insertDivider
                  )}

                </div>

                <div className="toolbar-divider" />

                <div className="toolbar-group">

                  {toolbarButton(
                    <FaUndo />,
                    "Undo",
                    () => {
                      exec("undo");
                      handleEditorInput();
                    }
                  )}

                  {toolbarButton(
                    <FaRedo />,
                    "Redo",
                    () => {
                      exec("redo");
                      handleEditorInput();
                    }
                  )}

                </div>

              </div>

              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleImageUpload
                }
              />

              <div
                ref={editorRef}
                className={`rich-editor ${
                  form.contentType ===
                  "poem"
                    ? "poem-editor"
                    : ""
                }`}
                contentEditable
                suppressContentEditableWarning
                onInput={
                  handleEditorInput
                }
                data-placeholder={
                  form.contentType ===
                  "poem"
                    ? "Start writing your poem..."
                    : "Start writing your story..."
                }
              />

              <div className="editor-bottom">
                <span>
                  {wordCount} words
                </span>

                <span>
                  {readingTime} min read
                </span>

                <span>
                  {form.contentType}
                </span>
              </div>

            </div>

          </section>

          <aside className="editor-sidebar">

            {/* PUBLICATION */}

            <div className="sidebar-card">

              <div className="sidebar-card-title">
                <FaBookOpen />
                <h3>
                  Publication
                </h3>
              </div>

              <label>
                Content type

                <select
                  name="contentType"
                  value={
                    form.contentType
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="story">
                    Story
                  </option>

                  <option value="poem">
                    Poem
                  </option>
                </select>
              </label>

              <label>
                Status

                <select
                  name="status"
                  value={
                    form.status
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option value="draft">
                    Draft
                  </option>

                  <option value="published">
                    Published
                  </option>
                </select>
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={
                    Boolean(
                      form.isFeatured
                    )
                  }
                  onChange={
                    handleChange
                  }
                />

                Feature content
              </label>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  name="allowComments"
                  checked={
                    Boolean(
                      form.allowComments
                    )
                  }
                  onChange={
                    handleChange
                  }
                />

                Allow comments
              </label>

            </div>

            {/* COVER */}

            <div className="sidebar-card">

              <div className="sidebar-card-title">
                <FaImage />
                <h3>
                  Cover Image
                </h3>
              </div>

              <input
                type="text"
                name="coverImage"
                value={
                  form.coverImage
                }
                onChange={
                  handleChange
                }
                placeholder="Image URL..."
              />

              <button
                type="button"
                className="device-upload-btn"
                onClick={() =>
                  document
                    .getElementById(
                      "cover-image-input"
                    )
                    ?.click()
                }
              >
                <FaUpload />
                Choose from device
              </button>

              <input
                id="cover-image-input"
                type="file"
                accept="image/*"
                hidden
                onChange={
                  handleCoverImage
                }
              />

              {form.coverImage && (
                <div className="cover-preview-wrapper">

                  <img
                    src={
                      form.coverImage
                    }
                    alt="Cover"
                    className="cover-preview"
                  />

                </div>
              )}

            </div>

            {/* ORIGINAL PDF */}

            <div className="sidebar-card">

              <div className="sidebar-card-title">
                <FaFilePdf />

                <h3>
                  Original PDF
                </h3>
              </div>

              <p className="sidebar-help">
                Upload the original designed PDF.
                Visitors can view/download it
                from the detail page.
              </p>

              <button
                type="button"
                className="pdf-upload-btn"
                onClick={
                  openPdfPicker
                }
              >
                <FaUpload />
                Select PDF from device
              </button>

<input
  ref={pdfInputRef}
  type="file"
  accept="application/pdf,.pdf"
  hidden
  onChange={(e) => {
    const file =
      e.target.files?.[0];

    if (file) {
      handlePdfUpload(file);
    }
  }}
/>
              {form.pdfUrl && (
                <div className="pdf-selected">

                  <div className="pdf-icon">
                    <FaFilePdf />
                  </div>

                  <div className="pdf-info">
                    <strong>
                      {form.pdfName ||
                        "Original PDF"}
                    </strong>

                    <span>
                      PDF document
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={
                      removePdf
                    }
                    title="Remove PDF"
                  >
                    <FaTrash />
                  </button>

                </div>
              )}

            </div>

            {/* ORGANIZATION */}

            <div className="sidebar-card">

              <div className="sidebar-card-title">
                <FaFeatherAlt />

                <h3>
                  Organization
                </h3>
              </div>

              <label>
                Category

                <input
                  name="category"
                  value={
                    form.category
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="Life, Spirituality..."
                />
              </label>

              <label>
                Tags

                <input
                  value={
                    tagsInput
                  }
                  onChange={(e) =>
                    setTagsInput(
                      e.target.value
                    )
                  }
                  onBlur={
                    updateTags
                  }
                  placeholder="life, wisdom, hope"
                />
              </label>

              <label>
                Author

                <input
                  name="authorName"
                  value={
                    form.authorName
                  }
                  onChange={
                    handleChange
                  }
                />
              </label>

            </div>

            {/* SEO */}

            <div className="sidebar-card">

              <div className="sidebar-card-title">
                <FaBookOpen />

                <h3>
                  SEO
                </h3>
              </div>

              <label>
                SEO title

                <input
                  name="seoTitle"
                  value={
                    form.seoTitle
                  }
                  onChange={
                    handleChange
                  }
                />
              </label>

              <label>
                SEO description

                <textarea
                  name="seoDescription"
                  value={
                    form.seoDescription
                  }
                  onChange={
                    handleChange
                  }
                  rows="4"
                />
              </label>

            </div>

          </aside>

        </main>
      )}

      {!preview && (
        <div className="mobile-bottom-actions">

          <button
            onClick={
              togglePreview
            }
            disabled={saving}
          >
            <FaEye />
            Preview
          </button>

          <button
            onClick={
              saveDraft
            }
            disabled={saving}
          >
            <FaSave />
            Save Draft
          </button>

          <button
            onClick={
              publish
            }
            disabled={saving}
          >
            <FaCheck />
            Publish
          </button>

        </div>
      )}

    </div>
  );
}