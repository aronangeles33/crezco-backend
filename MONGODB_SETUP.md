# 🔴 ERROR DETECTADO: MongoDB no conectado

## Problema
El backend está corriendo correctamente, pero MongoDB no está configurado. Error:
```
MongooseError: Operation `projects.find()` buffering timed out after 10000ms
```

## ✅ Soluciones

### Opción 1: MongoDB Atlas (☁️ Cloud - RECOMENDADO)

**Más fácil y rápido - 5 minutos**

1. **Crear cuenta gratuita**:
   - Ve a: https://www.mongodb.com/cloud/atlas/register
   - Regístrate con Google o email

2. **Crear cluster gratuito** (M0):
   - Click en "Build a Database"
   - Selecciona "M0 Free"
   - Elige región cercana (Europe - Ireland o Frankfurt)
   - Click "Create"
   - Espera 2-3 minutos

3. **Configurar acceso**:
   - Username: `crezco_admin`
   - Password: `Crezco2024!` (guárdalo)
   - Click "Create User"
   
4. **Whitelist IP**:
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Obtener connection string**:
   - Click "Connect" en tu cluster
   - Selecciona "Connect your application"
   - Copia el string que empieza con `mongodb+srv://`
   - Se verá así: `mongodb+srv://crezco_admin:<password>@cluster0.xxxxx.mongodb.net/`

6. **Configurar en el backend**:
   ```powershell
   # Edita c:\Users\elmou\Desktop\dinero\impulso-crezco-main\backend\.env
   # Línea 5, reemplaza con:
   MONGODB_URI=mongodb+srv://crezco_admin:Crezco2024!@cluster0.xxxxx.mongodb.net/crezco?retryWrites=true&w=majority
   ```

7. **Reiniciar el servidor**:
   - Cierra la ventana de PowerShell donde corre el backend
   - Abre nueva terminal:
   ```powershell
   cd c:\Users\elmou\Desktop\dinero\impulso-crezco-main\backend
   node src\server.js
   ```

8. **Verificar**:
   ```powershell
   Invoke-WebRequest -Uri "http://localhost:3001/api/projects" -Method GET
   ```
   
   Deberías ver: `{"projects":[],"totalPages":0,"currentPage":1,"total":0}`

---

### Opción 2: MongoDB Local (💻 Instalación)

**Más control, pero requiere instalación**

#### Windows:

1. **Descargar MongoDB**:
   - Ve a: https://www.mongodb.com/try/download/community
   - Descarga "MongoDB Community Server" (Windows .msi)
   - Versión: 7.0 o superior

2. **Instalar**:
   - Ejecuta el .msi descargado
   - Selecciona "Complete" installation
   - ✅ Marca "Install MongoDB as a Service"
   - ✅ Marca "Run service as Network Service user"
   - Click "Install"

3. **Verificar instalación**:
   ```powershell
   # Debe mostrar la versión
   mongod --version
   ```

4. **Iniciar servicio** (si no se inició automáticamente):
   ```powershell
   net start MongoDB
   ```

5. **Verificar que está corriendo**:
   ```powershell
   Get-Service MongoDB
   # Status debe ser "Running"
   ```

6. **El .env ya está configurado para local**:
   ```
   MONGODB_URI=mongodb://localhost:27017/crezco
   ```

7. **Reiniciar backend** y probar.

---

### Opción 3: MongoDB con Docker 🐳

**Si tienes Docker instalado**

```powershell
# Ejecutar MongoDB en contenedor
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verificar
docker ps

# El .env ya está configurado para localhost:27017
```

---

## 🧪 Verificación Final

Una vez configurado MongoDB (cualquier opción), prueba:

```powershell
# 1. Health check (debe funcionar siempre)
Invoke-WebRequest -Uri http://localhost:3001/health

# 2. Proyectos vacíos (debe funcionar con MongoDB)
Invoke-WebRequest -Uri "http://localhost:3001/api/projects"

# Debe responder:
# {"projects":[],"totalPages":0,"currentPage":1,"total":0}
```

---

## 📋 Estado Actual

✅ **Funcionando**:
- Backend instalado y compilado
- Servidor Express corriendo en puerto 3001
- Socket.IO activo
- Health check endpoint: `GET /health`
- Todos los modelos y controladores creados
- Clerk y Stripe keys configuradas

❌ **Falta**:
- MongoDB conectado (usar Atlas o instalar local)

---

## ⏭️ Siguiente Paso

Una vez que MongoDB esté conectado:
1. Instalar frontend (crezco-app)
2. Probar registro con Clerk
3. Crear proyecto de prueba
4. Probar donación con Stripe

---

**¿Cuál opción prefieres?**
- **Opción 1 (Atlas)**: Más rápido, sin instalación ⭐ RECOMENDADO
- **Opción 2 (Local)**: Más control, requiere instalación
- **Opción 3 (Docker)**: Si ya tienes Docker

Avísame cuando hayas configurado MongoDB para continuar con las pruebas! 🚀
