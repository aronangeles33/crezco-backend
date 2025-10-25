#!/bin/bash

# 🚀 CREZCO DEPLOYMENT SCRIPT
# Automatiza el proceso completo de deployment a producción

set -e  # Exit on any error

echo "🚀 CREZCO DEPLOYMENT SCRIPT v1.0"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Pre-flight checks
print_status "Running pre-flight checks..."

# Check required tools
if ! command_exists git; then
    print_error "git is required but not installed"
    exit 1
fi

if ! command_exists node; then
    print_error "Node.js is required but not installed"
    exit 1
fi

if ! command_exists npm; then
    print_error "npm is required but not installed"
    exit 1
fi

print_success "All required tools are installed"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "Not in a Node.js project directory"
    exit 1
fi

# Check if .env files exist
if [ ! -f "backend/.env" ]; then
    print_warning "backend/.env not found - make sure to configure production variables"
fi

if [ ! -f "crezco-app/.env.local" ]; then
    print_warning "crezco-app/.env.local not found - make sure to configure production variables"
fi

# Git checks
print_status "Checking git status..."

if [[ -n $(git status --porcelain) ]]; then
    print_warning "Working directory is not clean. Uncommitted changes:"
    git status --short
    
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deployment cancelled"
        exit 1
    fi
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
print_status "Current branch: $CURRENT_BRANCH"

# Create deployment tag
print_status "Creating deployment tag..."
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
TAG_NAME="deploy_$TIMESTAMP"
git tag -a "$TAG_NAME" -m "Production deployment $TIMESTAMP"
print_success "Created tag: $TAG_NAME"

# Backend deployment preparation
print_status "Preparing backend for deployment..."

cd backend

# Install dependencies
print_status "Installing backend dependencies..."
npm ci --only=production

# Run security audit
print_status "Running security audit..."
npm audit --audit-level=moderate

# Check for vulnerabilities
if [ $? -ne 0 ]; then
    print_warning "Security vulnerabilities found. Run 'npm audit fix' to resolve"
    read -p "Continue with deployment? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Deployment cancelled due to security issues"
        exit 1
    fi
fi

# Test database connection
print_status "Testing database connection..."
node -e "
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
"

if [ $? -ne 0 ]; then
    print_error "Database connection test failed"
    exit 1
fi

cd ..

# Frontend deployment preparation
print_status "Preparing frontend for deployment..."

cd crezco-app

# Install dependencies
print_status "Installing frontend dependencies..."
npm ci

# Type checking
print_status "Running type checks..."
npm run type-check 2>/dev/null || print_warning "TypeScript check failed or not configured"

# Build frontend
print_status "Building frontend for production..."
npm run build

if [ $? -ne 0 ]; then
    print_error "Frontend build failed"
    exit 1
fi

print_success "Frontend build completed successfully"

cd ..

# Deploy to production
print_status "Starting production deployment..."

# Deploy backend to Railway (if using Railway)
if command_exists railway; then
    print_status "Deploying backend to Railway..."
    cd backend
    railway up
    cd ..
    print_success "Backend deployed to Railway"
else
    print_warning "Railway CLI not found. Deploy backend manually or install Railway CLI"
fi

# Deploy frontend to Vercel (if using Vercel)
if command_exists vercel; then
    print_status "Deploying frontend to Vercel..."
    cd crezco-app
    vercel --prod
    cd ..
    print_success "Frontend deployed to Vercel"
else
    print_warning "Vercel CLI not found. Deploy frontend manually or install Vercel CLI"
fi

# Health checks
print_status "Running post-deployment health checks..."

# Check backend health
print_status "Checking backend health..."
BACKEND_URL="https://api.crezco.app/health"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $BACKEND_URL)

if [ "$HTTP_STATUS" -eq 200 ]; then
    print_success "Backend health check passed"
else
    print_error "Backend health check failed (HTTP $HTTP_STATUS)"
fi

# Check frontend
print_status "Checking frontend..."
FRONTEND_URL="https://crezco.app"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)

if [ "$HTTP_STATUS" -eq 200 ]; then
    print_success "Frontend health check passed"
else
    print_error "Frontend health check failed (HTTP $HTTP_STATUS)"
fi

# Push git tag
print_status "Pushing deployment tag to repository..."
git push origin "$TAG_NAME"

# Deployment summary
echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo "======================="
echo "Tag: $TAG_NAME"
echo "Frontend: https://crezco.app"
echo "Backend: https://api.crezco.app"
echo "Admin: https://crezco.app/admin"
echo ""
echo "Next steps:"
echo "1. Monitor application logs"
echo "2. Check error tracking dashboard"
echo "3. Verify payment processing"
echo "4. Test user registration flow"
echo "5. Monitor performance metrics"
echo ""
print_success "Deployment completed successfully! 🚀"