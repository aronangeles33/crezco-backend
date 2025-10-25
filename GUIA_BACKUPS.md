# GUIA DE USO - SISTEMA DE BACKUPS CREZCO

## 💾 SCRIPTS DISPONIBLES

### 1. crear-backup.ps1
Crea una copia de seguridad completa del proyecto.

**Uso:**
```powershell
# Backup manual
.\crear-backup.ps1

# Backup con nombre personalizado
.\crear-backup.ps1 -Tipo "antes-de-cambios"
```

**¿Qué incluye?**
- ✅ Carpeta `backend/` (sin node_modules ni .env)
- ✅ Carpeta `crezco-app/` (sin node_modules ni .env.local)
- ✅ Todos los archivos .md (documentación)
- ✅ package.json y scripts

**¿Qué NO incluye?**
- ❌ node_modules (se reinstala con npm install)
- ❌ .next, dist, build (se regenera)
- ❌ .env y .env.local (por seguridad)

---

### 2. iniciar-backup-automatico.ps1
Crea backups automáticamente cada X minutos.

**Uso:**
```powershell
# Backup cada hora (60 minutos por defecto)
.\iniciar-backup-automatico.ps1

# Backup cada 30 minutos
.\iniciar-backup-automatico.ps1 -IntervaloMinutos 30

# Backup cada 2 horas
.\iniciar-backup-automatico.ps1 -IntervaloMinutos 120
```

**Detener:** Presiona `Ctrl+C` en la terminal

---

### 3. restaurar-backup.ps1
Restaura un backup anterior.

**Uso:**
```powershell
.\restaurar-backup.ps1
```

Te mostrará una lista de backups disponibles para elegir.

---

## 📂 UBICACIÓN DE LOS BACKUPS

Los backups se guardan en:
```
C:\Users\elmou\Desktop\dinero\backups-crezco\
```

Cada backup tiene un nombre como:
```
BACKUP_CREZCO_manual_2025-10-16_15-30-45
BACKUP_CREZCO_auto_2025-10-16_16-30-45
BACKUP_CREZCO_inicial_2025-10-16_14-00-00
```

---

## 🔄 RESTAURAR UN BACKUP

1. Ejecuta `.\restaurar-backup.ps1`
2. Selecciona el número del backup que quieres restaurar
3. Confirma escribiendo `SI`
4. El script:
   - Crea un backup de seguridad del estado actual
   - Restaura los archivos del backup seleccionado
   - Preserva tus archivos .env actuales

5. Después de restaurar:
   ```powershell
   # Reinstala dependencias
   cd backend
   npm install
   
   cd ../crezco-app
   npm install
   ```

---

## ⚠️ IMPORTANTE - ARCHIVOS .env

**Los archivos .env NO se incluyen en los backups por seguridad.**

Antes de hacer cambios importantes, guarda manualmente:
- `backend/.env`
- `crezco-app/.env.local`

Puedes copiarlos a una ubicación segura:
```powershell
# Crear backup manual de .env
Copy-Item backend\.env ..\backup-env-seguro\backend.env
Copy-Item crezco-app\.env.local ..\backup-env-seguro\crezco-app.env.local
```

---

## 💡 CASOS DE USO

### Antes de hacer cambios grandes
```powershell
.\crear-backup.ps1 -Tipo "antes-de-refactor"
```

### Durante desarrollo activo
```powershell
# En una terminal separada, deja corriendo:
.\iniciar-backup-automatico.ps1 -IntervaloMinutos 30
```

### Si algo salió mal
```powershell
.\restaurar-backup.ps1
# Selecciona el backup anterior a los cambios
```

---

## 📊 GESTIÓN DE BACKUPS

### Ver todos los backups
```powershell
Get-ChildItem ..\backups-crezco | Sort-Object CreationTime -Descending
```

### Eliminar backups antiguos
```powershell
# Eliminar backups de hace más de 7 días
Get-ChildItem ..\backups-crezco | Where-Object { $_.CreationTime -lt (Get-Date).AddDays(-7) } | Remove-Item -Recurse -Force
```

### Ver tamaño total de backups
```powershell
$total = (Get-ChildItem ..\backups-crezco -Recurse -File | Measure-Object -Property Length -Sum).Sum
[math]::Round($total / 1GB, 2).ToString() + " GB"
```

---

## 🎯 RECOMENDACIONES

1. **Backup antes de cambios importantes**: Siempre crea un backup manual antes de modificaciones grandes

2. **Backup automático durante desarrollo**: Útil durante sesiones largas de programación

3. **Limpia backups antiguos**: No acumules muchos backups, elimina los de hace más de una semana

4. **Guarda .env por separado**: Los archivos de configuración con claves NO están en los backups

5. **Verifica el backup**: Después de crear un backup importante, verifica que existe en `../backups-crezco/`

---

## 🆘 SOLUCIÓN DE PROBLEMAS

### "No se puede ejecutar el script"
```powershell
# Habilitar ejecución de scripts (solo primera vez)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "No se encontró la carpeta de backups"
El script crea automáticamente la carpeta `../backups-crezco/` la primera vez.

### "Error al copiar archivos"
- Verifica que no haya procesos usando los archivos
- Cierra VS Code o editores que puedan tener archivos abiertos
- Asegúrate de tener permisos de escritura

---

## ✅ CHECKLIST DE BACKUP

Antes de hacer cambios importantes:

- [ ] Crear backup manual: `.\crear-backup.ps1 -Tipo "pre-cambios"`
- [ ] Guardar archivos .env por separado
- [ ] Verificar que el backup se creó correctamente
- [ ] Anotar el nombre del backup por si necesitas restaurar

---

**Última actualización**: 16 de octubre de 2025
