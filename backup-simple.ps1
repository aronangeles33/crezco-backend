param([string]$Tipo = "manual")

$Fecha = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$NombreBackup = "BACKUP_CREZCO_$Tipo`_$Fecha"
$RutaBackups = "..\backups-crezco"
$RutaDestino = Join-Path $RutaBackups $NombreBackup

Write-Host "`n CREANDO BACKUP DE CREZCO..." -ForegroundColor Cyan

if (-not (Test-Path $RutaBackups)) {
    New-Item -ItemType Directory -Path $RutaBackups -Force | Out-Null
    Write-Host " Carpeta de backups creada" -ForegroundColor Green
}

New-Item -ItemType Directory -Path $RutaDestino -Force | Out-Null

Write-Host " Copiando backend..." -ForegroundColor Yellow
robocopy backend "$RutaDestino\backend" /E /XD node_modules dist build .next /XF .env /NFL /NDL /NJH /NJS /NC /NS | Out-Null
Write-Host "   Backend copiado" -ForegroundColor Green

Write-Host " Copiando frontend..." -ForegroundColor Yellow
robocopy crezco-app "$RutaDestino\crezco-app" /E /XD node_modules dist build .next /XF .env.local /NFL /NDL /NJH /NJS /NC /NS | Out-Null
Write-Host "   Frontend copiado" -ForegroundColor Green

Write-Host " Copiando documentacion..." -ForegroundColor Yellow
Copy-Item *.md $RutaDestino -Force -ErrorAction SilentlyContinue
Copy-Item package.json $RutaDestino -Force -ErrorAction SilentlyContinue
Write-Host "   Archivos copiados" -ForegroundColor Green

$TamanoTotal = (Get-ChildItem -Path $RutaDestino -Recurse -File | Measure-Object -Property Length -Sum).Sum
$TamanoMB = [math]::Round($TamanoTotal / 1MB, 2)

Write-Host "`n BACKUP COMPLETADO" -ForegroundColor Green
Write-Host " Nombre:    $NombreBackup" -ForegroundColor White
Write-Host " Ubicacion: $RutaDestino" -ForegroundColor White
Write-Host " Tamano:    $TamanoMB MB`n" -ForegroundColor White
