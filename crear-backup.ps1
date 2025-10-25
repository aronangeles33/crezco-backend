# Script de Backup Simple - CREZCO
param([string]$Tipo = "manual")

$Fecha = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$NombreBackup = "BACKUP_CREZCO_$Tipo`_$Fecha"
$RutaBackups = "..\backups-crezco"
$RutaDestino = Join-Path $RutaBackups $NombreBackup

Write-Host "`n💾 CREANDO BACKUP DE CREZCO..." -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

# Crear carpeta de backups
if (-not (Test-Path $RutaBackups)) {
    New-Item -ItemType Directory -Path $RutaBackups -Force | Out-Null
    Write-Host "📁 Carpeta de backups creada`n" -ForegroundColor Green
}

# Crear carpeta del backup actual
New-Item -ItemType Directory -Path $RutaDestino -Force | Out-Null

Write-Host "📦 Copiando backend..." -ForegroundColor Yellow
robocopy backend "$RutaDestino\backend" /E /XD node_modules dist build .next /XF .env /NFL /NDL /NJH /NJS /NC /NS | Out-Null
Write-Host "  ✅ Backend copiado`n" -ForegroundColor Green

Write-Host "📦 Copiando frontend..." -ForegroundColor Yellow
robocopy crezco-app "$RutaDestino\crezco-app" /E /XD node_modules dist build .next /XF .env.local /NFL /NDL /NJH /NJS /NC /NS | Out-Null
Write-Host "  ✅ Frontend copiado`n" -ForegroundColor Green

Write-Host "📦 Copiando documentacion..." -ForegroundColor Yellow
Copy-Item *.md $RutaDestino -Force -ErrorAction SilentlyContinue
Copy-Item package.json $RutaDestino -Force -ErrorAction SilentlyContinue
Copy-Item *.ps1 $RutaDestino -Force -ErrorAction SilentlyContinue
Write-Host "  ✅ Archivos copiados`n" -ForegroundColor Green

# Calcular tamano
$TamanoTotal = (Get-ChildItem -Path $RutaDestino -Recurse -File | Measure-Object -Property Length -Sum).Sum
$TamanoMB = [math]::Round($TamanoTotal / 1MB, 2)

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "✅ BACKUP COMPLETADO" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
Write-Host "📦 Nombre:    $NombreBackup" -ForegroundColor White
Write-Host "📂 Ubicacion: $RutaDestino" -ForegroundColor White
Write-Host "📊 Tamano:    $TamanoMB MB`n" -ForegroundColor White

# Listar backups existentes
$TodosBackups = Get-ChildItem -Path $RutaBackups -Directory | Sort-Object CreationTime -Descending
Write-Host "📚 BACKUPS DISPONIBLES ($($TodosBackups.Count) total):" -ForegroundColor Cyan
foreach ($b in $TodosBackups | Select-Object -First 5) {
    $t = (Get-ChildItem -Path $b.FullName -Recurse -File | Measure-Object -Property Length -Sum).Sum
    $mb = [math]::Round($t / 1MB, 2)
    $f = $b.CreationTime.ToString("dd/MM/yyyy HH:mm")
    
    if ($b.Name -eq $NombreBackup) {
        Write-Host "  ➤ $($b.Name) ($mb MB) - $f ← NUEVO" -ForegroundColor Green
    } else {
        Write-Host "    $($b.Name) ($mb MB) - $f" -ForegroundColor Gray
    }
}

Write-Host "`n💡 Para restaurar usa: .\restaurar-backup.ps1`n" -ForegroundColor Yellow
