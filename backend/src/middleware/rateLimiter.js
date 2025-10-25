import rateLimit from 'express-rate-limit';

// Rate limiter general para todas las APIs
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: {
    error: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo más tarde.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true, // Retorna info en `RateLimit-*` headers
  legacyHeaders: false, // Desactiva `X-RateLimit-*` headers
  handler: (req, res) => {
    res.status(429).json({
      error: 'Demasiadas peticiones',
      message: 'Has excedido el límite de peticiones. Por favor, espera antes de intentar de nuevo.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiter estricto para autenticación (login/registro)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 intentos de login
  skipSuccessfulRequests: true, // No contar requests exitosos
  message: {
    error: 'Demasiados intentos de login',
    retryAfter: '15 minutos'
  },
  handler: (req, res) => {
    console.warn(`⚠️  [SECURITY] Rate limit exceeded for IP: ${req.ip} on ${req.path}`);
    res.status(429).json({
      error: 'Demasiados intentos de autenticación',
      message: 'Has excedido el límite de intentos. Por seguridad, espera 15 minutos.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiter para creación de recursos (proyectos, comentarios)
export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // 10 creaciones por hora
  message: {
    error: 'Límite de creación excedido',
    retryAfter: '1 hora'
  },
  handler: (req, res) => {
    console.warn(`⚠️  [SECURITY] Create limit exceeded for user: ${req.user?.email || req.ip}`);
    res.status(429).json({
      error: 'Límite de creación excedido',
      message: 'Has creado demasiados recursos recientemente. Espera un poco antes de continuar.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiter para pagos (muy estricto)
export const paymentLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 20, // 20 intentos de pago por hora
  skipSuccessfulRequests: false,
  message: {
    error: 'Límite de pagos excedido',
    retryAfter: '1 hora'
  },
  handler: (req, res) => {
    console.error(`🚨 [SECURITY] Payment limit exceeded for user: ${req.user?.email || req.ip}`);
    res.status(429).json({
      error: 'Límite de transacciones excedido',
      message: 'Por seguridad, has alcanzado el límite de intentos de pago. Contacta soporte si necesitas ayuda.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiter para acciones admin (muy estricto)
export const adminLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutos
  max: 30, // 30 acciones admin cada 5 min
  skipSuccessfulRequests: false,
  handler: (req, res) => {
    console.error(`🚨 [SECURITY ALERT] Admin rate limit exceeded: ${req.user?.email || req.ip} on ${req.path}`);
    res.status(429).json({
      error: 'Límite de acciones admin excedido',
      message: 'Has realizado demasiadas acciones administrativas. Espera unos minutos.',
      retryAfter: Math.ceil(req.rateLimit.resetTime / 1000)
    });
  }
});

// Rate limiter para búsquedas
export const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 30, // 30 búsquedas por minuto
  message: {
    error: 'Demasiadas búsquedas',
    retryAfter: '1 minuto'
  }
});
