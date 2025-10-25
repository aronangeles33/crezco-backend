import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createLimiter } from '../middleware/rateLimiter.js';
import { 
  validateCreateUpdate, 
  validateMongoId 
} from '../middleware/validators.js';
import {
  getUpdatesByProject,
  createUpdate,
} from '../controllers/updateController.js';

const router = express.Router();

router.get('/project/:projectId', validateMongoId, getUpdatesByProject);
router.post('/', requireAuth, createLimiter, validateCreateUpdate, createUpdate);

export default router;
