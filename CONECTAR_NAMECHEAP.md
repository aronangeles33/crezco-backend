# 🎯 CONECTAR NAMECHEAP - GUÍA VISUAL RÁPIDA

## 📍 PASO 1: DEPLOY A VERCEL (10 minutos)

### En tu PowerShell:
```powershell
# Ir a la carpeta del frontend
cd c:\Users\elmou\Desktop\dinero\impulso-crezco-main\crezco-app

# Instalar Vercel CLI
npm install -g vercel

# Login (se abrirá el navegador)
vercel login

# Deploy a producción
vercel --prod
```

### Resultado:
```
✔ Production: https://crezco-xxxxx.vercel.app
```

**Copia esa URL**, la necesitarás.

---

## 📍 PASO 2: CONFIGURAR DNS EN NAMECHEAP (5 minutos)

### A. Ir a Namecheap:
```
1. Abrir: https://namecheap.com
2. Login con tu cuenta
3. Click en "Domain List"
4. Click en "MANAGE" al lado de tu dominio
```

### B. Configurar DNS:
```
5. Click en la pestaña "Advanced DNS"
6. En "Host Records", agregar estos 2 registros:
```

#### Registro 1:
```
Type: A Record
Host: @
Value: 76.76.21.21
TTL: Automatic
```

#### Registro 2:
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com.
TTL: Automatic
```

### C. Guardar:
```
7. Click en el ícono de "✓" (check) para guardar cada registro
8. ✅ Esperar 5-10 minutos para propagación
```

---

## 📍 PASO 3: AGREGAR DOMINIO EN VERCEL (5 minutos)

### A. Dashboard de Vercel:
```
1. Ir a: https://vercel.com/dashboard
2. Click en tu proyecto "crezco-xxxxx"
3. Click en "Settings" (arriba)
4. Click en "Domains" (menú lateral)
```

### B. Agregar tu dominio:
```
5. En "Add Domain", escribe: tudominio.com
6. Click "Add"
7. Vercel verificará el DNS ✅

8. Click en "Add Another" 
9. Escribe: www.tudominio.com
10. Click "Add"
```

### C. Resultado:
```
✅ tudominio.com - Valid Configuration
✅ www.tudominio.com - Valid Configuration
🔒 SSL: Active (automático en 5-10 min)
```

---

## 📍 PASO 4: DEPLOY BACKEND A RAILWAY (10 minutos)

### A. Crear cuenta en Railway:
```
1. Ir a: https://railway.app
2. Click "Login with GitHub"
3. Autorizar Railway
```

### B. Deploy:
```
4. Click "New Project"
5. Seleccionar "Deploy from GitHub repo"
6. Buscar y seleccionar: impulso-crezco-main
7. Click en el proyecto
```

### C. Configurar:
```
8. Settings → Service Settings:
   - Root Directory: backend
   - Start Command: npm start
   
9. Variables → Add Variables:
   (ver lista abajo)

10. Deploy automático ✅
```

### D. Obtener URL:
```
11. Settings → Domains
12. Railway genera: tu-proyecto.up.railway.app
13. Copiar esa URL
```

---

## 📍 PASO 5: SUBDOMAIN PARA API (5 minutos)

### A. Volver a Namecheap Advanced DNS:
```
1. Agregar nuevo registro:

Type: CNAME Record
Host: api
Value: tu-proyecto.up.railway.app.
TTL: Automatic
```

### B. Railway Custom Domain:
```
2. En Railway → Settings → Domains
3. Click "Custom Domain"
4. Escribe: api.tudominio.com
5. Click "Add Domain"
6. ✅ Railway verificará y agregará SSL automático
```

---

## 📍 PASO 6: VARIABLES DE ENTORNO

### A. En Vercel (Frontend):
```
Settings → Environment Variables → Add New:
```

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_API_URL` | `https://api.tudominio.com` |
| `NEXT_PUBLIC_DOMAIN` | `https://tudominio.com` |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `(copiar de Clerk)` |
| `CLERK_SECRET_KEY` | `(copiar de Clerk)` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `(copiar de Stripe)` |

### B. En Railway (Backend):
```
Variables → Add Variables:
```

| Name | Value |
|------|-------|
| `MONGODB_URI` | `(copiar de MongoDB Atlas)` |
| `JWT_SECRET` | `(generar: openssl rand -base64 32)` |
| `FRONTEND_URL` | `https://tudominio.com` |
| `PORT` | `3001` |
| `NODE_ENV` | `production` |
| `CLERK_WEBHOOK_SECRET` | `(copiar de Clerk)` |
| `STRIPE_SECRET_KEY` | `(copiar de Stripe)` |
| `STRIPE_WEBHOOK_SECRET` | `(copiar de Stripe)` |

---

## 📍 PASO 7: MONGODB ATLAS GRATIS (10 minutos)

### A. Crear cuenta:
```
1. Ir a: https://www.mongodb.com/cloud/atlas/register
2. Registrarse (gratis)
3. Verificar email
```

### B. Crear cluster:
```
4. Click "Build a Database"
5. Seleccionar "FREE" (M0)
6. Cloud Provider: AWS
7. Region: eu-west-1 (o la más cercana)
8. Cluster Name: crezco-prod
9. Click "Create"
```

### C. Crear usuario:
```
10. "Database Access" → "Add New Database User"
11. Username: crezco_admin
12. Password: [Genera uno seguro]
13. Database User Privileges: Atlas admin
14. Click "Add User"
```

### D. Whitelist IPs:
```
15. "Network Access" → "Add IP Address"
16. Click "Allow Access from Anywhere"
17. IP Address: 0.0.0.0/0
18. Click "Confirm"
```

### E. Connection String:
```
19. "Database" → "Connect"
20. "Connect your application"
21. Driver: Node.js, Version: 4.1 or later
22. Copiar el connection string:

mongodb+srv://crezco_admin:<password>@crezco-prod.xxxxx.mongodb.net/?retryWrites=true&w=majority

23. Reemplazar <password> con tu contraseña
24. Agregar el nombre de la BD después de .net/:

mongodb+srv://crezco_admin:TU_PASSWORD@crezco-prod.xxxxx.mongodb.net/crezco?retryWrites=true&w=majority
```

---

## 📍 PASO 8: CLERK GRATIS (10 minutos)

### A. Crear cuenta:
```
1. Ir a: https://dashboard.clerk.com/sign-up
2. Registrarse
3. Verificar email
```

### B. Crear aplicación:
```
4. "Create Application"
5. Application name: Crezco Production
6. Sign-in options: 
   ✅ Email
   ✅ Google
   ✅ GitHub
7. Click "Create application"
```

### C. Configurar dominio:
```
8. Configure → Paths:
   - Sign in URL: /sign-in
   - Sign up URL: /sign-up
   - After sign in: /dashboard
   - After sign up: /dashboard

9. Configure → Domains:
   - Add production domain: tudominio.com
```

### D. API Keys:
```
10. API Keys (menú lateral)
11. Copiar:
    - Publishable key: pk_live_xxxxx
    - Secret key: sk_live_xxxxx
12. Webhooks → Add Endpoint:
    - URL: https://api.tudominio.com/webhooks/clerk
    - Copy Signing Secret: whsec_xxxxx
```

---

## 📍 PASO 9: STRIPE LIVE (15 minutos)

### A. Crear cuenta:
```
1. Ir a: https://dashboard.stripe.com/register
2. Registrarse
3. Activate your account (llenar formulario completo)
```

### B. Activar cuenta:
```
4. Business details
5. Bank details (para recibir pagos)
6. Verify identity
```

### C. API Keys:
```
7. Developers → API keys
8. Activar "View live mode"
9. Copiar:
   - Publishable key: pk_live_xxxxx
   - Secret key: sk_live_xxxxx (click "Reveal")
```

### D. Webhooks:
```
10. Developers → Webhooks → Add endpoint
11. Endpoint URL: https://api.tudominio.com/api/webhooks/stripe
12. Events to send:
    ✅ payment_intent.succeeded
    ✅ payment_intent.failed
    ✅ payment_intent.payment_failed
13. Click "Add endpoint"
14. Copiar Signing secret: whsec_xxxxx
```

---

## 📍 PASO 10: GOOGLE ANALYTICS (10 minutos)

### A. Crear cuenta:
```
1. Ir a: https://analytics.google.com
2. "Start measuring"
3. Account name: Crezco
4. Property name: Crezco Web
5. Reporting time zone: España
6. Currency: EUR
```

### B. Data Stream:
```
7. Platform: Web
8. Website URL: https://tudominio.com
9. Stream name: Crezco Production
10. Copiar: Measurement ID (G-XXXXXXXXXX)
```

### C. Agregar a Vercel:
```
11. Vercel → Settings → Environment Variables
12. Add:
    NEXT_PUBLIC_GA_ID = G-XXXXXXXXXX
```

---

## 📍 PASO 11: GOOGLE SEARCH CONSOLE (5 minutos)

### A. Verificar dominio:
```
1. Ir a: https://search.google.com/search-console
2. Click "Add property"
3. "URL prefix": https://tudominio.com
4. Método de verificación: DNS record
5. Copiar el TXT record
```

### B. Agregar en Namecheap:
```
6. Namecheap → Advanced DNS
7. Add New Record:
   Type: TXT Record
   Host: @
   Value: [el código de Google]
   TTL: Automatic
8. Volver a Search Console → Click "Verify"
```

### C. Submit Sitemap:
```
9. Sitemaps → Add new sitemap
10. URL: https://tudominio.com/sitemap.xml
11. Click "Submit"
```

---

## 📍 PASO 12: UPTIME ROBOT (5 minutos)

### A. Crear cuenta:
```
1. Ir a: https://uptimerobot.com/signUp
2. Registrarse (gratis)
3. Verify email
```

### B. Add Monitors:
```
4. Dashboard → Add New Monitor

Monitor 1:
- Monitor Type: HTTPS
- Friendly Name: Crezco Frontend
- URL: https://tudominio.com
- Monitoring Interval: 5 minutes

Monitor 2:
- Monitor Type: HTTPS
- Friendly Name: Crezco Backend
- URL: https://api.tudominio.com/health
- Monitoring Interval: 5 minutes
```

### C. Alertas:
```
5. Alert Contacts → Add Alert Contact
6. Email: tu-email@gmail.com
7. ✅ Recibirás email si el sitio cae
```

---

## ✅ VERIFICACIÓN FINAL

### Prueba todo:
```
1. Abrir: https://tudominio.com
   ✅ Debe cargar tu sitio

2. Abrir: https://api.tudominio.com/health
   ✅ Debe mostrar: {"status":"ok"}

3. Intentar registro de usuario
   ✅ Debe funcionar

4. Crear un proyecto de prueba
   ✅ Debe guardarse

5. Hacer una donación de €1
   ✅ Debe procesarse con Stripe
```

---

## 🎉 ¡LISTO!

Tu sitio está **100% LIVE** y **100% GRATIS**:

```
✅ Frontend: https://tudominio.com
✅ Backend: https://api.tudominio.com
✅ SSL: Activo
✅ Monitoring: 24/7
✅ Analytics: Funcionando
✅ SEO: Optimizado
```

### Costo mensual: **€0** 🎊

**Ahora solo falta marketing y crecer! 🚀**