# GCP Cloud Function for Email Collection (CORS-Free Solution)

## Overview

This guide sets up a Google Cloud Function that:
- ✅ Accepts POST requests from your website (with proper CORS headers)
- ✅ Uses a service account to write to Google Sheets
- ✅ No CORS issues (you control the headers)
- ✅ More secure and professional than Apps Script
- ✅ Serverless (only pay when used)

## Prerequisites

- GCP Project: `nine-tones-bots-2025-468320`
- Google Sheets spreadsheet for email collection
- `gcloud` CLI installed and authenticated

## Step 1: Create Google Sheet

1. Go to https://sheets.google.com
2. Create new spreadsheet: **"MCP Installer Downloads"**
3. Add headers in row 1: `Timestamp | Email | Source`
4. **Note the Spreadsheet ID** from URL:
   ```
   https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/edit
   ```

## Step 2: Create Service Account

```bash
# Set your project
gcloud config set project nine-tones-bots-2025-468320

# Create service account
gcloud iam service-accounts create portfolio-email-collector \
  --display-name="Portfolio Email Collector" \
  --description="Service account for collecting emails from portfolio website"

# Get the service account email
SA_EMAIL=$(gcloud iam service-accounts list \
  --filter="displayName:Portfolio Email Collector" \
  --format="value(email)")

echo "Service Account Email: $SA_EMAIL"
# Should output something like: portfolio-email-collector@nine-tones-bots-2025-468320.iam.gserviceaccount.com
```

## Step 3: Grant Permissions to Service Account

### 3.1 Grant Google Sheets Access

1. **Copy the service account email** from above
2. **Open your Google Sheet**
3. Click **Share** button (top right)
4. Paste the service account email
5. Give it **Editor** access
6. Click **Done**

### 3.2 Grant Cloud Function Permissions

```bash
# Allow service account to be used by Cloud Functions
gcloud projects add-iam-policy-binding nine-tones-bots-2025-468320 \
  --member="serviceAccount:$SA_EMAIL" \
  --role="roles/cloudfunctions.invoker"
```

## Step 4: Create Cloud Function Code

Create a directory for your function:

```bash
mkdir -p ~/portfolio-email-function
cd ~/portfolio-email-function
```

### 4.1 Create `package.json`

```json
{
  "name": "portfolio-email-collector",
  "version": "1.0.0",
  "description": "Cloud Function to collect emails and save to Google Sheets",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@google-cloud/functions-framework": "^3.3.0",
    "googleapis": "^128.0.0"
  },
  "engines": {
    "node": ">=18"
  }
}
```

### 4.2 Create `index.js`

```javascript
const { google } = require('googleapis');

// IMPORTANT: Replace with your actual Spreadsheet ID
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = 'Sheet1'; // Or your sheet name
const RANGE = `${SHEET_NAME}!A:C`;

/**
 * HTTP Cloud Function to collect emails and save to Google Sheets
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.collectEmail = async (req, res) => {
  // Set CORS headers for all responses
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({
      result: 'error',
      error: 'Method not allowed. Use POST.'
    });
    return;
  }

  try {
    // Parse request body
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      res.status(400).json({
        result: 'error',
        error: 'Email is required'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        result: 'error',
        error: 'Invalid email format'
      });
      return;
    }

    // Initialize Google Sheets API with Application Default Credentials
    // The service account credentials are automatically available in Cloud Functions
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data
    const timestamp = new Date().toISOString();
    const source = 'Website';
    const values = [[timestamp, email, source]];

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });

    console.log(`✅ Email saved: ${email}`);

    // Success response
    res.status(200).json({
      result: 'success',
      message: 'Email saved successfully'
    });

  } catch (error) {
    console.error('❌ Error saving email:', error);

    res.status(500).json({
      result: 'error',
      error: 'Failed to save email. Please try again later.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
```

### 4.3 Update `index.js` with Your Spreadsheet ID

```bash
# Replace YOUR_SPREADSHEET_ID_HERE with your actual ID
nano index.js
# Find the line: const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
# Replace with: const SPREADSHEET_ID = 'your-actual-spreadsheet-id';
```

## Step 5: Deploy Cloud Function

```bash
cd ~/portfolio-email-function

# Deploy the function
gcloud functions deploy portfolio-email-collector \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=collectEmail \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=$SA_EMAIL \
  --set-env-vars="NODE_ENV=production"

# This will take 2-3 minutes...
```

**Important flags explained**:
- `--gen2`: Use Cloud Functions 2nd generation (better performance)
- `--allow-unauthenticated`: Allow public access (needed for your website)
- `--service-account=$SA_EMAIL`: Use the service account we created

## Step 6: Get the Function URL

After deployment completes, get the URL:

```bash
gcloud functions describe portfolio-email-collector \
  --gen2 \
  --region=us-central1 \
  --format="value(serviceConfig.uri)"
```

**Copy this URL!** It will look like:
```
https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
```

## Step 7: Update Your Application

### 7.1 Update GCP Secret Manager

```bash
# Fetch current secret
gcloud secrets versions access latest \
  --secret="portfolio-cv" \
  --project="nine-tones-bots-2025-468320" > temp-env.txt

# Edit and update VITE_SUBSCRIBE_ENDPOINT with your Cloud Function URL
nano temp-env.txt

# Find this line:
# VITE_SUBSCRIBE_ENDPOINT=https://script.google.com/macros/s/.../exec

# Replace with your Cloud Function URL:
# VITE_SUBSCRIBE_ENDPOINT=https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector

# Upload new version
gcloud secrets versions add portfolio-cv --data-file=temp-env.txt

# Clean up
rm temp-env.txt
```

### 7.2 Update Local `.env` (for testing)

```bash
# In your project root
nano .env

# Update this line:
VITE_SUBSCRIBE_ENDPOINT=https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
```

## Step 8: Test Locally

```bash
# In your project root
npm run dev

# Open http://localhost:5174
# Try submitting an email
# Check the console - NO CORS errors!
# Check your Google Sheet - email should appear!
```

## Step 9: Deploy to Production

```bash
# Commit the .env update (if needed)
git add .env
git commit -m "Update email collection endpoint to Cloud Function"
git push origin master

# GitHub Actions will auto-deploy
```

## Step 10: Verify Production

1. Visit https://borissolomonia.com
2. Open console (F12)
3. Submit email
4. Check console logs:
   ```
   ✅ Email submitted successfully!
   📥 Triggering download...
   ```
5. Check your Google Sheet - email should appear!

## Testing the Cloud Function Directly

You can test the function with curl:

```bash
# Test with valid email
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector

# Expected response:
# {"result":"success","message":"Email saved successfully"}

# Test OPTIONS (CORS preflight)
curl -X OPTIONS \
  -H "Origin: https://borissolomonia.com" \
  -H "Access-Control-Request-Method: POST" \
  -v \
  https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector

# Should return 204 with CORS headers
```

## Monitoring & Logs

View function logs:

```bash
# Real-time logs
gcloud functions logs read portfolio-email-collector \
  --gen2 \
  --region=us-central1 \
  --limit=50

# Follow logs (live)
gcloud functions logs read portfolio-email-collector \
  --gen2 \
  --region=us-central1 \
  --limit=50 \
  --format="table(time, message)" \
  --follow
```

## Cost Estimate

Cloud Functions pricing:
- **Free tier**: 2 million invocations/month
- **After free tier**: $0.40 per million invocations
- **Memory/CPU**: Minimal cost (< $0.01/month for typical usage)

**For your use case**: Essentially FREE (well within free tier)

## Security Considerations

### Rate Limiting (Optional but Recommended)

Add rate limiting to prevent abuse:

```bash
# Install Redis for rate limiting (optional)
# Or use Cloud Armor for DDoS protection
```

### Restrict CORS Origins (Production)

Update `index.js` to only allow your domain:

```javascript
// Replace this line:
res.set('Access-Control-Allow-Origin', '*');

// With this:
const allowedOrigins = ['https://borissolomonia.com', 'http://localhost:5174'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.set('Access-Control-Allow-Origin', origin);
}
```

Then redeploy:

```bash
gcloud functions deploy portfolio-email-collector \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=collectEmail \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=$SA_EMAIL
```

## Troubleshooting

### Issue: "Permission denied" error

**Solution**: Make sure you shared the Google Sheet with the service account email

```bash
# Get service account email
gcloud iam service-accounts list --filter="displayName:Portfolio Email Collector"

# Share the Google Sheet with this email (Editor access)
```

### Issue: CORS errors still appear

**Solution**: Check CORS headers are set correctly

```bash
# Test OPTIONS request
curl -X OPTIONS -v https://YOUR_FUNCTION_URL

# Should see:
# Access-Control-Allow-Origin: *
# Access-Control-Allow-Methods: POST, OPTIONS
```

### Issue: Function not found

**Solution**: Check deployment succeeded

```bash
gcloud functions list --gen2 --region=us-central1
```

## Update/Redeploy Function

To update the function code:

```bash
cd ~/portfolio-email-function
# Make your changes to index.js
gcloud functions deploy portfolio-email-collector \
  --gen2 \
  --runtime=nodejs20 \
  --region=us-central1 \
  --source=. \
  --entry-point=collectEmail \
  --trigger-http \
  --allow-unauthenticated \
  --service-account=$SA_EMAIL
```

## Cleanup (If Needed)

To remove everything:

```bash
# Delete function
gcloud functions delete portfolio-email-collector --gen2 --region=us-central1

# Delete service account
gcloud iam service-accounts delete $SA_EMAIL
```

## Comparison: Cloud Function vs Apps Script

| Feature | Cloud Function ✅ | Apps Script |
|---------|------------------|-------------|
| CORS Control | Full control | Limited |
| Performance | Fast, scalable | Slower |
| Monitoring | Detailed logs | Basic |
| Security | Service account | User OAuth |
| Professional | Yes | Workaround |
| Cost | Free tier generous | Free |

## Summary

By using a Cloud Function with a service account:
- ✅ **No CORS issues** - You control all headers
- ✅ **More secure** - Service account access, not user OAuth
- ✅ **Better monitoring** - Full GCP logging
- ✅ **Scalable** - Handles traffic spikes automatically
- ✅ **Professional** - Industry-standard approach

This is the **recommended production solution**! 🎉
