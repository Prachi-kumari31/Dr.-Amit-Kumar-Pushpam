// import api from "./api";

// const commentApi = {
//   getApproved: async (contentId) => {
//     const response = await api.get("/comments", {
//       params: {
//         contentId,
//       },
//     });

//     return response.data;
//   },

//   create: async (data) => {
//     const response = await api.post(
//       "/comments",
//       data
//     );

//     return response.data;
//   },

//   getAdminComments: async () => {
//     const response = await api.get(
//       "/comments/admin"
//     );

//     return response.data;
//   },

//   approve: async (id) => {
//     const response = await api.put(
//       `/comments/${id}/approve`
//     );

//     return response.data;
//   },

//   reject: async (id) => {
//     const response = await api.put(
//       `/comments/${id}/reject`
//     );

//     return response.data;
//   },

//   delete: async (id) => {
//     const response = await api.delete(
//       `/comments/admin/${id}`
//     );

//     return response.data;
//   },
// };

// export default commentApi;
// import api from "./api";

// /* =========================================================
//    PUBLIC COMMENTS
// ========================================================= */

// export const getComments = async (
//   contentId,
//   contentType
// ) => {
//   const response = await api.get("/comments", {
//     params: {
//       contentId,
//       contentType,
//     },
//   });

//   return response.data;
// };

// export const createComment = async (
//   contentId,
//   name,
//   text,
//   contentType = "Blog"
// ) => {
//   const response = await api.post(
//     "/comments",
//     {
//       contentId,
//       contentType,
//       name,
//       text,
//     }
//   );

//   return response.data;
// };

// /* =========================================================
//    ADMIN COMMENTS
// ========================================================= */

// export const getAdminComments = async () => {
//   const response = await api.get(
//     "/comments/admin/all"
//   );

//   return response.data;
// };

// export const approveComment = async (id) => {
//   const response = await api.put(
//     `/comments/admin/${id}/approve`
//   );

//   return response.data;
// };

// export const rejectComment = async (id) => {
//   const response = await api.put(
//     `/comments/admin/${id}/reject`
//   );

//   return response.data;
// };

// export const deleteComment = async (id) => {
//   const response = await api.delete(
//     `/comments/admin/${id}`
//   );

//   return response.data;
// };

// const commentApi = {
//   getComments,
//   createComment,
//   getAdminComments,
//   approveComment,
//   rejectComment,
//   deleteComment,
// };

// export default commentApi;


import api from "./api";

/*
|--------------------------------------------------------------------------
| NORMALIZE RESPONSE
|--------------------------------------------------------------------------
*/

const normalizeComments = (response) => {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.data)) {
    return data.data;
  }

  if (Array.isArray(data?.comments)) {
    return data.comments;
  }

  return [];
};

/*
|--------------------------------------------------------------------------
| GET PUBLIC COMMENTS
|--------------------------------------------------------------------------
*/

export const getComments = async (
  contentId,
  contentType = "Blog"
) => {
  const safeContentId =
    contentId !== undefined &&
    contentId !== null
      ? String(contentId).trim()
      : "";

  const safeContentType =
    contentType !== undefined &&
    contentType !== null
      ? String(contentType).trim()
      : "Blog";

  if (!safeContentId) {
    throw new Error(
      "Content ID is required."
    );
  }

  const response = await api.get(
    "/comments",
    {
      params: {
        contentId: safeContentId,
        contentType: safeContentType,
      },
    }
  );

  return normalizeComments(response);
};

/*
|--------------------------------------------------------------------------
| CREATE COMMENT
|--------------------------------------------------------------------------
*/

export const createComment = async (
  contentId,
  name,
  text,
  contentType = "Blog"
) => {
  const safeContentId =
    contentId !== undefined &&
    contentId !== null
      ? String(contentId).trim()
      : "";

  const safeName =
    name !== undefined &&
    name !== null
      ? String(name).trim()
      : "";

  const safeText =
    text !== undefined &&
    text !== null
      ? String(text).trim()
      : "";

  const safeContentType =
    contentType !== undefined &&
    contentType !== null
      ? String(contentType).trim()
      : "Blog";

  if (!safeContentId) {
    throw new Error(
      "Content ID is required."
    );
  }

  if (!safeName) {
    throw new Error(
      "Name is required."
    );
  }

  if (!safeText) {
    throw new Error(
      "Comment text is required."
    );
  }

  console.log(
    "CREATE COMMENT REQUEST:",
    {
      contentId: safeContentId,
      contentType: safeContentType,
      name: safeName,
      text: safeText,
    }
  );

  const response = await api.post(
    "/comments",
    {
      contentId: safeContentId,
      contentType: safeContentType,
      name: safeName,
      text: safeText,
    }
  );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| ADMIN COMMENTS
|--------------------------------------------------------------------------
*/

export const getAdminComments = async () => {
  const response = await api.get(
    "/comments/admin/all"
  );

  return response.data;
};

export const approveComment = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Comment ID is required."
    );
  }

  const response = await api.put(
    `/comments/admin/${id}/approve`
  );

  return response.data;
};

export const rejectComment = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Comment ID is required."
    );
  }

  const response = await api.put(
    `/comments/admin/${id}/reject`
  );

  return response.data;
};

export const deleteComment = async (
  id
) => {
  if (!id) {
    throw new Error(
      "Comment ID is required."
    );
  }

  const response = await api.delete(
    `/comments/admin/${id}`
  );

  return response.data;
};

const commentApi = {
  getComments,
  createComment,
  getAdminComments,
  approveComment,
  rejectComment,
  deleteComment,
};

export default commentApi;