import logger from '../config/logger.js';

// Middleware para tracking de métricas de requests
export const requestMetrics = (req, res, next) => {
  const startTime = Date.now();
  
  // Capturar el método original de res.json
  const originalJson = res.json.bind(res);
  
  // Override res.json para capturar cuando se envía la respuesta
  res.json = function(data) {
    const duration = Date.now() - startTime;
    
    // Log de métricas
    logger.http(`${req.method} ${req.path}`, {
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userId: req.user?._id,
      userAgent: req.get('user-agent')
    });
    
    // Detectar requests lentos (>2 segundos)
    if (duration > 2000) {
      logger.warn(`Slow request detected: ${req.method} ${req.path}`, {
        duration: `${duration}ms`,
        userId: req.user?._id
      });
    }
    
    // Llamar al método original
    return originalJson(data);
  };
  
  next();
};

// Middleware para tracking de errores HTTP
export const errorMetrics = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  // Incrementar contador de errores (en producción, conectar con servicio de métricas)
  if (statusCode >= 500) {
    logger.error(`HTTP ${statusCode} error on ${req.method} ${req.path}`, {
      error: err.message,
      statusCode,
      method: req.method,
      path: req.path,
      userId: req.user?._id,
      ip: req.ip
    });
  } else if (statusCode >= 400) {
    logger.warn(`HTTP ${statusCode} error on ${req.method} ${req.path}`, {
      error: err.message,
      statusCode,
      method: req.method,
      path: req.path,
      userId: req.user?._id
    });
  }
  
  // Pasar al siguiente middleware de error
  next(err);
};

// Middleware para detectar patrones sospechosos
export const securityMetrics = (req, res, next) => {
  // Detectar payloads sospechosamente grandes
  const contentLength = parseInt(req.get('content-length') || '0');
  if (contentLength > 5 * 1024 * 1024) { // 5MB
    logger.warn('Large payload detected', {
      size: contentLength,
      path: req.path,
      ip: req.ip,
      userId: req.user?._id
    });
  }
  
  // Detectar user-agents sospechosos
  const userAgent = req.get('user-agent') || '';
  const suspiciousPatterns = ['bot', 'crawler', 'spider', 'scraper'];
  const isSuspicious = suspiciousPatterns.some(pattern => 
    userAgent.toLowerCase().includes(pattern)
  );
  
  if (isSuspicious && !req.path.startsWith('/api/public')) {
    logger.warn('Suspicious user agent', {
      userAgent,
      path: req.path,
      ip: req.ip
    });
  }
  
  next();
};

export default {
  requestMetrics,
  errorMetrics,
  securityMetrics
};
