# Google Sheets Email Collection Setup

This guide explains how to set up the backend endpoint to save emails from the MCP installer download form to Google Sheets.

## Overview

The `EmailForm` component (src/components/EmailForm.tsx) expects a backend endpoint defined in the `VITE_SUBSCRIBE_ENDPOINT` environment variable. This endpoint should:
1. Accept POST requests with JSON payload: `{ "email": "user@example.com" }`
2. Save the email to a Google Sheet
3. Return JSON response: `{ "result": "success" }` or `{ "result": "error", "error": "message" }`

## Option 1: Google Apps Script (Recommended - Free & Simple)

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "MCP Installer Downloads"
3. In the first row, add headers: `Timestamp | Email | IP Address`

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    const email = data.email;

    // Validate email
    if (!email || !email.includes('@')) {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'error', error: 'Invalid email' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Get timestamp and user info
    const timestamp = new Date();
    const ipAddress = e.parameter.ip || 'N/A';

    // Append the data to the sheet
    sheet.appendRow([timestamp, email, ipAddress]);

    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('This endpoint only accepts POST requests')
    .setMimeType(ContentService.MimeType.TEXT);
}
```

### Step 3: Deploy the Script
1. Click the **Deploy** button > **New deployment**
2. Click the gear icon ⚙️ > Select **Web app**
3. Configure:
   - **Description**: Email Collection API
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/AKfycbz.../exec`)
6. Click **Authorize access** and grant permissions

### Step 4: Update Your .env File
Replace the placeholder in your `.env` file:

```bash
VITE_SUBSCRIBE_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Step 5: Test
1. Run your dev server: `npm run dev`
2. Go to the MCP download section
3. Enter an email and click Download
4. Check your Google Sheet - the email should appear!

## Option 2: Custom Backend API

If you prefer to use your own backend (Node.js, Python, etc.), create an endpoint that:

### Endpoint Requirements
- **Method**: POST
- **URL**: Your backend URL (e.g., `https://api.yoursite.com/subscribe`)
- **Content-Type**: application/json
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Success Response** (200 OK):
  ```json
  {
    "result": "success"
  }
  ```
- **Error Response** (4xx or 5xx):
  ```json
  {
    "result": "error",
    "error": "Error message"
  }
  ```

### Example: Node.js + Express + Google Sheets API

```javascript
const express = require('express');
const { google } = require('googleapis');
const app = express();

app.use(express.json());

const sheets = google.sheets('v4');
const SPREADSHEET_ID = 'your-spreadsheet-id';
const RANGE = 'Sheet1!A:C';

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ result: 'error', error: 'Invalid email' });
    }

    // Authenticate with Google Sheets API
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // Append to sheet
    await sheets.spreadsheets.values.append({
      auth,
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values: [[new Date().toISOString(), email, req.ip]],
      },
    });

    res.json({ result: 'success' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ result: 'error', error: error.message });
  }
});

app.listen(3000);
```

## Troubleshooting

### Issue: "Subscription endpoint is not configured"
- **Cause**: The `VITE_SUBSCRIBE_ENDPOINT` environment variable is not set
- **Solution**: Update your `.env` file with the correct endpoint URL and restart your dev server

### Issue: CORS errors in browser console
- **Cause**: Google Apps Script or your backend doesn't allow cross-origin requests
- **Solution**:
  - For Google Apps Script: This should work automatically
  - For custom backend: Add CORS headers:
    ```javascript
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    ```

### Issue: 404 error when downloading exe file
- **Cause**: The installer file is not accessible or the path is incorrect
- **Solutions**:
  1. Verify file exists: `public/installers/RS-Waybill-MCP-Setup.exe`
  2. Rebuild your app: `npm run build`
  3. Check Caddy configuration (if deployed)
  4. Verify `VITE_INSTALLER_PATH` in `.env` is correct

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent abuse
2. **Email Validation**: The script validates basic email format, but you may want stricter validation
3. **Spam Protection**: Consider adding Google reCAPTCHA or similar
4. **Data Privacy**: Ensure compliance with GDPR/privacy laws when collecting emails

## Next Steps

After setting up the endpoint:
1. Update `.env` with your Google Apps Script URL
2. Restart your development server: `npm run dev`
3. Test the download flow
4. Monitor your Google Sheet for incoming emails
5. Set up email notifications in Google Sheets (optional)

---

**Questions?** Check the console for detailed error messages or review the `EmailForm.tsx` component.
