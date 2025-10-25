import express from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { 
  validateUpdateUser, 
  validatePagination 
} from '../middleware/validators.js';
import {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  getUserProjects,
  getUserBadges,
} from '../controllers/userController.js';

const router = express.Router();

// Admin routes
router.get('/', requireAuth, requireAdmin, adminLimiter, validatePagination, getAllUsers);

// User routes
router.get('/me', requireAuth, getUserProfile);
router.put('/me', requireAuth, validateUpdateUser, updateUserProfile);
router.get('/me/projects', requireAuth, getUserProjects);
router.get('/me/badges', requireAuth, getUserBadges);

export default router;
