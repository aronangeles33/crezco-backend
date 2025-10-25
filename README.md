# 🚀 CREZCO - Plataforma de Crowdfunding

**CREZCO** es una plataforma de crowdfunding moderna diseñada para jóvenes emprendedores y creadores en España. Construida con las últimas tecnologías web para ofrecer una experiencia rápida, segura y atractiva.

## ✨ Características Principales

- 💰 **Donaciones desde 5€** - Accesible para todos
- 🔐 **Autenticación segura** - Clerk con login social (Google, Instagram, TikTok)
- 💳 **Pagos seguros** - Integración completa con Stripe
- 📡 **Tiempo real** - Socket.IO para notificaciones instantáneas
- 🎖️ **Gamificación** - Sistema de badges y logros
- 🌙 **Dark Mode** - Tema claro y oscuro
- 📱 **PWA** - Instalable en móviles
- ⚡ **Rendimiento** - Next.js 14 con SSR y optimizaciones
- 🎨 **UI Moderna** - Tailwind CSS + Shadcn/UI

## 🛠️ Stack Tecnológico

### Frontend (crezco-app/)
- Next.js 14 + TypeScript + Tailwind CSS + Shadcn/UI
- Zustand + React Query + Clerk + Stripe + Socket.IO

### Backend (backend/)
- Node.js + Express + MongoDB + Socket.IO
- Clerk SDK + Stripe SDK

## 📦 Instalación Rápida

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edita .env con MongoDB URI
npm run dev  # Puerto 3001
```

### 2. Stripe Webhooks (Terminal separada)

```bash
stripe listen --forward-to localhost:3001/api/webhooks/stripe
# Copia el webhook secret a backend/.env
```

### 3. Frontend

```bash
cd crezco-app
npm install
cp .env.example .env.local
npm run dev  # Puerto 3000
```

Abre http://localhost:3000 🎉

## 🔐 Credenciales (Ya configuradas)

### Clerk
- ✅ Keys incluidas en `.env.example`

### Stripe (Test Mode)
- ✅ Keys incluidas en `.env.example`
- 💳 Tarjeta de prueba: `4242 4242 4242 4242`

### MongoDB
- 📝 Configura tu URI en `backend/.env`
- Local: `mongodb://localhost:27017/crezco`
- Cloud: Usa [MongoDB Atlas](https://mongodb.com/cloud/atlas) (gratis)

## 📚 Documentación Detallada

- **Backend API**: Ver [`backend/README.md`](backend/README.md)
- **Frontend**: Ver [`crezco-app/README.md`](crezco-app/README.md)

## 🚀 Despliegue

### Frontend → Vercel
```bash
cd crezco-app
vercel
```

### Backend → Railway/Render/Heroku
```bash
cd backend
railway up  # o render/heroku deploy
```

## 📖 Uso

1. **Registrarse**: `/signup` con Clerk
2. **Crear Proyecto**: `/create` (se requiere auth)
3. **Explorar**: `/projects` con filtros y búsqueda
4. **Donar**: Click en proyecto → Botón "Donar" → Stripe checkout
5. **Dashboard**: `/dashboard` ver tus proyectos y donaciones

## 🎖️ Sistema de Badges

| Badge | Criterio |
|-------|----------|
| 🎉 Primera Donación | Primera donación exitosa |
| 💝 Generoso | ≥ 50€ donados |
| ⭐ Super Supporter | ≥ 100€ donados |
| 👑 Mecenas | ≥ 500€ donados |
| 💎 Filántropo | ≥ 1000€ donados |
| 🏗️ Constructor | 5+ proyectos apoyados |

## 🔧 Troubleshooting

### MongoDB Error
```bash
# Verifica que MongoDB está corriendo
mongod

# O usa MongoDB Atlas (cloud)
```

### Stripe Webhook Error
```bash
# Asegúrate de correr Stripe CLI
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

### Port Already in Use
```powershell
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

## 📞 Soporte

¿Dudas? Abre un issue o contacta: soporte@crezco.es

---

**¡Impulsa proyectos increíbles con CREZCO! 🚀**
