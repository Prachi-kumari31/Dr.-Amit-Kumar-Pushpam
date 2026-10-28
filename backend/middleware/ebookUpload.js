import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
|--------------------------------------------------------------------------
| Upload directories
|--------------------------------------------------------------------------
*/

const uploadsDirectory = path.join(
  __dirname,
  "../uploads"
);

const ebooksDirectory = path.join(
  uploadsDirectory,
  "ebooks"
);

const ebookCoversDirectory = path.join(
  ebooksDirectory,
  "covers"
);

const ebookFilesDirectory = path.join(
  ebooksDirectory,
  "files"
);

/*
|--------------------------------------------------------------------------
| Create directories
|--------------------------------------------------------------------------
*/

[
  uploadsDirectory,
  ebooksDirectory,
  ebookCoversDirectory,
  ebookFilesDirectory,
].forEach((directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {
      recursive: true,
    });
  }
});

/*
|--------------------------------------------------------------------------
| Storage
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "cover") {
      cb(null, ebookCoversDirectory);
    } else if (file.fieldname === "ebookFile") {
      cb(null, ebookFilesDirectory);
    } else {
      cb(
        new Error(
          `Unexpected file field: ${file.fieldname}`
        )
      );
    }
  },

  filename: (req, file, cb) => {
    const extension =
      path.extname(file.originalname);

    const originalName =
      path.basename(
        file.originalname,
        extension
      )
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-");

    const uniqueName =
      `${Date.now()}-${originalName}${extension}`;

    cb(null, uniqueName);
  },
});

/*
|--------------------------------------------------------------------------
| File filter
|--------------------------------------------------------------------------
*/

const fileFilter = (
  req,
  file,
  cb
) => {
  /*
  |--------------------------------------------------------------------------
  | Cover image
  |--------------------------------------------------------------------------
  */

  if (file.fieldname === "cover") {
    const allowedImages = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      allowedImages.includes(
        file.mimetype
      )
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Cover must be JPG, PNG or WebP"
      ),
      false
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Ebook file
  |--------------------------------------------------------------------------
  */

  if (
    file.fieldname === "ebookFile"
  ) {
    if (
      file.mimetype ===
      "application/pdf"
    ) {
      return cb(null, true);
    }

    return cb(
      new Error(
        "Only PDF ebooks are currently supported"
      ),
      false
    );
  }

  cb(
    new Error(
      "Invalid file field"
    ),
    false
  );
};

/*
|--------------------------------------------------------------------------
| Multer
|--------------------------------------------------------------------------
*/

const ebookUpload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize:
      50 * 1024 * 1024,
  },
});

export default ebookUpload;