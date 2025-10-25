# 🚀 Guía Rápida - Cómo Probar Fase 1

## ✅ Sistema iniciado correctamente

- **Backend**: http://localhost:3001 ✅
- **Frontend Next.js**: http://localhost:3002 ✅
- **MongoDB**: Conectado ✅

---

## 📋 Paso 1: Hacerte Administrador

### Opción A: Script automático (Recomendado)

1. **Inicia sesión** en el frontend (http://localhost:3002/login)
2. **Copia tu Clerk User ID** desde:
   - Dashboard de Clerk → Users → Tu usuario → User ID
   - O desde la consola del navegador después de iniciar sesión

3. **Ejecuta el script** (en una nueva terminal):
```powershell
cd backend
node promote-admin.js user_TU_CLERK_ID_AQUI
```

4. Verás un mensaje como:
```
✅ ¡Usuario promovido a ADMIN exitosamente!
   Email: tu-email@ejemplo.com
   Role: admin
```

### Opción B: Via API (alternativa)

1. **Inicia sesión** en http://localhost:3002/login
2. **Abre la consola del navegador** (F12)
3. **Ejecuta** este código:

```javascript
fetch('http://localhost:3001/api/admin/promote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    secret: 'crezco-admin-ultra-secreto-2024' 
  }),
  credentials: 'include'
})
.then(r => r.json())
.then(data => console.log('✅ Resultado:', data))
.catch(err => console.error('❌ Error:', err));
```

4. Verás en consola:
```json
{
  "success": true,
  "message": "Usuario promovido a administrador exitosamente"
}
```

### Verificar que eres admin

```javascript
fetch('http://localhost:3001/api/admin/check', {
  credentials: 'include'
})
.then(r => r.json())
.then(data => console.log('Tu rol:', data));
```

Deberías ver: `{ isAdmin: true, role: 'admin', email: '...' }`

---

## 📝 Paso 2: Crear un Proyecto con Storytelling

1. **Ve a**: http://localhost:3002/create

2. **Rellena el formulario**:

   **Campos básicos:**
   - Título: "Mi Proyecto Increíble"
   - Descripción: "Un proyecto para cambiar el mundo"
   - Meta (EUR): 5000
   - Categoría: "tecnologia"

   **Storytelling:**
   - **Pitch**: "Una plataforma que conecta..."
   - **Historia completa**: Escribe tu historia larga aquí
   - **Fotos**: Añade URLs públicas de imágenes (ej: https://picsum.photos/800/600)
   - **Videos**: URLs de videos (opcional, ej: .mp4 público)
   - **Audios**: URLs de audios (opcional, ej: .mp3 público)

   **Redes Sociales:**
   - Instagram: https://instagram.com/tu-usuario
   - TikTok: https://tiktok.com/@tu-usuario
   - YouTube: https://youtube.com/@tu-canal
   - Website: https://tu-sitio.com
   - (Los demás son opcionales)

3. **Haz clic en "Create Project"**

4. **El proyecto se creará con estado `pending_review`** ✅

5. **Serás redirigido** a la página del proyecto

---

## 🔍 Paso 3: Aprobar el Proyecto (como admin)

### Via Postman / Insomnia / Thunder Client

**Obtener proyectos pendientes:**
```
GET http://localhost:3001/api/projects/pending
```

**Aprobar proyecto:**
```
POST http://localhost:3001/api/projects/[ID_DEL_PROYECTO]/approve
Content-Type: application/json

{
  "notes": "Proyecto aprobado - cumple todos los requisitos"
}
```

### Via consola del navegador (estando logueado)

```javascript
// 1. Ver proyectos pendientes
fetch('http://localhost:3001/api/projects/pending', {
  credentials: 'include'
})
.then(r => r.json())
.then(data => {
  console.log('Proyectos pendientes:', data);
  // Copia el _id del proyecto
});

// 2. Aprobar proyecto (reemplaza PROJECT_ID)
fetch('http://localhost:3001/api/projects/PROJECT_ID/approve', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    notes: 'Aprobado - Excelente proyecto'
  }),
  credentials: 'include'
})
.then(r => r.json())
.then(data => console.log('✅ Aprobado:', data));

// 3. O rechazar proyecto
fetch('http://localhost:3001/api/projects/PROJECT_ID/reject', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    reason: 'Falta información completa'
  }),
  credentials: 'include'
})
.then(r => r.json())
.then(data => console.log('❌ Rechazado:', data));
```

---

## 🎨 Paso 4: Ver el Proyecto con Multimedia

1. **Ve a la página del proyecto**: http://localhost:3002/projects/[ID_DEL_PROYECTO]

2. **Deberías ver**:
   - ✅ Título y descripción
   - ✅ Pitch (resumen corto)
   - ✅ Historia completa
   - ✅ Galería de fotos
   - ✅ Reproductores de video (si añadiste videos)
   - ✅ Reproductores de audio (si añadiste audios)
   - ✅ Enlaces a redes sociales

---

## 🧪 Flujo Completo de Prueba

### Test E2E:

1. ✅ **Login** → http://localhost:3002/login
2. ✅ **Hacerte admin** → Script o API `/admin/promote`
3. ✅ **Crear proyecto** → http://localhost:3002/create (con fotos, videos, redes sociales)
4. ✅ **Verificar estado pendiente** → Proyecto queda en `pending_review`
5. ✅ **Listar pendientes** → `GET /api/projects/pending` (solo admin)
6. ✅ **Aprobar** → `POST /api/projects/:id/approve`
7. ✅ **Ver proyecto activo** → http://localhost:3002/projects/[id]
8. ✅ **Verificar multimedia** → Fotos, videos, audios renderizados

---

## 🔗 Endpoints Útiles

### Públicos
```
GET  /api/projects           - Listar todos los proyectos
GET  /api/projects/:id       - Ver un proyecto
```

### Requieren autenticación
```
POST /api/projects           - Crear proyecto (→ pending_review)
PUT  /api/projects/:id       - Actualizar proyecto
```

### Solo Admin
```
GET  /api/projects/pending         - Proyectos pendientes
POST /api/projects/:id/approve     - Aprobar proyecto
POST /api/projects/:id/reject      - Rechazar proyecto
GET  /api/admin/check              - Verificar si eres admin
POST /api/admin/promote            - Promover a admin (con secret)
```

---

## 🐛 Troubleshooting

### "No puedo crear proyectos"
- ✅ Verifica que estés logueado
- ✅ Abre consola del navegador y busca errores
- ✅ Verifica que el backend esté corriendo (puerto 3001)

### "No puedo aprobar proyectos"
- ✅ Verifica que seas admin: `GET /api/admin/check`
- ✅ Si no eres admin, ejecuta el script `promote-admin.js`

### "Las imágenes no se muestran"
- ✅ Asegúrate de usar URLs públicas completas (https://...)
- ✅ Verifica CORS de las URLs de imágenes

### "El frontend está en puerto 3002"
- ✅ Normal, el puerto 3000 estaba ocupado
- ✅ Usa http://localhost:3002 en lugar de 3000

---

## 📊 Estructura de Datos

### Proyecto con Storytelling:
```json
{
  "title": "Mi Proyecto",
  "description": "Descripción...",
  "goalAmount": 5000,
  "category": "tecnologia",
  "status": "pending_review",
  "storytelling": {
    "photos": ["https://...", "https://..."],
    "videos": ["https://..."],
    "audios": ["https://..."],
    "story": "Historia completa larga...",
    "pitch": "Resumen corto atractivo"
  },
  "socialMedia": {
    "instagram": "https://instagram.com/...",
    "tiktok": "https://tiktok.com/@...",
    "youtube": "https://youtube.com/@...",
    "website": "https://..."
  },
  "verificationStatus": {
    "submitted": true,
    "submittedAt": "2025-10-16T..."
  }
}
```

---

## ✅ Checklist de Fase 1

- [ ] Backend corriendo (puerto 3001)
- [ ] Frontend corriendo (puerto 3002)
- [ ] Usuario promovido a admin
- [ ] Proyecto creado con storytelling
- [ ] Proyecto aprobado por admin
- [ ] Multimedia visible en página de detalle
- [ ] Enlaces de redes sociales funcionando

---

## 🎯 Próximos Pasos (Prioridad 3)

Una vez pruebes el flujo básico, crearemos:

1. **Panel de administrador** (`/admin/pending-projects`)
   - Ver lista de proyectos pendientes
   - Botones para aprobar/rechazar
   - Vista previa de multimedia

2. **Mejoras en la UI de Create**
   - Drag & drop para imágenes
   - Preview de fotos/videos antes de enviar
   - Validaciones del formulario

3. **Tests automatizados**
   - E2E con Cypress
   - Unit tests para controladores

---

💡 **Consejo**: Copia tu Clerk User ID ahora para tenerlo a mano cuando ejecutes el script de promoción a admin.

¿Necesitas ayuda? Revisa los logs del backend en la terminal donde ejecutaste `npm run dev`.
