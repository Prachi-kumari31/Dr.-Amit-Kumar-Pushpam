import mongoose from "mongoose";

const ebookSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: [
          true,
          "Please provide a title",
        ],
        trim: true,
        maxlength: [
          200,
          "Title cannot be more than 200 characters",
        ],
      },

      slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
      },

      description: {
        type: String,
        required: [
          true,
          "Please provide a description",
        ],
      },

      excerpt: {
        type: String,
        maxlength: [
          500,
          "Excerpt cannot be more than 500 characters",
        ],
        default: "",
      },

      author: {
        type: String,
        required: [
          true,
          "Please provide author name",
        ],
        trim: true,
      },

      category: {
        type: String,

        enum: [
          "Astrology",
          "Psychology",
          "Spiritual",
          "Paranormal",
          "Self-Help",
        ],

        required: [
          true,
          "Please select a category",
        ],
      },

      pages: {
        type: Number,
        required: [
          true,
          "Please provide number of pages",
        ],
        min: 1,
      },

      language: {
        type: String,

        enum: [
          "English",
          "Hindi",
          "Spanish",
          "French",
        ],

        default: "English",
      },

      fileFormat: {
        type: String,

        enum: [
          "PDF",
          "EPUB",
          "MOBI",
        ],

        default: "PDF",
      },

      /*
      |--------------------------------------------------------------------------
      | Cover uploaded from device
      |--------------------------------------------------------------------------
      */

      cover: {
        type: String,
        default: null,
      },

      /*
      |--------------------------------------------------------------------------
      | PDF uploaded from device
      |--------------------------------------------------------------------------
      */

      fileUrl: {
        type: String,
        required: [
          true,
          "Please upload an ebook PDF",
        ],
      },

      /*
      |--------------------------------------------------------------------------
      | Download
      |--------------------------------------------------------------------------
      */

      downloadLink: {
        type: String,
        default: null,
      },

      /*
      |--------------------------------------------------------------------------
      | Pricing
      |--------------------------------------------------------------------------
      */

      price: {
        type: Number,
        required: true,
        min: [
          0,
          "Price cannot be negative",
        ],
        default: 0,
      },

      originalPrice: {
        type: Number,
        default: null,
        min: 0,
      },

      discount: {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
      },

      /*
      |--------------------------------------------------------------------------
      | Tags
      |--------------------------------------------------------------------------
      */

      tags: [
        {
          type: String,
          lowercase: true,
          trim: true,
        },
      ],

      /*
      |--------------------------------------------------------------------------
      | Reviews
      |--------------------------------------------------------------------------
      */

      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },

      reviews: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },

          rating: {
            type: Number,
            min: 1,
            max: 5,
          },

          comment: String,

          date: {
            type: Date,
            default: Date.now,
          },
        },
      ],

      totalSales: {
        type: Number,
        default: 0,
      },

      /*
      |--------------------------------------------------------------------------
      | Status
      |--------------------------------------------------------------------------
      */

      isActive: {
        type: Boolean,
        default: true,
      },

      isFeatured: {
        type: Boolean,
        default: false,
      },
    },

    {
      timestamps: true,
    }
  );

/*
|--------------------------------------------------------------------------
| Generate slug
|--------------------------------------------------------------------------
*/

ebookSchema.pre(
  "save",
  function (next) {
    if (
      this.isModified("title") &&
      !this.slug
    ) {
      this.slug =
        this.title
          .toLowerCase()
          .replace(
            /[^\w\s-]/g,
            ""
          )
          .replace(
            /\s+/g,
            "-"
          )
          .replace(
            /-+/g,
            "-"
          );
    }

    next();
  }
);

export default mongoose.model(
  "Ebook",
  ebookSchema
);