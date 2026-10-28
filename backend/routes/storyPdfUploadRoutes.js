import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------------------------------------------
// PDF upload directory
// ------------------------------------------------------

const uploadDirectory = path.join(
  __dirname,
  "../uploads/stories"
);

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, {
    recursive: true,
  });
}

// ------------------------------------------------------
// Multer storage
// ------------------------------------------------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension =
      path.extname(file.originalname) || ".pdf";

    const baseName = path
      .basename(
        file.originalname,
        extension
      )
      .replace(/[^a-zA-Z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .toLowerCase();

    const uniqueName = `${baseName}-${Date.now()}${extension}`;

    cb(null, uniqueName);
  },
});

// ------------------------------------------------------
// File filter
// ------------------------------------------------------

const fileFilter = (
  req,
  file,
  cb
) => {
  const isPdf =
    file.mimetype ===
      "application/pdf" ||
    path
      .extname(file.originalname)
      .toLowerCase() === ".pdf";

  if (!isPdf) {
    return cb(
      new Error(
        "Only PDF files are allowed."
      ),
      false
    );
  }

  cb(null, true);
};

// ------------------------------------------------------
// Upload middleware
// ------------------------------------------------------

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize:
      25 * 1024 * 1024,
  },
});

// ------------------------------------------------------
// Upload PDF
// ------------------------------------------------------

router.post(
  "/upload-pdf",
  upload.single("pdf"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message:
            "Please select a PDF file.",
        });
      }

      const fileUrl =
        `${req.protocol}://${req.get(
          "host"
        )}/uploads/stories/${req.file.filename}`;

      return res.status(201).json({
        success: true,

        message:
          "PDF uploaded successfully.",

        data: {
          url: fileUrl,

          pdfUrl: fileUrl,

          name:
            req.file.originalname,

          pdfName:
            req.file.originalname,

          filename:
            req.file.filename,

          size:
            req.file.size,

          mimetype:
            req.file.mimetype,
        },
      });
    } catch (error) {
      console.error(
        "PDF upload error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Unable to upload PDF.",
      });
    }
  }
);

export default router;