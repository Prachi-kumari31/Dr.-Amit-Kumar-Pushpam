import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
  
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },

    phone: {
      type: String,
      trim: true,
      default: "",
      match: [/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"],
    },

    // Booking details
    serviceType: {
      type: String,
      enum: [
        "astrology",
        "psychology",
        "spiritual",
        "moral",
        "testing",
        "paranormal",
      ],
      required: true,
    },

    sessionDuration: {
      type: Number,
      enum: [30, 60, 90],
      required: true,
    },

    sessionMode: {
      type: String,
      enum: ["online", "in-person"],
      default: "online",
    },

    preferredDate: {
      type: String,
      required: true,
    },

    preferredTime: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      trim: true,
      default: "",
    },

    price: {
      type: Number,
      default: 0,
    },

    // Booking status
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "rescheduled",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },

    // Final appointment information
    confirmedDate: {
      type: String,
      default: "",
    },

    confirmedTime: {
      type: String,
      default: "",
    },

    meetingPlatform: {
      type: String,
      enum: ["Google Meet", "Zoom", "Microsoft Teams", "Phone", "In Person", ""],
      default: "",
    },

    meetingLink: {
      type: String,
      trim: true,
      default: "",
    },
    adminNotes: {
      type: String,
      default: "",
    },
     confirmationSent: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);