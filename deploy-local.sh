#!/bin/bash

# Local deployment script for testing Docker setup

echo "🐳 Building Docker image locally..."

# Load environment variables
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
fi

# Set defaults
export VITE_APP_TITLE="${VITE_APP_TITLE:-Boris - Renaissance Fintech Visionary}"
export VITE_APP_DESCRIPTION="${VITE_APP_DESCRIPTION:-Boris portfolio - A visionary approach to financial technology and ERP solutions}"
export VITE_BASE_URL="${VITE_BASE_URL:-/}"
export VITE_MAX_FILE_SIZE_MB="${VITE_MAX_FILE_SIZE_MB:-50}"
export VITE_UPLOAD_ENABLED="${VITE_UPLOAD_ENABLED:-true}"
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-8080}"

# Build image
docker build \
  --build-arg VITE_APP_TITLE="$VITE_APP_TITLE" \
  --build-arg VITE_APP_DESCRIPTION="$VITE_APP_DESCRIPTION" \
  --build-arg VITE_BASE_URL="$VITE_BASE_URL" \
  --build-arg VITE_MAX_FILE_SIZE_MB="$VITE_MAX_FILE_SIZE_MB" \
  --build-arg VITE_UPLOAD_ENABLED="$VITE_UPLOAD_ENABLED" \
  --build-arg NODE_ENV="$NODE_ENV" \
  -t portfolio-boris:local .

if [ $? -ne 0 ]; then
    echo "❌ Docker build failed!"
    exit 1
fi

echo "✅ Docker image built successfully!"

# Stop and remove existing container
docker stop portfolio-boris-local 2>/dev/null || true
docker rm portfolio-boris-local 2>/dev/null || true

# Run container
echo "🚀 Starting container on port $PORT..."
docker run -d \
  --name portfolio-boris-local \
  -p "$PORT:80" \
  portfolio-boris:local

if [ $? -eq 0 ]; then
    echo "✅ Container started successfully!"
    echo "🌐 Application available at: http://localhost:$PORT"
    echo ""
    echo "To check logs: docker logs portfolio-boris-local"
    echo "To stop: docker stop portfolio-boris-local"
else
    echo "❌ Failed to start container!"
    exit 1
fi