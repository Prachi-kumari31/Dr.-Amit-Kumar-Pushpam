import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      default: '',
      required: false, 
      match: [/^\+?[0-9]{10,15}$/, "Please enter a valid phone number"],
    },
    subject: {
      type: String,
      required: [true, 'Please provide a subject'],
    },
    message: {
      type: String,
      required: [true, 'Please provide a message'],
      maxlength: [5000, 'Message cannot be more than 5000 characters'],
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'resolved'],
      default: 'new',
    },
    reply: {
      type: String,
      default: null,
    },
    repliedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
     createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);

export default Contact;