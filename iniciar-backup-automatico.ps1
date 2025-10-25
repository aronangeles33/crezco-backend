# Sistema de Backup Automatico - CREZCO
param([int]$IntervaloMinutos = 60)

Write-Host "`n🔄 SISTEMA DE BACKUP AUTOMATICO - CREZCO" -ForegroundColor Cyan
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan
Write-Host "⏱️  Backup cada: $IntervaloMinutos minutos" -ForegroundColor Yellow
Write-Host "🛑 Presiona Ctrl+C para detener`n" -ForegroundColor Red
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor Cyan

$UltimoBackup = Get-Date

try {
    while ($true) {
        $Ahora = Get-Date
        $MinutosPasados = ($Ahora - $UltimoBackup).TotalMinutes
        
        if ($MinutosPasados -ge $IntervaloMinutos) {
            Write-Host "`n💾 Creando backup automatico..." -ForegroundColor Cyan
            & ".\crear-backup.ps1" -Tipo "auto"
            $UltimoBackup = Get-Date
            Write-Host "`n✅ Backup automatico completado`n" -ForegroundColor Green
        } else {
            $MinutosRestantes = [math]::Ceiling($IntervaloMinutos - $MinutosPasados)
            Write-Host "⏳ $(Get-Date -Format 'HH:mm:ss') - Proximo backup en $MinutosRestantes minutos..." -ForegroundColor Gray
        }
        
        Start-Sleep -Seconds 60
    }
} catch {
    Write-Host "`n🛑 Sistema de backup automatico detenido" -ForegroundColor Red
}
