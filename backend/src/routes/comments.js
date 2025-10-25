import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createLimiter } from '../middleware/rateLimiter.js';
import { 
  validateCreateComment, 
  validateDeleteComment,
  validateMongoId 
} from '../middleware/validators.js';
import {
  getCommentsByProject,
  createComment,
  deleteComment,
} from '../controllers/commentController.js';

const router = express.Router();

router.get('/project/:projectId', validateMongoId, getCommentsByProject);
router.post('/', requireAuth, createLimiter, validateCreateComment, createComment);
router.delete('/:id', requireAuth, validateDeleteComment, deleteComment);

export default router;
