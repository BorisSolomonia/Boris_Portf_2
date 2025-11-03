# QUICKSTART - Deploy in 5 Minutes

## Prerequisites

1. Google Sheet created with headers: `Timestamp | Email | Source`
2. Note the Spreadsheet ID from URL: `https://docs.google.com/spreadsheets/d/YOUR_ID/edit`

## Deploy Commands (Copy-Paste)

```bash
# 1. Navigate to the cloud function directory
cd cloud-function-email-collector

# 2. Set your Spreadsheet ID (REPLACE WITH YOUR ACTUAL ID!)
export SPREADSHEET_ID="YOUR_SPREADSHEET_ID_HERE"

# 3. Authenticate to GCP (if not already)
gcloud auth login
gcloud config set project nine-tones-bots-2025-468320

# 4. Create service account
gcloud iam service-accounts create portfolio-email-collector \
  --display-name="Portfolio Email Collector" \
  --description="Service account for collecting emails from portfolio website"

# 5. Get service account email
SA_EMAIL=$(gcloud iam service-accounts list \
  --filter="displayName:Portfolio Email Collector" \
  --format="value(email)")

echo "Service Account Email: $SA_EMAIL"
echo "COPY THIS EMAIL ^^^"

# 6. Deploy the Cloud Function
gcloud functions deploy portfolio-email-collector \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=collectEmail \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=$SA_EMAIL \
  --set-env-vars="NODE_ENV=production,SPREADSHEET_ID=$SPREADSHEET_ID"

# Wait 2-3 minutes for deployment...

# 7. Get the function URL
FUNCTION_URL=$(gcloud functions describe portfolio-email-collector \
  --gen2 \
  --region=us-central1 \
  --format="value(serviceConfig.uri)")

echo ""
echo "========================================="
echo "Function URL: $FUNCTION_URL"
echo "Service Account: $SA_EMAIL"
echo "========================================="
echo ""
echo "NEXT STEPS:"
echo "1. Share your Google Sheet with: $SA_EMAIL (Editor access)"
echo "2. Update VITE_SUBSCRIBE_ENDPOINT to: $FUNCTION_URL"
```

## Test It

```bash
# Test the function
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  $FUNCTION_URL

# Expected: {"result":"success","message":"Email saved successfully"}
```

## Update Your Application

### For Local Development (.env file)

```bash
# In your project root directory
cd ..
nano .env

# Update this line:
VITE_SUBSCRIBE_ENDPOINT=https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
```

### For Production (GCP Secret Manager)

```bash
# Get current secret
gcloud secrets versions access latest \
  --secret="portfolio-cv" \
  --project="nine-tones-bots-2025-468320" > temp-env.txt

# Edit the file
nano temp-env.txt

# Find and update:
# VITE_SUBSCRIBE_ENDPOINT=https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector

# Upload new version
gcloud secrets versions add portfolio-cv --data-file=temp-env.txt

# Clean up
rm temp-env.txt

# Trigger deployment (commit and push)
git add .
git commit -m "Update to Cloud Function email endpoint"
git push origin master
```

## Done!

Your email collection now uses a professional Cloud Function with:
- ✅ No CORS issues
- ✅ Secure service account authentication
- ✅ Full control over the API
- ✅ Detailed logging
- ✅ Scalable and reliable

## Troubleshooting

**"Permission denied"** → Share Google Sheet with service account email

**CORS errors** → Check function deployed successfully: `gcloud functions list --gen2`

**404 errors** → Verify SPREADSHEET_ID is correct

**Check logs**:
```bash
gcloud functions logs read portfolio-email-collector --gen2 --region=us-central1 --limit=50
```
