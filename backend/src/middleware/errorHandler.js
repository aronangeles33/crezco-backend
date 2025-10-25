import logger from '../config/logger.js';

const errorHandler = (err, req, res, next) => {
  // Log detallado del error
  logger.error('Error capturado en errorHandler', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    userId: req.user?._id,
    statusCode: err.statusCode || 500
  });

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(e => e.message);
    logger.warn('Validation error', { errors, path: req.path });
    return res.status(400).json({
      message: 'Error de validación',
      errors,
    });
  }

  // Error de duplicado de MongoDB
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    logger.warn('Duplicate key error', { field, path: req.path });
    return res.status(400).json({
      message: `El ${field} ya existe`,
    });
  }

  // Error de CastError (ID inválido)
  if (err.name === 'CastError') {
    logger.warn('Cast error (invalid ID)', { 
      value: err.value, 
      path: req.path 
    });
    return res.status(400).json({
      message: 'ID inválido',
    });
  }

  // Error de Stripe
  if (err.type === 'StripeCardError') {
    logger.error('Stripe card error', { 
      message: err.message,
      userId: req.user?._id 
    });
    return res.status(400).json({
      message: 'Error de tarjeta: ' + err.message,
    });
  }

  // Error por defecto
  const statusCode = err.statusCode || 500;
  
  // Log crítico para errores 500
  if (statusCode === 500) {
    logger.error('Internal server error', {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      userId: req.user?._id
    });
  }

  res.status(statusCode).json({
    message: err.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

export default errorHandler;
