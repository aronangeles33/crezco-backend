# ⚡ GUÍA RÁPIDA - CREZCO

## 🎯 LO MÁS IMPORTANTE

### ✅ USA ESTE SISTEMA:
- **Frontend**: http://localhost:3000 (Next.js + Clerk)
- **Backend**: http://localhost:3001 (Express + MongoDB)

### ❌ NO USES:
- ~~http://localhost:8080~~ (React+Vite antiguo - ELIMINADO)

---

## 🚀 Iniciar el Sistema (2 pasos)

### 1️⃣ Terminal 1 - Backend
```powershell
cd backend
node src/server.js
```
**Debes ver:**
```
📁 Intentando cargar .env desde: C:\...\backend\.env
🔑 STRIPE_SECRET_KEY cargada: SÍ (primeros 20 chars: sk_test_51PLqkvCH7lY...)
🔐 CLERK_SECRET_KEY cargada: SÍ
🗄️  MONGODB_URI cargada: SÍ
🚀 Servidor corriendo en puerto 3001
✅ MongoDB conectado
```

### 2️⃣ Terminal 2 - Frontend
```powershell
cd crezco-app
npm run dev
```
**Debes ver:**
```
▲ Next.js 14.2.33
- Local:        http://localhost:3000
✓ Ready in 5s
```

---

## 🧪 Probar Donaciones (FUNCIONALIDAD PRINCIPAL)

1. **Abre**: http://localhost:3000
2. **Login**: Ya estás como "aron angeles"
3. **Ve a Proyectos** → Selecciona cualquier proyecto
4. **Click "Donar"**
5. **Ingresa monto**: Mínimo 5€
6. **Datos de tarjeta** (Stripe Test):
   - Número: `4242 4242 4242 4242`
   - Fecha: `12/25`
   - CVC: `123`
   - Código postal: `28001`
7. **Submit** → ¡Debería funcionar! ✅

---

## 🔍 Verificar Estado

```powershell
# Ver si los servidores están corriendo
Test-NetConnection -ComputerName localhost -Port 3000 -InformationLevel Quiet  # Frontend
Test-NetConnection -ComputerName localhost -Port 3001 -InformationLevel Quiet  # Backend
```

---

## 🐛 Problemas Comunes

### Backend no inicia
```powershell
# Verifica que el puerto esté libre
netstat -ano | findstr :3001

# Si está ocupado, mata el proceso
Get-NetTCPConnection -LocalPort 3001 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }

# Reinicia
cd backend
node src/server.js
```

### Frontend no inicia
```powershell
# Verifica puerto
netstat -ano | findstr :3000

# Mata proceso si está ocupado
Get-NetTCPConnection -LocalPort 3000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }

# Reinicia
cd crezco-app
npm run dev
```

### Error 401 en donaciones
1. **Recarga la página** (F5)
2. El token se auto-renueva cada 50 minutos
3. Si persiste, cierra sesión y vuelve a entrar

### Error Stripe "No API key"
1. Verifica que `backend/.env` tenga `STRIPE_SECRET_KEY`
2. **Reinicia el backend** (importante después de cambiar .env)
3. Verifica en la consola del backend: `🔑 STRIPE_SECRET_KEY cargada: SÍ`

---

## 📂 Estructura Simplificada

```
impulso-crezco-main/
├── backend/              ← API (Puerto 3001)
│   ├── src/server.js    ← Ejecuta este archivo
│   └── .env             ← Variables de entorno
│
├── crezco-app/          ← Frontend (Puerto 3000)
│   ├── src/app/         ← Páginas Next.js
│   └── .env.local       ← Variables de entorno
│
└── *.md                 ← Documentación
```

---

## 📝 Variables de Entorno Clave

### Backend (`backend/.env`)
```env
PORT=3001
MONGODB_URI=mongodb+srv://...
CLERK_SECRET_KEY=sk_test_...
STRIPE_SECRET_KEY=sk_test_51PLqkvCH7lYLR0f...
```

### Frontend (`crezco-app/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## ✅ Checklist de Funcionamiento

- [ ] Backend corriendo en puerto 3001
- [ ] Frontend corriendo en puerto 3000
- [ ] MongoDB conectado (mensaje en terminal backend)
- [ ] Usuario logueado (ves tu nombre en header)
- [ ] Puedes ver proyectos
- [ ] Puedes crear un proyecto
- [ ] Puedes hacer una donación (tarjeta test)
- [ ] Puedes añadir comentarios

---

## 🎓 Próximos Pasos

1. ✅ **Sistema funcionando** (estás aquí)
2. ⏳ Crear páginas faltantes: /contact, /blog, /faq, /help
3. ⏳ Sistema de notificaciones por email
4. ⏳ Panel de administración
5. ⏳ Deploy a producción

---

## 🆘 Ayuda Rápida

**¿Backend cargando Stripe?**
```
🔑 STRIPE_SECRET_KEY cargada: SÍ ← DEBE DECIR "SÍ"
```

**¿Frontend conectado a backend?**
- Abre DevTools → Console
- Debes ver: "✅ Token de Clerk obtenido y sincronizado"

**¿Socket.IO conectado?**
- Backend debe mostrar: "✅ Cliente conectado: [ID]"

---

## 📚 Documentación Completa

- [README.md](./README.md) - Documentación completa
- [INICIAR_SISTEMA.md](./INICIAR_SISTEMA.md) - Guía detallada
- [BOTONES_Y_FUNCIONALIDADES.md](./BOTONES_Y_FUNCIONALIDADES.md) - Estado de features
- [DEBUG_AUTH.md](./DEBUG_AUTH.md) - Debugging autenticación

---

**Última actualización**: 15 de octubre de 2025
