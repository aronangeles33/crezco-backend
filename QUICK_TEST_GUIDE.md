# 🧪 Quick Test Script - Credcamer System

## ⚡ Inicio Rápido

### 1. Verificar que los servidores estén corriendo:

```powershell
# Backend debe estar en http://localhost:3001
curl http://localhost:3001/health

# Frontend debe estar en http://localhost:3002
# Abrir en navegador: http://localhost:3002
```

---

## 📝 Test Scenarios (Copiar y pegar en consola del navegador)

### Test 1: Verificar rol del usuario actual

```javascript
// En http://localhost:3002 (con usuario logueado)
fetch('http://localhost:3001/api/users/me', {
  headers: {
    'Authorization': `Bearer ${await window.Clerk.session.getToken()}`
  },
  credentials: 'include'
})
.then(r => r.json())
.then(data => {
  console.log('👤 Usuario:', data.name);
  console.log('🎭 Rol:', data.role);
  console.log('⭐ Puntos:', data.credcamerPoints || 0);
  console.log('🏆 Nivel:', data.credcamerLevel || 'N/A');
  console.log('📦 Captados:', data.totalCaptured || 0);
})
```

### Test 2: Promover usuario a credcamer (Como Admin)

```javascript
// Reemplazar USER_ID con el ID del usuario a promover
const userId = 'PASTE_USER_ID_HERE';

fetch('http://localhost:3001/api/credcamer/promote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${await window.Clerk.session.getToken()}`
  },
  body: JSON.stringify({ userId }),
  credentials: 'include'
})
.then(r => r.json())
.then(data => {
  console.log('✅ Promoción exitosa:', data);
})
.catch(err => {
  console.error('❌ Error:', err);
})
```

### Test 3: Ver leaderboard

```javascript
fetch('http://localhost:3001/api/credcamer/leaderboard')
.then(r => r.json())
.then(data => {
  console.table(data.leaderboard);
})
```

### Test 4: Ver stats de credcamers (Como Admin)

```javascript
fetch('http://localhost:3001/api/credcamer/stats', {
  headers: {
    'Authorization': `Bearer ${await window.Clerk.session.getToken()}`
  },
  credentials: 'include'
})
.then(r => r.json())
.then(data => {
  console.log('📊 Stats Globales:', data);
})
```

### Test 5: Ver mis capturas (Como Credcamer)

```javascript
fetch('http://localhost:3001/api/credcamer/my-captures', {
  headers: {
    'Authorization': `Bearer ${await window.Clerk.session.getToken()}`
  },
  credentials: 'include'
})
.then(r => r.json())
.then(data => {
  console.log('📦 Mis Capturas:', data.projects);
  console.log('📊 Mis Stats:', data.stats);
})
```

---

## 🎯 Manual Testing Checklist

### ✅ Pre-Test Setup

- [ ] Backend corriendo en :3001
- [ ] Frontend corriendo en :3002
- [ ] Cuenta admin creada y verificada
- [ ] Al menos 2 usuarios normales creados (para promover)
- [ ] MongoDB Atlas conectado

---

### ✅ Test Sequence

#### **Round 1: Promoción y Acceso**

1. [ ] Login como admin
2. [ ] Ir a `/admin/credcamers`
3. [ ] Promover usuario a credcamer
4. [ ] Verificar tabla actualizada
5. [ ] Logout y login como credcamer
6. [ ] Verificar botón "📈 Credcamer" visible en header
7. [ ] Click → Ir a dashboard credcamer

**Resultado esperado:** ✅ Usuario promovido correctamente, botón visible

---

#### **Round 2: Dashboard Credcamer**

1. [ ] Verificar stats cards: 0 captados, 0 puntos, Novato
2. [ ] Tab "📦 Mis Capturas" → Mensaje vacío
3. [ ] Tab "💡 Recomendaciones" → 3 sugerencias mock
4. [ ] Tab "🏆 Ranking" → Leaderboard (puede estar vacío)
5. [ ] Click "➕ Captar Negocio"

**Resultado esperado:** ✅ Dashboard carga correctamente, todas las secciones funcionales

---

#### **Round 3: Wizard de Captación**

1. [ ] **Step 1 - Dueño:**
   - Nombre: María González
   - Contacto: maria@cafe.com
   - Ubicación: Av. Principal #123
   - Notas: Contactada el 16/10
   - ✅ Badge "💾 Borrador guardado" aparece

2. [ ] **Step 2 - Identidad:**
   - Título: Café Artesanal El Rincón
   - Descripción: Cafetería local... (min 50 caracteres)
   - Meta: 50000
   - Categoría: shop

3. [ ] **Step 3 - Historia:**
   - Historia: Somos una cafetería familiar... (min 100 caracteres)
   - Pitch: El mejor café artesanal
   - (Audios opcional)

4. [ ] **Step 4 - Multimedia:**
   - Upload foto O pegar URL: https://via.placeholder.com/800x600?text=Cafe
   - ✅ Preview visible

5. [ ] **Step 5 - Redes:**
   - Instagram: @cafeelrincon
   - Facebook: facebook.com/cafeelrincon
   - Website: cafeelrincon.com

6. [ ] **Step 6 - Review:**
   - ✅ Preview completo
   - ✅ Info dueño en cuadro púrpura
   - ✅ Warning visible
   - Click "📈 Captar Negocio"

7. [ ] Alert de éxito → Redirect a `/credcamer`

**Resultado esperado:** ✅ Wizard completo, proyecto captado, redirect exitoso

---

#### **Round 4: Aprobación y Puntos**

1. [ ] Logout credcamer
2. [ ] Login como admin
3. [ ] Ir a `/admin/pending`
4. [ ] Verificar proyecto "Café Artesanal El Rincón"
5. [ ] Verificar badge "📈 Captado por Credcamer"
6. [ ] Click "✅ Aprobar"
7. [ ] Confirmar → Alert de éxito
8. [ ] Logout admin
9. [ ] Login como credcamer
10. [ ] Ir a `/credcamer`
11. [ ] Verificar stats:
    - Total Captados: 1
    - Puntos: 68 (aprox, según fórmula)
    - Nivel: ⭐ Pro (si puntos >= 50)
    - Aprobados: 1

**Resultado esperado:** ✅ Proyecto aprobado, puntos otorgados, nivel actualizado

---

#### **Round 5: Leaderboard y Perfil**

1. [ ] En `/credcamer`, tab "🏆 Ranking"
2. [ ] Verificar credcamer en posición #1
3. [ ] Verificar highlight (fondo púrpura) en tu fila
4. [ ] Verificar badge "Tú" visible
5. [ ] Ir a `/perfil/[PROJECT_ID]` del proyecto captado
6. [ ] Verificar badge "📈 Captado por Credcamer" visible
7. [ ] Verificar status "Active"

**Resultado esperado:** ✅ Leaderboard correcto, badges visibles, perfil actualizado

---

#### **Round 6: Edge Cases**

1. [ ] **Test 6.1:** Login como usuario normal (no credcamer)
   - Intentar acceder `/credcamer`
   - ✅ Debe mostrar error 403 o redirect

2. [ ] **Test 6.2:** Degradar credcamer
   - Admin → `/admin/credcamers`
   - Click "⬇️ Degradar"
   - ✅ Usuario pasa a tabla inferior
   - Login como ese usuario → Botón "Credcamer" desaparece

3. [ ] **Test 6.3:** Rechazar proyecto
   - Credcamer capta otro negocio
   - Admin rechaza
   - ✅ NO se otorgan puntos
   - ✅ Stats credcamer no cambian

4. [ ] **Test 6.4:** Upload imagen > 10MB
   - En wizard paso 4
   - Subir imagen grande
   - ✅ Error visible

**Resultado esperado:** ✅ Validaciones funcionando, edge cases manejados

---

## 📱 Responsive Testing

### Breakpoints a verificar:

```
Mobile:   375px  (iPhone SE)
Tablet:   768px  (iPad)
Desktop:  1024px (MacBook)
Large:    1440px (iMac)
```

### Páginas a testear:

- [ ] `/credcamer` - Dashboard
- [ ] `/credcamer/captar` - Wizard
- [ ] `/admin/credcamers` - Admin panel
- [ ] `/perfil/[id]` - Perfil proyecto

**Verificar:**
- [ ] Stats cards apilados verticalmente en mobile
- [ ] Tabs scrollables en mobile
- [ ] Wizard fields full width
- [ ] Botones accesibles
- [ ] Tablas scrollables horizontalmente
- [ ] Texto legible en todos los tamaños

---

## 🐛 Bug Report Template

```markdown
### Bug #___: [Título Descriptivo]

**Prioridad:** 🔴 Alta / 🟡 Media / 🟢 Baja

**Descripción:**
[Descripción breve del problema]

**Pasos para reproducir:**
1. Ir a ...
2. Click en ...
3. Verificar que ...

**Resultado esperado:**
[Lo que debería pasar]

**Resultado actual:**
[Lo que realmente pasa]

**Screenshots:**
[Si aplica]

**Información adicional:**
- Browser: Chrome 118
- OS: Windows 11
- Rol: Credcamer
- Fecha: 2025-10-16

**Status:** 🟠 Abierto / 🔵 En Progreso / 🟢 Resuelto
```

---

## 📊 Test Results Summary

**Fecha:** __________  
**Tester:** __________  
**Duración:** ______ minutos

### Resultados:

| Test Round | Status | Bugs Found | Notes |
|------------|--------|------------|-------|
| Round 1: Promoción | ⏳ | 0 | |
| Round 2: Dashboard | ⏳ | 0 | |
| Round 3: Wizard | ⏳ | 0 | |
| Round 4: Aprobación | ⏳ | 0 | |
| Round 5: Leaderboard | ⏳ | 0 | |
| Round 6: Edge Cases | ⏳ | 0 | |
| Responsive | ⏳ | 0 | |

**Total Bugs Encontrados:** ____  
**Bugs Críticos:** ____  
**Status General:** ✅ Pasa / ❌ Falla

---

## 🚀 Post-Testing Actions

Una vez completado el testing:

### Si TODO pasa ✅:
1. [ ] Commit de código
2. [ ] Crear release tag v1.0.0
3. [ ] Deployment a staging
4. [ ] Documentación final
5. [ ] Demo para stakeholders

### Si hay bugs ❌:
1. [ ] Priorizar bugs (Alta/Media/Baja)
2. [ ] Fix bugs críticos primero
3. [ ] Re-test después de cada fix
4. [ ] Iterar hasta que todo pase

---

## 📞 Soporte

Si encuentras problemas:
1. Revisa logs del backend (terminal 1)
2. Revisa console del navegador (F12)
3. Revisa MongoDB Compass
4. Revisa `TESTING_E2E_CREDCAMER.md` para detalles

**Happy Testing!** 🎉
