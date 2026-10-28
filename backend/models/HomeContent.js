import mongoose from "mongoose";

const statSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const domainSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    hindiTitle: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const credentialSchema = new mongoose.Schema(
  {
    value: {
      type: String,
    },
  },
  { _id: false }
);

const founderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    experience: {
      type: String,
      default: "",
    },
    credentials: {
      type: [String],
      default: [],
    },
    points: {
      type: [String],
      default: [],
    },
    quote: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const journeySchema = new mongoose.Schema(
  {
    year: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const processSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const donationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    amounts: {
      type: [Number],
      default: [],
    },
  },
  { _id: false }
);

const ctaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    buttonLink: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const heroSchema = new mongoose.Schema(
  {
    pill: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    hindiQuote: {
      type: String,
      default: "",
    },
    backgroundVideo: {
      type: String,
      default: "",
    },
    backgroundImage: {
      type: String,
      default: "",
    },
    primaryButtonText: {
      type: String,
      default: "",
    },
    primaryButtonLink: {
      type: String,
      default: "",
    },
    secondaryButtonText: {
      type: String,
      default: "",
    },
    secondaryButtonLink: {
      type: String,
      default: "",
    },
    stats: {
      type: [statSchema],
      default: [],
    },
  },
  { _id: false }
);

const homeContentSchema = new mongoose.Schema(
  {
    hero: {
      type: heroSchema,
      default: {},
    },

    domains: {
      type: [domainSchema],
      default: [],
    },

    stats: {
      type: [statSchema],
      default: [],
    },

    services: {
      type: [serviceSchema],
      default: [],
    },

    founder: {
      type: founderSchema,
      default: {},
    },

    journey: {
      type: [journeySchema],
      default: [],
    },

    process: {
      type: [processSchema],
      default: [],
    },

    publications: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    donation: {
      type: donationSchema,
      default: {},
    },

    cta: {
      type: ctaSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const HomeContent = mongoose.model(
  "HomeContent",
  homeContentSchema
);

export default HomeContent;