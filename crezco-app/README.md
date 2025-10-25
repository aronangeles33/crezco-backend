# CREZCO - Plataforma de Crowdfunding

![CREZCO Logo](./public/logo.png)

**CREZCO** es una plataforma de crowdfunding diseñada para jóvenes emprendedores y creadores españoles. Permite a los usuarios publicar proyectos, recibir donaciones desde 5€, seguir el progreso, construir comunidad e incluye características avanzadas como notificaciones en tiempo real, gamificación y soporte PWA.

## 🚀 Características Principales

- ✅ **Crowdfunding Flexible**: Donaciones desde 5€
- 🎨 **UI/UX Moderna**: Diseño juvenil y atractivo para Gen Z y Millennials
- 🌙 **Modo Oscuro**: Soporte completo con Tailwind CSS
- 🔔 **Notificaciones en Tiempo Real**: Socket.io para actualizaciones instantáneas
- 🏆 **Gamificación**: Sistema de insignias y tabla de clasificación
- 📱 **PWA**: Aplicación web progresiva instalable
- 🌐 **Multiidioma**: Español (por defecto) e Inglés
- ♿ **Accesibilidad**: Cumple con estándares WCAG
- 🔐 **Autenticación Segura**: Integración con Clerk
- 💳 **Pagos Seguros**: Integración con Stripe (compatible con PSD2)
- 📊 **Analytics**: Dashboard con métricas y gráficos
- 🧪 **Testing**: Jest, React Testing Library y Cypress

## 📋 Requisitos Previos

- Node.js >= 18.0.0
- npm >= 9.0.0
- Cuenta de Clerk (autenticación)
- Cuenta de Stripe (pagos)

## 🛠️ Stack Tecnológico

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **UI Components**: Shadcn/UI + Radix UI
- **State Management**: Zustand
- **Data Fetching**: React Query + Axios
- **Formularios**: React Hook Form + Zod
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React

### Funcionalidades Avanzadas
- **Auth**: Clerk / NextAuth
- **Pagos**: Stripe
- **Real-time**: Socket.io
- **i18n**: next-intl
- **PWA**: next-pwa
- **Analytics**: Google Analytics
- **Testing**: Jest, React Testing Library, Cypress

## 📦 Instalación

### 1. Clonar el repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/crezco-app.git
cd crezco-app
\`\`\`

### 2. Instalar dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar variables de entorno

Copia el archivo \`.env.example\` a \`.env.local\` y configura las variables:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita \`.env.local\` con tus credenciales:

\`\`\`env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_clerk_publishable_key
CLERK_SECRET_KEY=tu_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/signup
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=tu_stripe_publishable_key
STRIPE_SECRET_KEY=tu_stripe_secret_key
STRIPE_WEBHOOK_SECRET=tu_stripe_webhook_secret

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Database (opcional)
DATABASE_URL=postgresql://user:password@localhost:5432/crezco

# Cloudinary (para subir imágenes)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret
\`\`\`

### 4. Ejecutar en modo desarrollo

\`\`\`bash
npm run dev
\`\`\`

La aplicación estará disponible en [http://localhost:3000](http://localhost:3000)

## 🏗️ Estructura del Proyecto

\`\`\`
crezco-app/
├── public/                  # Archivos estáticos
│   ├── icons/              # Iconos PWA
│   ├── images/             # Imágenes
│   ├── manifest.json       # Manifest PWA
│   └── robots.txt         
├── src/
│   ├── app/                # App Router de Next.js
│   │   ├── (auth)/        # Rutas de autenticación
│   │   ├── projects/      # Rutas de proyectos
│   │   ├── dashboard/     # Dashboard de usuario
│   │   ├── layout.tsx     # Layout principal
│   │   ├── page.tsx       # Homepage
│   │   └── globals.css    # Estilos globales
│   ├── components/         # Componentes reutilizables
│   │   ├── ui/            # Componentes UI de Shadcn
│   │   ├── layout/        # Header, Footer
│   │   ├── projects/      # ProjectCard, etc.
│   │   └── ...
│   ├── lib/               # Utilidades
│   │   ├── api.ts         # Cliente API (Axios)
│   │   ├── socket.ts      # Cliente Socket.io
│   │   ├── utils.ts       # Funciones auxiliares
│   │   └── constants.ts   # Constantes
│   ├── store/             # Stores de Zustand
│   │   ├── authStore.ts
│   │   ├── notificationStore.ts
│   │   └── ...
│   ├── types/             # Tipos de TypeScript
│   │   └── index.ts
│   └── hooks/             # Custom hooks
├── tests/                  # Tests
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .env.example           # Variables de entorno de ejemplo
├── next.config.js         # Configuración de Next.js
├── tailwind.config.ts     # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
└── package.json
\`\`\`

## 🎨 Paleta de Colores

- **Primary Green**: `#22C55E` - Crecimiento y positividad
- **Accent Blue**: `#3B82F6` - Confianza
- **Vibrant Yellow**: `#FBBF24` - Destacados e insignias
- **Neutral Grays**: `#F3F4F6`, `#6B7280` - Fondos y texto

## 📱 Páginas Principales

### 1. **Homepage** (`/`)
- Hero con slogan y CTAs
- Proyectos destacados
- Categorías
- Testimonios
- Tabla de clasificación

### 2. **Explorar Proyectos** (`/projects`)
- Búsqueda y filtros
- Grid de proyectos con scroll infinito
- Ordenar por: más recientes, populares, financiación

### 3. **Detalle de Proyecto** (`/projects/[id]`)
- Información completa del proyecto
- Barra de progreso
- Feed de actualizaciones en tiempo real
- Lista de donadores
- Sección de comentarios
- Proyectos relacionados

### 4. **Crear Proyecto** (`/create`)
- Formulario multi-paso
- Validación con Zod
- Subida de imágenes/videos
- Preview antes de publicar

### 5. **Dashboard** (`/dashboard`)
- Proyectos creados (para creadores)
- Proyectos apoyados (para supporters)
- Analytics y gráficos
- Sistema de insignias
- Editar perfil

### 6. **Flujo de Donación** (`/donate/[projectId]`)
- Presets de cantidad (5€, 10€, 50€, personalizado)
- Mensaje opcional
- Integración con Stripe
- Página de agradecimiento

### 7. **Auth** (`/login`, `/signup`)
- Login con email y redes sociales
- Registro con verificación
- Recuperación de contraseña

### 8. **Legal** (`/terms`, `/privacy`)
- Términos de uso
- Política de privacidad

## 🧩 Componentes Clave

### ProjectCard
Tarjeta de proyecto con imagen, título, progreso y botón de donación.

### DonationButton
Botón para abrir el modal/página de donación.

### NotificationBell
Icono de campana con contador de notificaciones no leídas.

### BadgeSystem
Muestra las insignias ganadas por el usuario.

### MultiStepForm
Formulario de múltiples pasos con validación.

## 🔧 Scripts Disponibles

\`\`\`bash
# Desarrollo
npm run dev                 # Inicia servidor de desarrollo

# Build
npm run build              # Construye para producción
npm run start              # Inicia servidor de producción

# Linting y Formato
npm run lint               # Ejecuta ESLint
npm run format             # Formatea código con Prettier

# Testing
npm run test               # Ejecuta tests en modo watch
npm run test:ci            # Ejecuta tests en CI
npm run test:e2e           # Abre Cypress
npm run test:e2e:headless  # Ejecuta Cypress en modo headless

# Type Checking
npm run type-check         # Verifica tipos de TypeScript
\`\`\`

## 🚀 Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio en [Vercel](https://vercel.com)
2. Configura las variables de entorno
3. Despliega automáticamente en cada push

\`\`\`bash
# O despliega manualmente con Vercel CLI
npm i -g vercel
vercel
\`\`\`

### Otras Plataformas
- **Netlify**: Compatible con Next.js
- **Railway**: Soporte para Next.js y PostgreSQL
- **Render**: Despliegue de contenedores

## 🧪 Testing

### Unit Tests (Jest + RTL)

\`\`\`bash
npm run test
\`\`\`

### E2E Tests (Cypress)

\`\`\`bash
npm run test:e2e
\`\`\`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la rama (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver \`LICENSE\` para más información.

## 💬 Soporte

- **Email**: hola@crezco.es
- **Twitter**: [@crezco](https://twitter.com/crezco)
- **Instagram**: [@crezco](https://instagram.com/crezco)

## 👥 Equipo

Desarrollado con ❤️ por el equipo de CREZCO.

---

**CREZCO** - Apoya a los que están empezando. Invierte en personas, no en bancos. 🚀
