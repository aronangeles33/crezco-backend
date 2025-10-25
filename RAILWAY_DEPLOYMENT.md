# 🚂 RAILWAY DEPLOYMENT - Guía Rápida para Backend

## 🎯 PROBLEMA RESUELTO
❌ Error anterior: `bun.lockb` causaba conflicto
✅ Solución: Eliminado `bun.lockb`, ahora usa npm

---

## 🚀 CONFIGURAR RAILWAY (5 minutos)

### **Paso 1: Crear Proyecto en Railway**

```
1. Ir a: https://railway.app
2. Click "Login" → Elegir "Login with GitHub"
3. Autorizar Railway
4. Click "New Project"
5. Click "Deploy from GitHub repo"
6. Buscar: crezco-platform
7. Click en "aronangeles33/crezco-platform"
```

### **Paso 2: Configurar el Servicio**

Railway detectará automáticamente que es un proyecto Node.js con workspace.

```
8. Railway mostrará "Configure Service"
9. En "Root Directory" escribir: backend
10. En "Start Command" escribir: npm start
11. Click "Deploy"
```

### **Paso 3: Railway hace Build Automático**

```
✅ Instala dependencias con npm install
✅ Ejecuta npm start en carpeta backend
✅ Asigna una URL automática
✅ En 2-3 minutos estará live
```

---

## ⚙️ VARIABLES DE ENTORNO EN RAILWAY

Una vez que el deploy inicial termine:

```
1. En Railway Dashboard → Tu proyecto
2. Click en "Variables"
3. Click "New Variable"
4. Agregar estas variables:
```

### **Variables Requeridas:**

```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/crezco?retryWrites=true&w=majority
JWT_SECRET=tu_jwt_secret_aqui
CLERK_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
FRONTEND_URL=https://tudominio.com
PORT=3001
NODE_ENV=production
```

### **Cómo obtener cada variable:**

#### **MongoDB URI:**
```
1. Ir a: https://www.mongodb.com/cloud/atlas
2. Create FREE M0 Cluster
3. Database Access → Add User
4. Network Access → Allow 0.0.0.0/0
5. Connect → Get connection string
```

#### **JWT Secret:**
```powershell
# Generar en PowerShell:
[Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes((1..32 | ForEach-Object { [char](Get-Random -Minimum 65 -Maximum 122) }) -join ''))
```

#### **Clerk Secrets:**
```
1. Ir a: https://dashboard.clerk.com
2. Create Application → Crezco Production
3. Configure → Webhooks
4. Add Endpoint: https://tu-backend.railway.app/webhooks/clerk
5. Copy Signing Secret
```

#### **Stripe Secrets:**
```
1. Ir a: https://dashboard.stripe.com
2. Developers → API Keys → View live mode
3. Copy Secret Key (sk_live_...)
4. Webhooks → Add endpoint
5. URL: https://tu-backend.railway.app/api/webhooks/stripe
6. Events: payment_intent.succeeded, payment_intent.failed
7. Copy Signing Secret
```

---

## 🔧 CONFIGURACIÓN ADICIONAL EN RAILWAY

### **Health Check (Opcional pero recomendado):**

```
1. Settings → Health Check
2. Path: /health
3. Timeout: 10 seconds
4. Interval: 30 seconds
```

### **Auto-Deploy:**

```
✅ Ya está activado por defecto
Cada git push → Railway redeploya automáticamente
```

### **Custom Domain:**

```
1. Settings → Domains
2. Custom Domain
3. Escribir: api.tudominio.com
4. Railway te da instrucciones DNS
5. Agregar CNAME en Namecheap:
   Type: CNAME
   Host: api
   Value: tu-proyecto.up.railway.app
```

---

## 📊 MONITOREO EN RAILWAY

### **Ver Logs en Tiempo Real:**

```
1. Railway Dashboard → Tu proyecto
2. Click en "Deployments"
3. Click en el deployment activo
4. Ver logs en tiempo real
5. Buscar: "Server running on port 3001" ✅
```

### **Métricas:**

```
1. Observability tab
2. CPU usage
3. Memory usage
4. Request count
5. Response time
```

---

## 🚨 TROUBLESHOOTING

### **Error: "Build Failed"**

```
Causa: Dependencias faltantes o error en código

Solución:
1. Ver logs completos en Railway
2. Verificar package.json en backend/
3. Asegurar que backend/src/server.js existe
4. Verificar que todas las dependencias estén en package.json
```

### **Error: "Application failed to respond"**

```
Causa: Variables de entorno faltantes

Solución:
1. Railway → Variables
2. Verificar que TODAS las variables estén configuradas
3. Especialmente MONGODB_URI
4. Redeploy después de agregar variables
```

### **Error: "Cannot connect to MongoDB"**

```
Causa: IP no whitelisted en MongoDB Atlas

Solución:
1. MongoDB Atlas → Network Access
2. Add IP Address
3. Allow Access from Anywhere (0.0.0.0/0)
4. Esperar 1-2 minutos
5. Redeploy en Railway
```

### **Error: "Port already in use"**

```
Causa: Railway asigna puerto dinámico

Solución:
backend/src/server.js debe tener:
const PORT = process.env.PORT || 3001;

✅ Ya lo tienes configurado correctamente
```

---

## ✅ VERIFICAR QUE FUNCIONA

### **Método 1: Browser**

```
Abrir: https://tu-proyecto.up.railway.app/health

Debe mostrar:
{"status":"ok","timestamp":"..."}
```

### **Método 2: PowerShell**

```powershell
curl https://tu-proyecto.up.railway.app/health

# Debe responder:
# StatusCode        : 200
# Content          : {"status":"ok"}
```

### **Método 3: Railway Dashboard**

```
1. Deployments tab
2. Ver status: "Active" ✅
3. Ver logs: "Server running on port 3001" ✅
```

---

## 🎯 CHECKLIST COMPLETO

### **Setup Inicial:**
```
□ Cuenta Railway creada
□ Proyecto conectado a GitHub
□ Root Directory: backend
□ Start Command: npm start
□ Deploy ejecutado
```

### **Variables de Entorno:**
```
□ MONGODB_URI configurado
□ JWT_SECRET generado y configurado
□ CLERK_WEBHOOK_SECRET configurado
□ STRIPE_SECRET_KEY configurado
□ STRIPE_WEBHOOK_SECRET configurado
□ FRONTEND_URL configurado
□ PORT = 3001
□ NODE_ENV = production
```

### **Verificación:**
```
□ Deploy exitoso (status "Active")
□ Logs muestran "Server running"
□ /health endpoint responde 200
□ No hay errores en logs
```

### **Opcional:**
```
□ Custom domain configurado
□ Health check activado
□ Monitoreo configurado
```

---

## 💰 PLAN GRATUITO DE RAILWAY

```
✅ $5 de crédito gratis cada mes
✅ Suficiente para:
   - Backend corriendo 24/7
   - ~550 horas de ejecución
   - Hasta que superes el crédito

⚠️ Límites:
- Si superas $5/mes te cobrarán
- Puedes configurar límites de gasto
```

### **Configurar Límite de Gasto:**

```
1. Settings → Usage
2. Set spending limit: $5
3. Railway pausará el servicio si llegas al límite
4. Te enviará notificación antes
```

---

## 🔄 WORKFLOW DE DESARROLLO

```
1. Hacer cambios en código local
2. git add .
3. git commit -m "Descripción"
4. git push origin main
5. Railway auto-deploya en 2-3 min ✅
```

---

## 📞 SOPORTE

### **Si algo falla:**

```
1. Railway Discord: https://discord.gg/railway
2. Railway Docs: https://docs.railway.app
3. Community: Muy activa y responde rápido
```

---

## 🎉 RESULTADO FINAL

```
✅ Backend corriendo en Railway
✅ URL pública asignada
✅ SSL automático incluido
✅ Auto-deploy configurado
✅ Monitoreo incluido
✅ Logs en tiempo real
✅ $0/mes (dentro del crédito gratuito)
```

**Tu backend estará en:** `https://tu-proyecto.up.railway.app`

¡Listo para recibir requests del frontend! 🚀