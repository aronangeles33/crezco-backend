import express from 'express';
import projectRoutes from './projects.js';
import donationRoutes from './donations.js';
import userRoutes from './users.js';
import commentRoutes from './comments.js';
import updateRoutes from './updates.js';
import stripeWebhookRoutes from './webhooks.js';
import adminRoutes from './admin.js';
import credcamerRoutes from './credcamer.js';

const router = express.Router();

router.use('/projects', projectRoutes);
router.use('/donations', donationRoutes);
router.use('/users', userRoutes);
router.use('/comments', commentRoutes);
router.use('/updates', updateRoutes);
router.use('/webhooks', stripeWebhookRoutes);
router.use('/admin', adminRoutes);
router.use('/credcamer', credcamerRoutes);

export default router;
