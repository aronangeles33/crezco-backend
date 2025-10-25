# 📖 LEER PRIMERO - Sistema CREZCO

**Fecha**: 15 de octubre de 2025  
**Estado**: ✅ SISTEMA FUNCIONANDO

---

## 🎯 Inicio Rápido (3 minutos)

### 1. Abre 2 Terminales

**Terminal 1 - Backend:**
```powershell
cd backend
node src/server.js
```

**Terminal 2 - Frontend:**
```powershell
cd crezco-app
npm run dev
```

### 2. Abre el Navegador
```
http://localhost:3000
```

### 3. Ya estás logueado como:
- **Usuario**: aron angeles
- **Email**: aronangeles33@gmail.com

---

## 📚 Documentación Útil

| Archivo | Descripción |
|---------|-------------|
| **[GUIA_RAPIDA.md](./GUIA_RAPIDA.md)** | 🚀 Guía de inicio rápido y troubleshooting |
| **[README.md](./README.md)** | 📘 Documentación completa del proyecto |
| **[BOTONES_Y_FUNCIONALIDADES.md](./BOTONES_Y_FUNCIONALIDADES.md)** | ✅ Estado de todas las funcionalidades |
| **[DEBUG_AUTH.md](./DEBUG_AUTH.md)** | 🔍 Debug de autenticación Clerk |
| **[CONFIGURAR_GOOGLE_LOGIN.md](./CONFIGURAR_GOOGLE_LOGIN.md)** | 🔐 Configurar OAuth con Google |

---

## ⚡ Puertos del Sistema

| Servicio | Puerto | URL | Estado |
|----------|--------|-----|--------|
| **Frontend Next.js** | 3000 | http://localhost:3000 | ✅ USAR ESTE |
| **Backend Express** | 3001 | http://localhost:3001 | ✅ USAR ESTE |
| ~~Frontend React Antiguo~~ | ~~8080~~ | - | ❌ ELIMINADO |

---

## 🧪 Probar el Sistema

### ✅ Funcionalidades Principales

1. **Login/Signup** ✅
   - Ve a http://localhost:3000
   - Ya estás logueado como "aron angeles"

2. **Ver Proyectos** ✅
   - Navega a "Proyectos"
   - Verás proyectos de crowdfunding

3. **Crear Proyecto** ✅
   - Click "Crear Proyecto"
   - Completa el formulario
   - Submit

4. **Donaciones con Stripe** ✅
   - Abre cualquier proyecto
   - Click "Donar"
   - Monto: 5€ o más
   - Tarjeta test: `4242 4242 4242 4242`
   - Fecha: `12/25` | CVC: `123`

5. **Comentarios en Tiempo Real** ✅
   - Abre un proyecto
   - Añade un comentario
   - Se actualiza instantáneamente

---

## 🛠️ Stack Tecnológico

### Backend (Puerto 3001)
- Express 4.18.2
- MongoDB Atlas
- Clerk SDK (Auth)
- Stripe SDK (Pagos)
- Socket.IO (Tiempo real)

### Frontend (Puerto 3000)
- Next.js 14.2.33
- @clerk/nextjs (Auth UI)
- @stripe/react-stripe-js (Pagos UI)
- Tailwind CSS + shadcn/ui
- TanStack Query + Zustand

---

## 🔧 Comandos Útiles

### Verificar Estado
```powershell
# Ver si backend está corriendo
Test-NetConnection -ComputerName localhost -Port 3001 -InformationLevel Quiet

# Ver si frontend está corriendo
Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet
```

### Reiniciar Servicios
```powershell
# Matar todos los procesos Node
Stop-Process -Name node -Force -ErrorAction SilentlyContinue

# Reiniciar backend
cd backend
node src/server.js

# Reiniciar frontend (nueva terminal)
cd crezco-app
npm run dev
```

---

## 🐛 Problemas Comunes

### ❌ Error: "Puerto 3000/3001 en uso"
```powershell
# Encuentra y mata el proceso
Get-NetTCPConnection -LocalPort 3001 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
```

### ❌ Error: "401 Unauthorized"
1. Recarga la página (F5)
2. El token se auto-renueva cada 50 minutos
3. Cierra sesión y vuelve a entrar si persiste

### ❌ Error: "Stripe API key not provided"
1. Verifica `backend/.env` tenga `STRIPE_SECRET_KEY=sk_test_...`
2. **Reinicia el backend** (importante)
3. Verifica en terminal: `🔑 STRIPE_SECRET_KEY cargada: SÍ`

### ❌ Backend no conecta a MongoDB
1. Verifica tu conexión a internet
2. Verifica `MONGODB_URI` en `backend/.env`
3. MongoDB Atlas tiene límite de IPs, añade tu IP en Atlas

---

## 📁 Estructura del Proyecto

```
impulso-crezco-main/
│
├── backend/              # API Express (Puerto 3001)
│   ├── src/
│   │   ├── server.js    # ← Ejecuta este archivo
│   │   ├── controllers/ # Lógica de negocio
│   │   ├── models/      # Modelos MongoDB
│   │   ├── routes/      # Rutas API
│   │   └── socket/      # WebSocket
│   └── .env             # Variables de entorno
│
├── crezco-app/          # Frontend Next.js (Puerto 3000)
│   ├── src/
│   │   ├── app/         # Páginas Next.js
│   │   ├── components/  # Componentes React
│   │   └── lib/         # Utilidades
│   └── .env.local       # Variables de entorno
│
└── *.md                 # Documentación
```

---

## 🔑 Variables de Entorno

### Backend (`backend/.env`)
```env
PORT=3001
MONGODB_URI=mongodb+srv://aronangeles33_db_user:...@cluster0...
CLERK_SECRET_KEY=sk_test_tHuKJ9jnHrUzQf2u5YDH1GkxIke0tTLgTs8HERVg8S
STRIPE_SECRET_KEY=sk_test_51PLqkvCH7lYLR0fgiDn9ap0tKclD2Ni25cTrC0QWd7EMnPZ5JxNujWuKIOKaPc3ApFZ65F76dqcO0vc1MOLu6r3l00fjZBiUNW
```

### Frontend (`crezco-app/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJpbmctZ29yaWxsYS00MS5jbGVyay5hY2NvdW50cy5kZXYk
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## ✅ Checklist de Sistema Funcionando

- [ ] Backend iniciado → ves "🚀 Servidor corriendo en puerto 3001"
- [ ] MongoDB conectado → ves "✅ MongoDB conectado"
- [ ] Stripe cargado → ves "🔑 STRIPE_SECRET_KEY cargada: SÍ"
- [ ] Frontend iniciado → ves "✓ Ready in 5s"
- [ ] Puedes abrir http://localhost:3000
- [ ] Ves tu nombre "aron angeles" en el header
- [ ] Puedes ver proyectos
- [ ] Puedes crear un proyecto
- [ ] Puedes donar con tarjeta test
- [ ] Puedes añadir comentarios

---

## 🎓 Próximos Pasos

### Funcionalidades Completadas ✅
- ✅ Autenticación con Clerk
- ✅ CRUD de proyectos
- ✅ Donaciones con Stripe
- ✅ Comentarios en tiempo real
- ✅ Dashboard de usuario
- ✅ Sistema de actualizaciones

### Pendientes ⏳
- [ ] Páginas: /contact, /blog, /faq, /help
- [ ] Notificaciones por email
- [ ] Panel de administración
- [ ] Analytics avanzados
- [ ] Deploy a producción

---

## 🆘 Soporte

Si algo no funciona:

1. **Verifica los logs** de backend y frontend en las terminales
2. **Lee** [GUIA_RAPIDA.md](./GUIA_RAPIDA.md) para troubleshooting
3. **Revisa** [DEBUG_AUTH.md](./DEBUG_AUTH.md) si hay errores 401
4. **Reinicia** ambos servidores si cambiaste .env

---

## 📊 Estado Actual del Proyecto

**Versión**: 1.0.0  
**Fecha**: 15 de octubre de 2025  
**Estado**: ✅ PRODUCCIÓN LOCAL  
**Usuario**: aron angeles (aronangeles33@gmail.com)  
**Base de datos**: MongoDB Atlas (Cluster0)  
**Pagos**: Stripe Test Mode  

---

**¡El sistema está listo para usar!** 🚀

Simplemente ejecuta los dos comandos de la sección "Inicio Rápido" y empieza a probar.
