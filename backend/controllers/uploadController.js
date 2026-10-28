import cloudinary from "../config/cloudinary.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const uploadBuffer = (
  buffer,
  originalName,
  mimetype
) => {
  return new Promise((resolve, reject) => {
    const isPdf =
      mimetype === "application/pdf";

    const stream =
      cloudinary.uploader.upload_stream(
        {
          folder: isPdf
            ? "prosper-foundation/pdfs"
            : "prosper-foundation/editorial",

          resource_type: "auto",

          use_filename: true,
          unique_filename: true,

          public_id: originalName
            .replace(/\.[^/.]+$/, "")
            .replace(/[^a-zA-Z0-9-_]/g, "-"),
        },

        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      );

    stream.end(buffer);
  });
};

export const uploadMedia =
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please select a file.",
      });
    }

    const result = await uploadBuffer(
      req.file.buffer,
      req.file.originalname,
      req.file.mimetype
    );

    return res.status(201).json({
      success: true,
      message: "File uploaded successfully.",
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        format: result.format,
        originalName: req.file.originalname,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
    });
  });