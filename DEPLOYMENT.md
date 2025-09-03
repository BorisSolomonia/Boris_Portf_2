# Portfolio Boris Deployment Guide

This guide covers deploying the Boris Portfolio app to your existing GCP VM using the proven deployment pattern.

## 🏗️ Architecture Overview

```
GitHub Actions → Artifact Registry → GCP VM (35.209.56.146)
     ↓               ↓                ↓
   Build          Store            Deploy via Docker Compose
   Test           Image            + Caddy Reverse Proxy
   Deploy                          + Secret Manager for .env
```

## 📋 Prerequisites (Already Setup)

### ✅ GCP Resources
- **Project**: `nine-tones-bots-2025-468320` 
- **VM Instance**: `35.209.56.146` (borissolomonia@)
- **Artifact Registry**: `us-central1-docker.pkg.dev/nine-tones-bots-2025-468320/tasty-ar`
- **Secret Manager**: For storing environment variables
- **Service Account**: With required permissions

### ✅ VM Configuration
- Docker and Docker Compose installed
- Caddy reverse proxy running
- `web` Docker network created
- Directory structure: `/opt/{APP_NAME}/`

## 🔧 Setup Instructions

### 1. GitHub Repository Configuration

#### **Secrets** (Repository Settings → Secrets):
```bash
GCP_SA_KEY          # Service Account JSON key (already configured)
VM_SSH_KEY          # SSH private key for VM access (already configured)
```

#### **Variables** (Repository Settings → Variables):
```bash
# Required Variables
APP_NAME=Portfolio_Boris
GCP_PROJECT_ID=nine-tones-bots-2025-468320
AR_REGION=us-central1
AR_REPO_NAME=tasty-ar
VM_HOST=35.209.56.146
VM_SSH_USER=borissolomonia

# Optional Variables (with defaults)
VITE_APP_TITLE="Boris - Renaissance Fintech Visionary"
VITE_APP_DESCRIPTION="Boris's Renaissance-inspired fintech portfolio - A visionary approach to financial technology and ERP solutions"
VITE_BASE_URL="/"
VITE_MAX_FILE_SIZE_MB=50
VITE_UPLOAD_ENABLED=true
```

### 2. Secret Manager Configuration

Create environment variables secret:

```bash
# Create the secret content
cat > portfolio_boris.env <<EOF
VITE_APP_TITLE=Boris - Renaissance Fintech Visionary
VITE_APP_DESCRIPTION=Boris's Renaissance-inspired fintech portfolio - A visionary approach to financial technology and ERP solutions
VITE_BASE_URL=/
VITE_MAX_FILE_SIZE_MB=50
VITE_UPLOAD_ENABLED=true
NODE_ENV=production
PORT=8081
EOF

# Create secret in GCP Secret Manager
gcloud secrets create Portfolio_Boris-env \
  --project=nine-tones-bots-2025-468320 \
  --data-file=portfolio_boris.env
```

### 3. Caddy Configuration

Update your main Caddyfile to include:

```bash
# Add to /etc/caddy/Caddyfile or your existing Caddy setup
import /opt/Portfolio_Boris/infra/caddy/conf.d/Portfolio_Boris.caddy
```

Replace `portfolio.yourdomain.com` in `infra/caddy/conf.d/Portfolio_Boris.caddy` with your actual domain.

## 🚀 Deployment Process

### Automatic Deployment
1. **Push to main branch** → GitHub Actions triggers automatically
2. **Build Process**:
   - Fetches environment variables from Secret Manager
   - Builds Docker image with Vite build args
   - Pushes to Artifact Registry
3. **Deployment**:
   - SSH to VM (`35.209.56.146`)
   - Creates directory structure in `/opt/Portfolio_Boris/`
   - Uploads `secure-docker-setup/` and Caddy config
   - Pulls latest image and deploys with Docker Compose
   - Reloads Caddy configuration
4. **Verification**: Health checks ensure app is running

### Manual Deployment

#### Local Testing:
```bash
# Copy environment variables
cp .env.example .env
# Edit .env with your values

# Test build locally
chmod +x deploy-local.sh
./deploy-local.sh
```

#### Manual Deploy to VM:
```bash
# Build and push image
APP_NAME_LOWER=portfolio_boris
IMAGE_PATH="us-central1-docker.pkg.dev/nine-tones-bots-2025-468320/tasty-ar/$APP_NAME_LOWER"

docker build -t $IMAGE_PATH:manual .
docker push $IMAGE_PATH:manual

# Deploy on VM
ssh borissolomonia@35.209.56.146
cd /opt/Portfolio_Boris
docker compose -f secure-docker-setup/docker-compose.yml pull
docker compose -f secure-docker-setup/docker-compose.yml up -d
```

## 📁 Project Structure

```
portfolio_boris/
├── .github/workflows/deploy.yml          # GitHub Actions deployment
├── secure-docker-setup/
│   └── docker-compose.yml               # Production Docker Compose
├── infra/caddy/conf.d/
│   └── Portfolio_Boris.caddy            # Caddy reverse proxy config
├── Dockerfile                           # Multi-stage build
├── .env.example                         # Environment template
└── src/                                # React/Vite app source
```

## 🌐 Application Details

- **Container Name**: `portfolio-boris-app`
- **Internal Port**: `80` (nginx inside container)
- **Host Port**: `8081` (mapped to avoid conflicts)
- **Health Check**: `http://localhost/`
- **Resource Limits**: 512M memory, 0.3 CPU

## 🔍 Monitoring & Troubleshooting

### Health Checks
```bash
# VM internal check
curl http://localhost:8081/

# External check (replace with your domain)
curl http://35.209.56.146/
```

### Logs
```bash
# Application logs
docker logs portfolio-boris-app

# Caddy logs
docker logs caddy-caddy-1

# Deployment logs
# Check GitHub Actions workflow runs
```

### Common Issues

1. **Build failures**: Check GitHub Actions logs for missing environment variables
2. **Port conflicts**: App runs on port 8081, ensure it's available
3. **Domain issues**: Update Caddy config with correct domain
4. **Health check failures**: Verify container is running and accessible

## 🔒 Security Features

- **HTTPS**: Automatic via Caddy with Let's Encrypt
- **Security Headers**: HSTS, X-Content-Type-Options, etc.
- **Secrets**: Environment variables stored in GCP Secret Manager
- **Network**: Isolated Docker network `web`
- **Resource Limits**: Memory and CPU constraints

## ⚡ Performance Features

- **Static Assets**: Cached for 1 year with immutable headers
- **Gzip Compression**: Automatic via Caddy
- **Health Monitoring**: Container and upstream health checks
- **Rolling Updates**: Zero-downtime deployment with rollback

## 🎯 Next Steps

1. **Configure Domain**: Update Caddy config with your domain
2. **Set GitHub Variables**: Add required repository variables
3. **Create Secret**: Add environment variables to Secret Manager
4. **Push Code**: Trigger first deployment by pushing to main branch
5. **Monitor**: Check logs and health endpoints

The deployment follows the exact same proven pattern as your Tasty ERP app, ensuring reliability and consistency.