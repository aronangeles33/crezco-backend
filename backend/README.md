# 🚀 CREZCO Backend API

API REST completa para la plataforma de crowdfunding CREZCO, construida con Node.js, Express, MongoDB y Socket.IO.

## 📋 Características

- ✅ **Autenticación con Clerk** - Sistema robusto de auth con tokens JWT
- 💳 **Pagos con Stripe** - Payment Intents y Webhooks
- 📡 **Socket.IO** - Notificaciones en tiempo real
- 🗄️ **MongoDB + Mongoose** - Base de datos NoSQL escalable
- 🔒 **Seguridad** - Helmet, CORS, Rate Limiting
- 📝 **Validación** - Express Validator
- 🎖️ **Gamificación** - Sistema de badges automático

## 🛠️ Instalación

### 1. Instalar dependencias

```bash
cd backend
npm install
```

### 2. Configurar variables de entorno

Copia `.env.example` a `.env` y rellena los valores:

```bash
cp .env.example .env
```

**Variables requeridas:**

```env
# MongoDB (usa MongoDB Atlas o local)
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/crezco

# Clerk (ya tienes estas keys)
CLERK_PUBLISHABLE_KEY=pk_test_c3RpcnJpbmctZ29yaWxsYS00MS5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_tHuKJ9jnHrUzQf2u5YDH1GkxIke0tTLgTs8HERVg8S

# Stripe
STRIPE_SECRET_KEY=sk_test_51PLqkvCH7lYLR0fgiDn9ap0tKclD2Ni25cTrC0QWd7EMnPZ5JxNujWuKIOKaPc3ApFZ65F76dqcO0vc1MOLu6r3l00fjZBiUNW
STRIPE_WEBHOOK_SECRET=whsec_... (obtener de Stripe CLI o Dashboard)

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 3. Configurar MongoDB

**Opción A: MongoDB Local**
```bash
# Instalar MongoDB Community Edition
# https://www.mongodb.com/try/download/community

# Iniciar MongoDB
mongod
```

**Opción B: MongoDB Atlas (Recomendado)**
1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea un cluster gratuito
3. Obtén la connection string
4. Agrégala a tu `.env`

### 4. Configurar Stripe Webhook

Para testing local con Stripe CLI:

```bash
# Instalar Stripe CLI
# https://stripe.com/docs/stripe-cli

# Login
stripe login

# Escuchar webhooks
stripe listen --forward-to localhost:3001/api/webhooks/stripe

# Copiar el webhook secret que te da y pegarlo en .env
```

## 🚀 Uso

### Desarrollo

```bash
npm run dev
```

El servidor correrá en `http://localhost:3001`

### Producción

```bash
npm start
```

## 📚 Endpoints API

### Proyectos

```http
GET    /api/projects              # Listar proyectos (con filtros y paginación)
GET    /api/projects/featured     # Proyectos destacados
GET    /api/projects/:id          # Obtener proyecto por ID
POST   /api/projects              # Crear proyecto (requiere auth)
PUT    /api/projects/:id          # Actualizar proyecto (requiere auth)
DELETE /api/projects/:id          # Eliminar proyecto (requiere auth)
GET    /api/projects/:id/analytics # Analytics del proyecto (requiere auth)
```

**Query params para GET /api/projects:**
- `page` (default: 1)
- `limit` (default: 12)
- `category` (startup, art, podcast, shop, other)
- `search` (texto de búsqueda)
- `sort` (-createdAt, currentAmount, etc.)
- `status` (active, funded, closed)

### Donaciones

```http
POST /api/donations/create-payment-intent  # Crear Payment Intent (requiere auth)
GET  /api/donations/project/:projectId     # Donaciones de un proyecto
GET  /api/donations/user/me                # Mis donaciones (requiere auth)
```

### Usuarios

```http
GET  /api/users/me          # Mi perfil (requiere auth)
PUT  /api/users/me          # Actualizar perfil (requiere auth)
GET  /api/users/me/projects # Mis proyectos (requiere auth)
GET  /api/users/me/badges   # Mis badges (requiere auth)
```

### Comentarios

```http
GET    /api/comments/project/:projectId  # Comentarios de un proyecto
POST   /api/comments                     # Crear comentario (requiere auth)
DELETE /api/comments/:id                 # Eliminar comentario (requiere auth)
```

### Actualizaciones

```http
GET  /api/updates/project/:projectId  # Actualizaciones de un proyecto
POST /api/updates                     # Crear actualización (requiere auth)
```

### Webhooks

```http
POST /api/webhooks/stripe  # Webhook de Stripe (firma verificada)
```

## 🔐 Autenticación

Todas las rutas protegidas requieren un token Bearer de Clerk:

```javascript
headers: {
  'Authorization': 'Bearer <clerk_session_token>'
}
```

El middleware `requireAuth` verifica el token con Clerk y automáticamente crea o recupera el usuario en la base de datos.

## 📡 Socket.IO Events

### Client → Server

```javascript
socket.emit('join_user', userId)
socket.emit('join_project', projectId)
socket.emit('leave_project', projectId)
socket.emit('typing_comment', { projectId, userName })
```

### Server → Client

```javascript
socket.on('new_donation', (data) => {...})
socket.on('badge_awarded', (data) => {...})
socket.on('project_updated', (data) => {...})
socket.on('new_comment', (comment) => {...})
socket.on('new_update', (update) => {...})
socket.on('user_typing', ({ userName }) => {...})
```

## 🎖️ Sistema de Badges

Los badges se otorgan automáticamente al procesar pagos exitosos:

| Badge | Criterio |
|-------|----------|
| 🎉 Primera Donación | Primera donación exitosa |
| 💝 Generoso | Total donado ≥ 50€ |
| ⭐ Super Supporter | Total donado ≥ 100€ |
| 👑 Mecenas | Total donado ≥ 500€ |
| 💎 Filántropo | Total donado ≥ 1000€ |
| 🏗️ Constructor de Comunidad | 5+ proyectos apoyados |

## 🧪 Testing

```bash
# Ejecutar tests
npm test

# Tests con coverage
npm run test:ci
```

## 📝 Modelos de Datos

### User
```javascript
{
  clerkId: String,
  email: String,
  name: String,
  avatar: String,
  role: 'creator' | 'supporter' | 'admin',
  bio: String,
  socialLinks: Object,
  badges: [String],
  totalDonated: Number,
  stripeCustomerId: String
}
```

### Project
```javascript
{
  title: String,
  description: String,
  creator: ObjectId,
  goalAmount: Number,
  currentAmount: Number,
  donors: Number,
  media: [String],
  category: 'startup' | 'art' | 'podcast' | 'shop' | 'other',
  status: 'active' | 'funded' | 'closed',
  rewards: [Object],
  location: String,
  endDate: Date,
  views: Number,
  featured: Boolean
}
```

### Donation
```javascript
{
  amount: Number,
  donor: ObjectId,
  project: ObjectId,
  message: String,
  anonymous: Boolean,
  stripePaymentIntentId: String,
  status: 'pending' | 'succeeded' | 'failed' | 'refunded'
}
```

## 🚀 Despliegue

### Opción 1: Railway

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login y deploy
railway login
railway init
railway up
```

### Opción 2: Render

1. Conecta tu repo en [Render](https://render.com)
2. Configura las variables de entorno
3. Deploy automático en cada push

### Opción 3: Heroku

```bash
heroku create crezco-api
heroku config:set MONGODB_URI=...
heroku config:set CLERK_SECRET_KEY=...
git push heroku main
```

## 🔧 Troubleshooting

### Error: "MongoDB connection failed"
- Verifica que MongoDB esté corriendo
- Revisa que el `MONGODB_URI` sea correcto
- Si usas Atlas, verifica que tu IP esté en la whitelist

### Error: "Clerk authentication failed"
- Verifica las keys de Clerk
- Asegúrate de enviar el token en el header `Authorization: Bearer <token>`
- El token debe ser el `__session` cookie de Clerk

### Error: "Stripe webhook signature verification failed"
- Usa Stripe CLI para desarrollo local: `stripe listen --forward-to localhost:3001/api/webhooks/stripe`
- Copia el `whsec_...` a `STRIPE_WEBHOOK_SECRET`
- En producción, configura el webhook en Stripe Dashboard

## 📄 Licencia

MIT

---

**¿Dudas?** Abre un issue o contacta al equipo de CREZCO 🚀
