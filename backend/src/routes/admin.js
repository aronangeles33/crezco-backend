import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { adminLimiter } from '../middleware/rateLimiter.js';
import { validatePromoteUser } from '../middleware/validators.js';
import logger, { logAdminAction, logSecurity, logSuspicious } from '../config/logger.js';
import User from '../models/User.js';

const router = express.Router();

/**
 * Endpoint temporal para promover usuario a admin
 * POST /api/admin/promote
 * Body: { secret: "tu-secreto-aqui" }
 * 
 * IMPORTANTE: Este endpoint debe ser eliminado o protegido mejor en producción
 */
router.post('/promote', requireAuth, adminLimiter, async (req, res, next) => {
  try {
    const { secret } = req.body;
    
    // Secret key de seguridad (cámbiala por algo único)
    const ADMIN_SECRET = process.env.ADMIN_PROMOTION_SECRET || 'crezco-admin-2024-secret';
    
    if (secret !== ADMIN_SECRET) {
      logSuspicious('Failed admin promotion attempt', req.ip, {
        userId: req.user._id,
        email: req.user.email
      });
      return res.status(403).json({ 
        error: 'Secret incorrecto. No autorizado para promover a admin.' 
      });
    }

    // Promover usuario actual a admin
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (user.role === 'admin') {
      return res.status(200).json({ 
        message: 'Este usuario ya es administrador',
        user: {
          id: user._id,
          email: user.email,
          role: user.role
        }
      });
    }

    user.role = 'admin';
    await user.save();

    logAdminAction('User promoted to admin', req.user._id, user._id, {
      email: user.email,
      ip: req.ip
    });
    logger.warn(`⚠️  Usuario promovido a ADMIN: ${user.email} (${user._id})`);

    res.json({ 
      success: true,
      message: `Usuario ${user.email} promovido a administrador exitosamente`,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    logger.error('❌ Error promoviendo usuario a admin:', error);
    next(error);
  }
});

/**
 * Verificar si el usuario actual es admin
 * GET /api/admin/check
 */
router.get('/check', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    res.json({
      isAdmin: user?.role === 'admin',
      role: user?.role || 'unknown',
      email: user?.email
    });
  } catch (error) {
    res.status(500).json({ error: 'Error verificando rol de usuario' });
  }
});

export default router;
