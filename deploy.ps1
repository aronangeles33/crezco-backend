# 🚀 DEPLOYMENT AUTOMATIZADO WINDOWS
# Versión PowerShell del script de deployment

param(
    [switch]$SkipTests,
    [switch]$Force,
    [string]$Environment = "production"
)

# Colors for PowerShell
$ErrorColor = "Red"
$SuccessColor = "Green"
$WarningColor = "Yellow"
$InfoColor = "Cyan"

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $InfoColor
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $SuccessColor
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $WarningColor
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $ErrorColor
}

Write-Host "🚀 CREZCO DEPLOYMENT SCRIPT v1.0 (Windows)" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green

# Pre-flight checks
Write-Status "Running pre-flight checks..."

# Check if required tools exist
$requiredTools = @("git", "node", "npm")
foreach ($tool in $requiredTools) {
    try {
        $null = Get-Command $tool -ErrorAction Stop
        Write-Success "$tool is installed"
    }
    catch {
        Write-Error "$tool is required but not installed"
        exit 1
    }
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error "Not in a Node.js project directory"
    exit 1
}

# Check environment files
if (-not (Test-Path "backend\.env")) {
    Write-Warning "backend\.env not found - make sure to configure production variables"
}

if (-not (Test-Path "crezco-app\.env.local")) {
    Write-Warning "crezco-app\.env.local not found - make sure to configure production variables"
}

# Git status check
Write-Status "Checking git status..."
$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Warning "Working directory is not clean. Uncommitted changes:"
    git status --short
    
    if (-not $Force) {
        $continue = Read-Host "Continue with deployment? (y/N)"
        if ($continue -ne "y" -and $continue -ne "Y") {
            Write-Error "Deployment cancelled"
            exit 1
        }
    }
}

# Get current branch
$currentBranch = git rev-parse --abbrev-ref HEAD
Write-Status "Current branch: $currentBranch"

# Create deployment tag
Write-Status "Creating deployment tag..."
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$tagName = "deploy_$timestamp"
git tag -a $tagName -m "Production deployment $timestamp"
Write-Success "Created tag: $tagName"

# Backend deployment preparation
Write-Status "Preparing backend for deployment..."
Set-Location backend

# Install dependencies
Write-Status "Installing backend dependencies..."
npm ci --only=production

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install backend dependencies"
    exit 1
}

# Security audit
if (-not $SkipTests) {
    Write-Status "Running security audit..."
    npm audit --audit-level=moderate
    
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "Security vulnerabilities found"
        if (-not $Force) {
            $continue = Read-Host "Continue with deployment? (y/N)"
            if ($continue -ne "y" -and $continue -ne "Y") {
                Write-Error "Deployment cancelled due to security issues"
                exit 1
            }
        }
    }
}

# Test database connection
Write-Status "Testing database connection..."
$dbTestScript = @"
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
}).then(() => {
  console.log('✅ Database connection successful');
  process.exit(0);
}).catch(err => {
  console.error('❌ Database connection failed:', err.message);
  process.exit(1);
});
"@

$dbTestScript | node

if ($LASTEXITCODE -ne 0) {
    Write-Error "Database connection test failed"
    exit 1
}

Set-Location ..

# Frontend deployment preparation
Write-Status "Preparing frontend for deployment..."
Set-Location crezco-app

# Install dependencies
Write-Status "Installing frontend dependencies..."
npm ci

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to install frontend dependencies"
    exit 1
}

# Type checking (if available)
if (-not $SkipTests) {
    Write-Status "Running type checks..."
    npm run type-check 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "TypeScript check failed or not configured"
    }
}

# Build frontend
Write-Status "Building frontend for production..."
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Error "Frontend build failed"
    exit 1
}

Write-Success "Frontend build completed successfully"
Set-Location ..

# Deploy to production
Write-Status "Starting production deployment..."

# Deploy backend to Railway (if CLI available)
try {
    $null = Get-Command railway -ErrorAction Stop
    Write-Status "Deploying backend to Railway..."
    Set-Location backend
    railway up
    Set-Location ..
    Write-Success "Backend deployed to Railway"
}
catch {
    Write-Warning "Railway CLI not found. Deploy backend manually or install Railway CLI"
}

# Deploy frontend to Vercel (if CLI available)
try {
    $null = Get-Command vercel -ErrorAction Stop
    Write-Status "Deploying frontend to Vercel..."
    Set-Location crezco-app
    vercel --prod
    Set-Location ..
    Write-Success "Frontend deployed to Vercel"
}
catch {
    Write-Warning "Vercel CLI not found. Deploy frontend manually or install Vercel CLI"
}

# Health checks
Write-Status "Running post-deployment health checks..."

# Check backend health
$backendUrl = "https://api.crezco.app/health"
try {
    $response = Invoke-WebRequest -Uri $backendUrl -Method Get -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Success "Backend health check passed"
    } else {
        Write-Error "Backend health check failed (HTTP $($response.StatusCode))"
    }
}
catch {
    Write-Error "Backend health check failed: $($_.Exception.Message)"
}

# Check frontend
$frontendUrl = "https://crezco.app"
try {
    $response = Invoke-WebRequest -Uri $frontendUrl -Method Get -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Write-Success "Frontend health check passed"
    } else {
        Write-Error "Frontend health check failed (HTTP $($response.StatusCode))"
    }
}
catch {
    Write-Error "Frontend health check failed: $($_.Exception.Message)"
}

# Push git tag
Write-Status "Pushing deployment tag to repository..."
git push origin $tagName

# Deployment summary
Write-Host ""
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=======================" -ForegroundColor Green
Write-Host "Tag: $tagName" -ForegroundColor Cyan
Write-Host "Frontend: https://crezco.app" -ForegroundColor Cyan
Write-Host "Backend: https://api.crezco.app" -ForegroundColor Cyan
Write-Host "Admin: https://crezco.app/admin" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Monitor application logs" -ForegroundColor White
Write-Host "2. Check error tracking dashboard" -ForegroundColor White
Write-Host "3. Verify payment processing" -ForegroundColor White
Write-Host "4. Test user registration flow" -ForegroundColor White
Write-Host "5. Monitor performance metrics" -ForegroundColor White
Write-Host ""
Write-Success "Deployment completed successfully! 🚀"