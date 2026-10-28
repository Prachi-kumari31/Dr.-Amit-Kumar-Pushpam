import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
|--------------------------------------------------------------------------
| Upload directories
|--------------------------------------------------------------------------
*/

const imageUploadDir = path.join(
  __dirname,
  "../uploads/media/images"
);

const videoUploadDir = path.join(
  __dirname,
  "../uploads/media/videos"
);

/*
|--------------------------------------------------------------------------
| Create directories
|--------------------------------------------------------------------------
*/

fs.mkdirSync(imageUploadDir, {
  recursive: true,
});

fs.mkdirSync(videoUploadDir, {
  recursive: true,
});

/*
|--------------------------------------------------------------------------
| Allowed MIME types
|--------------------------------------------------------------------------
*/

const allowedImages = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
];

const allowedVideos = [
  "video/mp4",
  "video/webm",
  "video/ogg",
  "video/quicktime",
];

/*
|--------------------------------------------------------------------------
| Storage
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Frontend sends the file using:
|
| formData.append("media", file)
|
| Therefore we MUST NOT check for "image" / "video"
| as the field name.
|
| We determine image/video using MIME type.
|--------------------------------------------------------------------------
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      if (allowedImages.includes(file.mimetype)) {
        return cb(null, imageUploadDir);
      }

      if (allowedVideos.includes(file.mimetype)) {
        return cb(null, videoUploadDir);
      }

      return cb(
        new Error(
          `Unsupported media type: ${file.mimetype}`
        )
      );
    } catch (error) {
      return cb(error);
    }
  },

  filename: (req, file, cb) => {
    try {
      const ext = path
        .extname(file.originalname || "")
        .toLowerCase();

      const originalBaseName = path.basename(
        file.originalname || "media",
        ext
      );

      const safeBaseName = originalBaseName
        .replace(/[^a-zA-Z0-9_-]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80);

      const filename = `${safeBaseName || "media"}-${Date.now()}${ext}`;

      cb(null, filename);
    } catch (error) {
      cb(error);
    }
  },
});

/*
|--------------------------------------------------------------------------
| File filter
|--------------------------------------------------------------------------
*/

const fileFilter = (req, file, cb) => {
  console.log("MULTER FILE:");
  console.log({
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
  });

  /*
  |--------------------------------------------------------------------------
  | IMPORTANT
  |--------------------------------------------------------------------------
  |
  | Frontend field name must be "media".
  |
  */

  if (file.fieldname !== "media") {
    return cb(
      new Error(
        `Invalid field name "${file.fieldname}". Expected "media".`
      )
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Images
  |--------------------------------------------------------------------------
  */

  if (allowedImages.includes(file.mimetype)) {
    return cb(null, true);
  }

  /*
  |--------------------------------------------------------------------------
  | Videos
  |--------------------------------------------------------------------------
  */

  if (allowedVideos.includes(file.mimetype)) {
    return cb(null, true);
  }

  /*
  |--------------------------------------------------------------------------
  | Invalid type
  |--------------------------------------------------------------------------
  */

  return cb(
    new Error(
      "Only JPG, JPEG, PNG, WEBP, GIF, MP4, WEBM, OGG and MOV files are allowed."
    )
  );
};

/*
|--------------------------------------------------------------------------
| Multer configuration
|--------------------------------------------------------------------------
|
| Images:
|   Maximum 10 MB
|
| Videos:
|   Maximum 100 MB
|
| Multer itself allows 100 MB here.
| We additionally validate images in controller.
|--------------------------------------------------------------------------
*/

export const uploadMedia = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 100 * 1024 * 1024,
    files: 1,
  },
});