import api from "./api";

export const uploadMedia =
  async (file) => {
    if (!file) {
      throw new Error(
        "No file selected."
      );
    }

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/uploads/media",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export default {
  uploadMedia,
};