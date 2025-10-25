# 🚀 CÓMO INICIAR EL SISTEMA CREZCO

## ⚠️ IMPORTANTE: USAR DOS TERMINALES SEPARADAS

Las terminales de VS Code tienen problemas manteniendo procesos en background.
**Debes abrir 2 ventanas de PowerShell MANUALMENTE.**

---

## 📝 PASO 1: ABRIR POWERSHELL #1 (BACKEND)

1. **Presiona:** `Win + R`
2. **Escribe:** `powershell`
3. **Presiona:** `Enter`

### En esta terminal ejecuta:

```powershell
cd c:\Users\elmou\Desktop\dinero\impulso-crezco-main\backend
node src\server.js
```

### ✅ Debes ver:

```
🚀 Servidor corriendo en puerto 3001
🌍 Entorno: development
📡 Socket.IO activo
✅ MongoDB conectado: ac-rrpnf1e-shard-00-02.rx8jgic.mongodb.net
```

**DEJA ESTA TERMINAL ABIERTA** ← NO LA CIERRES

---

## 📝 PASO 2: ABRIR POWERSHELL #2 (FRONTEND)

1. **Presiona:** `Win + R` de nuevo
2. **Escribe:** `powershell`
3. **Presiona:** `Enter`

### En esta segunda terminal ejecuta:

```powershell
cd c:\Users\elmou\Desktop\dinero\impulso-crezco-main\crezco-app
npm run dev
```

### ✅ Debes ver:

```
▲ Next.js 14.2.33
- Local:        http://localhost:3000

✓ Starting...
✓ Ready in 4.5s
```

**DEJA ESTA TERMINAL ABIERTA** ← NO LA CIERRES

---

## 🧪 PASO 3: PROBAR EL SISTEMA

### 1. Abrir navegador

**Abre Chrome/Edge en modo incógnito:**
- Presiona `Ctrl + Shift + N`

### 2. Ir a la página de registro

**URL:** `http://localhost:3000/signup`

### 3. Verificar consola del navegador

**Abre la consola:** Presiona `F12`

**Debes ver:**
- ✅ **SIN** el error: "Clerk: The <SignUp/> component is not configured correctly... route is not a catch-all route"
- ✅ **SIN** errores 401 Unauthorized después de registrarte
- ✅ Mensaje: "✅ Socket.IO conectado"
- ⚠️ Puedes ignorar: "404 icons/icon-144x144.png" (no es crítico)

### 4. Flujo completo de testing

#### A. Registrarse

1. Completa el formulario de Clerk en `/signup`
2. Confirma tu email si es necesario
3. Deberías ser redirigido al dashboard

#### B. Crear un proyecto

1. Desde el dashboard, click "Crear Proyecto"
2. Completa los 3 pasos del formulario:
   - **Paso 1:** Título y descripción
   - **Paso 2:** Meta económica y categoría
   - **Paso 3:** Previsualizar y publicar

#### C. Realizar una donación

1. Ve a `/projects` para ver tu proyecto
2. Click en el proyecto para abrir el detalle
3. Click "Apoyar este proyecto"
4. En el modal de donación:
   - **Monto:** Cualquier preset (5€, 10€, 20€, 50€, 100€) o custom
   - **Tarjeta:** `4242 4242 4242 4242`
   - **Fecha:** `12/25`
   - **CVV:** `123`
   - **Código Postal:** `28001`
5. Click "Confirmar donación"
6. Deberías ver:
   - ✅ Toast de éxito
   - ✅ Notificación de badge "Primera Donación 🎉"
   - ✅ Proyecto actualizado con nuevo monto

#### D. Verificar dashboard

1. Ve a `/dashboard`
2. Verifica que tus stats se actualizaron:
   - **Proyectos creados:** 1
   - **Donaciones recibidas:** 1
   - **Badges:** "Primera Donación 🎉"

---

## 🔍 TROUBLESHOOTING

### Si ves el error de Clerk sobre catch-all routes:

1. **Detén ambos servidores:**
   - En cada terminal, presiona `Ctrl + C`

2. **Verifica que las rutas existen:**
   ```powershell
   # En PowerShell:
   Test-Path "c:\Users\elmou\Desktop\dinero\impulso-crezco-main\crezco-app\src\app\(auth)\login\[[...rest]]\page.tsx"
   Test-Path "c:\Users\elmou\Desktop\dinero\impulso-crezco-main\crezco-app\src\app\(auth)\signup\[[...rest]]\page.tsx"
   ```
   Ambos deben devolver `True`

3. **Limpia el cache de Next.js:**
   ```powershell
   cd c:\Users\elmou\Desktop\dinero\impulso-crezco-main\crezco-app
   Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
   npm run dev
   ```

4. **Limpia el cache del navegador:**
   - Cierra TODAS las pestañas de localhost:3000
   - Abre incógnito de nuevo
   - Ve a `/signup`

### Si ves errores 401 Unauthorized:

Esto es **normal ANTES de autenticarte**. Después de registrarte e iniciar sesión, estos errores deben desaparecer.

### Si el backend no conecta a MongoDB:

Verifica que el archivo `.env` existe:
```powershell
Get-Content c:\Users\elmou\Desktop\dinero\impulso-crezco-main\backend\.env
```

Debe contener:
```
MONGODB_URI=mongodb+srv://aronangeles33_db_user:nMUmvVAEBc21rhIE@cluster0.rx8jgic.mongodb.net/crezco?retryWrites=true&w=majority&appName=Cluster0
```

---

## 📊 URLs IMPORTANTES

- **Homepage:** http://localhost:3000/
- **Proyectos:** http://localhost:3000/projects
- **Registro:** http://localhost:3000/signup
- **Login:** http://localhost:3000/login
- **Dashboard:** http://localhost:3000/dashboard
- **Crear Proyecto:** http://localhost:3000/create
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health

---

## 🎯 TARJETA DE PRUEBA STRIPE

Usa estos datos para las donaciones de prueba:

- **Número:** `4242 4242 4242 4242`
- **Fecha:** `12/25` (cualquier fecha futura)
- **CVV:** `123` (cualquier 3 dígitos)
- **Código Postal:** `28001` (cualquier código)

---

## 🎉 SISTEMA LISTO

Si sigues estos pasos, tu plataforma CREZCO estará completamente funcional con:

- ✅ Autenticación con Clerk (sin errores)
- ✅ Sistema de proyectos completo
- ✅ Donaciones reales con Stripe
- ✅ Notificaciones en tiempo real con Socket.IO
- ✅ Sistema de badges y gamificación
- ✅ Dashboard interactivo

**¡Disfruta tu plataforma de crowdfunding profesional!** 🚀
