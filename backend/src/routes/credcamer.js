import express from 'express';
import { requireAuth, requireAdmin, requireCredcamer } from '../middleware/auth.js';
import { adminLimiter, createLimiter } from '../middleware/rateLimiter.js';
import { 
  validatePromoteUser, 
  validateCaptureProject 
} from '../middleware/validators.js';
import {
  promoteToCredcamer,
  demoteCredcamer,
  captureProject,
  getMyCaptures,
  getRecommendations,
  getLeaderboard,
  getCredcamerStats,
} from '../controllers/credcamerController.js';

const router = express.Router();

// Rutas de admin
router.post('/promote', requireAuth, requireAdmin, adminLimiter, validatePromoteUser, promoteToCredcamer);
router.post('/demote', requireAuth, requireAdmin, adminLimiter, validatePromoteUser, demoteCredcamer);
router.get('/stats', requireAuth, requireAdmin, adminLimiter, getCredcamerStats);

// Rutas de credcamer
router.post('/capture', requireAuth, requireCredcamer, createLimiter, validateCaptureProject, captureProject);
router.get('/my-captures', requireAuth, requireCredcamer, getMyCaptures);
router.get('/recommendations', requireAuth, requireCredcamer, getRecommendations);

// Rutas públicas
router.get('/leaderboard', getLeaderboard);

export default router;
