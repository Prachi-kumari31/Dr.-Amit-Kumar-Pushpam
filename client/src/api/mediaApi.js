import api from "./api";

/*
|--------------------------------------------------------------------------
| Upload Media
|--------------------------------------------------------------------------
*/

export const uploadMedia = async ({
  file,
  title,
  description = "",
  category = "General",
  tags = [],
  isFeatured = false,
  status = "published",
  onUploadProgress,
}) => {
  if (!file) {
    throw new Error(
      "Please select an image or video."
    );
  }

  const isImage =
    file.type?.startsWith("image/");

  const isVideo =
    file.type?.startsWith("video/");

  if (!isImage && !isVideo) {
    throw new Error(
      "Only image and video files are allowed."
    );
  }

  const maxSize = isVideo
    ? 100 * 1024 * 1024
    : 10 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error(
      isVideo
        ? "Video must be 100 MB or smaller."
        : "Image must be 10 MB or smaller."
    );
  }

  const formData =
    new FormData();

  /*
  |--------------------------------------------------------------------------
  | VERY IMPORTANT
  |--------------------------------------------------------------------------
  */

  formData.append(
    "media",
    file
  );

  formData.append(
    "title",
    String(title || file.name).trim()
  );

  formData.append(
    "description",
    String(description || "").trim()
  );

  formData.append(
    "category",
    String(category || "General").trim()
  );

  formData.append(
    "tags",
    Array.isArray(tags)
      ? tags.join(",")
      : String(tags || "")
  );

  formData.append(
    "isFeatured",
    isFeatured
      ? "true"
      : "false"
  );

  formData.append(
    "status",
    status === "draft"
      ? "draft"
      : "published"
  );

  console.log(
    "========== UPLOADING MEDIA =========="
  );

  console.log({
    name: file.name,
    type: file.type,
    size: file.size,
    title,
    category,
    tags,
    isFeatured,
    status,
  });

  for (
    const [key, value] of formData.entries()
  ) {
    console.log(
      "FORM DATA:",
      key,
      value
    );
  }

  console.log(
    "======================================"
  );

  /*
  |--------------------------------------------------------------------------
  | IMPORTANT
  |--------------------------------------------------------------------------
  |
  | Do NOT manually set Content-Type.
  |
  | Axios/browser will automatically create:
  |
  | multipart/form-data;
  | boundary=...
  |
  |--------------------------------------------------------------------------
  */

  const response =
    await api.post(
      "/media/admin",
      formData,
      {
        onUploadProgress,
      }
    );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Public Media
|--------------------------------------------------------------------------
*/

export const getMedia = async (
  params = {}
) => {
  const response =
    await api.get(
      "/media",
      {
        params,
      }
    );

  return response.data;
};

/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
*/

export const getMediaCategories =
  async () => {
    const response =
      await api.get(
        "/media/categories"
      );

    return (
      response.data?.data ||
      []
    );
  };

/*
|--------------------------------------------------------------------------
| Admin Media
|--------------------------------------------------------------------------
*/

export const getAdminMedia =
  async (params = {}) => {
    const response =
      await api.get(
        "/media/admin/all",
        {
          params,
        }
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/

export const updateMedia =
  async (id, payload) => {
    if (!id) {
      throw new Error(
        "Media ID is required."
      );
    }

    const response =
      await api.put(
        `/media/admin/${id}`,
        payload
      );

    return response.data;
  };

/*
|--------------------------------------------------------------------------
| Delete
|--------------------------------------------------------------------------
*/

export const deleteMedia =
  async (id) => {
    if (!id) {
      throw new Error(
        "Media ID is required."
      );
    }

    const response =
      await api.delete(
        `/media/admin/${id}`
      );

    return response.data;
  };

const mediaApi = {
  getMedia,
  getMediaCategories,
  getAdminMedia,
  uploadMedia,
  updateMedia,
  deleteMedia,
};

export default mediaApi;