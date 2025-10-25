# 🚀 GUÍA RÁPIDA - ¡3 MINUTOS!

## ✅ PROBLEMAS RESUELTOS:
- ✅ Error de rutas `/pending` corregido
- ✅ Backend reiniciado correctamente
- ✅ Frontend funcionando en puerto 3003

---

## 🎯 PASOS SIMPLES (HAZ ESTO AHORA):

### **PASO 1: INICIA SESIÓN** 🔐
**Ya tienes abierto:** http://localhost:3003/login

1. Click en "Sign in with Google" (o email)
2. Inicia sesión
3. Vuelve a esta ventana

---

### **PASO 2: ABRE LA CONSOLA Y EJECUTA** 💻

Una vez logueado, presiona **F12** para abrir la consola del navegador y **COPIA Y PEGA** estos comandos UNO POR UNO:

#### **A) Hacerte Admin:**
```javascript
fetch('http://localhost:3001/api/admin/promote', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ secret: 'crezco-admin-ultra-secreto-2024' }),
  credentials: 'include'
}).then(r => r.json()).then(d => console.log('✅ ADMIN:', d));
```
**Verás:** `✅ ADMIN: {success: true, message: "Usuario ... promovido a administrador"}`

---

#### **B) Crear Proyecto con Multimedia:**
```javascript
fetch('http://localhost:3001/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Proyecto Test ' + new Date().toLocaleTimeString(),
    description: 'Descripción del proyecto de prueba',
    goalAmount: 5000,
    category: 'tecnologia',
    storytelling: {
      photos: [
        'https://picsum.photos/800/600?random=1',
        'https://picsum.photos/800/600?random=2',
        'https://picsum.photos/800/600?random=3'
      ],
      videos: [],
      audios: [],
      story: 'Esta es la historia completa de nuestro proyecto...',
      pitch: 'Una plataforma revolucionaria'
    },
    socialMedia: {
      instagram: 'https://instagram.com/test',
      tiktok: 'https://tiktok.com/@test',
      youtube: 'https://youtube.com/@test',
      website: 'https://test.com'
    }
  }),
  credentials: 'include'
}).then(r => r.json()).then(d => {
  console.log('✅ PROYECTO CREADO:', d);
  window.PROJECT_ID = d._id;
  console.log('📋 ID:', d._id);
});
```
**Verás:** `✅ PROYECTO CREADO: {_id: "...", title: "...", status: "pending_review"}`

---

#### **C) Ver Proyectos Pendientes:**
```javascript
fetch('http://localhost:3001/api/projects/pending', {
  credentials: 'include'
}).then(r => r.json()).then(d => console.log('📋 PENDIENTES:', d));
```
**Verás:** Lista de proyectos esperando aprobación

---

#### **D) Aprobar el Proyecto:**
```javascript
fetch(`http://localhost:3001/api/projects/${window.PROJECT_ID}/approve`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ notes: 'Aprobado desde consola' }),
  credentials: 'include'
}).then(r => r.json()).then(d => console.log('✅ APROBADO:', d));
```
**Verás:** `✅ APROBADO: {project: {..., status: "active"}}`

---

#### **E) Ver el Proyecto:**
```javascript
window.open(`http://localhost:3003/projects/${window.PROJECT_ID}`, '_blank');
```
**Se abrirá:** La página del proyecto con fotos y redes sociales

---

## 📊 RESUMEN VISUAL:

```
┌──────────────────────────┐
│  1. Login con Google     │ ← YA ABIERTO
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  2. Hacerse Admin (F12)  │ ← COPIA COMANDO A
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  3. Crear Proyecto       │ ← COPIA COMANDO B
│     con fotos            │
│  Status: pending_review  │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  4. Ver Pendientes       │ ← COPIA COMANDO C
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  5. Aprobar              │ ← COPIA COMANDO D
│  Status: active ✅       │
└────────────┬─────────────┘
             │
             ▼
┌──────────────────────────┐
│  6. Ver Multimedia       │ ← COPIA COMANDO E
│  🖼️ 3 fotos              │
│  🔗 Redes sociales        │
└──────────────────────────┘
```

---

## 🎮 TAMBIÉN PUEDES USAR:

**Test Interactivo (botones automáticos):**
- http://localhost:8080/test-fase1.html

**Monitor en tiempo real:**
- http://localhost:8080/monitor.html

---

## 🐛 SI ALGO FALLA:

1. **Error 401:** No estás logueado → Vuelve a hacer login
2. **Error 403:** No eres admin → Ejecuta comando A de nuevo
3. **undefined PROJECT_ID:** El proyecto no se creó → Ejecuta comando B de nuevo

---

## ✅ CHECKLIS RÁPIDO:

- [ ] 1. Inicié sesión en http://localhost:3003/login
- [ ] 2. Abrí consola con F12
- [ ] 3. Ejecuté comando A (hacerme admin)
- [ ] 4. Ejecuté comando B (crear proyecto)
- [ ] 5. Ejecuté comando C (ver pendientes)
- [ ] 6. Ejecuté comando D (aprobar)
- [ ] 7. Ejecuté comando E (ver multimedia)

---

**¡EMPIEZA AHORA!** 🚀

1. **Haz login** en la pestaña que acabas de abrir
2. **Presiona F12**
3. **Copia y pega** los comandos uno por uno

**Tiempo total: ~3 minutos** ⏱️
