#!/bin/bash

# Deploy Script for Portfolio Email Collector Cloud Function
# This script automates the deployment process

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ID="nine-tones-bots-2025-468320"
FUNCTION_NAME="portfolio-email-collector"
REGION="us-central1"
RUNTIME="nodejs20"
SA_NAME="portfolio-email-collector"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Portfolio Email Collector Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI not found. Please install it first.${NC}"
    echo "Visit: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check if user is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" &> /dev/null; then
    echo -e "${YELLOW}⚠️  Not authenticated. Running gcloud auth login...${NC}"
    gcloud auth login
fi

# Set project
echo -e "${BLUE}📍 Setting project to: $PROJECT_ID${NC}"
gcloud config set project $PROJECT_ID

# Check if service account exists, create if not
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
echo -e "${BLUE}🔍 Checking service account: $SA_EMAIL${NC}"

if gcloud iam service-accounts describe $SA_EMAIL &> /dev/null; then
    echo -e "${GREEN}✅ Service account exists${NC}"
else
    echo -e "${YELLOW}⚠️  Service account not found. Creating...${NC}"
    gcloud iam service-accounts create $SA_NAME \
        --display-name="Portfolio Email Collector" \
        --description="Service account for collecting emails from portfolio website"
    echo -e "${GREEN}✅ Service account created${NC}"
fi

# Check for SPREADSHEET_ID in environment
if [ -z "$SPREADSHEET_ID" ]; then
    echo -e "${YELLOW}⚠️  SPREADSHEET_ID not set in environment${NC}"
    echo -e "${YELLOW}Please set it: export SPREADSHEET_ID='your-spreadsheet-id'${NC}"
    echo -e "${YELLOW}Or it will use the default in index.js${NC}"
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Deploy function
echo -e "${BLUE}🚀 Deploying Cloud Function...${NC}"
echo "This may take 2-3 minutes..."

DEPLOY_CMD="gcloud functions deploy $FUNCTION_NAME \
  --gen2 \
  --runtime=$RUNTIME \
  --region=$REGION \
  --source=. \
  --entry-point=collectEmail \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=$SA_EMAIL \
  --set-env-vars=NODE_ENV=production"

# Add SPREADSHEET_ID if set
if [ ! -z "$SPREADSHEET_ID" ]; then
    DEPLOY_CMD="$DEPLOY_CMD,SPREADSHEET_ID=$SPREADSHEET_ID"
fi

# Execute deployment
eval $DEPLOY_CMD

# Get function URL
echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo -e "${BLUE}📍 Function URL:${NC}"
FUNCTION_URL=$(gcloud functions describe $FUNCTION_NAME \
  --gen2 \
  --region=$REGION \
  --format="value(serviceConfig.uri)")

echo -e "${GREEN}$FUNCTION_URL${NC}"
echo ""

# Test the function
echo -e "${BLUE}🧪 Testing function...${NC}"
echo "Testing OPTIONS (CORS preflight)..."
curl -X OPTIONS \
  -H "Origin: https://borissolomonia.com" \
  -H "Access-Control-Request-Method: POST" \
  -s -o /dev/null -w "Status: %{http_code}\n" \
  $FUNCTION_URL

echo ""
echo -e "${YELLOW}⚠️  IMPORTANT NEXT STEPS:${NC}"
echo ""
echo "1. Share your Google Sheet with the service account:"
echo -e "   ${GREEN}$SA_EMAIL${NC}"
echo "   Give it 'Editor' access"
echo ""
echo "2. Update your application's .env or Secret Manager:"
echo -e "   ${GREEN}VITE_SUBSCRIBE_ENDPOINT=$FUNCTION_URL${NC}"
echo ""
echo "3. Test with curl:"
echo "   curl -X POST -H 'Content-Type: application/json' \\"
echo "     -d '{\"email\":\"test@example.com\"}' \\"
echo "     $FUNCTION_URL"
echo ""
echo -e "${GREEN}🎉 Deployment successful!${NC}"
