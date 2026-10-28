import Purchase from '../models/Purchase.js';
import Ebook from '../models/Ebook.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const generateInvoiceNumber = () => {
  return `INV-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
};

export const purchaseEbook = asyncHandler(async (req, res) => {
  const { ebookId, paymentMethod } = req.body;

  if (!ebookId || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  // Check if user already purchased this ebook
  const existingPurchase = await Purchase.findOne({
    user: req.user._id,
    ebook: ebookId,
    status: 'completed',
  });

  if (existingPurchase) {
    return res.status(400).json({
      success: false,
      message: 'You have already purchased this ebook',
    });
  }

  const ebook = await Ebook.findById(ebookId);

  if (!ebook) {
    return res.status(404).json({ success: false, message: 'Ebook not found' });
  }

  const purchase = await Purchase.create({
    user: req.user._id,
    ebook: ebookId,
    price: ebook.price,
    paymentMethod,
    invoiceNumber: generateInvoiceNumber(),
  });

  res.status(201).json({
    success: true,
    message: 'Purchase initiated successfully',
    data: purchase,
  });
});

export const completePurchase = asyncHandler(async (req, res) => {
  const { purchaseId, transactionId } = req.body;

  if (!purchaseId || !transactionId) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields',
    });
  }

  const purchase = await Purchase.findByIdAndUpdate(
    purchaseId,
    {
      status: 'completed',
      transactionId,
    },
    { new: true }
  )
    .populate('ebook', 'title fileUrl')
    .populate('user', 'email name');

  if (!purchase) {
    return res.status(404).json({
      success: false,
      message: 'Purchase not found',
    });
  }

  // Update total sales
  await Ebook.findByIdAndUpdate(purchase.ebook._id, {
    $inc: { totalSales: 1 },
  });

  res.status(200).json({
    success: true,
    message: 'Purchase completed successfully',
    data: purchase,
  });
});

export const getUserPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({ user: req.user._id })
    .populate('ebook', 'title cover category')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: purchases,
  });
});

export const downloadEbook = asyncHandler(async (req, res) => {
  const { purchaseId } = req.params;

  const purchase = await Purchase.findById(purchaseId)
    .populate('ebook', 'fileUrl title')
    .populate('user', '_id');

  if (!purchase) {
    return res.status(404).json({
      success: false,
      message: 'Purchase not found',
    });
  }

  if (purchase.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to download this ebook',
    });
  }

  if (purchase.downloadCount >= purchase.maxDownloads) {
    return res.status(400).json({
      success: false,
      message: 'Download limit exceeded',
    });
  }

  if (new Date() > purchase.expiresAt) {
    return res.status(400).json({
      success: false,
      message: 'Download link has expired',
    });
  }

  purchase.downloadCount += 1;
  await purchase.save();

  res.status(200).json({
    success: true,
    data: {
      downloadUrl: purchase.ebook.fileUrl,
      fileName: purchase.ebook.title,
    },
  });
});

export const getPurchaseDetails = asyncHandler(async (req, res) => {
  const { purchaseId } = req.params;

  const purchase = await Purchase.findById(purchaseId)
    .populate('ebook')
    .populate('user', 'name email phone');

  if (!purchase) {
    return res.status(404).json({
      success: false,
      message: 'Purchase not found',
    });
  }

  if (purchase.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to view this purchase',
    });
  }

  res.status(200).json({
    success: true,
    data: purchase,
  });
});

export const leaveFeedback = asyncHandler(async (req, res) => {
  const { purchaseId, rating, comment } = req.body;

  if (!purchaseId || !rating) {
    return res.status(400).json({
      success: false,
      message: 'Please provide rating and purchase ID',
    });
  }

  const purchase = await Purchase.findById(purchaseId);

  if (!purchase) {
    return res.status(404).json({
      success: false,
      message: 'Purchase not found',
    });
  }

  if (purchase.user.toString() !== req.user._id.toString()) {
    return res.status(403).json({
      success: false,
      message: 'Not authorized to leave feedback',
    });
  }

  purchase.feedback = {
    rating,
    comment,
  };

  await purchase.save();

  res.status(200).json({
    success: true,
    message: 'Feedback submitted successfully',
    data: purchase,
  });
});