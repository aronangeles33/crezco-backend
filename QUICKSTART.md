# ⚡ Guía de Inicio Rápido - CREZCO

## 🚀 En 5 Minutos

### Pre-requisitos
- ✅ Node.js 18+ instalado
- ✅ MongoDB instalado O cuenta en MongoDB Atlas
- ✅ Terminal/PowerShell

---

## 📋 Paso a Paso

### 1️⃣ Backend (Terminal 1)

```powershell
# Navega al backend
cd backend

# Instala dependencias
npm install

# Crea archivo .env
Copy-Item .env.example .env

# IMPORTANTE: Edita .env y añade tu MongoDB URI
# Si usas MongoDB local, ya está configurado: mongodb://localhost:27017/crezco
# Si usas MongoDB Atlas, cambia MONGODB_URI por tu connection string

# Inicia el servidor
npm run dev
```

✅ **Backend corriendo en http://localhost:3001**

---

### 2️⃣ Stripe Webhooks (Terminal 2)

```powershell
# Instala Stripe CLI si no lo tienes
# https://stripe.com/docs/stripe-cli

# Login a Stripe
stripe login

# Escucha webhooks
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

📝 **IMPORTANTE**: Copia el `whsec_...` que aparece y pégalo en `backend/.env` como:
```
STRIPE_WEBHOOK_SECRET=whsec_tu_secret_aqui
```

✅ **Webhooks activos**

---

### 3️⃣ Frontend (Terminal 3)

```powershell
# Navega al frontend
cd crezco-app

# Instala dependencias
npm install

# Crea archivo .env.local
Copy-Item .env.example .env.local

# Las keys de Clerk y Stripe ya están configuradas en .env.example
# No necesitas cambiar nada

# Inicia el desarrollo
npm run dev
```

✅ **Frontend corriendo en http://localhost:3000**

---

## 🎉 ¡Listo!

Abre tu navegador en **http://localhost:3000**

### Prueba el flujo completo:

1. **Registrarse** → Haz click en "Registrarse" (usa Google o email)
2. **Crear Proyecto** → Ve a `/create` y publica un proyecto
3. **Hacer Donación** → Elige un proyecto y haz click en "Donar"
4. **Stripe Test Card** → Usa `4242 4242 4242 4242` (fecha futura, cualquier CVC)
5. **Ver Dashboard** → Ve a `/dashboard` para ver tus proyectos y donaciones

---

## 🐛 Problemas Comunes

### ❌ "MongoDB connection failed"

**Solución 1 - MongoDB Local**:
```powershell
# Inicia MongoDB
mongod
```

**Solución 2 - MongoDB Atlas** (Recomendado):
1. Ve a https://www.mongodb.com/cloud/atlas
2. Crea cuenta gratis
3. Crea cluster (demora 2-3 min)
4. Haz click en "Connect" → "Connect your application"
5. Copia el connection string
6. Pégalo en `backend/.env` como `MONGODB_URI=mongodb+srv://...`

---

### ❌ "Port 3000 already in use"

```powershell
# Encuentra el proceso
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess

# Mátalo
Stop-Process -Id <PID> -Force
```

---

### ❌ "Stripe webhook signature failed"

1. Verifica que Stripe CLI esté corriendo: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
2. Copia el `whsec_...` correcto
3. Pégalo en `backend/.env`
4. Reinicia el backend

---

### ❌ "Module not found" errors

```powershell
# Backend
cd backend
Remove-Item node_modules -Recurse -Force
npm install

# Frontend
cd crezco-app
Remove-Item node_modules -Recurse -Force
npm install
```

---

## 📚 Siguientes Pasos

- Lee el README principal: [`README.md`](README.md)
- Documentación API Backend: [`backend/README.md`](backend/README.md)
- Documentación Frontend: [`crezco-app/README.md`](crezco-app/README.md)

---

## 🔑 Cheat Sheet

### Comandos Útiles

```powershell
# Backend
cd backend
npm run dev          # Desarrollo
npm test             # Tests
npm start            # Producción

# Frontend
cd crezco-app
npm run dev          # Desarrollo
npm run build        # Build producción
npm run test         # Unit tests
npm run test:e2e     # E2E tests

# Stripe
stripe login                          # Login
stripe listen --forward-to localhost:3001/api/webhooks/stripe
stripe trigger payment_intent.succeeded  # Simular pago
```

---

## 💳 Tarjetas de Prueba Stripe

| Número | Resultado |
|--------|-----------|
| `4242 4242 4242 4242` | ✅ Éxito |
| `4000 0000 0000 9995` | ❌ Fondos insuficientes |
| `4000 0000 0000 0002` | ❌ Tarjeta declinada |
| `4000 0027 6000 3184` | ✅ Requiere 3D Secure |

Cualquier:
- Fecha futura (ej: 12/25)
- CVC de 3 dígitos (ej: 123)
- Código postal (ej: 12345)

---

## 🆘 Ayuda

¿Sigues atascado?

1. Revisa los logs en las 3 terminales
2. Verifica que todos los servicios estén corriendo
3. Abre un issue en GitHub
4. Contacta: soporte@crezco.es

---

**¡Disfruta construyendo con CREZCO! 🚀**
