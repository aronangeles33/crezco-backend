# 🚀 TEST 1: Promoción a Credcamer - Guía Paso a Paso

## ✅ Pre-requisitos

**Verifica:**
- [ ] Backend corriendo: http://localhost:3001
- [ ] Frontend corriendo: http://localhost:3002
- [ ] MongoDB conectado

---

## 📝 Paso 1: Crear/Verificar Usuario Admin

### Opción A: Si ya tienes admin
1. Ir a http://localhost:3002
2. Login con tu cuenta admin
3. ✅ Verificar que puedes acceder a `/admin/credcamers`

### Opción B: Si NO tienes admin (primera vez)

1. **Login en el frontend para crear tu usuario:**
   ```
   http://localhost:3002
   Sign in con Clerk
   ```

2. **Copiar tu Clerk User ID:**
   - Abrir DevTools (F12) → Console
   - Ejecutar:
   ```javascript
   window.Clerk.user.id
   // Ejemplo output: "user_2abc123xyz..."
   // COPIAR este ID
   ```

3. **Promover a admin (desde terminal):**
   ```powershell
   cd backend
   node promote-admin.js user_2abc123xyz...
   # Reemplazar con tu Clerk ID
   ```

   **Output esperado:**
   ```
   ✅ Usuario promovido a ADMIN exitosamente!
   Email: tu@email.com
   Role: admin
   ```

4. **Recargar frontend:**
   - Ctrl+Shift+R (hard reload)
   - Verificar que rol es 'admin'

---

## 📝 Paso 2: Crear Usuarios de Prueba

**Necesitas al menos 1 usuario normal para promover a credcamer.**

### Opción A: Usuarios Clerk reales
1. Abre ventana incógnito
2. Ir a http://localhost:3002
3. Sign up con email diferente
4. Cerrar incógnito
5. Repetir para crear 2-3 usuarios

### Opción B: Usuarios existentes
- Si ya tienes usuarios en tu DB, salta este paso

---

## 📝 Paso 3: Promover Usuario a Credcamer

### 3.1 Login como Admin

```
URL: http://localhost:3002
Login: Tu cuenta admin
```

### 3.2 Acceder Panel Credcamers

```
URL: http://localhost:3002/admin/credcamers
```

**✅ Verificar que ves:**
- Stats cards (Total Credcamers: 0)
- Tabla "Credcamers Activos" (vacía)
- Tabla "Usuarios Normales" (con usuarios)

### 3.3 Promover Usuario

1. **Buscar usuario** (opcional):
   - Usar campo de búsqueda
   - Filtrar por nombre/email

2. **Click en "⬆️ Promover"** en un usuario normal

3. **Confirmar dialog:**
   ```
   ¿Promover a [Nombre] a Credcamer?
   → OK
   ```

4. **✅ Verificar alert:**
   ```
   ✅ Usuario promovido a Credcamer exitosamente
   ```

5. **✅ Verificar tabla actualizada:**
   - Usuario desaparece de "Usuarios Normales"
   - Usuario aparece en "Credcamers Activos"
   - Stats: Total Credcamers = 1
   - Nivel: 🌱 Novato
   - Puntos: 0
   - Captados: 0

---

## 📝 Paso 4: Verificar en Base de Datos (Opcional)

### Usando MongoDB Compass:

1. Conectar a tu cluster
2. Database: `crezco` (o el nombre que uses)
3. Collection: `users`
4. Buscar por email del usuario promovido

**✅ Verificar campos:**
```json
{
  "_id": "...",
  "email": "usuario@test.com",
  "name": "Usuario Test",
  "role": "credcamer", // ✅ Cambió de 'supporter' a 'credcamer'
  "credcamerPoints": 0,
  "credcamerLevel": "Novato",
  "totalCaptured": 0,
  "createdAt": "...",
  "updatedAt": "..." // ✅ Se actualizó
}
```

### Usando terminal (opcional):

```powershell
# En terminal backend
node
```

```javascript
// En REPL de Node
require('dotenv').config()
const mongoose = require('mongoose')
await mongoose.connect(process.env.MONGODB_URI)

const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  role: String,
  credcamerPoints: Number,
  credcamerLevel: String
}))

const user = await User.findOne({ email: 'usuario@test.com' })
console.log(user)
// Debe mostrar role: 'credcamer'
```

---

## 📝 Paso 5: Login como Credcamer

### 5.1 Logout del Admin

```
Header → User button → Sign out
```

### 5.2 Login con Usuario Promovido

```
Sign in con email del usuario promovido
```

### 5.3 Verificar Botón Credcamer en Header

**✅ Desktop:**
- Botón "📈 Credcamer" visible en navbar
- Estilo: gradient purple-pink
- Entre "Crear Proyecto" y "Sobre Nosotros"

**✅ Mobile:**
- Abrir menú hamburguesa
- Botón "📈 Credcamer" visible en lista
- Mismo estilo gradient

### 5.4 Click en Botón

```
Click "📈 Credcamer"
→ Debe llevar a: http://localhost:3002/credcamer
```

---

## ✅ Verificación Final - Checklist

### Backend:
- [ ] Promoción ejecutada sin errores
- [ ] User.role = 'credcamer' en DB
- [ ] User.credcamerPoints = 0
- [ ] User.credcamerLevel = 'Novato'
- [ ] User.totalCaptured = 0

### Frontend:
- [ ] Alert de éxito visible
- [ ] Usuario movido a tabla correcta
- [ ] Stats actualizados (Total Credcamers = 1)
- [ ] Botón "📈 Credcamer" visible en header (solo para credcamer)
- [ ] Click en botón lleva a /credcamer
- [ ] Usuario normal NO ve el botón

### Admin Panel:
- [ ] Tabla "Credcamers Activos" muestra usuario
- [ ] Tabla "Usuarios Normales" NO muestra usuario
- [ ] Botón "⬇️ Degradar" visible en tabla superior
- [ ] Botón "⬆️ Promover" solo en tabla inferior

---

## 🐛 Troubleshooting

### Problema: "No tienes acceso a este panel"

**Causa:** No eres admin

**Solución:**
1. Verificar rol: Ejecutar script en consola
   ```javascript
   fetch('http://localhost:3001/api/users/me', {
     headers: { 'Authorization': `Bearer ${await window.Clerk.session.getToken()}` },
     credentials: 'include'
   }).then(r => r.json()).then(d => console.log('Role:', d.role))
   ```
2. Si NO es 'admin', ejecutar promote-admin.js

### Problema: "Botón Credcamer no aparece"

**Causa:** Hook useUserRole no carga o usuario no es credcamer

**Solución:**
1. Verificar en DevTools → Console errores
2. Verificar Network tab: /api/users/me debe retornar 200
3. Hard reload: Ctrl+Shift+R
4. Verificar rol en DB directamente

### Problema: "Usuario no aparece en tabla"

**Causa:** Endpoint /api/users no retorna usuarios

**Solución:**
1. Verificar backend logs: Debe mostrar GET /api/users
2. Check terminal backend: Errores?
3. Verificar en MongoDB que existen usuarios
4. Verificar que eres admin (requireAdmin middleware)

### Problema: Error 403 al promover

**Causa:** No tienes permisos de admin

**Solución:**
1. Verificar que tu usuario tiene role: 'admin'
2. Re-ejecutar promote-admin.js si es necesario
3. Logout y login de nuevo

---

## 📊 Test Results

**Fecha:** ___________  
**Tester:** ___________

### Resultado:
- [ ] ✅ Test 1 PASADO - Todo funciona correctamente
- [ ] ⚠️ Test 1 PARCIAL - Funciona con bugs menores
- [ ] ❌ Test 1 FALLIDO - Errores críticos

### Bugs Encontrados:
```
Bug #1: ___________
Prioridad: Alta/Media/Baja
Descripción: ___________
```

### Tiempo:
- Setup: _____ min
- Ejecución: _____ min
- Total: _____ min

---

## ✅ Siguiente Paso

**Si Test 1 pasa:**
→ Proceder a **Test 2: Dashboard Credcamer**

**Si Test 1 falla:**
→ Documentar bugs
→ Fix errores críticos
→ Re-run Test 1

---

## 💡 Tips

1. **Usa 2 navegadores:**
   - Chrome: Admin
   - Firefox: Credcamer
   - Así puedes ver cambios en tiempo real

2. **Mantén DevTools abierto:**
   - Console: Ver errores
   - Network: Ver requests
   - Application: Ver localStorage

3. **MongoDB Compass abierto:**
   - Ver cambios en tiempo real
   - Verificar datos actualizados

4. **Backend logs visibles:**
   - Terminal backend muestra requests
   - Detectar errores inmediatamente

---

**¡Listo para empezar! 🚀**

Abre http://localhost:3002 y sigue los pasos.
