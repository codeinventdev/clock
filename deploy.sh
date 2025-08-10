#!/bin/bash
# WKClock Deployment Script for VPS

echo "🚀 WKClock Deployment Script"
echo "============================"

# Configuration
REPO_URL="https://github.com/YOUR_USERNAME/wklock.git"  # Update this with your GitHub URL
VPS_USER="root"
VPS_HOST="45.77.123.109"
VPS_PATH="/home/deploy/wklock"
BACKUP_PATH="/home/deploy/wklock-backup-$(date +%Y%m%d_%H%M%S)"

echo "📋 Deployment Configuration:"
echo "   Repository: $REPO_URL"
echo "   VPS: $VPS_USER@$VPS_HOST"
echo "   Path: $VPS_PATH"
echo ""

read -p "🔄 Continue with deployment? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Deployment cancelled"
    exit 1
fi

echo "🔄 Deploying to VPS..."
ssh $VPS_USER@$VPS_HOST << ENDSSH
    echo "📁 Creating backup..."
    if [ -d "$VPS_PATH" ]; then
        cp -r $VPS_PATH $BACKUP_PATH
        echo "✅ Backup created at $BACKUP_PATH"
    fi
    
    echo "📥 Pulling latest code..."
    cd $VPS_PATH
    git pull origin main
    
    echo "📦 Installing dependencies..."
    npm install
    
    echo "🏗️  Building application..."
    npm run build
    
    echo "🔄 Restarting application..."
    pm2 restart wklock-frontend
    
    echo "✅ Deployment completed!"
    echo "📊 Application status:"
    pm2 status | grep wklock
ENDSSH

echo ""
echo "✅ Deployment script completed!"
echo "🌐 Visit: https://wklock.com"
