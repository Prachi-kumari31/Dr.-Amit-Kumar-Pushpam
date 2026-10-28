import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ebook: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ebook',
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'upi', 'paypal', 'razorpay'],
      default: null,
    },
    transactionId: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },
    downloadCount: {
      type: Number,
      default: 0,
    },
    maxDownloads: {
      type: Number,
      default: 5,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    },
    feedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null,
      },
      comment: {
        type: String,
        default: null,
      },
    },
    invoiceNumber: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Purchase', purchaseSchema);