import express from 'express';
import { requireAuth, optionalAuth, requireAdmin } from '../middleware/auth.js';
import { createLimiter, adminLimiter } from '../middleware/rateLimiter.js';
import { 
  validateCreateProject, 
  validateUpdateProject, 
  validateMongoId 
} from '../middleware/validators.js';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  getProjectAnalytics,
  approveProject,
  rejectProject,
  getPendingProjects,
} from '../controllers/projectController.js';

const router = express.Router();

// IMPORTANTE: Rutas específicas ANTES de rutas con parámetros
router.get('/', optionalAuth, getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/pending', requireAuth, requireAdmin, adminLimiter, getPendingProjects); // ADMIN
router.post('/', requireAuth, createLimiter, validateCreateProject, createProject);

// Rutas con parámetros ID (después de rutas específicas)
router.get('/:id', optionalAuth, validateMongoId, getProjectById);
router.get('/:id/analytics', requireAuth, validateMongoId, getProjectAnalytics);
router.post('/:id/approve', requireAuth, requireAdmin, adminLimiter, validateMongoId, approveProject);
router.post('/:id/reject', requireAuth, requireAdmin, adminLimiter, validateMongoId, rejectProject);
router.put('/:id', requireAuth, validateUpdateProject, updateProject);
router.delete('/:id', requireAuth, validateMongoId, deleteProject);

export default router;
