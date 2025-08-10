#!/bin/bash
# WKClock Deployment Script for VPS (push local changes, then pull on server)

set -euo pipefail

echo "🚀 WKClock Deployment Script"
echo "============================"

# Configuration (REPO_URL can be overridden by environment)
REPO_URL="${REPO_URL:-https://github.com/codeinventdev/clock}"
VPS_USER="${VPS_USER:-root}"
VPS_HOST="${VPS_HOST:-45.77.123.109}"
VPS_PATH="${VPS_PATH:-/home/deploy/wklock}"

echo "📋 Deployment Configuration:"
echo "   Repository: $REPO_URL"
echo "   VPS: $VPS_USER@$VPS_HOST"
echo "   Path: $VPS_PATH"
echo ""

# Validate REPO_URL
if [[ "$REPO_URL" == *"YOUR_USERNAME/wklock.git"* ]]; then
  echo "❌ REPO_URL is not set to a real GitHub repository. Export REPO_URL or edit this script."
  exit 1
fi

echo "⬆️  Pushing local changes to origin..."
git remote get-url origin >/dev/null 2>&1 || git remote add origin "$REPO_URL"
git remote set-url origin "$REPO_URL"
git push -u origin main

echo "🔄 Deploying to VPS..."
ssh -o StrictHostKeyChecking=no "$VPS_USER@$VPS_HOST" bash -lc "'
  set -euo pipefail
  echo "📥 Preparing repo at $VPS_PATH"
  mkdir -p "$VPS_PATH"
  cd "$VPS_PATH"

  # Fix Git safe.directory and default branch
  git config --global --add safe.directory "$VPS_PATH" || true
  git config --global init.defaultBranch main || true

  if [ ! -d .git ]; then
    echo "🆕 Initializing git repo and linking origin"
    git init
    git remote add origin "$REPO_URL" || git remote set-url origin "$REPO_URL"
    git fetch origin main
    git checkout -B main
    git reset --hard origin/main
  else
    echo "📥 Fetching latest and resetting to origin/main"
    git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
    git fetch origin main
    git checkout -B main || git checkout main
    git reset --hard origin/main
  fi

  echo "📦 Installing dependencies..."
  npm install

  echo "🏗️  Building application..."
  npm run build

  echo "🔄 Restarting application..."
  pm2 restart wklock-frontend || pm2 start npm --name wklock-frontend -- start

  echo "✅ Deployment completed!"
  echo "📊 Application status:"
  pm2 status | grep wklock || true
'"

echo ""
echo "✅ Deployment script completed!"
echo "🌐 Visit: https://wklock.com"
