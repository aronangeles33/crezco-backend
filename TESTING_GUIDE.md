# 🧪 Guía de Testing Completo - CREZCO Platform

## ✅ Estado del Sistema

### Backend (Puerto 3001)
- ✅ Express server corriendo
- ✅ MongoDB Atlas conectado
- ✅ Socket.IO iniciado
- ✅ Health endpoint: http://localhost:3001/health
- ✅ API endpoints funcionando

### Frontend (Puerto 3000)
- ✅ Next.js 14 corriendo
- ✅ Todas las páginas compilando sin errores críticos
- ✅ Sistema de autenticación Clerk activo
- ✅ Socket.IO integrado
- ✅ **NUEVO:** Sistema de donaciones con Stripe implementado

---

## 🎯 Flujo de Testing End-to-End

### Prerrequisitos
1. ✅ Backend corriendo en http://localhost:3001
2. ✅ Frontend corriendo en http://localhost:3000
3. ✅ MongoDB Atlas conectado
4. ✅ Variables de entorno configuradas

---

## 📝 Test 1: Registro y Autenticación

### Pasos:
1. **Abrir navegador:**
   ```
   http://localhost:3000
   ```

2. **Click en "Registrarse" (botón superior derecho)**

3. **Completar formulario de Clerk:**
   - Email: tu_email@ejemplo.com
   - Contraseña: (mínimo 8 caracteres)
   - Nombre: Tu Nombre

4. **Verificar redirección a Dashboard**
   - URL debe ser: http://localhost:3000/dashboard
   - Deberías ver tu nombre en el header
   - Stats cards deberían mostrar 0 proyectos, 0€ donado

5. **✅ Resultado esperado:**
   - Usuario creado en Clerk
   - Usuario auto-creado en MongoDB (middleware)
   - Dashboard visible con datos vacíos

---

## 📝 Test 2: Crear Proyecto

### Pasos:
1. **Desde Dashboard, click "Crear Proyecto"**
   - O navegar directamente a: http://localhost:3000/create

2. **Paso 1: Información Básica**
   - Título: "Mi Startup Innovadora de Tecnología"
   - Descripción: (mínimo 50 caracteres)
     ```
     Este es un proyecto innovador que busca revolucionar 
     la forma en que las personas aprenden programación. 
     Necesitamos financiación para desarrollar la plataforma.
     ```
   - Click "Siguiente"

3. **Paso 2: Objetivo y Categoría**
   - Objetivo: 5000€
   - Categoría: Click en "🚀 Startup"
   - Click "Siguiente"

4. **Paso 3: Revisar y Publicar**
   - Verificar todos los datos
   - Click "Publicar Proyecto"

5. **✅ Resultado esperado:**
   - Toast de éxito: "¡Proyecto creado exitosamente!"
   - Redirección a /projects/[id] con tu proyecto
   - Proyecto visible en la página
   - En dashboard → "Mis Proyectos" debería aparecer

---

## 📝 Test 3: Explorar Proyectos

### Pasos:
1. **Click en "Explorar" en el header**
   - URL: http://localhost:3000/projects

2. **Usar filtros:**
   - Buscar: escribe palabras del título
   - Categoría: selecciona "Startup"
   - Ordenar por: "Más recientes"

3. **Click en tu proyecto creado**
   - Deberías ver la página de detalle

4. **✅ Resultado esperado:**
   - Grid de proyectos visible
   - Filtros funcionando
   - Paginación (si hay más de 12 proyectos)
   - Cards clickeables

---

## 📝 Test 4: Sistema de Donaciones (NUEVO 🎉)

### Pasos:

#### 4.1. Abrir Modal de Donación
1. **En la página de detalle del proyecto:**
   - Sidebar derecho → Click "Apoyar este proyecto"

2. **Verificar que el modal se abre**
   - Título: "Apoyar: [Nombre del Proyecto]"
   - Barra de progreso del proyecto visible
   - Opciones de monto (5€, 10€, 20€, 50€, 100€)

#### 4.2. Configurar Donación
1. **Seleccionar monto:**
   - Click en "20€" (botón preset)
   - O ingresar monto personalizado en el input

2. **Agregar mensaje (opcional):**
   - "¡Mucho éxito con tu proyecto!"

3. **Marcar/desmarcar "Anónimo"** (opcional)

4. **Verificar monto total:**
   - Debe mostrar el monto seleccionado en grande

#### 4.3. Ingresar Datos de Tarjeta de Prueba
1. **En el campo de Stripe CardElement, ingresar:**
   ```
   Número de Tarjeta: 4242 4242 4242 4242
   Fecha de Vencimiento: 12/25 (cualquier fecha futura)
   CVV: 123 (cualquier 3 dígitos)
   Código Postal: 28001 (cualquier código)
   ```

2. **Verificar que el campo se completa sin errores:**
   - Debe mostrar check verde o no mostrar error rojo
   - Botón "Donar 20€" debe habilitarse

#### 4.4. Completar Pago
1. **Click en "Donar 20€"**

2. **Esperar procesamiento:**
   - Botón debe cambiar a "Procesando..."
   - No toma más de 3-5 segundos

3. **✅ Resultado esperado:**
   - Toast de éxito: "¡Donación exitosa! Gracias por tu apoyo 💚"
   - Pantalla de confirmación en el modal con check verde
   - Modal se cierra automáticamente después de 2 segundos
   - Página se recarga mostrando el monto actualizado
   - **IMPORTANTE:** En consola del navegador deberías ver:
     ```
     POST http://localhost:3001/api/donations/create-payment-intent 200 OK
     ```

#### 4.5. Verificar Actualización
1. **En la página del proyecto:**
   - El "currentAmount" debe haber aumentado en 20€
   - El número de "donantes" debe haber aumentado en 1
   - La barra de progreso debe reflejar el nuevo %

2. **En el Dashboard (/dashboard):**
   - Tab "Mis Donaciones" debe mostrar la donación
   - Card del proyecto con monto donado
   - Total donado actualizado

3. **En la consola del servidor backend:**
   - Deberías ver logs de Stripe webhook (si está configurado)
   - O logs de creación de donación

---

## 📝 Test 5: Notificaciones en Tiempo Real (Socket.IO)

### Pasos:

#### 5.1. Preparar Dos Navegadores
1. **Navegador 1: Usuario Creador (tu cuenta actual)**
   - Ir a Dashboard: http://localhost:3000/dashboard

2. **Navegador 2: Modo Incógnito (nuevo usuario)**
   - Registrarse con otro email
   - Ir a proyectos: http://localhost:3000/projects

#### 5.2. Hacer Donación desde Navegador 2
1. **En Navegador 2:**
   - Click en tu proyecto (del Navegador 1)
   - Click "Apoyar este proyecto"
   - Donar 50€ con tarjeta de prueba

2. **✅ Resultado esperado en Navegador 1:**
   - **Toast notification automática:** "¡Nueva donación recibida! [Nombre] donó 50€"
   - En consola del navegador:
     ```
     ✅ Socket.IO conectado
     💚 Nueva donación: {amount: 50, donor: {...}}
     ```

#### 5.3. Verificar Badge Automático
1. **Después de la donación en Navegador 2:**
   - Verificar si aparece notificación de badge
   - Depende del monto y del historial del usuario

2. **Badges disponibles:**
   - 🎉 Primera Donación (primera vez)
   - 💚 Donador Generoso (≥50€ acumulado)
   - ⭐ Donador Estrella (≥100€ acumulado)
   - 👑 Mecenas (≥500€ acumulado)
   - 🏆 Filántropo (≥1000€ acumulado)

3. **✅ Resultado esperado:**
   - Toast: "¡Nueva Insignia Desbloqueada! 🎉 Primera Donación"
   - Badge visible en Dashboard → sección de logros

---

## 📝 Test 6: Comentarios en Proyecto

### Pasos:
1. **En página de detalle del proyecto:**
   - Tab "Comentarios"

2. **Escribir comentario:**
   - "¡Excelente proyecto! Te apoyo 100%"

3. **Click "Publicar Comentario"**

4. **✅ Resultado esperado:**
   - Toast: "Comentario publicado"
   - Comentario visible en la lista
   - Avatar y nombre del usuario
   - Fecha de publicación

---

## 📝 Test 7: Editar/Eliminar Proyecto

### Pasos:
1. **Ir a Dashboard → Tab "Mis Proyectos"**

2. **En tu proyecto:**
   - Click botón "Editar" (lápiz)
   - *Nota: Página de edición aún no implementada, mostrará 404*

3. **Click botón "Eliminar" (papelera)**
   - Confirmar en el diálogo
   - ✅ Resultado: Proyecto eliminado, toast de confirmación

---

## 🔍 Verificación en Base de Datos

### Verificar Datos Creados:

#### 1. Usar MongoDB Compass:
```
Connection String:
mongodb+srv://aronangeles33_db_user:nMUmvVAEBc21rhIE@cluster0.rx8jgic.mongodb.net/
```

#### 2. Verificar Colecciones:

**Collection: users**
```json
{
  "_id": ObjectId,
  "clerkId": "user_xxx",
  "email": "tu_email@ejemplo.com",
  "name": "Tu Nombre",
  "role": "creator",
  "totalDonated": 0,
  "badges": [],
  "projects": [ObjectId]
}
```

**Collection: projects**
```json
{
  "_id": ObjectId,
  "title": "Mi Startup Innovadora...",
  "description": "...",
  "creator": ObjectId (ref User),
  "goalAmount": 5000,
  "currentAmount": 20,
  "donors": 1,
  "category": "startup",
  "status": "active",
  "createdAt": ISODate
}
```

**Collection: donations**
```json
{
  "_id": ObjectId,
  "amount": 20,
  "donor": ObjectId (ref User),
  "project": ObjectId (ref Project),
  "stripePaymentIntentId": "pi_xxx",
  "status": "succeeded",
  "message": "¡Mucho éxito...",
  "anonymous": false,
  "createdAt": ISODate
}
```

---

## 🐛 Troubleshooting

### Problema: Modal de donación no abre
**Solución:**
- Verificar que estás logueado (Clerk)
- Abrir consola del navegador (F12) y buscar errores
- Verificar que backend está corriendo

### Problema: Stripe no acepta la tarjeta
**Solución:**
- Usar exactamente: 4242 4242 4242 4242
- Fecha futura: 12/25 o superior
- Cualquier CVV de 3 dígitos
- Verificar que tienes internet (Stripe requiere conexión)

### Problema: No aparecen notificaciones de Socket.IO
**Solución:**
- Abrir consola del navegador
- Verificar: "✅ Socket.IO conectado"
- Si no aparece, verificar que backend está corriendo
- Revisar logs del backend para ver conexiones Socket.IO

### Problema: Página en blanco o error 404
**Solución:**
- Verificar que Next.js está corriendo: http://localhost:3000
- Reiniciar el servidor: Ctrl+C, luego `npm run dev`
- Limpiar caché: Ctrl+Shift+R (hard refresh)

### Problema: "Cannot find module @clerk/nextjs"
**Solución:**
- Error de TypeScript, no afecta ejecución
- Páginas funcionan correctamente
- Para eliminar: reiniciar TypeScript server en VS Code

---

## 📊 Métricas de Éxito

### Al completar todos los tests, deberías tener:

✅ **Usuarios:** Al menos 2 usuarios creados
✅ **Proyectos:** Al menos 1 proyecto publicado  
✅ **Donaciones:** Al menos 2 donaciones realizadas
✅ **Comentarios:** Al menos 1 comentario publicado
✅ **Badges:** Al menos 1 badge desbloqueado
✅ **Notificaciones:** Toast notifications funcionando
✅ **Socket.IO:** Conexión establecida y eventos recibidos

---

## 🎬 Video Demo (Simulación)

### Grabar tu pantalla mostrando:
1. Registro de usuario
2. Creación de proyecto
3. Navegación por /projects
4. Donación completa con Stripe
5. Notificación de badge en tiempo real
6. Dashboard con stats actualizados

---

## 🚀 Siguiente Pasos (Opcional)

### Mejoras Futuras:
1. **Página de edición de proyectos** (/projects/[id]/edit)
2. **Subida de imágenes real** (actualmente solo emojis)
3. **Sistema de recompensas** en crear proyecto
4. **Página de perfil público** (/profile/[id])
5. **Sistema de seguir proyectos/usuarios**
6. **Infinite scroll** en /projects
7. **Filtros avanzados** (ubicación, rango)
8. **Panel de analytics** para creadores
9. **Sistema de mensajería** entre usuarios
10. **Integración de pagos recurrentes**

---

## 📞 Soporte

Si encuentras algún error durante el testing:

1. **Revisar logs del backend:**
   ```bash
   # En terminal del backend
   # Debería mostrar requests y errores
   ```

2. **Revisar consola del navegador:**
   ```
   F12 → Console
   Buscar errores en rojo
   ```

3. **Verificar variables de entorno:**
   ```bash
   # backend/.env
   MONGODB_URI=mongodb+srv://...
   CLERK_SECRET_KEY=sk_test_...
   STRIPE_SECRET_KEY=sk_test_...

   # crezco-app/.env.local
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

---

## ✅ Checklist Final

Antes de decir "¡FUNCIONA!":

- [ ] Backend corriendo sin errores
- [ ] Frontend corriendo sin errores críticos
- [ ] Registro de usuario exitoso
- [ ] Login funcional
- [ ] Crear proyecto completo
- [ ] Ver proyecto en /projects
- [ ] **Modal de donación abre correctamente**
- [ ] **Stripe CardElement visible**
- [ ] **Donación con tarjeta de prueba exitosa**
- [ ] **Monto del proyecto actualizado**
- [ ] **Stats del dashboard actualizados**
- [ ] Socket.IO conectado (consola)
- [ ] Notificación de donación recibida (toast)
- [ ] Badge desbloqueado (si aplica)
- [ ] Comentarios funcionando
- [ ] Navegación entre páginas fluida

---

## 🎉 ¡Sistema Completo y Funcional!

Si todos los tests pasan, tienes un **MVP profesional de plataforma de crowdfunding** con:

✅ Autenticación real (Clerk)
✅ Backend robusto (Express + MongoDB)
✅ Frontend moderno (Next.js 14)
✅ Pagos reales (Stripe)
✅ Tiempo real (Socket.IO)
✅ Sistema de badges automático
✅ UI profesional (Shadcn/UI + Tailwind)
✅ Validaciones completas
✅ Seguridad (JWT, HTTPS ready)
✅ Responsive design
✅ Dark mode

**¡Felicidades! Tu plataforma CREZCO está lista para demostración o producción inicial.** 🚀
