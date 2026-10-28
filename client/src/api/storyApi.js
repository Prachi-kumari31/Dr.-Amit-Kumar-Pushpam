// import api from "./api";

// /* =========================================================
//    PUBLIC CONTENT
// ========================================================= */

// /**
//  * Get published stories / poems
//  *
//  * type:
//  * "all" | "story" | "poem"
//  */
// export const getPublicStories = async ({
//   type = "all",
//   page = 1,
//   limit = 12,
// } = {}) => {
//   const response = await api.get("/stories", {
//     params: {
//       type,
//       page,
//       limit,
//     },
//   });

//   return response.data;
// };

// /* =========================================================
//    BACKWARD COMPATIBILITY
// ========================================================= */

// /**
//  * Get only stories
//  */
// export const getStories = async ({
//   page = 1,
//   limit = 12,
// } = {}) => {
//   return getPublicStories({
//     type: "story",
//     page,
//     limit,
//   });
// };

// /**
//  * Get only poems
//  */
// export const getPoems = async ({
//   page = 1,
//   limit = 12,
// } = {}) => {
//   return getPublicStories({
//     type: "poem",
//     page,
//     limit,
//   });
// };

// /* =========================================================
//    PUBLIC SINGLE CONTENT
// ========================================================= */

// export const getPublicStoryBySlug = async (
//   slug
// ) => {
//   if (!slug) {
//     throw new Error("Slug is required");
//   }

//   const response = await api.get(
//     `/stories/view/${encodeURIComponent(slug)}`
//   );

//   return response.data;
// };

// /**
//  * Backward-compatible name used by StoryDetail.jsx
//  */
// export const getStoryBySlug = async (
//   slug
// ) => {
//   return getPublicStoryBySlug(slug);
// };

// /* =========================================================
//    LIKE
// ========================================================= */

// export const likeStory = async (id) => {
//   const response = await api.post(
//     `/stories/${id}/like`
//   );

//   return response.data;
// };

// /* =========================================================
//    DISLIKE
// ========================================================= */

// export const dislikeStory = async (id) => {
//   const response = await api.post(
//     `/stories/${id}/dislike`
//   );

//   return response.data;
// };

// /* =========================================================
//    VIEW
// ========================================================= */

// export const registerStoryView = async (
//   id
// ) => {
//   const response = await api.post(
//     `/stories/${id}/view`
//   );

//   return response.data;
// };

// /* =========================================================
//    ADMIN
// ========================================================= */

// export const getAdminStories = async ({
//   type = "all",
//   status = "all",
// } = {}) => {
//   const response = await api.get(
//     "/stories/admin/all",
//     {
//       params: {
//         type,
//         status,
//       },
//     }
//   );

//   return response.data;
// };

// export const getAdminStory = async (id) => {
//   const response = await api.get(
//     `/stories/admin/${id}`
//   );

//   return response.data;
// };

// /* =========================================================
//    CREATE
// ========================================================= */

// export const createStory = async (data) => {
//   const response = await api.post(
//     "/stories/admin",
//     data
//   );

//   return response.data;
// };

// /* =========================================================
//    UPDATE
// ========================================================= */

// export const updateStory = async (
//   id,
//   data
// ) => {
//   const response = await api.put(
//     `/stories/admin/${id}`,
//     data
//   );

//   return response.data;
// };

// /* =========================================================
//    PUBLISH
// ========================================================= */

// export const publishStory = async (id) => {
//   const response = await api.put(
//     `/stories/admin/${id}/publish`
//   );

//   return response.data;
// };

// /* =========================================================
//    UNPUBLISH
// ========================================================= */

// export const unpublishStory = async (
//   id
// ) => {
//   const response = await api.put(
//     `/stories/admin/${id}/unpublish`
//   );

//   return response.data;
// };

// /* =========================================================
//    DELETE
// ========================================================= */

// export const deleteStory = async (id) => {
//   const response = await api.delete(
//     `/stories/admin/${id}`
//   );

//   return response.data;
// };



// /* =========================================================
//    DEFAULT EXPORT
// ========================================================= */

// const storyApi = {
//   getPublicStories,
//   getStories,
//   getPoems,
//   getPublicStoryBySlug,
//   getStoryBySlug,

//   likeStory,
//   dislikeStory,
//   registerStoryView,

//   getAdminStories,
//   getAdminStory,
//   createStory,
//   updateStory,
//   publishStory,
//   unpublishStory,
//   deleteStory,
// };

// export default storyApi;

// import api from "./api";

// /* =========================================================
//    API HELPERS
// ========================================================= */

// const getAdminToken = () => {
//   return (
//     localStorage.getItem("adminToken") ||
//     localStorage.getItem("token") ||
//     localStorage.getItem("accessToken") ||
//     ""
//   );
// };

// /**
//  * Convert any backend response into the actual array.
//  *
//  * Supported backend responses:
//  *
//  * { success: true, data: [...] }
//  * { data: [...] }
//  * [...]
//  * { stories: [...] }
//  * { poems: [...] }
//  */
// export const normalizeStoryList = (response) => {
//   if (!response) {
//     return [];
//   }

//   /* Axios response */
//   const payload = response?.data;

//   /* Axios -> { success, data: [...] } */
//   if (Array.isArray(payload?.data)) {
//     return payload.data;
//   }

//   /* Axios -> { data: [...] } */
//   if (Array.isArray(payload)) {
//     return payload;
//   }

//   /* Axios -> { stories: [...] } */
//   if (Array.isArray(payload?.stories)) {
//     return payload.stories;
//   }

//   /* Axios -> { poems: [...] } */
//   if (Array.isArray(payload?.poems)) {
//     return payload.poems;
//   }

//   /* Already-normalized object */
//   if (Array.isArray(response?.data)) {
//     return response.data;
//   }

//   if (Array.isArray(response)) {
//     return response;
//   }

//   if (Array.isArray(response?.stories)) {
//     return response.stories;
//   }

//   if (Array.isArray(response?.poems)) {
//     return response.poems;
//   }

//   return [];
// };

// /**
//  * Extract one object from Axios response.
//  */
// export const unwrap = (response) => {
//   if (!response) {
//     return null;
//   }

//   if (
//     response?.data?.data !== undefined
//   ) {
//     return response.data.data;
//   }

//   if (
//     response?.data !== undefined
//   ) {
//     return response.data;
//   }

//   return response;
// };

// /* =========================================================
//    PUBLIC LIST
// ========================================================= */

// /**
//  * GET /api/stories
//  *
//  * Returns ONLY an array.
//  */
// export const getPublicStories = async (
//   params = {}
// ) => {
//   const response = await api.get(
//     "/stories",
//     {
//       params,
//     }
//   );

//   return normalizeStoryList(response);
// };

// /**
//  * Get published stories.
//  *
//  * Returns ONLY an array.
//  */
// export const getStories = async (
//   params = {}
// ) => {
//   const response = await api.get(
//     "/stories",
//     {
//       params: {
//         type: "story",
//         ...params,
//       },
//     }
//   );

//   return normalizeStoryList(response);
// };

// /**
//  * Get published poems.
//  *
//  * Returns ONLY an array.
//  */
// export const getPoems = async (
//   params = {}
// ) => {
//   const response = await api.get(
//     "/stories",
//     {
//       params: {
//         type: "poem",
//         ...params,
//       },
//     }
//   );

//   return normalizeStoryList(response);
// };

// /* =========================================================
//    PUBLIC SINGLE
// ========================================================= */

// /**
//  * GET /api/stories/view/:slug
//  */
// export const getStoryBySlug = async (
//   slug
// ) => {
//   if (!slug) {
//     throw new Error(
//       "Slug is required."
//     );
//   }

//   return api.get(
//     `/stories/view/${encodeURIComponent(
//       slug
//     )}`
//   );
// };

// /**
//  * Alias for PoemDetail.
//  */
// export const getPublicStoryBySlug =
//   async (slug) => {
//     return getStoryBySlug(slug);
//   };

// /* =========================================================
//    ADMIN LIST
// ========================================================= */

// /**
//  * GET /api/stories/admin/all
//  *
//  * IMPORTANT:
//  * This function returns ONLY an array.
//  */
// export const getAdminStories = async (
//   params = {}
// ) => {
//   const response = await api.get(
//     "/stories/admin/all",
//     {
//       params: {
//         type:
//           params.type ||
//           "all",

//         status:
//           params.status ||
//           "all",

//         ...params,
//       },
//     }
//   );

//   return normalizeStoryList(response);
// };

// /* =========================================================
//    ADMIN SINGLE
// ========================================================= */

// /**
//  * GET /api/stories/admin/:id
//  *
//  * This intentionally returns Axios response because
//  * AdminStoryEditor already handles response.data.
//  */
// export const getAdminStory = async (
//   id
// ) => {
//   if (!id) {
//     throw new Error(
//       "Story ID is required."
//     );
//   }

//   return api.get(
//     `/stories/admin/${id}`
//   );
// };

// /* =========================================================
//    CREATE
// ========================================================= */

// export const createStory = async (
//   payload
// ) => {
//   if (!payload) {
//     throw new Error(
//       "Story data is required."
//     );
//   }

//   return api.post(
//     "/stories/admin",
//     payload
//   );
// };

// /* =========================================================
//    UPDATE
// ========================================================= */

// export const updateStory = async (
//   id,
//   payload
// ) => {
//   if (!id) {
//     throw new Error(
//       "Story ID is required."
//     );
//   }

//   return api.put(
//     `/stories/admin/${id}`,
//     payload
//   );
// };

// /* =========================================================
//    PUBLISH
// ========================================================= */

// export const publishStory = async (
//   id
// ) => {
//   if (!id) {
//     throw new Error(
//       "Story ID is required."
//     );
//   }

//   return api.put(
//     `/stories/admin/${id}/publish`
//   );
// };

// /* =========================================================
//    UNPUBLISH
// ========================================================= */

// export const unpublishStory =
//   async (id) => {
//     if (!id) {
//       throw new Error(
//         "Story ID is required."
//       );
//     }

//     return api.put(
//       `/stories/admin/${id}/unpublish`
//     );
//   };

// /* =========================================================
//    DELETE
// ========================================================= */

// export const deleteStory = async (
//   id
// ) => {
//   if (!id) {
//     throw new Error(
//       "Story ID is required."
//     );
//   }

//   return api.delete(
//     `/stories/admin/${id}`
//   );
// };

// /* =========================================================
//    PDF UPLOAD
// ========================================================= */

// /**
//  * POST /api/stories/admin/upload-pdf
//  *
//  * Backend:
//  *
//  * router.post(
//  *   "/admin/upload-pdf",
//  *   adminProtect,
//  *   authorize("content.update"),
//  *   uploadStoryPdf.single("pdf"),
//  *   uploadStoryPdfAndExtract
//  * );
//  *
//  * Multer field:
//  * "pdf"
//  *
//  * IMPORTANT:
//  * We intentionally use fetch() here instead of the Axios
//  * instance. This prevents any Axios JSON Content-Type
//  * interceptor from breaking multipart/form-data.
//  */
// export const uploadStoryPdf = async (
//   file,
//   contentType = "story"
// ) => {
//   if (!file) {
//     throw new Error(
//       "PDF file is required."
//     );
//   }

//   const isPdf =
//     file.type ===
//       "application/pdf" ||
//     file.name
//       ?.toLowerCase()
//       .endsWith(".pdf");

//   if (!isPdf) {
//     throw new Error(
//       "Only PDF files are allowed."
//     );
//   }

//   const MAX_SIZE =
//     20 * 1024 * 1024;

//   if (file.size > MAX_SIZE) {
//     throw new Error(
//       "PDF must be 20 MB or smaller."
//     );
//   }

//   const formData =
//     new FormData();

//   /*
//    * MUST match:
//    *
//    * uploadStoryPdf.single("pdf")
//    */
//   formData.append(
//     "pdf",
//     file,
//     file.name
//   );

//   formData.append(
//     "contentType",
//     contentType === "poem"
//       ? "poem"
//       : "story"
//   );

//   const token =
//     getAdminToken();

//   if (!token) {
//     throw new Error(
//       "Admin session expired. Please login again."
//     );
//   }

//   /*
//    * Get Axios baseURL if available.
//    *
//    * Example:
//    * http://localhost:5000/api
//    */
//   const baseURL =
//     api?.defaults?.baseURL ||
//     "http://localhost:5000/api";

//   const uploadURL =
//     `${baseURL.replace(/\/$/, "")}/stories/admin/upload-pdf`;

//   console.log(
//     "PDF upload URL:",
//     uploadURL
//   );

//   console.log(
//     "PDF FormData:",
//     {
//       name: file.name,
//       type: file.type,
//       size: file.size,
//       contentType:
//         contentType === "poem"
//           ? "poem"
//           : "story",
//     }
//   );

//   /*
//    * IMPORTANT:
//    *
//    * DO NOT set Content-Type manually.
//    *
//    * Browser automatically creates:
//    *
//    * multipart/form-data;
//    * boundary=----------------...
//    */
//   const response =
//     await fetch(
//       uploadURL,
//       {
//         method: "POST",

//         headers: {
//           Authorization:
//             `Bearer ${token}`,
//         },

//         body: formData,
//       }
//     );

//   let data = null;

//   try {
//     data =
//       await response.json();
//   } catch {
//     data = null;
//   }

//   console.log(
//     "PDF server response:",
//     response.status,
//     data
//   );

//   if (!response.ok) {
//     const error =
//       new Error(
//         data?.message ||
//           `PDF upload failed (${response.status})`
//       );

//     error.response = {
//       status:
//         response.status,

//       data,
//     };

//     throw error;
//   }

//   if (
//     data?.success === false
//   ) {
//     const error =
//       new Error(
//         data.message ||
//           "PDF upload failed."
//       );

//     error.response = {
//       status:
//         response.status,

//       data,
//     };

//     throw error;
//   }

//   return {
//     data,
//   };
// };

// /* =========================================================
//    LIKE
// ========================================================= */

// export const likeStory = async (
//   id
// ) => {
//   if (!id) {
//     throw new Error(
//       "Story ID is required."
//     );
//   }

//   const response =
//     await api.post(
//       `/stories/${id}/like`
//     );

//   return unwrap(response);
// };

// /* =========================================================
//    DISLIKE
// ========================================================= */

// export const dislikeStory =
//   async (id) => {
//     if (!id) {
//       throw new Error(
//         "Story ID is required."
//       );
//     }

//     const response =
//       await api.post(
//         `/stories/${id}/dislike`
//       );

//     return unwrap(response);
//   };

// /* =========================================================
//    VIEW
// ========================================================= */

// export const registerStoryView =
//   async (id) => {
//     if (!id) {
//       throw new Error(
//         "Story ID is required."
//       );
//     }

//     const response =
//       await api.post(
//         `/stories/${id}/view`
//       );

//     return unwrap(response);
//   };


import api from "./api";

/* =========================================================
   RESPONSE HELPERS
========================================================= */

export const unwrap = (response) => {
  if (!response) return null;

  // Axios response:
  // response.data = {
  //   success: true,
  //   data: {...}
  // }
  if (
    response?.data &&
    response.data.data !== undefined
  ) {
    return response.data.data;
  }

  // Axios response:
  // response.data = [...]
  if (Array.isArray(response?.data)) {
    return response.data;
  }

  // Axios response:
  // response.data = {...}
  if (response?.data !== undefined) {
    return response.data;
  }

  return response;
};

/* =========================================================
   NORMALIZE STORY LIST
========================================================= */

export const normalizeStoryList = (response) => {
  const candidates = [
    response,
    response?.data,
    response?.data?.data,
    response?.data?.items,
    response?.items,
    response?.stories,
    response?.poems,
  ];

  const array = candidates.find(
    (value) => Array.isArray(value)
  );

  return Array.isArray(array) ? array : [];
};

/* =========================================================
   NORMALIZE SINGLE STORY
========================================================= */

export const normalizeStory = (response) => {
  if (!response) return null;

  // Already a story object
  if (
    response?._id ||
    response?.title ||
    response?.slug
  ) {
    return response;
  }

  // Axios response
  if (response?.data) {
    return normalizeStory(response.data);
  }

  // API wrapper
  if (response?.data?.data) {
    return normalizeStory(
      response.data.data
    );
  }

  return null;
};

/* =========================================================
   PUBLIC STORIES
========================================================= */

/**
 * GET /api/stories?type=story
 */
export const getStories = async (
  params = {}
) => {
  const response = await api.get(
    "/stories",
    {
      params: {
        type: "story",
        ...params,
      },
    }
  );

  return normalizeStoryList(response);
};

/**
 * GET /api/stories?type=poem
 */
export const getPoems = async (
  params = {}
) => {
  const response = await api.get(
    "/stories",
    {
      params: {
        type: "poem",
        ...params,
      },
    }
  );

  return normalizeStoryList(response);
};

/* =========================================================
   PUBLIC SINGLE STORY / POEM
========================================================= */

/**
 * Backend:
 *
 * GET /api/stories/view/:slug
 *
 * Response:
 *
 * {
 *   success: true,
 *   data: story
 * }
 */
export const getStoryBySlug = async (
  slug
) => {
  if (!slug) {
    throw new Error(
      "Slug is required."
    );
  }

  const cleanSlug =
    decodeURIComponent(
      String(slug)
    ).trim();

  if (!cleanSlug) {
    throw new Error(
      "Slug is required."
    );
  }

  const response = await api.get(
    `/stories/view/${encodeURIComponent(
      cleanSlug
    )}`
  );

  const story =
    normalizeStory(response);

  if (!story) {
    throw new Error(
      "Story or poem not found."
    );
  }

  return story;
};

export const getPublicStoryBySlug =
  async (slug) => {
    return getStoryBySlug(slug);
  };

/* =========================================================
   ADMIN STORIES
========================================================= */

/**
 * GET /api/stories/admin/all
 */
export const getAdminStories = async (
  params = {}
) => {
  const response = await api.get(
    "/stories/admin/all",
    {
      params: {
        type:
          params.type || "all",
        status:
          params.status || "all",
      },
    }
  );

  return normalizeStoryList(response);
};

/**
 * GET /api/stories/admin/:id
 */
export const getAdminStory = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Story ID is required."
    );
  }

  const response = await api.get(
    `/stories/admin/${id}`
  );

  return normalizeStory(response);
};

/* =========================================================
   CREATE
========================================================= */

export const createStory = async (
  payload
) => {
  if (!payload) {
    throw new Error(
      "Story data is required."
    );
  }

  return api.post(
    "/stories/admin",
    payload
  );
};

/* =========================================================
   UPDATE
========================================================= */

export const updateStory = async (
  id,
  payload
) => {
  if (!id) {
    throw new Error(
      "Story ID is required."
    );
  }

  return api.put(
    `/stories/admin/${id}`,
    payload
  );
};

/* =========================================================
   PUBLISH
========================================================= */

export const publishStory = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Story ID is required."
    );
  }

  return api.put(
    `/stories/admin/${id}/publish`
  );
};

/* =========================================================
   UNPUBLISH
========================================================= */

export const unpublishStory = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Story ID is required."
    );
  }

  return api.put(
    `/stories/admin/${id}/unpublish`
  );
};

/* =========================================================
   DELETE
========================================================= */

export const deleteStory = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Story ID is required."
    );
  }

  return api.delete(
    `/stories/admin/${id}`
  );
};

/* =========================================================
   PDF UPLOAD + TEXT EXTRACTION
========================================================= */

/**
 * Backend:
 *
 * POST /api/stories/admin/upload-pdf
 *
 * multer:
 * uploadStoryPdf.single("pdf")
 *
 * Therefore the FormData field MUST be:
 *
 * pdf
 */
export const uploadStoryPdf = async (
  file,
  contentType = "story"
) => {
  if (!file) {
    throw new Error(
      "PDF file is required."
    );
  }

  const isPdf =
    file.type ===
      "application/pdf" ||
    file.name
      ?.toLowerCase()
      .endsWith(".pdf");

  if (!isPdf) {
    throw new Error(
      "Only PDF files are allowed."
    );
  }

  const MAX_SIZE =
    20 * 1024 * 1024;

  if (file.size > MAX_SIZE) {
    throw new Error(
      "PDF must be 20 MB or smaller."
    );
  }

  const formData =
    new FormData();

  formData.append(
    "pdf",
    file,
    file.name
  );

  formData.append(
    "contentType",
    contentType === "poem"
      ? "poem"
      : "story"
  );

  /*
   * Do NOT manually set Content-Type.
   *
   * Axios/browser creates:
   *
   * multipart/form-data;
   * boundary=...
   */

  const response = await api.post(
    "/stories/admin/upload-pdf",
    formData
  );

  return unwrap(response);
};

/* =========================================================
   LIKE
========================================================= */

export const likeStory = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Story ID is required."
    );
  }

  const response =
    await api.post(
      `/stories/${id}/like`
    );

  return unwrap(response);
};

/* =========================================================
   DISLIKE
========================================================= */

export const dislikeStory =
  async (id) => {
    if (!id) {
      throw new Error(
        "Story ID is required."
      );
    }

    const response =
      await api.post(
        `/stories/${id}/dislike`
      );

    return unwrap(response);
  };

/* =========================================================
   VIEW
========================================================= */

export const registerStoryView =
  async (id) => {
    if (!id) {
      throw new Error(
        "Story ID is required."
      );
    }

    const response =
      await api.post(
        `/stories/${id}/view`
      );

    return unwrap(response);
  };