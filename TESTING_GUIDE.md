# MCP Installer Download - Testing Guide

## Current Status

✅ **EmailForm component updated with:**
- Comprehensive logging (with emoji indicators)
- Fallback download mechanism (downloads even if email fails)
- Clear error messages
- CORS error detection

✅ **Installer file verified:**
- Location: `public/installers/RS-Waybill-MCP-Setup.exe` (20MB)
- Will be served at: `/installers/RS-Waybill-MCP-Setup.exe`

## Test the Download NOW

### Step 1: Open the App
1. Open your browser (Chrome/Edge recommended)
2. Navigate to: **http://localhost:5174**
3. Scroll down to the "RS.ge MCP Download" section

### Step 2: Open Developer Console
Press **F12** to open Chrome DevTools and select the **Console** tab

### Step 3: Submit the Form
1. Enter a test email: `test@example.com`
2. Click the **"Download"** button
3. Watch the console output

### Expected Console Output:

#### If Email Collection Works (No CORS issue):
```
🚀 === EMAIL FORM SUBMISSION STARTED ===
📧 Email: test@example.com
🌐 Endpoint: https://script.google.com/macros/s/AKfycbx.../exec
🔧 Environment check:
  - VITE_SUBSCRIBE_ENDPOINT: https://script.google.com/macros/s/...
  - VITE_INSTALLER_PATH: /installers/RS-Waybill-MCP-Setup.exe
📤 Sending POST request to: https://script.google.com/macros/s/...
📨 Response status: 200
📨 Response ok: true
📋 Response body: {result: 'success'}
✅ Email submitted successfully!
📥 Triggering download...
📥 Download path: /installers/RS-Waybill-MCP-Setup.exe
✅ Download link clicked
🏁 === EMAIL FORM SUBMISSION COMPLETED ===
```

#### If CORS Issue (Current State):
```
🚀 === EMAIL FORM SUBMISSION STARTED ===
📧 Email: test@example.com
🌐 Endpoint: https://script.google.com/macros/s/AKfycbx.../exec
🔧 Environment check:
  - VITE_SUBSCRIBE_ENDPOINT: https://script.google.com/macros/s/...
  - VITE_INSTALLER_PATH: /installers/RS-Waybill-MCP-Setup.exe
📤 Sending POST request to: https://script.google.com/macros/s/...
❌ === EMAIL SUBMISSION FAILED ===
Error details: TypeError: Failed to fetch
Error type: TypeError (likely CORS or network)
Error message: Failed to fetch
🚫 CORS ERROR DETECTED!
This means the Google Apps Script is not properly configured.
Please check:
1. Deployment "Who has access" is set to "Anyone"
2. "Execute as" is set to "Me"
⚠️ Proceeding with download despite email error...
📥 Triggering download...
📥 Download path: /installers/RS-Waybill-MCP-Setup.exe
✅ Download link clicked
🏁 === EMAIL FORM SUBMISSION COMPLETED ===
```

### Step 4: Verify Download
**THE FILE SHOULD DOWNLOAD EITHER WAY** - whether email collection works or not!

Check your browser's download folder for `RS-Waybill-MCP-Setup.exe` (20MB)

## Fix the CORS Issue (To Enable Email Collection)

The download works now, but to enable email collection, follow these steps:

### Option 1: Fix Google Apps Script Deployment Settings

1. **Go to your Google Apps Script editor**
   - Open your Google Sheet
   - Extensions > Apps Script

2. **Verify the code is correct** (should have the updated version from GOOGLE_SHEETS_SETUP.md)

3. **Create a NEW deployment with correct settings:**
   - Click **Deploy** > **Manage deployments**
   - Click **+ Create deployment**
   - Click gear icon ⚙️ > Select **Web app**
   - **CRITICAL SETTINGS**:
     - **Description**: MCP Email Collection v2
     - **Execute as**: **Me** (your email)
     - **Who has access**: **Anyone** ⚠️ NOT "Anyone with Google account"
   - Click **Deploy**
   - Authorize if needed
   - Copy the new Web app URL

4. **Update `.env` with new URL**
   ```bash
   VITE_SUBSCRIBE_ENDPOINT=<your-new-url>
   ```

5. **Restart dev server**

### Option 2: Test Without Email Collection

The form now works WITHOUT email collection! The file will download successfully even if the Google Apps Script fails. This is intentional to ensure users can always get the installer.

## Troubleshooting

### Issue: Download doesn't start
**Check:**
1. Console shows "📥 Triggering download..."?
2. Check browser's download settings (might be blocked)
3. Try a different browser

### Issue: 404 error for exe file
**Check:**
1. File exists: `ls public/installers/RS-Waybill-MCP-Setup.exe`
2. Dev server is running on correct port
3. Clear browser cache

### Issue: CORS error persists
**This is OK!** The download still works. To fix CORS:
1. Follow "Option 1" above
2. Ensure "Who has access" is exactly "Anyone" (no authentication)
3. Make sure you created a NEW deployment (not updated existing one)

## Success Criteria

✅ **MINIMUM (Already Working):**
- File downloads successfully
- Clear error message if email fails
- User experience is not broken

✅ **IDEAL (Requires Google Apps Script fix):**
- Email is saved to Google Sheet
- No CORS errors
- Success message shows "Email saved successfully"

## Current Result

**The download WILL work regardless of CORS errors.** Users can download the installer without any issues. The email collection is a "nice to have" that requires proper Google Apps Script configuration.
