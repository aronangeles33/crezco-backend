# ⚙️ CONFIGURACIÓN DE PRODUCCIÓN

## 🎯 Variables de Entorno por Ambiente

### **Backend (.env)**
```env
# ===========================================
# CREZCO BACKEND - PRODUCCIÓN
# ===========================================

# Server Configuration
PORT=3001
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://crezco_prod_user:NUEVA_CONTRASEÑA@cluster0.xxxxx.mongodb.net/crezco_production?retryWrites=true&w=majority

# Frontend URL
FRONTEND_URL=https://crezco.app
CORS_ORIGINS=https://crezco.app,https://www.crezco.app

# ===========================================
# AUTHENTICATION
# ===========================================
CLERK_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXX
CLERK_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXXXXX

# ===========================================
# PAYMENTS
# ===========================================
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXXXXX
STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXX

# ===========================================
# SECURITY
# ===========================================
JWT_SECRET=CLAVE_FUERTE_32_CARACTERES_MINIMO
ADMIN_PROMOTION_SECRET=OTRA_CLAVE_DIFERENTE_32_CHARS
SESSION_SECRET=TERCERA_CLAVE_PARA_SESIONES_32_CHARS

# ===========================================
# FILE STORAGE
# ===========================================
CLOUDINARY_CLOUD_NAME=crezco_production
CLOUDINARY_API_KEY=XXXXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXXXXXX

# ===========================================
# EMAIL
# ===========================================
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=resend
EMAIL_PASS=re_XXXXXXXXXXXXXXX
EMAIL_FROM=noreply@crezco.app

# ===========================================
# LOGGING & MONITORING
# ===========================================
LOG_LEVEL=info
ENABLE_SECURITY_LOGS=true
METRICS_ENABLED=true

# ===========================================
# RATE LIMITING
# ===========================================
RATE_LIMIT_WINDOW=900000
RATE_LIMIT_MAX=100
RATE_LIMIT_AUTH_MAX=5
RATE_LIMIT_PAYMENT_MAX=20

# ===========================================
# SSL & SECURITY
# ===========================================
FORCE_SSL=true
TRUST_PROXY=true
HELMET_CSP_ENABLED=true
```

### **Frontend (.env.local)**
```env
# ===========================================
# CREZCO FRONTEND - PRODUCCIÓN
# ===========================================

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXX

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_XXXXXXXXXXXXXXXXXXXXXXX

# API Configuration
NEXT_PUBLIC_API_URL=https://api.crezco.app
NEXT_PUBLIC_WS_URL=wss://api.crezco.app

# App Configuration
NEXT_PUBLIC_APP_URL=https://crezco.app
NEXT_PUBLIC_APP_NAME=CREZCO
NEXT_PUBLIC_APP_DESCRIPTION=Plataforma de Crowdfunding Española

# Analytics (opcional)
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX

# Features Flags
NEXT_PUBLIC_ENABLE_CREDCAMER=true
NEXT_PUBLIC_ENABLE_SOCIAL_LOGIN=true
NEXT_PUBLIC_ENABLE_APPLE_PAY=true

# SEO
NEXT_PUBLIC_SITE_URL=https://crezco.app
NEXT_PUBLIC_TWITTER_HANDLE=@CrezcoApp
```

---

## 🔧 Configuración por Plataforma

### **Vercel (Frontend)**

#### **Environment Variables**
```bash
# En Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
NEXT_PUBLIC_API_URL=https://api.crezco.app
NEXT_PUBLIC_APP_URL=https://crezco.app
```

#### **Build Configuration**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

#### **vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

---

### **Railway (Backend)**

#### **Environment Variables**
```bash
# En Railway Dashboard → Variables
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://...
CLERK_SECRET_KEY=sk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
```

#### **railway.json**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node src/server.js",
    "healthcheckPath": "/health",
    "healthcheckTimeout": 100,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### **Dockerfile (alternativo)**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["node", "src/server.js"]
```

---

### **DigitalOcean (VPS)**

#### **ecosystem.config.js**
```javascript
module.exports = {
  apps: [
    {
      name: 'crezco-backend',
      script: 'src/server.js',
      cwd: '/var/www/crezco/backend',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001
      },
      error_file: '/var/log/crezco/backend-error.log',
      out_file: '/var/log/crezco/backend-out.log',
      log_file: '/var/log/crezco/backend-combined.log',
      time: true
    },
    {
      name: 'crezco-frontend',
      script: 'npm',
      args: 'start',
      cwd: '/var/www/crezco/crezco-app',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
```

#### **nginx.conf**
```nginx
server {
    listen 80;
    server_name crezco.app www.crezco.app;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name crezco.app www.crezco.app;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
}
```

---

## 📊 Base de Datos de Producción

### **MongoDB Atlas M10 (Recomendado)**
```bash
# Configuración recomendada
Tier: M10 (2GB RAM, 10GB Storage)
Region: Ireland (eu-west-1)
Backup: Continuous
Monitoring: Enabled
```

#### **Índices de Rendimiento**
```javascript
// Crear en MongoDB Compass o Shell
db.projects.createIndex({ "status": 1, "category": 1 });
db.projects.createIndex({ "creator": 1 });
db.projects.createIndex({ "createdAt": -1 });
db.projects.createIndex({ "endDate": 1 });
db.projects.createIndex({ "featured": 1, "status": 1 });

db.donations.createIndex({ "project": 1 });
db.donations.createIndex({ "donor": 1 });
db.donations.createIndex({ "createdAt": -1 });

db.users.createIndex({ "clerkId": 1 }, { "unique": true });
db.users.createIndex({ "email": 1 }, { "unique": true });

db.comments.createIndex({ "projectId": 1, "parentId": 1 });
```

#### **Configuración de Backup**
```bash
# Configurar en Atlas Dashboard
Continuous Backup: Enabled
Point-in-time Recovery: 7 days
Backup Schedule: Daily at 02:00 UTC
Retention: 30 days
```

---

## 🔍 Health Checks

### **Backend Health Check**
```javascript
// Ya implementado en /health
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'CREZCO API is running',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version 
  });
});
```

### **Monitoring URLs**
```bash
Backend: https://api.crezco.app/health
Frontend: https://crezco.app/api/health (Next.js)
Database: MongoDB Atlas monitoring
```

---

## 📈 Performance

### **Frontend Optimización**
```json
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif']
  },
  experimental: {
    optimizeCss: true
  }
};
```

### **Backend Optimización**
```javascript
// Ya implementado
✅ Compression middleware
✅ Response caching headers
✅ Database connection pooling
✅ Rate limiting
✅ Request metrics
```

---

## 📋 Checklist de Configuración

### **Variables de Entorno** ✅
- [ ] Backend .env configurado
- [ ] Frontend .env.local configurado
- [ ] Todas las claves rotadas
- [ ] NODE_ENV=production
- [ ] URLs de producción configuradas

### **Servicios Externos** ✅
- [ ] MongoDB Atlas M10 configurado
- [ ] Clerk producción configurado
- [ ] Stripe live mode activado
- [ ] Cloudinary configurado
- [ ] Email service configurado

### **Hosting** ✅
- [ ] Frontend deploy en Vercel
- [ ] Backend deploy en Railway/VPS
- [ ] Health checks funcionando
- [ ] SSL configurado
- [ ] DNS configurado

### **Monitoreo** ✅
- [ ] Logs de producción activos
- [ ] Métricas configuradas
- [ ] Alertas configuradas
- [ ] Backup programado

---

**Tiempo estimado**: 2-3 horas
**Criticidad**: Alta 🔥
**Dependencias**: Claves rotadas, hosting configurado