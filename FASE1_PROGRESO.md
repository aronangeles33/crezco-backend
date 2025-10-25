# 🎬 FASE 1 - Story Telling Multimedia - PROGRESO

**Fecha**: 16 de octubre de 2025  
**Estado**: ✅ Backend completado | ⏳ Frontend pendiente

---

## ✅ COMPLETADO - BACKEND

### 1. Modelo de Proyecto Actualizado
**Archivo**: `backend/src/models/Project.js`

**Nuevos campos agregados**:
```javascript
// Estados de proyecto actualizados
status: 'draft' | 'pending_review' | 'active' | 'rejected' | 'funded' | 'closed'

// Story Telling Multimedia
storytelling: {
  videos: [String],      // URLs de YouTube, Vimeo
  photos: [String],       // URLs de Cloudinary
  audios: [String],       // URLs de audios
  story: String,          // Historia escrita (hasta 10,000 caracteres)
  pitch: String,          // Pitch de 30-60 segundos (hasta 500 caracteres)
}

// Redes Sociales
socialMedia: {
  instagram: String,
  tiktok: String,
  facebook: String,
  linkedin: String,
  twitter: String,
  youtube: String,
  website: String,
}

// Estado de Verificación
verificationStatus: {
  submitted: Boolean,
  submittedAt: Date,
  reviewedBy: ObjectId,   // ID del admin que revisó
  reviewedAt: Date,
  rejectionReason: String,
}
```

### 2. Controlador Actualizado
**Archivo**: `backend/src/controllers/projectController.js`

**Funciones modificadas**:
- ✅ `createProject` - Ahora acepta storytelling y socialMedia, crea proyectos en estado `pending_review`

**Nuevas funciones agregadas**:
- ✅ `approveProject` - POST /api/projects/:id/approve (Solo Admin)
- ✅ `rejectProject` - POST /api/projects/:id/reject (Solo Admin)
- ✅ `getPendingProjects` - GET /api/projects/pending (Solo Admin)

### 3. Rutas Actualizadas
**Archivo**: `backend/src/routes/projects.js`

**Nuevas rutas**:
```javascript
GET  /api/projects/pending          // Ver proyectos pendientes (Admin)
POST /api/projects/:id/approve      // Aprobar proyecto (Admin)
POST /api/projects/:id/reject       // Rechazar proyecto (Admin)
```

---

## ⏳ PENDIENTE - FRONTEND

### Opción A: Actualizar Frontend Next.js (crezco-app)
**Problema**: El frontend Next.js parece no estar completamente implementado aún.

### Opción B: Crear componentes nuevos desde cero
Necesitamos crear:

1. **Formulario de Crear Proyecto Mejorado**
   ```typescript
   /app/create-project/page.tsx
   ```
   - Campo de título ✅ (ya existe)
   - Campo de descripción ✅ (ya existe)
   - Campo de meta ✅ (ya existe)
   - **NUEVO**: Sección "Story Telling"
     - Upload múltiple de fotos (arrastra y suelta)
     - Input de URLs de videos (YouTube/Vimeo)
     - Textarea para historia escrita
     - Textarea para pitch (contador de caracteres)
   - **NUEVO**: Sección "Redes Sociales"
     - Inputs para cada red social con iconos
   - **NUEVO**: Vista previa del proyecto
   - **NUEVO**: Mensaje de "Tu proyecto está en revisión"

2. **Componente de Galería Multimedia**
   ```typescript
   /components/project/MediaGallery.tsx
   ```
   - Carrusel de fotos con thumbnails
   - Reproductor de video embebido
   - Lightbox para ver fotos en grande
   - Botones de compartir

3. **Sección de Redes Sociales**
   ```typescript
   /components/project/SocialLinks.tsx
   ```
   - Iconos clicables de redes sociales
   - Tooltip con nombre de la red
   - Animación hover

4. **Panel de Admin (Nuevo)**
   ```typescript
   /app/admin/pending-projects/page.tsx
   ```
   - Lista de proyectos pendientes
   - Preview de cada proyecto
   - Botones: Aprobar / Rechazar
   - Modal para escribir razón de rechazo
   - Filtros por categoría
   - Búsqueda

5. **Vista de Proyecto Mejorada**
   ```typescript
   /app/projects/[id]/page.tsx
   ```
   - Galería de fotos destacada
   - Videos embebidos
   - Sección de historia con formato
   - Iconos de redes sociales
   - Badge de "Verificado" si está aprobado

---

## 🔧 CAMBIOS NECESARIOS EN EL FRONTEND

### 1. Tipos TypeScript
**Archivo a crear**: `types/project.ts`

```typescript
export interface StoryTelling {
  videos: string[];
  photos: string[];
  audios: string[];
  story: string;
  pitch: string;
}

export interface SocialMedia {
  instagram?: string;
  tiktok?: string;
  facebook?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
  website?: string;
}

export interface VerificationStatus {
  submitted: boolean;
  submittedAt?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  rejectionReason?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  creator: User;
  goalAmount: number;
  currentAmount: number;
  donors: number;
  media: string[];
  category: string;
  status: 'draft' | 'pending_review' | 'active' | 'rejected' | 'funded' | 'closed';
  storytelling?: StoryTelling;
  socialMedia?: SocialMedia;
  verificationStatus?: VerificationStatus;
  rewards: Reward[];
  location: string;
  endDate: string;
  views: number;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 2. API Client
**Archivo a modificar**: `lib/api.ts`

```typescript
// Agregar nuevas funciones
export const projectsApi = {
  // ... funciones existentes
  
  // NUEVO
  getPending: (page = 1) => 
    api.get(`/projects/pending?page=${page}`),
  
  approve: (projectId: string) => 
    api.post(`/projects/${projectId}/approve`),
  
  reject: (projectId: string, reason: string) => 
    api.post(`/projects/${projectId}/reject`, { reason }),
};
```

### 3. Componentes de UI Nuevos

**A crear**:
- `components/ui/file-upload.tsx` - Subida de archivos drag & drop
- `components/ui/video-embed.tsx` - Embed de YouTube/Vimeo
- `components/ui/social-icon.tsx` - Iconos de redes sociales
- `components/ui/badge.tsx` - Badge de verificación
- `components/ui/textarea.tsx` - Textarea con contador de caracteres

---

## 📋 PRÓXIMOS PASOS RECOMENDADOS

### Paso 1: Probar Backend (AHORA)
```powershell
# Reiniciar backend
cd backend
node src/server.js
```

Verificar en consola que se vean los mensajes:
- ✅ "🔑 STRIPE_SECRET_KEY cargada: SÍ"
- ✅ "✅ MongoDB conectado"

### Paso 2: Crear tipos TypeScript (Frontend)
Crear el archivo `types/project.ts` con las interfaces actualizadas

### Paso 3: Actualizar formulario de crear proyecto
Modificar el formulario existente para incluir:
- Sección de Story Telling
- Sección de Redes Sociales
- Vista previa

### Paso 4: Crear panel de admin
Nueva página para que administradores vean y aprueben proyectos

### Paso 5: Mejorar vista de proyecto
Agregar galería multimedia y redes sociales a la página de detalle

---

## 🎯 FLUJO COMPLETO

### Usuario Crea Proyecto:
1. Usuario llena formulario mejorado con fotos, videos, redes sociales
2. Submit → Backend crea proyecto con `status: 'pending_review'`
3. Usuario ve mensaje: "Tu proyecto está en revisión. Te notificaremos cuando sea aprobado"
4. Socket.IO notifica a admins: "Nuevo proyecto pendiente"

### Admin Revisa Proyecto:
1. Admin ve lista de proyectos pendientes en `/admin/pending-projects`
2. Click en proyecto → ve preview completo
3. Admin puede:
   - ✅ **Aprobar** → `status: 'active'`, proyecto visible públicamente
   - ❌ **Rechazar** → `status: 'rejected'`, usuario recibe notificación con razón

### Proyecto Aprobado:
1. Proyecto aparece en listado público
2. Tiene badge de "Verificado"
3. Galería multimedia visible
4. Iconos de redes sociales clicables
5. Usuarios pueden donar

---

## 🚀 ¿CONTINUAR?

**Backend está LISTO** ✅

**Próxima decisión**:
- **Opción A**: Implementar frontend completo ahora (2-3 horas)
- **Opción B**: Probar backend con Postman/Thunder Client primero
- **Opción C**: Documentar y planificar frontend para implementar por fases

**¿Qué prefieres hacer?**

---

**Última actualización**: 16 de octubre de 2025 - 07:30 AM
