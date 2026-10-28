import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename =
  fileURLToPath(import.meta.url);

const __dirname =
  path.dirname(__filename);

/* =========================================================
   DIRECTORIES
========================================================= */

const pdfUploadDir =
  path.join(
    __dirname,
    "../uploads/stories/pdf"
  );

const imageUploadDir =
  path.join(
    __dirname,
    "../uploads/stories/images"
  );

fs.mkdirSync(
  pdfUploadDir,
  {
    recursive: true,
  }
);

fs.mkdirSync(
  imageUploadDir,
  {
    recursive: true,
  }
);

/* =========================================================
   PDF STORAGE
========================================================= */

const pdfStorage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      cb
    ) => {
      cb(
        null,
        pdfUploadDir
      );
    },

    filename: (
      _req,
      file,
      cb
    ) => {
      const ext =
        path
          .extname(
            file.originalname ||
              ""
          )
          .toLowerCase() ||
        ".pdf";

      const baseName =
        path
          .basename(
            file.originalname ||
              "story",
            ext
          )
          .replace(
            /[^a-zA-Z0-9_-]/g,
            "-"
          )
          .replace(
            /-+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          )
          .slice(
            0,
            80
          ) ||
        "story";

      cb(
        null,
        `${baseName}-${Date.now()}${ext}`
      );
    },
  });

/* =========================================================
   PDF FILTER
========================================================= */

const pdfFilter = (
  _req,
  file,
  cb
) => {
  const extension =
    path
      .extname(
        file.originalname ||
          ""
      )
      .toLowerCase();

  const mimeType =
    String(
      file.mimetype || ""
    ).toLowerCase();

  const isPdf =
    extension === ".pdf" ||
    mimeType ===
      "application/pdf";

  if (!isPdf) {
    return cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "pdf"
      )
    );
  }

  cb(null, true);
};

/* =========================================================
   PDF UPLOAD
========================================================= */

export const uploadStoryPdf =
  multer({
    storage: pdfStorage,

    fileFilter:
      pdfFilter,

    limits: {
      fileSize:
        20 * 1024 * 1024,

      files: 1,
    },
  });

/* =========================================================
   IMAGE STORAGE
========================================================= */

const imageStorage =
  multer.diskStorage({
    destination: (
      _req,
      _file,
      cb
    ) => {
      cb(
        null,
        imageUploadDir
      );
    },

    filename: (
      _req,
      file,
      cb
    ) => {
      const ext =
        path
          .extname(
            file.originalname ||
              ""
          )
          .toLowerCase();

      const baseName =
        path
          .basename(
            file.originalname ||
              "image",
            ext
          )
          .replace(
            /[^a-zA-Z0-9_-]/g,
            "-"
          )
          .replace(
            /-+/g,
            "-"
          )
          .replace(
            /^-+|-+$/g,
            ""
          )
          .slice(
            0,
            80
          ) ||
        "image";

      cb(
        null,
        `${baseName}-${Date.now()}${ext}`
      );
    },
  });

/* =========================================================
   IMAGE UPLOAD
========================================================= */

export const uploadStoryImage =
  multer({
    storage:
      imageStorage,

    fileFilter: (
      _req,
      file,
      cb
    ) => {
      if (
        String(
          file.mimetype || ""
        ).startsWith(
          "image/"
        )
      ) {
        return cb(
          null,
          true
        );
      }

      return cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "image"
        )
      );
    },

    limits: {
      fileSize:
        10 * 1024 * 1024,

      files: 1,
    },
  });