# 🧪 TESTING E2E - Credcamer System

## ✅ Checklist Completo de Testing

---

## 📋 Pre-requisitos

### Servidores corriendo:
```bash
# Terminal 1 - Backend
cd backend
npm run dev
# ✅ Running on http://localhost:3001

# Terminal 2 - Frontend
cd crezco-app
npm run dev
# ✅ Running on http://localhost:3002
```

### Usuarios de prueba necesarios:
- **Admin:** Ya existe (promovido con promote-admin.js)
- **Usuario Normal 1:** Para promover a credcamer
- **Usuario Normal 2:** Para testear leaderboard
- **Usuario Normal 3:** Opcional (competencia)

---

## 🧪 Test 1: Promover Usuario a Credcamer

### **Objetivo:** Verificar que el sistema de promoción funciona correctamente.

### **Pasos:**

1. **Login como Admin**
   - Ir a: `http://localhost:3002`
   - Clerk sign in con cuenta admin
   - Verificar badge "Admin" en algún lugar

2. **Acceder al Panel de Credcamers**
   ```
   URL: http://localhost:3002/admin/credcamers
   ```
   
   **✅ Verificar:**
   - Stats cards visibles (Total Credcamers, Captados, Puntos, Elite+)
   - Tabla "Usuarios Normales" con lista de usuarios
   - Botón "⬆️ Promover" visible

3. **Promover Usuario**
   - Click en "⬆️ Promover" de un usuario normal
   - Confirmar dialog
   - **✅ Verificar:** Alert "✅ Usuario promovido a Credcamer exitosamente"
   - **✅ Verificar:** Usuario desaparece de tabla inferior
   - **✅ Verificar:** Usuario aparece en tabla superior "Credcamers Activos"

4. **Verificar en Backend (Opcional)**
   ```bash
   # MongoDB Compass o terminal
   db.users.findOne({ email: "usuario@test.com" })
   
   # Debe mostrar:
   {
     role: "credcamer",
     credcamerPoints: 0,
     credcamerLevel: "Novato",
     totalCaptured: 0
   }
   ```

5. **Logout y Login como Credcamer**
   - Sign out
   - Sign in con usuario recién promovido
   - **✅ Verificar:** Botón "📈 Credcamer" visible en header (desktop)
   - **✅ Verificar:** Botón también en menú móvil

### **Resultado Esperado:**
- ✅ Promoción exitosa
- ✅ Rol actualizado en DB
- ✅ UI muestra botón Credcamer
- ✅ Stats iniciales en cero

---

## 🧪 Test 2: Dashboard Credcamer

### **Objetivo:** Verificar que el dashboard muestre correctamente stats, tabs y recomendaciones.

### **Pasos:**

1. **Acceder al Dashboard**
   ```
   URL: http://localhost:3002/credcamer
   ```

2. **Verificar Stats Cards**
   - **Total Captados:** 0
   - **Puntos:** 0
   - **Nivel:** 🌱 Novato
   - **Pendientes:** 0

3. **Verificar Tabs**
   - **📦 Mis Capturas:** Debe mostrar mensaje "No has captado negocios aún"
   - **💡 Recomendaciones:** Debe mostrar 3 recomendaciones mock
   - **🏆 Ranking:** Debe mostrar leaderboard (vacío si no hay otros credcamers)

4. **Verificar Botón Principal**
   - Botón "➕ Captar Negocio" visible en header del dashboard
   - Click debe llevar a `/credcamer/captar`

5. **Responsive Test**
   - Resize ventana a móvil (< 768px)
   - **✅ Verificar:** Stats cards apilados verticalmente
   - **✅ Verificar:** Tabs scrollables horizontalmente
   - **✅ Verificar:** Botón "Captar" sigue visible

### **Resultado Esperado:**
- ✅ Dashboard carga sin errores
- ✅ Stats muestran valores iniciales correctos
- ✅ Tabs funcionan correctamente
- ✅ Recomendaciones mock visibles
- ✅ Responsive funcionando

---

## 🧪 Test 3: Captar Negocio (Wizard 6 Pasos)

### **Objetivo:** Completar el wizard de captación y verificar localStorage + submit.

### **Pasos:**

1. **Iniciar Captación**
   ```
   Click en "➕ Captar Negocio"
   URL: http://localhost:3002/credcamer/captar
   ```

2. **Step 1: Dueño del Negocio**
   - Nombre: `María González`
   - Contacto: `maria@cafe.com`
   - Ubicación: `Av. Principal #123, Centro`
   - Notas: `Contactada el 16/10, muy interesada en financiamiento`
   - Click "Siguiente →"
   - **✅ Verificar:** Badge "💾 Borrador guardado" aparece 2 segundos

3. **Step 2: Identidad**
   - Título: `Café Artesanal El Rincón`
   - Descripción: `Cafetería local con productos orgánicos y ambientación acogedora...`
   - Meta: `50000`
   - Categoría: `shop`
   - Click "Siguiente →"

4. **Step 3: Historia**
   - Historia: `Somos una cafetería familiar que lleva 5 años en el barrio...`
   - Pitch: `El mejor café artesanal de la ciudad`
   - Audios: Dejar vacío o agregar URL
   - Click "Siguiente →"

5. **Step 4: Multimedia**
   - **Opción A - Upload:** 
     - Click "Subir Foto"
     - Seleccionar imagen (< 10MB)
     - Esperar progress bar 0-100%
     - **✅ Verificar:** URL de Cloudinary generada
   - **Opción B - Manual:**
     - Toggle a "Agregar URL"
     - Pegar: `https://via.placeholder.com/800x600?text=Cafe`
   - Click "Siguiente →"

6. **Step 5: Redes Sociales**
   - Instagram: `@cafeelrincon`
   - Facebook: `facebook.com/cafeelrincon`
   - Website: `cafeelrincon.com`
   - Dejar otros vacíos
   - Click "Siguiente →"

7. **Step 6: Revisar**
   - **✅ Verificar:** Preview completo del proyecto
   - **✅ Verificar:** Info del dueño en cuadro púrpura
   - **✅ Verificar:** Warning "⚠️ Este negocio quedará pendiente de revisión"
   - Click "📈 Captar Negocio"

8. **Verificar Submit**
   - **✅ Verificar:** Alert "✅ Negocio captado exitosamente!"
   - **✅ Verificar:** Redirect a `/credcamer`
   - **✅ Verificar:** Proyecto aparece en tab "📦 Mis Capturas"
   - **✅ Verificar:** Status badge "⏳ Pendiente"

### **LocalStorage Test (Antes de Submit):**

```javascript
// Abrir DevTools → Console
localStorage.getItem('crezco_credcamer_capture_draft')

// Debe retornar JSON con:
{
  businessOwnerName: "María González",
  businessOwnerContact: "maria@cafe.com",
  title: "Café Artesanal El Rincón",
  currentStep: 6,
  savedAt: "2025-10-16T..."
}
```

### **Resultado Esperado:**
- ✅ Wizard completo sin errores
- ✅ Auto-save funciona en cada paso
- ✅ Validación por paso correcta
- ✅ Submit exitoso
- ✅ Proyecto en pending_review
- ✅ LocalStorage limpiado después de submit

---

## 🧪 Test 4: Aprobación por Admin + Puntos

### **Objetivo:** Verificar que la aprobación otorgue puntos automáticamente.

### **Pasos:**

1. **Login como Admin**
   - Sign out del credcamer
   - Sign in con cuenta admin

2. **Ver Proyectos Pendientes**
   ```
   URL: http://localhost:3002/admin/pending
   ```
   - **✅ Verificar:** Proyecto "Café Artesanal El Rincón" visible
   - **✅ Verificar:** Badge "📈 Captado por Credcamer" visible
   - **✅ Verificar:** Info del dueño (María González) visible

3. **Aprobar Proyecto**
   - Click en "✅ Aprobar"
   - Confirmar dialog
   - **✅ Verificar:** Alert de éxito
   - **✅ Verificar:** Proyecto desaparece de pendientes

4. **Verificar Puntos Otorgados**
   
   **Cálculo Esperado:**
   ```javascript
   // Proyecto: $50,000 meta + foto + historia
   Base: 10 pts
   Monto: 50,000 / 1000 = 50 pts
   Foto: +5 pts
   Historia: +3 pts
   TOTAL: 68 puntos
   ```

5. **Verificar en Dashboard Credcamer**
   - Login nuevamente como credcamer
   - Ir a `/credcamer`
   - **✅ Verificar:** Stats actualizados:
     - Total Captados: 1
     - Puntos: 68
     - Nivel: ⭐ Pro (alcanzó umbral 50+)
     - Aprobados: 1

6. **Verificar en Perfil del Proyecto**
   ```
   URL: http://localhost:3002/perfil/[PROJECT_ID]
   ```
   - **✅ Verificar:** Badge "📈 Captado por Credcamer" visible
   - **✅ Verificar:** Estado "Active"

### **Backend Verification (Opcional):**

```bash
# MongoDB Compass
db.users.findOne({ email: "credcamer@test.com" })

# Debe mostrar:
{
  credcamerPoints: 68,
  credcamerLevel: "Pro",
  totalCaptured: 1
}

db.projects.findOne({ title: "Café Artesanal El Rincón" })

# Debe mostrar:
{
  status: "active",
  capturedBy: ObjectId("..."),
  pointsAwarded: 68,
  businessOwner: {
    name: "María González",
    contact: "maria@cafe.com"
  }
}
```

### **Resultado Esperado:**
- ✅ Aprobación exitosa
- ✅ Puntos calculados correctamente
- ✅ Nivel actualizado a Pro
- ✅ Stats reflejados en dashboard
- ✅ Badge visible en perfil

---

## 🧪 Test 5: Leaderboard

### **Objetivo:** Verificar ranking público y highlights.

### **Pasos:**

1. **Acceder al Leaderboard (Como Credcamer)**
   ```
   URL: http://localhost:3002/credcamer
   Tab: 🏆 Ranking
   ```

2. **Verificar Tabla**
   - **✅ Verificar:** Credcamer actual en posición #1
   - **✅ Verificar:** Avatar, nombre, nivel visible
   - **✅ Verificar:** 68 puntos mostrados
   - **✅ Verificar:** 1 negocio captado
   - **✅ Verificar:** Highlight (bg-purple-100) en tu fila
   - **✅ Verificar:** Badge "Tú" visible

3. **Crear Segundo Credcamer (Opcional - Para Competencia)**
   - Promover otro usuario
   - Captar negocio como ese usuario
   - Aprobar (con menos puntos)
   - **✅ Verificar:** Leaderboard ordenado por puntos desc
   - **✅ Verificar:** Medallas 🥇🥈 para top 2

4. **Acceso Público (Sin Login)**
   ```
   URL: http://localhost:3002/credcamer/leaderboard (si existe ruta pública)
   ```
   - **✅ Verificar:** Leaderboard visible sin autenticación
   - **✅ Verificar:** No hay highlight (no estás logueado)

### **Resultado Esperado:**
- ✅ Leaderboard carga correctamente
- ✅ Ordenamiento por puntos desc
- ✅ Highlight para usuario actual
- ✅ Medallas para top 3
- ✅ Avatar y nivel visibles

---

## 🧪 Test 6: Edge Cases y Validaciones

### **Test 6.1: Intentar captar sin ser credcamer**

1. Login con usuario normal (no promovido)
2. Intentar acceder a `/credcamer`
3. **✅ Verificar:** Redirect o mensaje de acceso denegado
4. **✅ Verificar:** Botón "📈 Credcamer" NO visible en header

### **Test 6.2: Degradar credcamer**

1. Admin abre `/admin/credcamers`
2. Click en "⬇️ Degradar" de un credcamer
3. Confirmar
4. **✅ Verificar:** Usuario pasa a tabla inferior
5. **✅ Verificar:** Rol cambia a "supporter"
6. **✅ Verificar:** Puntos/nivel se mantienen en DB (no se borran)
7. Login como ese usuario
8. **✅ Verificar:** Botón "📈 Credcamer" desaparece del header

### **Test 6.3: Rechazar proyecto captado**

1. Credcamer capta otro negocio
2. Admin rechaza el proyecto
3. **✅ Verificar:** NO se otorgan puntos
4. **✅ Verificar:** Stats credcamer no cambian
5. **✅ Verificar:** Proyecto aparece en tab "Rechazados" con badge "❌"

### **Test 6.4: Editar proyecto captado**

1. Como credcamer, ir a perfil de proyecto captado
2. **✅ Verificar:** Botón "✏️ Editar Proyecto" NO visible (solo owner puede editar)
3. Como admin, verificar que sí puede editar (pending feature)

### **Test 6.5: Upload de imagen > 10MB**

1. En wizard paso 4
2. Intentar subir imagen > 10MB
3. **✅ Verificar:** Error visible "Imagen muy grande"
4. **✅ Verificar:** No se sube a Cloudinary

### **Test 6.6: Submit sin completar campos requeridos**

1. En wizard paso 1, dejar nombre vacío
2. Click "Siguiente"
3. **✅ Verificar:** Error "Por favor completa los campos obligatorios"
4. **✅ Verificar:** No avanza al siguiente paso

---

## 🧪 Test 7: Responsive y Mobile

### **Pasos:**

1. **Resize ventana a 375px (iPhone SE)**
2. **Verificar Dashboard Credcamer:**
   - Stats cards apilados verticalmente
   - Tabs scrollables horizontalmente
   - Botón "Captar" sigue accesible

3. **Verificar Wizard:**
   - Campos full width
   - Botones "Anterior/Siguiente" visibles
   - Progress bar responsive

4. **Verificar Leaderboard:**
   - Tabla scrollable horizontalmente
   - Avatar no se deforma
   - Texto legible

5. **Verificar Admin Panel:**
   - Tablas scrollables
   - Botones accesibles
   - No overflow horizontal

### **Breakpoints a testear:**
- 375px (Mobile)
- 768px (Tablet)
- 1024px (Desktop)
- 1440px (Large Desktop)

---

## 🧪 Test 8: Performance y Carga

### **Métricas a verificar:**

1. **Tiempo de carga inicial:**
   - Dashboard: < 2s
   - Wizard: < 1.5s
   - Leaderboard: < 1s

2. **Navegación entre tabs:**
   - Sin reloads innecesarios
   - Estados se mantienen

3. **LocalStorage:**
   - Auto-save no causa lag
   - Badge aparece sin delay

4. **Upload de imagen:**
   - Progress bar actualiza smooth
   - No bloquea UI

---

## ✅ Checklist Final

### Backend:
- [ ] User promotion funciona
- [ ] Project capture crea registro correcto
- [ ] Approve otorga puntos automáticamente
- [ ] Nivel se actualiza correctamente
- [ ] Leaderboard ordenado por puntos

### Frontend:
- [ ] Dashboard carga sin errores
- [ ] Wizard 6 pasos completo
- [ ] LocalStorage auto-save funciona
- [ ] Botón Credcamer visible solo para credcamers
- [ ] Badges visibles en perfiles
- [ ] Leaderboard muestra highlights
- [ ] Responsive en todos los breakpoints

### Seguridad:
- [ ] requireCredcamer bloquea no-credcamers
- [ ] requireAdmin bloquea no-admins
- [ ] Edit ownership validation funciona

### UX:
- [ ] Transiciones suaves
- [ ] Alerts informativos
- [ ] Loading states visibles
- [ ] Error messages claros

---

## 🐛 Bugs Encontrados (Registrar aquí)

### Bug #1: [Título]
**Descripción:**
**Pasos para reproducir:**
**Resultado esperado:**
**Resultado actual:**
**Prioridad:** Alta/Media/Baja
**Status:** Abierto/En progreso/Resuelto

---

## 📊 Resultados del Testing

**Fecha:** _____________  
**Tester:** _____________  
**Duración:** _____________

### Tests Pasados: ____ / 8
### Bugs Encontrados: ____
### Bugs Críticos: ____

**Notas adicionales:**

---

## 🚀 Siguiente Paso

Una vez completado este testing E2E:
1. ✅ Corregir bugs críticos
2. ✅ Ajustes visuales menores
3. ✅ Optimizaciones de performance
4. ✅ Deployment a staging
5. ✅ Testing en producción

---

**Testing Guide Version:** 1.0  
**Last Updated:** Oct 16, 2025
