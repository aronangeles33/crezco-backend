# 🎉 FASE 1 COMPLETADA - SISTEMA LISTO PARA PRUEBAS

## ✅ ESTADO ACTUAL DEL SISTEMA

### 🟢 Servicios Activos:
```
✅ Backend API       → http://localhost:3001     [RUNNING]
✅ Frontend Next.js  → http://localhost:3003     [RUNNING]
✅ MongoDB Atlas     → Cluster0                  [CONNECTED]
✅ Test Interactivo  → http://localhost:8080/test-fase1.html
✅ Monitor en vivo   → http://localhost:8080/monitor.html
```

---

## 📋 INSTRUCCIONES DE PRUEBA PASO A PASO

### 🎮 **MÉTODO 1: Test Interactivo (MÁS FÁCIL)**

**Ya tienes abierto:** http://localhost:8080/test-fase1.html

#### Sigue estos 6 pasos en orden:

**PASO 1: 🔐 Iniciar Sesión**
- Click en el botón "🔐 Ir a Login"
- Se abrirá http://localhost:3003/login
- Inicia sesión con Google o email
- Vuelve a la pestaña del test

**PASO 2: 👑 Hacerte Administrador**
- Click en "👑 Hacerme Admin"
- Verás un mensaje: ✅ Usuario promovido a administrador
- Click en "🔍 Verificar si soy Admin" para confirmar

**PASO 3: 📝 Crear Proyecto de Prueba**
- Click en "🚀 Crear Proyecto Auto"
- El sistema creará automáticamente un proyecto con:
  - ✅ 3 fotos de ejemplo
  - ✅ Historia y pitch
  - ✅ Redes sociales
  - ✅ Estado: `pending_review`
- Verás el ID del proyecto en la respuesta

**PASO 4: 📋 Ver Proyectos Pendientes**
- Click en "📋 Ver Proyectos Pendientes"
- Verás tu proyecto esperando aprobación
- El ID se copiará automáticamente al campo

**PASO 5: ✅ Aprobar el Proyecto**
- Click en "✅ Aprobar Proyecto"
- El proyecto cambiará de `pending_review` a `active`
- Verás confirmación de aprobación

**PASO 6: 🎨 Ver Proyecto con Multimedia**
- Click en "🎨 Ver Proyecto"
- Se abrirá la página del proyecto
- Verás:
  - ✅ Galería de 3 fotos
  - ✅ Historia completa
  - ✅ Pitch
  - ✅ Enlaces a redes sociales

---

### 💻 **MÉTODO 2: Consola del Navegador (ALTERNATIVO)**

Si prefieres usar código, abre la consola (F12) en http://localhost:3003 y ejecuta:

```javascript
// 1. Hacerte admin
fetch('http://localhost:3001/api/admin/promote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ secret: 'crezco-admin-ultra-secreto-2024' }),
  credentials: 'include'
}).then(r => r.json()).then(console.log);

// 2. Crear proyecto
fetch('http://localhost:3001/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Mi Proyecto Test',
    description: 'Descripción del proyecto',
    goalAmount: 5000,
    category: 'tecnologia',
    storytelling: {
      photos: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2'
      ],
      videos: [],
      audios: [],
      story: 'Esta es la historia completa...',
      pitch: 'Un pitch atractivo'
    },
    socialMedia: {
      instagram: 'https://instagram.com/test',
      youtube: 'https://youtube.com/@test'
    }
  }),
  credentials: 'include'
}).then(r => r.json()).then(data => {
  console.log('Proyecto creado:', data);
  window.PROJECT_ID = data._id; // Guardar ID
});

// 3. Ver proyectos pendientes
fetch('http://localhost:3001/api/projects/pending', {
  credentials: 'include'
}).then(r => r.json()).then(console.log);

// 4. Aprobar proyecto (reemplaza PROJECT_ID)
fetch(`http://localhost:3001/api/projects/${window.PROJECT_ID}/approve`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ notes: 'Aprobado desde consola' }),
  credentials: 'include'
}).then(r => r.json()).then(console.log);

// 5. Abrir proyecto
window.open(`http://localhost:3003/projects/${window.PROJECT_ID}`, '_blank');
```

---

### 📜 **MÉTODO 3: Script de Terminal (PARA PROMOVER ADMIN)**

```powershell
cd backend

# Ver usuarios en la base de datos
node promote-admin.js

# Promover tu usuario a admin (reemplaza con tu Clerk ID)
node promote-admin.js user_TU_CLERK_ID_AQUI
```

**¿Dónde encontrar tu Clerk User ID?**
1. Ve a https://dashboard.clerk.com
2. Users → Tu usuario
3. Copia el "User ID" (empieza con `user_`)

---

## 🔍 **MONITOREO EN TIEMPO REAL**

Abre el monitor para ver el estado de todos los servicios:

🔴 **http://localhost:8080/monitor.html**

El monitor te mostrará cada 5 segundos:
- ✅ Estado del backend
- ✅ Estado del frontend
- ✅ Conexión a MongoDB
- ✅ Endpoints de admin funcionando
- ✅ API de proyectos
- ✅ Estado de autenticación

Si algo falla, aparecerá en rojo ❌ con detalles del error.

---

## 🎯 **FLUJO COMPLETO ESPERADO**

```
┌─────────────────────────┐
│  1. Login con Clerk     │
│     (Google/Email)      │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  2. Promover a Admin    │
│     Role: supporter     │
│          ↓              │
│     Role: admin         │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  3. Crear Proyecto      │
│  • Título, descripción  │
│  • Photos, videos       │
│  • Historia, pitch      │
│  • Redes sociales       │
│                         │
│  Status: pending_review │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  4. Listar Pendientes   │
│  GET /projects/pending  │
│  (Solo admin puede ver) │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  5. Aprobar Proyecto    │
│  POST /:id/approve      │
│                         │
│  Status: active ✅      │
└──────────┬──────────────┘
           │
           ▼
┌─────────────────────────┐
│  6. Ver en Frontend     │
│  • Galería de fotos     │
│  • Videos/audios        │
│  • Historia completa    │
│  • Links redes sociales │
└─────────────────────────┘
```

---

## 📊 **ENDPOINTS DISPONIBLES**

### Públicos (sin auth):
```
GET  /api/projects          - Listar proyectos activos
GET  /api/projects/:id      - Ver un proyecto
GET  /health               - Health check del backend
```

### Requieren autenticación:
```
POST /api/projects          - Crear proyecto (→ pending_review)
PUT  /api/projects/:id      - Actualizar proyecto
GET  /api/admin/check       - Verificar si eres admin
POST /api/admin/promote     - Promover a admin (con secret)
```

### Solo Admin:
```
GET  /api/projects/pending         - Proyectos pendientes
POST /api/projects/:id/approve     - Aprobar proyecto
POST /api/projects/:id/reject      - Rechazar proyecto
```

---

## 🐛 **SOLUCIÓN DE PROBLEMAS**

### ❌ "No puedo crear proyectos"
**Solución:**
1. Asegúrate de estar logueado en http://localhost:3003/login
2. Abre consola (F12) y verifica que no haya errores
3. Verifica que el backend esté corriendo en puerto 3001

### ❌ "No puedo aprobar proyectos (403 Forbidden)"
**Solución:**
1. Ejecuta: `fetch('http://localhost:3001/api/admin/check', {credentials: 'include'}).then(r=>r.json()).then(console.log)`
2. Si `isAdmin: false`, ejecuta el paso 2 de promoción
3. Si `isAdmin: true` pero sigue fallando, reinicia el backend

### ❌ "Las imágenes no se cargan"
**Solución:**
- Usa URLs públicas completas (https://...)
- Ejemplo válido: `https://picsum.photos/800/600?random=1`
- No uses rutas locales o relativas

### ❌ "Frontend en puerto diferente (3003)"
**Explicación:**
- Normal, los puertos 3000, 3001, 3002 estaban ocupados
- Usa siempre http://localhost:3003 para el frontend

---

## ✅ **CHECKLIST DE PRUEBA**

Marca cada paso conforme lo completes:

- [ ] ✅ Backend respondiendo (GET /health)
- [ ] ✅ Frontend cargando (puerto 3003)
- [ ] ✅ MongoDB conectado (visible en logs backend)
- [ ] ✅ Login exitoso con Clerk
- [ ] ✅ Usuario promovido a admin
- [ ] ✅ Proyecto creado con storytelling
- [ ] ✅ Proyecto visible en lista de pendientes
- [ ] ✅ Proyecto aprobado por admin
- [ ] ✅ Multimedia visible en página de detalle
- [ ] ✅ Enlaces de redes sociales funcionando

---

## 🎓 **DATOS DE EJEMPLO PARA PRUEBAS**

Si creas un proyecto manualmente, usa estos datos:

```json
{
  "title": "EcoTech - Tecnología Sostenible",
  "description": "Desarrollamos soluciones tecnológicas para un futuro sostenible",
  "goalAmount": 15000,
  "category": "tecnologia",
  "storytelling": {
    "photos": [
      "https://picsum.photos/800/600?random=10",
      "https://picsum.photos/800/600?random=11",
      "https://picsum.photos/800/600?random=12"
    ],
    "videos": [],
    "audios": [],
    "story": "Nuestro proyecto nació de la necesidad de combinar tecnología con sostenibilidad. Después de años investigando, hemos desarrollado una plataforma que permite...",
    "pitch": "Únete a la revolución verde. Tecnología que cuida el planeta."
  },
  "socialMedia": {
    "instagram": "https://instagram.com/ecotech",
    "tiktok": "https://tiktok.com/@ecotech",
    "youtube": "https://youtube.com/@ecotech",
    "website": "https://ecotech.example.com",
    "linkedin": "https://linkedin.com/company/ecotech",
    "twitter": "https://twitter.com/ecotech"
  }
}
```

---

## 🚀 **PRÓXIMOS PASOS (DESPUÉS DE PROBAR)**

Una vez completes todas las pruebas:

### Prioridad 3: Panel de Administrador UI
Crearemos una página bonita en `/admin/pending-projects` con:
- ✅ Lista visual de proyectos pendientes
- ✅ Botones para aprobar/rechazar con un click
- ✅ Preview de multimedia antes de aprobar

### Prioridad 4: Mejorar UX del Formulario
- ✅ Drag & drop para subir imágenes
- ✅ Preview de fotos/videos antes de enviar
- ✅ Validaciones visuales en tiempo real
- ✅ Diseño más profesional con Tailwind

---

## 📞 **¿NECESITAS AYUDA?**

Si encuentras algún error:
1. Revisa el **monitor en tiempo real** (http://localhost:8080/monitor.html)
2. Revisa los **logs del backend** (terminal con nodemon)
3. Revisa la **consola del navegador** (F12)
4. Consulta **FASE1_COMO_PROBAR.md** para detalles adicionales

---

## 🎉 **¡FELICIDADES!**

Has completado la implementación de **FASE 1 - Story Telling Multimedia**

El sistema ahora permite:
- ✅ Crear proyectos con multimedia rica
- ✅ Proceso de aprobación por administradores
- ✅ Vista de proyectos con galería y redes sociales
- ✅ Sistema de roles (creator/supporter/admin)

**¡Ahora prueba el flujo completo!** 🚀
