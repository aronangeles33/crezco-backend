# Script para mantener servidores activos
# Uso: .\start-servers.ps1

Write-Host "🚀 Iniciando servidores CREZCO..." -ForegroundColor Cyan
Write-Host ""

# Detener procesos anteriores
Write-Host "🛑 Deteniendo procesos Node anteriores..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Rutas
$backendPath = "$PSScriptRoot\backend"
$frontendPath = "$PSScriptRoot\crezco-app"

# Función para iniciar proceso en ventana separada
function Start-ServerWindow {
    param(
        [string]$Title,
        [string]$Path,
        [string]$Command
    )
    
    $startInfo = New-Object System.Diagnostics.ProcessStartInfo
    $startInfo.FileName = "powershell.exe"
    $startInfo.Arguments = "-NoExit -Command `"cd '$Path'; Write-Host '[$Title] Iniciando...' -ForegroundColor Green; $Command`""
    $startInfo.UseShellExecute = $true
    $startInfo.CreateNoWindow = $false
    
    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $startInfo
    $process.Start() | Out-Null
    
    return $process
}

# Iniciar Backend
Write-Host "🔧 Iniciando Backend en puerto 3001..." -ForegroundColor Green
$backendProcess = Start-ServerWindow -Title "BACKEND" -Path $backendPath -Command "npm run dev"
Start-Sleep -Seconds 3

# Iniciar Frontend
Write-Host "🎨 Iniciando Frontend en puerto 3000..." -ForegroundColor Magenta
$frontendProcess = Start-ServerWindow -Title "FRONTEND" -Path $frontendPath -Command "npm run dev"
Start-Sleep -Seconds 3

Write-Host ""
Write-Host "✅ Servidores iniciados en ventanas separadas!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 URLs:" -ForegroundColor Cyan
Write-Host "   Backend:  http://localhost:3001" -ForegroundColor White
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "⚠️  NO CIERRES las ventanas de PowerShell que se abrieron" -ForegroundColor Yellow
Write-Host "   (una dice BACKEND, otra dice FRONTEND)" -ForegroundColor Yellow
Write-Host ""
Write-Host "🛑 Para detener: Cierra las ventanas de los servidores" -ForegroundColor Red
Write-Host ""

# Esperar un momento para verificar
Write-Host "⏳ Esperando 5 segundos para verificar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Verificar procesos
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "✅ Servidores corriendo ($($nodeProcesses.Count) procesos Node activos)" -ForegroundColor Green
} else {
    Write-Host "❌ Error: No se detectaron procesos Node" -ForegroundColor Red
    Write-Host "   Verifica las ventanas que se abrieron" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Presiona Enter para cerrar este script (los servidores seguirán corriendo)..."
Read-Host
