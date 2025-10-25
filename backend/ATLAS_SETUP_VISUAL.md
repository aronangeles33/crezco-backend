# 📍 CÓMO OBTENER TU URI DE MONGODB ATLAS

## Paso 1: Crear Cuenta y Cluster (Si no lo has hecho)

### 1.1 Ir a MongoDB Atlas
🔗 https://www.mongodb.com/cloud/atlas/register

### 1.2 Registrarse
- Usa tu email o Google
- Completa el formulario

### 1.3 Crear Cluster GRATIS (M0)
1. Click en **"Build a Database"**
2. Selecciona **"M0 FREE"** (Shared)
3. **Provider**: AWS (o el que prefieras)
4. **Region**: Europe (Ireland) o Frankfurt (más cercano a España)
5. **Cluster Name**: Cluster0 (por defecto está bien)
6. Click **"Create"**
7. ⏳ Espera 2-3 minutos mientras se crea

---

## Paso 2: Configurar Acceso

### 2.1 Crear Usuario de Base de Datos

Aparecerá un popup de seguridad:

```
How would you like to authenticate your connection?
```

**Username**: `crezco_admin`  
**Password**: Genera uno o usa: `Crezco2024!`

✅ Click **"Create User"**

📝 **IMPORTANTE**: Guarda estas credenciales, las necesitarás en el paso 3

---

### 2.2 Configurar IP Whitelist

En el mismo popup o en "Network Access":

1. Click **"Add IP Address"**
2. Click **"ALLOW ACCESS FROM ANYWHERE"**
   - Esto añade: `0.0.0.0/0`
3. Click **"Confirm"**

⚠️ **Nota**: En producción usa IPs específicas, pero para desarrollo esto es OK.

---

## Paso 3: Obtener Connection String

### 3.1 Ir al Dashboard
1. Ve a **"Database"** en el menú izquierdo
2. Verás tu cluster **"Cluster0"**
3. Click en el botón **"Connect"**

### 3.2 Elegir método de conexión
Aparecen 3 opciones, selecciona:

**"Connect your application"**

### 3.3 Copiar la URI

Verás algo como esto:

```
mongodb+srv://crezco_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

📋 **IMPORTANTE**: 
- Copia TODO el string
- Reemplaza `<password>` con tu password real (ej: `Crezco2024!`)
- Añade `/crezco` antes de `?` para especificar la base de datos

**Ejemplo completo**:
```
mongodb+srv://crezco_admin:Crezco2024!@cluster0.ab1cd.mongodb.net/crezco?retryWrites=true&w=majority
```

---

## Paso 4: Configurar en el Backend

### 4.1 Editar archivo `.env`

Abre: `c:\Users\elmou\Desktop\dinero\impulso-crezco-main\backend\.env`

### 4.2 Reemplazar línea 5

**ANTES**:
```bash
MONGODB_URI=mongodb://localhost:27017/crezco
```

**DESPUÉS** (con tu URI de Atlas):
```bash
MONGODB_URI=mongodb+srv://crezco_admin:Crezco2024!@cluster0.xxxxx.mongodb.net/crezco?retryWrites=true&w=majority
```

⚠️ **Importante**: 
- Usa TU connection string de Atlas
- Asegúrate de que `<password>` esté reemplazado
- Debe incluir `/crezco` después del `.net`

### 4.3 Guardar el archivo

---

## Paso 5: Probar la Conexión

Abre PowerShell en la carpeta backend:

```powershell
cd c:\Users\elmou\Desktop\dinero\impulso-crezco-main\backend

# Probar conexión
node test-connection.js
```

**Si funciona verás**:
```
✅ ¡CONEXIÓN EXITOSA a MongoDB Atlas!
✅ Ping a la base de datos: OK
📊 Bases de datos disponibles:
   - admin
   - local
🎉 Todo funciona correctamente!
```

**Si falla**:
- Verifica que el password sea correcto (sin `<` `>`)
- Verifica que la IP `0.0.0.0/0` esté en Network Access
- Verifica que el usuario exista en Database Access

---

## Paso 6: Iniciar el Backend

Una vez que la conexión funcione:

```powershell
cd c:\Users\elmou\Desktop\dinero\impulso-crezco-main\backend
node src\server.js
```

Deberías ver:
```
✅ MongoDB conectado: cluster0-shard-00-00.xxxxx.mongodb.net
🚀 Servidor corriendo en puerto 3001
🌍 Entorno: development
📡 Socket.IO activo
```

---

## 🐛 Solución de Problemas

### Error: "authentication failed"
- **Causa**: Usuario o password incorrecto
- **Solución**: Ve a Database Access en Atlas → Edit user → Cambia password

### Error: "connect ETIMEDOUT" o "ENOTFOUND"
- **Causa**: IP no está en whitelist
- **Solución**: Ve a Network Access → Add IP Address → 0.0.0.0/0

### Error: "MongoServerError: bad auth"
- **Causa**: Password tiene caracteres especiales sin escapar
- **Solución**: Usa un password sin caracteres especiales o escapa con `%` (ej: `@` = `%40`)

---

## ✅ Checklist

- [ ] Cuenta de MongoDB Atlas creada
- [ ] Cluster M0 (gratis) creado y activo
- [ ] Usuario de DB creado (username + password)
- [ ] IP whitelist configurada (0.0.0.0/0)
- [ ] Connection string copiado
- [ ] `<password>` reemplazado en el string
- [ ] `/crezco` añadido después de `.net`
- [ ] `.env` actualizado con la URI
- [ ] `node test-connection.js` ejecutado ✅
- [ ] Backend iniciado correctamente ✅

---

## 📞 ¿Necesitas ayuda?

Si tienes tu connection string de Atlas, pégalo aquí (puedes ocultar el password con `***`) y te ayudo a configurarlo correctamente.

**Ejemplo**:
```
mongodb+srv://crezco_admin:***@cluster0.ab1cd.mongodb.net/?retryWrites=true&w=majority
```

Díme:
- ¿En qué paso estás?
- ¿Qué error específico ves?
- ¿Ya tienes el cluster creado?
