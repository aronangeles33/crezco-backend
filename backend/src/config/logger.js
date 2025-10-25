import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir niveles de log personalizados
const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    security: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    security: 'magenta',
    info: 'green',
    http: 'cyan',
    debug: 'white',
  },
};

winston.addColors(customLevels.colors);

// Formato de log
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// Formato para consola (desarrollo)
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let msg = `${timestamp} [${level}] ${message}`;
    if (Object.keys(meta).length > 0) {
      msg += ` ${JSON.stringify(meta)}`;
    }
    return msg;
  })
);

// Configurar rotación de archivos de log
const dailyRotateFileTransport = new DailyRotateFile({
  filename: path.join(__dirname, '../../logs/app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d', // Guardar logs por 14 días
  format: logFormat,
});

// Transporte específico para logs de seguridad
const securityLogTransport = new DailyRotateFile({
  level: 'security',
  filename: path.join(__dirname, '../../logs/security-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d', // Guardar logs de seguridad por 30 días
  format: logFormat,
});

// Transporte para errores críticos
const errorLogTransport = new DailyRotateFile({
  level: 'error',
  filename: path.join(__dirname, '../../logs/error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '30d',
  format: logFormat,
});

// Crear logger
const logger = winston.createLogger({
  levels: customLevels.levels,
  format: logFormat,
  transports: [
    dailyRotateFileTransport,
    securityLogTransport,
    errorLogTransport,
  ],
});

// En desarrollo, también logear a consola
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    })
  );
}

// Helper functions para logs específicos
export const logSecurity = (event, details = {}) => {
  logger.log('security', event, {
    timestamp: new Date().toISOString(),
    ...details,
  });
};

export const logAuth = (action, userId, success, ip, details = {}) => {
  logSecurity(`AUTH: ${action}`, {
    userId,
    success,
    ip,
    ...details,
  });
};

export const logAdminAction = (action, adminId, targetId, details = {}) => {
  logSecurity(`ADMIN: ${action}`, {
    adminId,
    targetId,
    ...details,
  });
};

export const logPayment = (action, userId, amount, projectId, success, details = {}) => {
  logSecurity(`PAYMENT: ${action}`, {
    userId,
    amount,
    projectId,
    success,
    ...details,
  });
};

export const logSuspicious = (event, ip, details = {}) => {
  logger.warn(`SUSPICIOUS: ${event}`, {
    ip,
    timestamp: new Date().toISOString(),
    ...details,
  });
};

export default logger;
