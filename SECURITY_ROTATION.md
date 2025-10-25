# 🔐 ROTACIÓN DE CLAVES - OBLIGATORIO ANTES DE PRODUCCIÓN

## 🚨 CRÍTICO: Claves Expuestas

Las siguientes claves están **COMPROMETIDAS** y deben rotarse **INMEDIATAMENTE**:

```env
❌ MONGODB_URI=mongodb+srv://aronangeles33_db_user:nMUmvVAEBc21rhIE@...
❌ CLERK_SECRET_KEY=sk_test_tHuKJ9jnHrUzQf2u5YDH1GkxIke0tTLgTs8HERVg8S
❌ STRIPE_SECRET_KEY=sk_test_51PLqkvCH7lYLR0fgiDn9ap0tKclD2Ni25cTrC0QWd...
❌ JWT_SECRET=tu_super_secreto_jwt_key_aqui_cambialo
❌ ADMIN_PROMOTION_SECRET=crezco-admin-ultra-secreto-2024
```

**⚠️ NUNCA USAR ESTAS CLAVES EN PRODUCCIÓN**

---

## 📋 Checklist de Rotación

### **1. MongoDB Atlas** 🗄️

#### **Paso 1: Crear nuevo usuario**
```bash
1. Ir a: https://cloud.mongodb.com
2. Database Access → Add New Database User
3. Username: crezco_prod_user
4. Password: [GENERAR CONTRASEÑA FUERTE - 32 chars]
5. Roles: readWrite en database "crezco"
```

#### **Paso 2: Actualizar whitelist**
```bash
1. Network Access → Add IP Address
2. Agregar IPs de producción
3. Remover 0.0.0.0/0 (allow all) si existe
```

#### **Paso 3: Nueva URI**
```env
# Nueva MONGODB_URI
MONGODB_URI=mongodb+srv://crezco_prod_user:NUEVA_CONTRASEÑA@cluster0.xxxxx.mongodb.net/crezco?retryWrites=true&w=majority
```

---

### **2. Clerk Authentication** 👤

#### **Crear proyecto de producción**
```bash
1. Ir a: https://dashboard.clerk.com
2. Create New Application → "CREZCO Production"
3. Configurar dominios:
   - Production: https://crezco.app
   - Development: http://localhost:3000
```

#### **Configurar OAuth providers**
```bash
1. Google OAuth:
   - Ir a Google Cloud Console
   - Crear nuevas credenciales para dominio real
   - Configurar en Clerk

2. Configurar redirects:
   - https://crezco.app/dashboard
   - https://crezco.app/sign-up/sso-callback
```

#### **Nuevas claves**
```env
# Production keys
CLERK_PUBLISHABLE_KEY=pk_live_NUEVA_CLAVE_AQUI
CLERK_SECRET_KEY=sk_live_NUEVA_CLAVE_AQUI

# Frontend (.env.local)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_NUEVA_CLAVE_AQUI
```

---

### **3. Stripe Payments** 💳

#### **Activar cuenta live**
```bash
1. Ir a: https://dashboard.stripe.com
2. Activate Live Payments
3. Completar información de negocio:
   - Nombre de empresa: CREZCO
   - Dirección fiscal
   - Información bancaria
```

#### **Generar claves live**
```bash
1. API Keys → Reveal live key
2. Webhooks → Create endpoint para producción:
   - URL: https://api.crezco.app/webhooks/stripe
   - Events: payment_intent.succeeded, payment_intent.payment_failed
```

#### **Nuevas claves**
```env
# Production Stripe keys
STRIPE_SECRET_KEY=sk_live_NUEVA_CLAVE_AQUI
STRIPE_PUBLISHABLE_KEY=pk_live_NUEVA_CLAVE_AQUI
STRIPE_WEBHOOK_SECRET=whsec_NUEVA_CLAVE_AQUI

# Frontend
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_NUEVA_CLAVE_AQUI
```

---

### **4. JWT y Secrets** 🔑

#### **Generar claves fuertes**
```bash
# En terminal (Linux/Mac) o Git Bash (Windows)
openssl rand -base64 32

# O en PowerShell
[System.Web.Security.Membership]::GeneratePassword(32, 8)

# O en Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### **Nuevas claves**
```env
# Generar 3 claves diferentes
JWT_SECRET=CLAVE_FUERTE_32_CARACTERES_MINIMO_AQUI
ADMIN_PROMOTION_SECRET=OTRA_CLAVE_DIFERENTE_32_CHARS
SESSION_SECRET=TERCERA_CLAVE_PARA_SESIONES_32_CHARS
```

---

### **5. Cloudinary (Imágenes)** 📸

#### **Crear cuenta de producción**
```bash
1. Ir a: https://cloudinary.com
2. Crear cuenta para producción
3. Dashboard → Settings
```

#### **Configurar transformaciones**
```bash
1. Upload presets para proyectos
2. Transformaciones automáticas:
   - Resize: 1200x800
   - Quality: auto
   - Format: auto
```

#### **Nuevas claves**
```env
CLOUDINARY_CLOUD_NAME=tu_cloud_name_prod
CLOUDINARY_API_KEY=tu_api_key_prod
CLOUDINARY_API_SECRET=tu_api_secret_prod
```

---

### **6. Email (Opcional)** 📧

#### **Configurar servicio profesional**
```bash
# Opción A: Gmail Business
1. Google Workspace
2. Crear email: noreply@crezco.app
3. Generar App Password

# Opción B: SendGrid
1. Crear cuenta en SendGrid
2. Verificar dominio
3. Crear API key

# Opción C: Resend (Recomendado)
1. https://resend.com
2. Verificar dominio
3. Crear API key
```

---

## 📁 Archivos de Configuración

### **Backend (.env)**
```env
# Server
PORT=3001
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://crezco_prod_user:NUEVA_PASS@cluster0.xxxxx.mongodb.net/crezco

# Frontend URL
FRONTEND_URL=https://crezco.app

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_live_NUEVA_CLAVE
CLERK_SECRET_KEY=sk_live_NUEVA_CLAVE

# Stripe
STRIPE_SECRET_KEY=sk_live_NUEVA_CLAVE
STRIPE_WEBHOOK_SECRET=whsec_NUEVA_CLAVE

# Security Secrets
JWT_SECRET=CLAVE_FUERTE_32_CHARS
ADMIN_PROMOTION_SECRET=OTRA_CLAVE_32_CHARS

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Email
EMAIL_HOST=smtp.resend.com
EMAIL_PORT=587
EMAIL_USER=resend
EMAIL_PASS=tu_resend_api_key
```

### **Frontend (.env.local)**
```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_NUEVA_CLAVE

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_NUEVA_CLAVE

# API
NEXT_PUBLIC_API_URL=https://api.crezco.app

# App
NEXT_PUBLIC_APP_URL=https://crezco.app
```

---

## 🛡️ Seguridad Post-Rotación

### **Verificaciones**
```bash
✅ Todas las claves son únicas (no reutilizadas)
✅ Claves tienen mínimo 32 caracteres
✅ No hay claves de desarrollo en producción
✅ Whitelist de IPs configurada
✅ Logs de seguridad activos
```

### **Backup de claves**
```bash
# Guardar en gestor de contraseñas
1. 1Password / Bitwarden / LastPass
2. Categoría: CREZCO Production
3. Compartir solo con equipo necesario
```

### **Rotación programada**
```bash
# Calendario de rotación
MongoDB: Cada 90 días
Clerk: Cada 6 meses
Stripe: Cada año (o si hay brecha)
JWT: Cada 3 meses
API Keys: Cada 6 meses
```

---

## ⚠️ Notas Importantes

### **JAMÁS hacer esto**:
❌ Commitear .env files
❌ Compartir claves por email/slack
❌ Usar claves de desarrollo en producción
❌ Guardar claves en código fuente
❌ Reutilizar claves entre proyectos

### **SIEMPRE hacer esto**:
✅ Usar gestores de contraseñas
✅ Rotar claves regularmente
✅ Monitorear accesos
✅ Usar claves diferentes por entorno
✅ Documentar cambios

---

## 🚨 Plan de Emergencia

### **Si hay brecha de seguridad**:
1. ⚡ Rotar TODAS las claves inmediatamente
2. 📊 Revisar logs de seguridad
3. 🔍 Identificar accesos sospechosos
4. 📧 Notificar a usuarios si es necesario
5. 📋 Documentar incidente
6. 🛡️ Implementar medidas adicionales

---

**Tiempo estimado**: 3-4 horas
**Criticidad**: MÁXIMA 🚨
**Frecuencia**: Cada 90 días