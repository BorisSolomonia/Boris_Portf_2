# Portfolio Email Collector - Cloud Function

A Google Cloud Function that collects emails from your portfolio website and saves them to Google Sheets.

## Features

- ✅ Proper CORS headers (no CORS errors!)
- ✅ Service account authentication (secure)
- ✅ Email validation
- ✅ Detailed logging
- ✅ Error handling
- ✅ Serverless (Cloud Functions)

## Quick Start

### 1. Prerequisites

- Google Cloud SDK installed (`gcloud`)
- Authenticated to GCP: `gcloud auth login`
- Google Sheets spreadsheet created

### 2. Get Your Spreadsheet ID

1. Open your Google Sheet
2. Copy the ID from URL: `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit`

### 3. Deploy

**Option A: Using the deploy script (recommended)**

```bash
# Set your spreadsheet ID
export SPREADSHEET_ID="your-spreadsheet-id-here"

# Run deploy script
chmod +x deploy.sh
./deploy.sh
```

**Option B: Manual deployment**

```bash
# Create service account
gcloud iam service-accounts create portfolio-email-collector \
  --display-name="Portfolio Email Collector"

# Get service account email
SA_EMAIL=$(gcloud iam service-accounts list \
  --filter="displayName:Portfolio Email Collector" \
  --format="value(email)")

# Deploy function
gcloud functions deploy portfolio-email-collector \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=collectEmail \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=$SA_EMAIL \
  --set-env-vars="NODE_ENV=production,SPREADSHEET_ID=your-spreadsheet-id"
```

### 4. Share Google Sheet

1. Copy the service account email from deployment output
2. Open your Google Sheet
3. Click "Share"
4. Paste service account email
5. Give "Editor" access

### 5. Get Function URL

```bash
gcloud functions describe portfolio-email-collector \
  --gen2 \
  --region=us-central1 \
  --format="value(serviceConfig.uri)"
```

### 6. Update Your Application

Update `VITE_SUBSCRIBE_ENDPOINT` in:
- `.env` (local development)
- GCP Secret Manager (production)

## Testing

```bash
# Test with curl
FUNCTION_URL="your-function-url-here"

# Test POST request
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  $FUNCTION_URL

# Expected response:
# {"result":"success","message":"Email saved successfully"}

# Test CORS preflight
curl -X OPTIONS \
  -H "Origin: https://borissolomonia.com" \
  -H "Access-Control-Request-Method: POST" \
  -v \
  $FUNCTION_URL

# Should return 204 with CORS headers
```

## Monitoring

View logs:

```bash
# View recent logs
gcloud functions logs read portfolio-email-collector \
  --gen2 \
  --region=us-central1 \
  --limit=50

# Follow logs (live)
gcloud functions logs read portfolio-email-collector \
  --gen2 \
  --region=us-central1 \
  --limit=50 \
  --follow
```

## Configuration

### Environment Variables

- `SPREADSHEET_ID`: Google Sheets spreadsheet ID (required)
- `SHEET_NAME`: Sheet name (default: "Sheet1")
- `NODE_ENV`: Environment (default: "production")

### CORS Configuration

By default, the function allows all origins (`*`). To restrict to specific domains, edit `index.js`:

```javascript
// Replace:
res.set('Access-Control-Allow-Origin', '*');

// With:
const allowedOrigins = ['https://borissolomonia.com'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.set('Access-Control-Allow-Origin', origin);
}
```

## Troubleshooting

### Permission Denied Error

**Cause**: Service account doesn't have access to the spreadsheet

**Solution**: Share the Google Sheet with the service account email

### CORS Errors

**Cause**: CORS headers not set correctly

**Solution**: Check deployment succeeded and test OPTIONS request

### Spreadsheet Not Found

**Cause**: Wrong SPREADSHEET_ID or sheet doesn't exist

**Solution**: Verify SPREADSHEET_ID in deployment

## Cost

- **Free tier**: 2 million invocations/month
- **After free tier**: ~$0.40 per million invocations
- **Typical usage**: Essentially free

## Cleanup

To remove everything:

```bash
# Delete function
gcloud functions delete portfolio-email-collector --gen2 --region=us-central1

# Delete service account
gcloud iam service-accounts delete portfolio-email-collector@nine-tones-bots-2025-468320.iam.gserviceaccount.com
```

## Support

For detailed instructions, see:
- [GCP_CLOUD_FUNCTION_SETUP.md](../GCP_CLOUD_FUNCTION_SETUP.md) - Complete guide
- [Google Cloud Functions docs](https://cloud.google.com/functions/docs)
