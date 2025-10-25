import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { paymentLimiter } from '../middleware/rateLimiter.js';
import { validateCreateDonation, validateMongoId } from '../middleware/validators.js';
import {
  createPaymentIntent,
  getDonationsByProject,
  getUserDonations,
} from '../controllers/donationController.js';

const router = express.Router();

router.post('/create-payment-intent', requireAuth, paymentLimiter, validateCreateDonation, createPaymentIntent);
router.get('/project/:projectId', validateMongoId, getDonationsByProject);
router.get('/user/me', requireAuth, getUserDonations);

export default router;
