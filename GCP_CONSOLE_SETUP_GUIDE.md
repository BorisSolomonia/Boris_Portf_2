# GCP Console Setup Guide - Email Collection Cloud Function

**Complete step-by-step guide using Google Cloud Console (Web UI)**

No command-line required! Follow these steps with screenshots of what to click.

---

## Prerequisites

✅ Google Cloud Project: `nine-tones-bots-2025-468320`
✅ Google Sheet for email collection
✅ GCP Console access

---

## Part 1: Prepare Your Google Sheet (5 minutes)

### Step 1.1: Create Google Sheet

1. Go to **https://sheets.google.com**
2. Click **Blank** to create new spreadsheet
3. Rename it: **"MCP Installer Downloads"**
4. In row 1, add these headers:
   ```
   A1: Timestamp
   B1: Email
   C1: Source
   ```

### Step 1.2: Get Spreadsheet ID

1. Look at the URL in your browser:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j_EXAMPLE/edit
   ```
2. **Copy the ID** (the long string between `/d/` and `/edit`)
3. **Save this ID** - you'll need it in Step 3.8

**Example ID**: `1a2b3c4d5e6f7g8h9i0j_EXAMPLE`

---

## Part 2: Create Service Account (10 minutes)

### Step 2.1: Open GCP Console

1. Go to **https://console.cloud.google.com**
2. **Sign in** with your Google account
3. At the top, verify project is: **nine-tones-bots-2025-468320**
   - If not, click the project dropdown (top left, next to "Google Cloud")
   - Select: **nine-tones-bots-2025-468320**

### Step 2.2: Navigate to Service Accounts

1. Click the **☰ Navigation Menu** (top left, three horizontal lines)
2. Scroll down to **IAM & Admin**
3. Click **Service Accounts**
4. You'll see a list of service accounts (might be empty)

### Step 2.3: Create New Service Account

1. Click **+ CREATE SERVICE ACCOUNT** (top of page, blue button)

2. **Service account details page**:
   - **Service account name**: `portfolio-email-collector`
   - **Service account ID**: (auto-filled) `portfolio-email-collector`
   - **Service account description**: `Service account for collecting emails from portfolio website`
   - Click **CREATE AND CONTINUE**

3. **Grant this service account access to project** (Step 2):
   - Click **Select a role** dropdown
   - Type: `Cloud Functions Invoker`
   - Select: **Cloud Functions Invoker**
   - Click **+ ADD ANOTHER ROLE**
   - Type: `Cloud Functions Developer`
   - Select: **Cloud Functions Developer**
   - Click **CONTINUE**

4. **Grant users access to this service account** (Step 3):
   - Leave empty (skip this step)
   - Click **DONE**

### Step 2.4: Copy Service Account Email

1. You'll see your new service account in the list
2. Look for the **Email** column
3. **Copy the email** - it looks like:
   ```
   portfolio-email-collector@nine-tones-bots-2025-468320.iam.gserviceaccount.com
   ```
4. **Save this email** - you'll need it in Step 2.5 and Step 3.7

---

## Part 3: Deploy Cloud Function (15 minutes)

### Step 3.1: Navigate to Cloud Functions

1. Click the **☰ Navigation Menu** (top left)
2. Scroll to **Cloud Functions** (under "Serverless" section)
3. Click **Cloud Functions**
4. If prompted "Enable API", click **ENABLE** (wait 1-2 minutes)

### Step 3.2: Create Function

1. Click **CREATE FUNCTION** (blue button at top)
2. You'll see "Create function" configuration page

### Step 3.3: Configure Basics (1st Gen to 2nd Gen)

**Environment**:
- Select: **2nd gen** (important!)

**Function name**:
- Enter: `portfolio-email-collector`

**Region**:
- Select: **us-central1**

### Step 3.4: Configure Trigger

**Trigger type**:
- Select: **HTTPS**
- Click the **HTTPS** box

**Authentication**:
- Select: **Allow unauthenticated invocations** ⚠️ (important for your website to access it)

**HTTPS settings** (if expanded):
- Leave defaults

### Step 3.5: Runtime Settings (Click to Expand)

Click **RUNTIME, BUILD, CONNECTIONS AND SECURITY SETTINGS** (expand section)

**Runtime**:
- **Memory allocated**: 256 MiB (default is fine)
- **Timeout**: 60 seconds (default is fine)
- **Runtime service account**: Click dropdown
  - Select: `portfolio-email-collector@nine-tones-bots-2025-468320.iam.gserviceaccount.com`
  - (The service account you created in Step 2)

### Step 3.6: Environment Variables

Scroll down to **Runtime environment variables**

Click **+ ADD VARIABLE**

**Variable 1**:
- **Name**: `NODE_ENV`
- **Value**: `production`

Click **+ ADD VARIABLE** again

**Variable 2**:
- **Name**: `SPREADSHEET_ID`
- **Value**: `YOUR_SPREADSHEET_ID_FROM_STEP_1.2`
  - ⚠️ Replace with your actual spreadsheet ID from Step 1.2

**Variable 3** (optional):
- **Name**: `SHEET_NAME`
- **Value**: `Sheet1` (or your sheet tab name)

### Step 3.7: Click NEXT

Click the **NEXT** button (bottom right)

### Step 3.8: Configure Code

You're now on the **Code** page

**Runtime**:
- Dropdown: Select **Node.js 20**

**Entry point**:
- Enter: `collectEmail`

**Source code**:
- Select: **Inline Editor** (default)

### Step 3.9: Add package.json

1. In the left file tree, you'll see:
   - `index.js`
   - `package.json`

2. Click on **package.json**

3. **Delete all existing content**

4. **Copy and paste** this EXACT content:

```json
{
  "name": "portfolio-email-collector",
  "version": "1.0.0",
  "description": "Cloud Function to collect emails and save to Google Sheets",
  "main": "index.js",
  "dependencies": {
    "@google-cloud/functions-framework": "^3.3.0",
    "googleapis": "^128.0.0"
  },
  "engines": {
    "node": ">=18"
  }
}
```

### Step 3.10: Add index.js

1. Click on **index.js** in the file tree (left side)

2. **Delete all existing content**

3. **Copy and paste** this EXACT content:

```javascript
const { google } = require('googleapis');

// Get configuration from environment variables
const SPREADSHEET_ID = process.env.SPREADSHEET_ID || 'YOUR_SPREADSHEET_ID_HERE';
const SHEET_NAME = process.env.SHEET_NAME || 'Sheet1';
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
    console.log('📋 Handling CORS preflight request');
    res.status(204).send('');
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    console.warn(`⚠️ Invalid method: ${req.method}`);
    res.status(405).json({
      result: 'error',
      error: 'Method not allowed. Use POST.'
    });
    return;
  }

  try {
    console.log('📥 Received email submission request');

    // Parse request body
    const { email } = req.body;

    // Validate email
    if (!email || typeof email !== 'string') {
      console.warn('⚠️ Missing or invalid email in request');
      res.status(400).json({
        result: 'error',
        error: 'Email is required'
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn(`⚠️ Invalid email format: ${email}`);
      res.status(400).json({
        result: 'error',
        error: 'Invalid email format'
      });
      return;
    }

    console.log(`📧 Processing email: ${email}`);

    // Check if SPREADSHEET_ID is configured
    if (SPREADSHEET_ID === 'YOUR_SPREADSHEET_ID_HERE') {
      console.error('❌ SPREADSHEET_ID not configured!');
      res.status(500).json({
        result: 'error',
        error: 'Server configuration error. Please contact administrator.'
      });
      return;
    }

    // Initialize Google Sheets API with Application Default Credentials
    console.log('🔐 Authenticating with Google Sheets API...');
    const auth = new google.auth.GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare data
    const timestamp = new Date().toISOString();
    const source = 'Website';
    const values = [[timestamp, email, source]];

    console.log(`📝 Writing to spreadsheet: ${SPREADSHEET_ID}`);

    // Append to sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: values,
      },
    });

    console.log(`✅ Email saved successfully: ${email}`);

    // Success response
    res.status(200).json({
      result: 'success',
      message: 'Email saved successfully'
    });

  } catch (error) {
    console.error('❌ Error saving email:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errors: error.errors
    });

    // Check for specific Google API errors
    if (error.code === 403) {
      res.status(500).json({
        result: 'error',
        error: 'Permission denied. Please ensure the service account has access to the spreadsheet.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } else if (error.code === 404) {
      res.status(500).json({
        result: 'error',
        error: 'Spreadsheet not found. Please check the SPREADSHEET_ID.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    } else {
      res.status(500).json({
        result: 'error',
        error: 'Failed to save email. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }
};
```

### Step 3.11: Deploy the Function

1. **Review** your settings:
   - Entry point: `collectEmail` ✓
   - Runtime: Node.js 20 ✓
   - Service account: `portfolio-email-collector@...` ✓
   - Environment variables: `SPREADSHEET_ID` and `NODE_ENV` ✓

2. Click **DEPLOY** (blue button at bottom)

3. **Wait 2-3 minutes** for deployment
   - You'll see a spinner/loading indicator
   - Status will show "Deploying..."
   - When done, you'll see a green checkmark ✓

### Step 3.12: Get Function URL

1. Once deployed, you'll see your function in the list
2. Click on the function name: **portfolio-email-collector**
3. Go to the **TRIGGER** tab (at top)
4. You'll see **Trigger URL** with a long URL like:
   ```
   https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
   ```
5. **Copy this URL** - you'll need it in Part 4

---

## Part 4: Share Google Sheet with Service Account (2 minutes)

### Step 4.1: Open Your Google Sheet

1. Go back to your Google Sheet (from Step 1)
2. You should see the spreadsheet with headers: `Timestamp | Email | Source`

### Step 4.2: Share with Service Account

1. Click the **Share** button (top right, blue button)
2. In "Add people and groups":
   - **Paste the service account email** (from Step 2.4):
     ```
     portfolio-email-collector@nine-tones-bots-2025-468320.iam.gserviceaccount.com
     ```
3. Change permission dropdown from "Viewer" to **Editor**
4. **Uncheck** "Notify people" (no need to notify a service account)
5. Click **Share** or **Done**

✅ **Done!** The service account can now write to your sheet.

---

## Part 5: Test the Cloud Function (5 minutes)

### Step 5.1: Test with Built-in Testing Tool

1. In GCP Console, go back to your function: **portfolio-email-collector**
2. Click the **TESTING** tab (at top)
3. In the **Triggering event** JSON input box, paste:
   ```json
   {
     "email": "test@example.com"
   }
   ```
4. Click **TEST THE FUNCTION** button
5. **Expected result**:
   ```json
   {
     "result": "success",
     "message": "Email saved successfully"
   }
   ```
6. **Check your Google Sheet** - you should see a new row with the test email!

### Step 5.2: Test with curl (Optional)

Open a terminal/command prompt and test:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test2@example.com"}' \
  https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
```

Expected response:
```json
{"result":"success","message":"Email saved successfully"}
```

---

## Part 6: Update Your Application (10 minutes)

Now we need to update your portfolio website to use the new Cloud Function.

### Step 6.1: Update GCP Secret Manager (Production)

#### 6.1.1: Navigate to Secret Manager

1. In GCP Console, click **☰ Navigation Menu**
2. Scroll to **Security** section
3. Click **Secret Manager**
4. You'll see a list of secrets

#### 6.1.2: Find Your Secret

1. Look for secret named: **portfolio-cv**
2. Click on **portfolio-cv**

#### 6.1.3: View Current Secret

1. Click on the **latest** version (should show "1" or higher)
2. Click **VIEW SECRET VALUE** to see current content
3. **Copy all the content** to a text editor (Notepad, VS Code, etc.)

#### 6.1.4: Update Secret with New Endpoint

1. In your text editor with the secret content, find this line:
   ```
   VITE_SUBSCRIBE_ENDPOINT=https://script.google.com/macros/s/.../exec
   ```

2. **Replace it** with your Cloud Function URL:
   ```
   VITE_SUBSCRIBE_ENDPOINT=https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
   ```

3. **Save** your edited content

#### 6.1.5: Create New Secret Version

1. Go back to GCP Console, Secret Manager, **portfolio-cv** secret
2. Click **NEW VERSION** button (top right)
3. In "Secret value":
   - **Paste** your edited content (with the new Cloud Function URL)
4. Click **ADD NEW VERSION**

✅ **Done!** Secret Manager now has your Cloud Function URL.

### Step 6.2: Update Local .env (Development)

For testing locally:

1. On your computer, open the project folder
2. Edit the `.env` file
3. Find this line:
   ```
   VITE_SUBSCRIBE_ENDPOINT=https://script.google.com/macros/s/.../exec
   ```
4. Replace with:
   ```
   VITE_SUBSCRIBE_ENDPOINT=https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
   ```
5. Save the file

### Step 6.3: Test Locally

```bash
# In your project directory
npm run dev

# Open http://localhost:5174
# Try submitting an email
# Check console - NO CORS errors!
# Check Google Sheet - email appears!
```

### Step 6.4: Deploy to Production

#### Option A: GitHub Actions (Automatic)

```bash
# Commit and push (if you updated .env)
git add .env
git commit -m "Update to Cloud Function endpoint"
git push origin master

# GitHub Actions will automatically deploy
# Watch progress at: https://github.com/YOUR_REPO/actions
```

#### Option B: Manual Deployment

If you're not using GitHub Actions, rebuild and redeploy manually:

```bash
npm run build
# Then deploy the dist/ folder to your server
```

---

## Part 7: Verify Production (5 minutes)

### Step 7.1: Test on Live Site

1. Go to **https://borissolomonia.com**
2. Press **F12** to open Developer Console
3. Go to the **Console** tab
4. Scroll to "RS.ge MCP Download" section
5. Enter a test email: `test3@example.com`
6. Click **Download**

### Step 7.2: Check Console Output

You should see:
```
🚀 === EMAIL FORM SUBMISSION STARTED ===
📧 Email: test3@example.com
🌐 Endpoint: https://us-central1-nine-tones-bots-2025-468320.cloudfunctions.net/portfolio-email-collector
📤 Sending POST request...
📨 Response status: 200
📨 Response ok: true
✅ Email submitted successfully!
📥 Triggering download...
✅ Download link clicked
🏁 === EMAIL FORM SUBMISSION COMPLETED ===
```

✅ **NO CORS ERRORS!**

### Step 7.3: Verify in Google Sheet

1. Open your Google Sheet
2. You should see a new row with:
   - Timestamp (current time)
   - Email: test3@example.com
   - Source: Website

### Step 7.4: Verify File Downloaded

Check your browser's download folder for:
- `RS-Waybill-MCP-Setup.exe` (20MB file)

---

## Part 8: Monitor and Maintain

### Step 8.1: View Function Logs

1. Go to GCP Console → **Cloud Functions**
2. Click **portfolio-email-collector**
3. Click **LOGS** tab (at top)
4. You'll see all requests with emoji indicators:
   - 📥 Received email submission request
   - 📧 Processing email: ...
   - ✅ Email saved successfully
   - ❌ Errors (if any)

### Step 8.2: View Metrics

1. In the same function page
2. Click **METRICS** tab
3. You'll see:
   - Invocations (how many requests)
   - Execution time
   - Memory usage
   - Errors

### Step 8.3: Set Up Alerts (Optional)

1. In **METRICS** tab
2. Click **CREATE ALERT**
3. Configure alert for errors (e.g., email if > 10 errors/hour)

---

## Troubleshooting

### Issue: "Permission denied" in logs

**Cause**: Service account doesn't have access to spreadsheet

**Solution**:
1. Go to your Google Sheet
2. Click **Share**
3. Make sure service account email is listed with **Editor** access
4. If not, add it again (Step 4.2)

### Issue: "Spreadsheet not found"

**Cause**: Wrong SPREADSHEET_ID in environment variables

**Solution**:
1. Go to Cloud Functions → **portfolio-email-collector**
2. Click **EDIT** (top right)
3. Expand **RUNTIME, BUILD, CONNECTIONS AND SECURITY SETTINGS**
4. Check **Runtime environment variables**
5. Verify `SPREADSHEET_ID` is correct
6. Click **NEXT** then **DEPLOY**

### Issue: Still seeing CORS errors

**Cause**: Old endpoint still cached or wrong URL in secret

**Solution**:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Verify Secret Manager has correct URL (Part 6.1)
3. Redeploy application (Part 6.4)
4. Hard refresh page (Ctrl+F5)

### Issue: Function not responding

**Cause**: Function might have failed to deploy

**Solution**:
1. Go to Cloud Functions
2. Check status of **portfolio-email-collector**
3. If shows error, click on it and check **LOGS** tab
4. Look for deployment errors
5. Fix and redeploy (click **EDIT** then **DEPLOY**)

---

## Cost Monitoring

### View Current Usage

1. GCP Console → **Cloud Functions**
2. Click **portfolio-email-collector**
3. Click **METRICS** tab
4. See **Invocations** count

### Free Tier Limits

- **2,000,000 invocations per month** = FREE
- Your usage: ~100-1000/month = **$0.00**

### Set Budget Alert (Optional)

1. GCP Console → **Billing**
2. Click **Budgets & alerts**
3. Click **CREATE BUDGET**
4. Set alert at $5 (way above your usage)

---

## Updating the Function

If you need to change the code later:

1. Go to **Cloud Functions** → **portfolio-email-collector**
2. Click **EDIT** (top right)
3. Make your changes to code/settings
4. Click **NEXT** then **DEPLOY**
5. Wait 2-3 minutes

---

## Security Best Practices

### 1. Restrict CORS Origins (Production)

After testing, update the function to only allow your domain:

In `index.js`, find:
```javascript
res.set('Access-Control-Allow-Origin', '*');
```

Replace with:
```javascript
const allowedOrigins = ['https://borissolomonia.com', 'http://localhost:5174'];
const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
  res.set('Access-Control-Allow-Origin', origin);
}
```

Then **EDIT** and **DEPLOY** the function again.

### 2. Add Rate Limiting (Optional)

Consider adding rate limiting if you get spam. (Advanced - not covered here)

### 3. Monitor Logs Regularly

Check logs weekly for:
- Unusual activity
- Errors
- Spam attempts

---

## Summary Checklist

Use this checklist to verify everything is set up:

- [ ] Google Sheet created with headers
- [ ] Spreadsheet ID copied
- [ ] Service account created: `portfolio-email-collector`
- [ ] Service account email copied
- [ ] Cloud Function deployed successfully
- [ ] Function URL copied
- [ ] Google Sheet shared with service account (Editor access)
- [ ] Function tested (email appears in sheet)
- [ ] Secret Manager updated with function URL
- [ ] Local .env updated
- [ ] Application redeployed
- [ ] Production tested (no CORS errors)
- [ ] File downloads successfully
- [ ] Emails appearing in Google Sheet

---

## Congratulations! 🎉

You've successfully:
✅ Created a professional Cloud Function
✅ Eliminated all CORS issues
✅ Set up secure service account authentication
✅ Connected everything to your production website

**Result**: Your email collection now works perfectly with zero CORS errors!

---

## Support

**Need help?**

1. Check **Troubleshooting** section above
2. View function logs in GCP Console
3. Check browser console (F12) for detailed errors
4. See other guides:
   - `TESTING_GUIDE.md` - Testing checklist
   - `GCP_CLOUD_FUNCTION_SETUP.md` - CLI version
   - `CORS_SOLUTION_SUMMARY.md` - Overview

**Common Issues:**
- Most issues are from wrong Spreadsheet ID
- Or service account not shared with sheet
- Or wrong function URL in Secret Manager

Check these three things first!

---

## Next Steps

**Optional improvements:**

1. **Add more fields** - Capture IP address, user agent, etc.
2. **Email notifications** - Get notified when someone subscribes
3. **Analytics** - Track conversion rates
4. **A/B testing** - Test different CTAs
5. **Welcome email** - Send automated welcome email (requires SendGrid/Mailgun)

All guides are ready in the project folder!
