import Ebook from "../models/Ebook.js";
import {
  asyncHandler,
} from "../middleware/errorHandler.js";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

const getFileUrl = (
  req,
  file
) => {
  if (!file) {
    return null;
  }

  return `${req.protocol}://${req.get(
    "host"
  )}/uploads/ebooks/${
    file.fieldname === "cover"
      ? "covers"
      : "files"
  }/${file.filename}`;
};


/*
|--------------------------------------------------------------------------
| GET ALL
|--------------------------------------------------------------------------
*/

export const getAllEbooks =
  asyncHandler(
    async (req, res) => {
      const {
        category,
        search,
        page = 1,
        limit = 12,
        sort = "-createdAt",
        free,
      } = req.query;

      const query = {
        isActive: true,
      };

      if (
        category &&
        category !== "All"
      ) {
        query.category =
          category;
      }

      if (free === "true") {
        query.price = 0;
      }

      if (free === "false") {
        query.price = {
          $gt: 0,
        };
      }

      if (
        search &&
        search.trim()
      ) {
        query.$or = [
          {
            title: {
              $regex:
                search.trim(),
              $options: "i",
            },
          },

          {
            description: {
              $regex:
                search.trim(),
              $options: "i",
            },
          },

          {
            author: {
              $regex:
                search.trim(),
              $options: "i",
            },
          },

          {
            tags: {
              $regex:
                search.trim(),
              $options: "i",
            },
          },
        ];
      }

      const pageNumber =
        Math.max(
          1,
          parseInt(page, 10) || 1
        );

      const limitNumber =
        Math.min(
          50,
          Math.max(
            1,
            parseInt(
              limit,
              10
            ) || 12
          )
        );

      const skip =
        (pageNumber - 1) *
        limitNumber;

      const [
        ebooks,
        total,
      ] = await Promise.all([
        Ebook.find(query)
          .sort(sort)
          .skip(skip)
          .limit(limitNumber)
          .lean(),

        Ebook.countDocuments(
          query
        ),
      ]);

      res.status(200).json({
        success: true,
        data: ebooks,

        pagination: {
          total,

          pages: Math.ceil(
            total /
              limitNumber
          ),

          currentPage:
            pageNumber,

          limit:
            limitNumber,
        },
      });
    }
  );


/*
|--------------------------------------------------------------------------
| FEATURED
|--------------------------------------------------------------------------
*/

export const getFeaturedEbooks =
  asyncHandler(
    async (req, res) => {
      const ebooks =
        await Ebook.find({
          isActive: true,
          isFeatured: true,
        })
          .sort("-createdAt")
          .limit(6)
          .lean();

      res.status(200).json({
        success: true,
        data: ebooks,
      });
    }
  );


/*
|--------------------------------------------------------------------------
| SINGLE EBOOK
|--------------------------------------------------------------------------
*/

export const getEbookBySlug =
  asyncHandler(
    async (req, res) => {
      const ebook =
        await Ebook.findOne({
          slug:
            req.params.slug.toLowerCase(),
          isActive: true,
        }).lean();

      if (!ebook) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Ebook not found",
          });
      }

      res.status(200).json({
        success: true,
        data: ebook,
      });
    }
  );


/*
|--------------------------------------------------------------------------
| CREATE EBOOK
|--------------------------------------------------------------------------
*/

export const createEbook =
  asyncHandler(
    async (req, res) => {
      const {
        title,
        description,
        excerpt,
        author,
        category,
        pages,
        language,
        fileFormat,
        price,
        originalPrice,
        discount,
        tags,
        isActive,
        isFeatured,
      } = req.body;

      /*
      |--------------------------------------------------------------------------
      | Validate text fields
      |--------------------------------------------------------------------------
      */

      if (
        !title?.trim() ||
        !description?.trim() ||
        !author?.trim() ||
        !category ||
        !pages
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Title, description, author, category and pages are required",
          });
      }

      /*
      |--------------------------------------------------------------------------
      | Validate PDF
      |--------------------------------------------------------------------------
      */

      if (
        !req.files ||
        !req.files.ebookFile ||
        !req.files.ebookFile[0]
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Please select an ebook PDF",
          });
      }

      /*
      |--------------------------------------------------------------------------
      | Cover is required
      |--------------------------------------------------------------------------
      */

      if (
        !req.files.cover ||
        !req.files.cover[0]
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Please select a cover image",
          });
      }

      /*
      |--------------------------------------------------------------------------
      | Price
      |--------------------------------------------------------------------------
      */

      const ebookPrice =
        price === undefined ||
        price === null ||
        price === ""
          ? 0
          : Number(price);

      if (
        Number.isNaN(
          ebookPrice
        ) ||
        ebookPrice < 0
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Price must be 0 or greater",
          });
      }

      /*
      |--------------------------------------------------------------------------
      | Duplicate
      |--------------------------------------------------------------------------
      */

      const existing =
        await Ebook.findOne({
          title:
            title.trim(),
        });

      if (existing) {
        return res
          .status(409)
          .json({
            success: false,
            message:
              "An ebook with this title already exists",
          });
      }

      /*
      |--------------------------------------------------------------------------
      | Files
      |--------------------------------------------------------------------------
      */

      const pdfFile =
        req.files.ebookFile[0];

      const coverFile =
        req.files.cover[0];

      const fileUrl =
        getFileUrl(
          req,
          pdfFile
        );

      const cover =
        getFileUrl(
          req,
          coverFile
        );

      /*
      |--------------------------------------------------------------------------
      | Tags
      |--------------------------------------------------------------------------
      */

      let formattedTags = [];

      if (
        Array.isArray(tags)
      ) {
        formattedTags =
          tags
            .map((tag) =>
              String(tag)
                .trim()
            )
            .filter(Boolean);
      } else if (
        typeof tags ===
        "string"
      ) {
        formattedTags =
          tags
            .split(",")
            .map((tag) =>
              tag.trim()
            )
            .filter(Boolean);
      }

      /*
      |--------------------------------------------------------------------------
      | Create
      |--------------------------------------------------------------------------
      */

      const ebook =
        await Ebook.create({
          title:
            title.trim(),

          description:
            description.trim(),

          excerpt:
            excerpt || "",

          author:
            author.trim(),

          category,

          pages:
            Number(pages),

          language:
            language ||
            "English",

          fileFormat:
            "PDF",

          price:
            ebookPrice,

          originalPrice:
            originalPrice
              ? Number(
                  originalPrice
                )
              : null,

          discount:
            discount
              ? Number(
                  discount
                )
              : 0,

          cover,

          fileUrl,

          downloadLink:
            fileUrl,

          tags:
            formattedTags,

          isActive:
            isActive ===
            undefined
              ? true
              : isActive ===
                "true" ||
                isActive === true,

          isFeatured:
            isFeatured ===
              "true" ||
            isFeatured === true,
        });

      res
        .status(201)
        .json({
          success: true,

          message:
            ebookPrice === 0
              ? "Free ebook uploaded successfully"
              : "Ebook uploaded successfully",

          data: ebook,
        });
    }
  );


/*
|--------------------------------------------------------------------------
| UPDATE
|--------------------------------------------------------------------------
*/

export const updateEbook =
  asyncHandler(
    async (req, res) => {
      const ebook =
        await Ebook.findById(
          req.params.id
        );

      if (!ebook) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Ebook not found",
          });
      }

      const {
        title,
        description,
        excerpt,
        author,
        category,
        pages,
        language,
        price,
        originalPrice,
        discount,
        tags,
        isActive,
        isFeatured,
      } = req.body;

      /*
      |--------------------------------------------------------------------------
      | Text
      |--------------------------------------------------------------------------
      */

      if (
        title !== undefined
      ) {
        ebook.title =
          title.trim();
      }

      if (
        description !==
        undefined
      ) {
        ebook.description =
          description.trim();
      }

      if (
        excerpt !== undefined
      ) {
        ebook.excerpt =
          excerpt;
      }

      if (
        author !== undefined
      ) {
        ebook.author =
          author.trim();
      }

      if (
        category !== undefined
      ) {
        ebook.category =
          category;
      }

      if (
        pages !== undefined
      ) {
        ebook.pages =
          Number(pages);
      }

      if (
        language !== undefined
      ) {
        ebook.language =
          language;
      }

      /*
      |--------------------------------------------------------------------------
      | Price
      |--------------------------------------------------------------------------
      */

      if (
        price !== undefined &&
        price !== ""
      ) {
        const newPrice =
          Number(price);

        if (
          Number.isNaN(
            newPrice
          ) ||
          newPrice < 0
        ) {
          return res
            .status(400)
            .json({
              success: false,
              message:
                "Invalid price",
            });
        }

        ebook.price =
          newPrice;
      }

      if (
        originalPrice !==
        undefined
      ) {
        ebook.originalPrice =
          originalPrice
            ? Number(
                originalPrice
              )
            : null;
      }

      if (
        discount !== undefined
      ) {
        ebook.discount =
          discount
            ? Number(
                discount
              )
            : 0;
      }

      /*
      |--------------------------------------------------------------------------
      | Tags
      |--------------------------------------------------------------------------
      */

      if (
        tags !== undefined
      ) {
        ebook.tags =
          Array.isArray(tags)
            ? tags
                .map((tag) =>
                  String(tag)
                    .trim()
                )
                .filter(Boolean)
            : String(tags)
                .split(",")
                .map((tag) =>
                  tag.trim()
                )
                .filter(Boolean);
      }

      /*
      |--------------------------------------------------------------------------
      | Active / Featured
      |--------------------------------------------------------------------------
      */

      if (
        isActive !== undefined
      ) {
        ebook.isActive =
          isActive ===
            "true" ||
          isActive === true;
      }

      if (
        isFeatured !== undefined
      ) {
        ebook.isFeatured =
          isFeatured ===
            "true" ||
          isFeatured === true;
      }

      /*
      |--------------------------------------------------------------------------
      | New cover
      |--------------------------------------------------------------------------
      */

      if (
        req.files?.cover?.[0]
      ) {
        ebook.cover =
          getFileUrl(
            req,
            req.files.cover[0]
          );
      }

      /*
      |--------------------------------------------------------------------------
      | New PDF
      |--------------------------------------------------------------------------
      */

      if (
        req.files?.ebookFile?.[0]
      ) {
        const newPdf =
          req.files
            .ebookFile[0];

        ebook.fileUrl =
          getFileUrl(
            req,
            newPdf
          );

        ebook.downloadLink =
          ebook.fileUrl;

        ebook.fileFormat =
          "PDF";
      }

      await ebook.save();

      res
        .status(200)
        .json({
          success: true,
          message:
            "Ebook updated successfully",
          data: ebook,
        });
    }
  );


/*
|--------------------------------------------------------------------------
| DELETE
|--------------------------------------------------------------------------
*/

export const deleteEbook =
  asyncHandler(
    async (req, res) => {
      const ebook =
        await Ebook.findById(
          req.params.id
        );

      if (!ebook) {
        return res
          .status(404)
          .json({
            success: false,
            message:
              "Ebook not found",
          });
      }

      await Ebook.findByIdAndDelete(
        req.params.id
      );

      res
        .status(200)
        .json({
          success: true,
          message:
            "Ebook deleted successfully",
        });
    }
  );