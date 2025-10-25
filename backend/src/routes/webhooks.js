import express from 'express';
import { handleStripeWebhook } from '../controllers/webhookController.js';

const router = express.Router();

// Esta ruta DEBE estar ANTES del express.json() middleware
router.post('/stripe', express.raw({ type: 'application/json' }), handleStripeWebhook);

export default router;
