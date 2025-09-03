#!/bin/bash

# Renaissance Portfolio Deployment Script for GCP VM
# This script automates the deployment process to a GCP Virtual Machine

echo "🎨 Starting Renaissance Portfolio Deployment..."

# Build the project
echo "📦 Building the project..."
npm ci
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Create deployment package
echo "📋 Creating deployment package..."
tar -czf portfolio-deploy.tar.gz -C dist .
echo "✅ Deployment package created: portfolio-deploy.tar.gz"

# Instructions for manual deployment
echo ""
echo "🚀 Deployment Instructions for GCP VM:"
echo "1. Upload portfolio-deploy.tar.gz to your GCP VM"
echo "2. Extract to web server directory:"
echo "   sudo tar -xzf portfolio-deploy.tar.gz -C /var/www/html/"
echo ""
echo "3. Configure nginx with the provided nginx.conf:"
echo "   sudo cp nginx.conf /etc/nginx/sites-available/portfolio"
echo "   sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/"
echo "   sudo nginx -t && sudo systemctl reload nginx"
echo ""
echo "4. Ensure proper permissions:"
echo "   sudo chown -R www-data:www-data /var/www/html/"
echo "   sudo chmod -R 755 /var/www/html/"
echo ""
echo "🎭 Your Renaissance portfolio is ready for the world!"

# Optional: If you want to add automatic deployment via SCP/rsync
# Uncomment and configure these lines with your GCP VM details
# echo "🔄 Deploying to GCP VM..."
# scp portfolio-deploy.tar.gz user@your-vm-ip:/tmp/
# ssh user@your-vm-ip "cd /tmp && sudo tar -xzf portfolio-deploy.tar.gz -C /var/www/html/ && sudo systemctl reload nginx"
# echo "✅ Deployment complete!"