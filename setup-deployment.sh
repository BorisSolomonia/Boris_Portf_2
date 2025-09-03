#!/bin/bash

# Portfolio Boris Deployment Setup Script
# This script helps set up the deployment configuration

set -e

APP_NAME="Portfolio_Boris"
PROJECT_ID="nine-tones-bots-2025-468320"
REPO_NAME="tasty-ar"
REGION="us-central1"

echo "🎨 Setting up Portfolio Boris deployment..."

# Check if gcloud is available
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI not found. Please install Google Cloud SDK first."
    exit 1
fi

# Check if authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ No active gcloud authentication. Please run 'gcloud auth login' first."
    exit 1
fi

echo "📋 Current gcloud configuration:"
echo "Project: $(gcloud config get-value project 2>/dev/null || echo 'Not set')"
echo "Account: $(gcloud config get-value account 2>/dev/null || echo 'Not set')"

# Set project if needed
if [ "$(gcloud config get-value project 2>/dev/null)" != "$PROJECT_ID" ]; then
    echo "🔧 Setting project to $PROJECT_ID..."
    gcloud config set project $PROJECT_ID
fi

echo ""
echo "🔐 Creating Secret Manager secret..."

# Create environment file
cat > /tmp/portfolio_boris.env <<EOF
VITE_APP_TITLE=Boris - Renaissance Fintech Visionary
VITE_APP_DESCRIPTION=Boris's Renaissance-inspired fintech portfolio - A visionary approach to financial technology and ERP solutions
VITE_BASE_URL=/
VITE_MAX_FILE_SIZE_MB=50
VITE_UPLOAD_ENABLED=true
NODE_ENV=production
PORT=8081
EOF

echo "📦 Environment variables to be stored in Secret Manager:"
cat /tmp/portfolio_boris.env

echo ""
read -p "🔑 Create secret '${APP_NAME}-env' in Secret Manager? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Create or update secret
    if gcloud secrets describe "${APP_NAME}-env" --project=$PROJECT_ID >/dev/null 2>&1; then
        echo "📝 Secret exists, creating new version..."
        gcloud secrets versions add "${APP_NAME}-env" \
            --project=$PROJECT_ID \
            --data-file=/tmp/portfolio_boris.env
    else
        echo "🆕 Creating new secret..."
        gcloud secrets create "${APP_NAME}-env" \
            --project=$PROJECT_ID \
            --data-file=/tmp/portfolio_boris.env
    fi
    echo "✅ Secret '${APP_NAME}-env' created/updated successfully"
else
    echo "⏭️  Skipping secret creation"
fi

# Cleanup temp file
rm -f /tmp/portfolio_boris.env

echo ""
echo "📋 GitHub Repository Variables to Configure:"
echo "Go to: https://github.com/YOUR_USERNAME/YOUR_REPO/settings/variables/actions"
echo ""
echo "Required Variables:"
echo "  APP_NAME=${APP_NAME}"
echo "  GCP_PROJECT_ID=${PROJECT_ID}"
echo "  AR_REGION=${REGION}"
echo "  AR_REPO_NAME=${REPO_NAME}"
echo "  VM_HOST=35.209.56.146"
echo "  VM_SSH_USER=borissolomonia"
echo ""
echo "Optional Variables (with defaults):"
echo "  VITE_APP_TITLE=Boris - Renaissance Fintech Visionary"
echo "  VITE_APP_DESCRIPTION=Boris's Renaissance-inspired fintech portfolio..."
echo "  VITE_BASE_URL=/"
echo "  VITE_MAX_FILE_SIZE_MB=50"
echo "  VITE_UPLOAD_ENABLED=true"

echo ""
echo "🔑 GitHub Repository Secrets (should already be configured):"
echo "  GCP_SA_KEY - Service Account JSON key"
echo "  VM_SSH_KEY - SSH private key for VM access"

echo ""
echo "🌐 Caddy Configuration:"
echo "1. Update infra/caddy/conf.d/Portfolio_Boris.caddy with your domain"
echo "2. Add to main Caddyfile: import /opt/Portfolio_Boris/infra/caddy/conf.d/Portfolio_Boris.caddy"

echo ""
echo "🚀 Next Steps:"
echo "1. Configure GitHub variables and secrets"
echo "2. Update domain in Caddy config"
echo "3. Push to main branch to trigger deployment"

echo ""
echo "✅ Setup script completed!"