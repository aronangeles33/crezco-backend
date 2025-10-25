import { clerkClient } from '@clerk/clerk-sdk-node';
import logger, { logAuth, logSuspicious } from '../config/logger.js';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logAuth('Missing token', null, false, req.ip, { path: req.path });
      return res.status(401).json({ 
        message: 'No autorizado. Token no proporcionado.' 
      });
    }

    const token = authHeader.split(' ')[1];

    // Verificar token con Clerk
    const sessionClaims = await clerkClient.verifyToken(token);

    if (!sessionClaims || !sessionClaims.sub) {
      logAuth('Invalid token', null, false, req.ip, { path: req.path });
      return res.status(401).json({ 
        message: 'Token inválido o expirado.' 
      });
    }

    // Obtener información del usuario de Clerk
    const clerkUser = await clerkClient.users.getUser(sessionClaims.sub);
    
    if (!clerkUser) {
      logAuth('User not found in Clerk', sessionClaims.sub, false, req.ip);
      return res.status(401).json({ 
        message: 'Usuario no encontrado en Clerk.' 
      });
    }

    // Buscar o crear usuario en nuestra DB
    let user = await User.findOne({ clerkId: clerkUser.id });
    
    if (!user) {
      // Crear usuario si no existe
      user = await User.create({
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || `user_${clerkUser.id}@crezco.app`,
        name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'Usuario',
        avatar: clerkUser.imageUrl || undefined,
      });
      
      logAuth('New user created', user._id, true, req.ip, { 
        email: user.email 
      });
      logger.info(`✅ Nuevo usuario creado: ${user.email}`);
    }

    // Log successful auth (only in debug mode to avoid spam)
    if (process.env.NODE_ENV === 'development') {
      logger.debug(`Auth success: ${user.email} on ${req.path}`);
    }

    req.user = user;
    next();
  } catch (error) {
    logAuth('Auth error', null, false, req.ip, { 
      error: error.message,
      path: req.path 
    });
    logger.error('❌ Error de autenticación:', error.message);
    return res.status(401).json({ 
      message: 'Error de autenticación.',
      error: error.message 
    });
  }
};

export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      req.user = null;
      return next();
    }

    const token = authHeader.split(' ')[1];
    const sessionClaims = await clerkClient.verifyToken(token);

    if (sessionClaims && sessionClaims.sub) {
      const clerkUser = await clerkClient.users.getUser(sessionClaims.sub);
      if (clerkUser) {
        let user = await User.findOne({ clerkId: clerkUser.id });
        
        if (!user) {
          user = await User.create({
            clerkId: clerkUser.id,
            email: clerkUser.emailAddresses[0]?.emailAddress || `user_${clerkUser.id}@crezco.app`,
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || clerkUser.username || 'Usuario',
            avatar: clerkUser.imageUrl || undefined,
          });
        }
        
        req.user = user;
      } else {
        req.user = null;
      }
    } else {
      req.user = null;
    }

    next();
  } catch (error) {
    console.error('⚠️  Error en auth opcional:', error.message);
    req.user = null;
    next();
  }
};

// Middleware para verificar rol admin
export const requireAdmin = async (req, res, next) => {
  try {
    // requireAuth debe haberse ejecutado antes para poblar req.user
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado.' });
    }

    if (req.user.role !== 'admin') {
      logSuspicious('Unauthorized admin access attempt', req.ip, {
        userId: req.user._id,
        email: req.user.email,
        path: req.path
      });
      return res.status(403).json({ message: 'Acceso restringido: sólo administradores.' });
    }

    logger.debug(`Admin access: ${req.user.email} on ${req.path}`);
    return next();
  } catch (error) {
    logger.error('❌ Error en requireAdmin:', error.message);
    return res.status(500).json({ message: 'Error interno.' });
  }
};

// Middleware para verificar rol credcamer
export const requireCredcamer = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'No autorizado.' });
    }

    if (req.user.role !== 'credcamer' && req.user.role !== 'admin') {
      logSuspicious('Unauthorized credcamer access attempt', req.ip, {
        userId: req.user._id,
        email: req.user.email,
        role: req.user.role,
        path: req.path
      });
      return res.status(403).json({ 
        message: 'Acceso restringido: sólo credcamers o administradores.' 
      });
    }

    logger.debug(`Credcamer access: ${req.user.email} on ${req.path}`);
    return next();
  } catch (error) {
    logger.error('❌ Error en requireCredcamer:', error.message);
    return res.status(500).json({ message: 'Error interno.' });
  }
};
