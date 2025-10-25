# 💾 SISTEMA DE BACKUPS - RESUMEN

**Fecha de configuración**: 16 de octubre de 2025  
**Estado**: ✅ ACTIVO  
**Primer backup**: BACKUP_CREZCO_inicial_2025-10-16_07-15-41

---

## 🚀 USO RÁPIDO

### Crear un backup manual:
```powershell
.\backup-simple.ps1 -Tipo "manual"
```

### Crear un backup antes de cambios:
```powershell
.\backup-simple.ps1 -Tipo "antes-de-cambios-importantes"
```

### Iniciar backups automáticos (cada hora):
```powershell
.\iniciar-backup-automatico.ps1 -IntervaloMinutos 60
```

---

## 📂 UBICACIÓN

**Carpeta de backups**:
```
C:\Users\elmou\Desktop\dinero\backups-crezco\
```

**Estructura de cada backup**:
```
BACKUP_CREZCO_inicial_2025-10-16_07-15-41/
├── backend/           ✅ Código completo (sin node_modules, sin .env)
├── crezco-app/        ✅ Código completo (sin node_modules, sin .env.local)  
├── *.md               ✅ Documentación
└── package.json       ✅ Configuración
```

---

## ✅ LO QUE INCLUYE

- ✅ Todo el código del backend (`backend/src/`)
- ✅ Todo el código del frontend (`crezco-app/src/`)
- ✅ Modelos de base de datos
- ✅ Configuración de routes, controllers, middleware
- ✅ Componentes React, páginas Next.js
- ✅ Documentación (.md files)
- ✅ package.json

## ❌ LO QUE NO INCLUYE

- ❌ `node_modules` (pesado, se reinstala con `npm install`)
- ❌ `.next`, `dist`, `build` (se regenera)
- ❌ `.env` y `.env.local` (por seguridad - guárdalos aparte)
- ❌ `backups-crezco` (evita backups recursivos)

---

## ⚠️ IMPORTANTE - ARCHIVOS .ENV

Los archivos con claves secretas NO se respaldan automáticamente.

**Guárdalos manualmente en un lugar seguro:**

```powershell
# Crear carpeta de seguridad
New-Item -ItemType Directory -Path "..\backup-env-privado" -Force

# Copiar .env
Copy-Item backend\.env ..\backup-env-privado\backend-env.txt
Copy-Item crezco-app\.env.local ..\backup-env-privado\crezco-app-env-local.txt
```

**Archivos a respaldar manualmente**:
- `backend/.env` (MongoDB, Clerk, Stripe keys)
- `crezco-app/.env.local` (Clerk, Stripe public keys)

---

## 🔄 RESTAURAR UN BACKUP

Si algo sale mal y necesitas restaurar:

1. **Ve a la carpeta de backups**:
   ```powershell
   cd ..\backups-crezco
   ```

2. **Elige el backup que quieres**:
   ```
   BACKUP_CREZCO_inicial_2025-10-16_07-15-41  ← El más reciente que funcione
   ```

3. **Copia las carpetas de vuelta**:
   ```powershell
   # Vuelve al proyecto
   cd ..\impulso-crezco-main
   
   # Borra las carpetas actuales (CUIDADO!)
   Remove-Item -Recurse -Force backend\src
   Remove-Item -Recurse -Force crezco-app\src
   
   # Copia del backup
   Copy-Item -Recurse ..\backups-crezco\BACKUP_CREZCO_inicial_2025-10-16_07-15-41\backend\* backend\
   Copy-Item -Recurse ..\backups-crezco\BACKUP_CREZCO_inicial_2025-10-16_07-15-41\crezco-app\* crezco-app\
   ```

4. **Reinstala dependencias**:
   ```powershell
   cd backend
   npm install
   
   cd ..\crezco-app
   npm install
   ```

5. **Restaura los .env** (de tu backup privado)

6. **Inicia los servidores**:
   ```powershell
   # Terminal 1
   cd backend
   node src/server.js
   
   # Terminal 2
   cd crezco-app
   npm run dev
   ```

---

## 📊 GESTIONAR BACKUPS

### Ver todos los backups:
```powershell
Get-ChildItem ..\backups-crezco | Sort-Object CreationTime -Descending | Select-Object Name, CreationTime
```

### Ver tamaño de cada backup:
```powershell
Get-ChildItem ..\backups-crezco | ForEach-Object {
    $size = (Get-ChildItem $_.FullName -Recurse -File | Measure-Object -Property Length -Sum).Sum / 1MB
    [PSCustomObject]@{
        Nombre = $_.Name
        TamanoMB = [math]::Round($size, 2)
        Fecha = $_.CreationTime
    }
} | Format-Table
```

### Eliminar backups antiguos (más de 7 días):
```powershell
Get-ChildItem ..\backups-crezco | Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-7) } | Remove-Item -Recurse -Force
```

---

## 💡 BUENAS PRÁCTICAS

1. **Antes de grandes cambios**:
   ```powershell
   .\backup-simple.ps1 -Tipo "antes-refactor"
   ```

2. **Al final del día**:
   ```powershell
   .\backup-simple.ps1 -Tipo "fin-de-dia"
   ```

3. **Limpieza semanal**:
   - Elimina backups de hace más de una semana
   - Mantén solo 5-10 backups recientes
   - Guarda uno mensual para histórico

4. **Backup .env por separado**:
   - Una vez al mes o cuando cambien las keys
   - Guarda en una ubicación segura fuera del proyecto

---

## 🎯 CUANDO USAR BACKUPS

### Crear backup ANTES de:
- ✅ Refactorizar código
- ✅ Actualizar dependencias (`npm update`)
- ✅ Cambiar estructura de carpetas
- ✅ Modificar modelos de base de datos
- ✅ Hacer cambios experimentales

### Backup automático DURANTE:
- 🔄 Sesiones largas de desarrollo (backups cada hora)
- 🔄 Trabajo en múltiples features
- 🔄 Debugging de bugs complejos

### NO necesitas backup para:
- ❌ Cambios pequeños en CSS/estilos
- ❌ Corregir typos en texto
- ❌ Agregar console.logs
- ❌ Cambiar variables pequeñas

---

## 📚 DOCUMENTACIÓN COMPLETA

Para más detalles, lee:
- **[GUIA_BACKUPS.md](./GUIA_BACKUPS.md)** - Guía completa de uso

---

## 🆘 PROBLEMAS COMUNES

### "No se puede ejecutar el script"
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "El backup está vacío"
- Verifica que estás en la carpeta correcta del proyecto
- Ejecuta desde: `C:\Users\elmou\Desktop\dinero\impulso-crezco-main\`

### "Backup muy lento"
- Es normal la primera vez
- Asegúrate de no tener node_modules abiertos en VSCode

---

**✅ Sistema configurado y listo para usar**

Tu primer backup ya está creado y guardado. ¡Tu código está protegido!
