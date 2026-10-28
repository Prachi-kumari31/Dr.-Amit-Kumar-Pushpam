import express from 'express';
import {
  purchaseEbook,
  completePurchase,
  getUserPurchases,
  downloadEbook,
  getPurchaseDetails,
  leaveFeedback,
} from '../controllers/purchaseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protected routes
router.post('/', protect, purchaseEbook);
router.post('/complete', protect, completePurchase);
router.get('/my-purchases', protect, getUserPurchases);
router.get('/:purchaseId', protect, getPurchaseDetails);
router.get('/:purchaseId/download', protect, downloadEbook);
router.post('/:purchaseId/feedback', protect, leaveFeedback);

export default router;