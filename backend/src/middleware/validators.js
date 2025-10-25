import { body, param, query, validationResult } from 'express-validator';

// Middleware para manejar errores de validación
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.warn(`⚠️  [VALIDATION] Errores de validación en ${req.path}:`, errors.array());
    return res.status(400).json({
      error: 'Datos inválidos',
      details: errors.array().map(err => ({
        field: err.path,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
};

// ========== VALIDADORES DE PROYECTOS ==========

export const validateCreateProject = [
  body('title')
    .trim()
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 5, max: 100 }).withMessage('El título debe tener entre 5 y 100 caracteres')
    .escape(),
  
  body('description')
    .trim()
    .notEmpty().withMessage('La descripción es obligatoria')
    .isLength({ min: 50, max: 5000 }).withMessage('La descripción debe tener entre 50 y 5000 caracteres'),
  
  body('goal')
    .notEmpty().withMessage('La meta de financiación es obligatoria')
    .isFloat({ min: 100, max: 1000000 }).withMessage('La meta debe estar entre €100 y €1,000,000')
    .toFloat(),
  
  body('category')
    .trim()
    .notEmpty().withMessage('La categoría es obligatoria')
    .isIn(['startup', 'art', 'podcast', 'shop', 'other']).withMessage('Categoría no válida'),
  
  body('endDate')
    .notEmpty().withMessage('La fecha de finalización es obligatoria')
    .isISO8601().withMessage('Formato de fecha inválido')
    .custom((value) => {
      const endDate = new Date(value);
      const now = new Date();
      const maxDate = new Date();
      maxDate.setDate(maxDate.getDate() + 90); // Máximo 90 días
      
      if (endDate <= now) {
        throw new Error('La fecha debe ser futura');
      }
      if (endDate > maxDate) {
        throw new Error('La campaña no puede durar más de 90 días');
      }
      return true;
    }),
  
  body('image')
    .optional()
    .isURL().withMessage('La URL de la imagen no es válida'),
  
  body('video')
    .optional()
    .isURL().withMessage('La URL del video no es válida'),
  
  body('risks')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Los riesgos no pueden superar 2000 caracteres'),
  
  handleValidationErrors
];

export const validateUpdateProject = [
  param('id')
    .isMongoId().withMessage('ID de proyecto inválido'),
  
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5, max: 100 }).withMessage('El título debe tener entre 5 y 100 caracteres')
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ min: 50, max: 5000 }).withMessage('La descripción debe tener entre 50 y 5000 caracteres'),
  
  body('goal')
    .optional()
    .isFloat({ min: 100, max: 1000000 }).withMessage('La meta debe estar entre €100 y €1,000,000')
    .toFloat(),
  
  body('category')
    .optional()
    .isIn(['startup', 'art', 'podcast', 'shop', 'other']).withMessage('Categoría no válida'),
  
  handleValidationErrors
];

// ========== VALIDADORES DE COMENTARIOS ==========

export const validateCreateComment = [
  body('projectId')
    .notEmpty().withMessage('El ID del proyecto es obligatorio')
    .isMongoId().withMessage('ID de proyecto inválido'),
  
  body('content')
    .trim()
    .notEmpty().withMessage('El contenido del comentario es obligatorio')
    .isLength({ min: 1, max: 1000 }).withMessage('El comentario debe tener entre 1 y 1000 caracteres')
    .matches(/^[^<>]*$/).withMessage('El comentario contiene caracteres no permitidos'),
  
  body('parentId')
    .optional()
    .isMongoId().withMessage('ID de comentario padre inválido'),
  
  handleValidationErrors
];

export const validateDeleteComment = [
  param('id')
    .isMongoId().withMessage('ID de comentario inválido'),
  
  handleValidationErrors
];

// ========== VALIDADORES DE DONACIONES ==========

export const validateCreateDonation = [
  body('projectId')
    .notEmpty().withMessage('El ID del proyecto es obligatorio')
    .isMongoId().withMessage('ID de proyecto inválido'),
  
  body('amount')
    .notEmpty().withMessage('El monto es obligatorio')
    .isFloat({ min: 1, max: 100000 }).withMessage('El monto debe estar entre €1 y €100,000')
    .toFloat(),
  
  body('isAnonymous')
    .optional()
    .isBoolean().withMessage('isAnonymous debe ser booleano')
    .toBoolean(),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('El mensaje no puede superar 500 caracteres'),
  
  handleValidationErrors
];

// ========== VALIDADORES DE USUARIOS ==========

export const validateUpdateUser = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres')
    .escape(),
  
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('La biografía no puede superar 500 caracteres'),
  
  body('website')
    .optional()
    .isURL().withMessage('El sitio web no es una URL válida'),
  
  body('social.twitter')
    .optional()
    .matches(/^@?(\w){1,15}$/).withMessage('Usuario de Twitter inválido'),
  
  body('social.instagram')
    .optional()
    .matches(/^@?(\w){1,30}$/).withMessage('Usuario de Instagram inválido'),
  
  handleValidationErrors
];

// ========== VALIDADORES DE ADMIN ==========

export const validatePromoteUser = [
  body('userId')
    .notEmpty().withMessage('El ID del usuario es obligatorio')
    .isMongoId().withMessage('ID de usuario inválido'),
  
  body('role')
    .notEmpty().withMessage('El rol es obligatorio')
    .isIn(['user', 'credcamer', 'admin']).withMessage('Rol no válido'),
  
  handleValidationErrors
];

// ========== VALIDADORES DE CREDCAMER ==========

export const validateCaptureProject = [
  body('projectId')
    .notEmpty().withMessage('El ID del proyecto es obligatorio')
    .isMongoId().withMessage('ID de proyecto inválido'),
  
  body('notes')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Las notas no pueden superar 1000 caracteres'),
  
  handleValidationErrors
];

// ========== VALIDADORES DE UPDATES ==========

export const validateCreateUpdate = [
  body('projectId')
    .notEmpty().withMessage('El ID del proyecto es obligatorio')
    .isMongoId().withMessage('ID de proyecto inválido'),
  
  body('title')
    .trim()
    .notEmpty().withMessage('El título es obligatorio')
    .isLength({ min: 5, max: 200 }).withMessage('El título debe tener entre 5 y 200 caracteres')
    .escape(),
  
  body('content')
    .trim()
    .notEmpty().withMessage('El contenido es obligatorio')
    .isLength({ min: 20, max: 10000 }).withMessage('El contenido debe tener entre 20 y 10000 caracteres'),
  
  handleValidationErrors
];

// ========== VALIDADORES GENERALES ==========

export const validateMongoId = [
  param('id')
    .isMongoId().withMessage('ID inválido'),
  
  handleValidationErrors
];

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1, max: 1000 }).withMessage('Número de página inválido')
    .toInt(),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 }).withMessage('Límite inválido (máximo 100)')
    .toInt(),
  
  handleValidationErrors
];

export const validateSearch = [
  query('q')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('Búsqueda debe tener entre 1 y 100 caracteres')
    .escape(),
  
  handleValidationErrors
];
