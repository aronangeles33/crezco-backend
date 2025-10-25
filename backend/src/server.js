import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import routes from './routes/index.js';
import errorHandler from './middleware/errorHandler.js';
import { setupSocketIO } from './socket/index.js';
import logger, { logSecurity, logSuspicious } from './config/logger.js';
import { generalLimiter } from './middleware/rateLimiter.js';
import { requestMetrics, errorMetrics, securityMetrics } from './middleware/metrics.js';

// Configurar __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar .env - intenta primero desde la carpeta actual, luego desde backend/
const envPath = path.resolve(process.cwd(), '.env');
console.log('📁 Intentando cargar .env desde:', envPath);
dotenv.config({ path: envPath });

// Debug: verificar las variables de entorno críticas
console.log('🔑 STRIPE_SECRET_KEY cargada:', process.env.STRIPE_SECRET_KEY ? 'SÍ (primeros 20 chars: ' + process.env.STRIPE_SECRET_KEY.substring(0, 20) + '...)' : 'NO');
console.log('🔐 CLERK_SECRET_KEY cargada:', process.env.CLERK_SECRET_KEY ? 'SÍ' : 'NO');
console.log('🗄️  MONGODB_URI cargada:', process.env.MONGODB_URI ? 'SÍ' : 'NO');

const app = express();
const server = http.createServer(app);

// Configurar CORS para múltiples puertos
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:3002',
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  },
});

// Conectar a MongoDB
connectDB();

// ========== MIDDLEWARE DE SEGURIDAD ==========

// 1. Helmet - Protección de headers HTTP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
}));

// 2. CORS - Restringido en producción
app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sin origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // En producción, rechazar orígenes no autorizados
      if (process.env.NODE_ENV === 'production') {
        logSuspicious('CORS violation', origin, { 
          message: 'Origen no autorizado intentó acceder a la API' 
        });
        callback(new Error('No permitido por CORS'));
      } else {
        // En desarrollo, permitir pero logear
        logger.warn(`⚠️  Origen no listado en desarrollo: ${origin}`);
        callback(null, true);
      }
    }
  },
  credentials: true,
}));

// 3. Rate Limiting - Prevenir ataques de fuerza bruta
app.use('/api/', generalLimiter);

// 4. Sanitización contra NoSQL injection
app.use(mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    logSuspicious('NoSQL Injection attempt', req.ip, { 
      path: req.path, 
      key,
      body: req.body 
    });
  },
}));

// 5. Compression
app.use(compression());

// 6. Morgan con Winston logging
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.http(message.trim())
  }
}));

// 7. Body parsers con límites
app.use(express.json({ 
  limit: '10mb',
  verify: (req, res, buf, encoding) => {
    // Detectar payloads sospechosamente grandes
    if (buf.length > 10 * 1024 * 1024) { // 10MB
      logSuspicious('Large payload', req.ip, { 
        size: buf.length, 
        path: req.path 
      });
    }
  }
}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 8. Middleware de métricas y seguridad
app.use(requestMetrics);
app.use(securityMetrics);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'CREZCO API is running' });
});

// API Routes
app.use('/api', routes);

// Socket.IO
setupSocketIO(io);
app.set('io', io);

// Error Metrics (debe ir ANTES del errorHandler)
app.use(errorMetrics);

// Error Handler (debe ir al final)
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  logger.info(`🚀 Servidor corriendo en puerto ${PORT}`);
  logger.info(`🌍 Entorno: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`📡 Socket.IO activo`);
  logger.info(`🔒 Seguridad: Helmet, Rate Limiting, CORS, XSS Protection activados`);
  logSecurity('Server started', { port: PORT, env: process.env.NODE_ENV });
});

export default app;
