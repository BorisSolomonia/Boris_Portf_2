# Deployment Instructions - Email Form Fix

## What Was Fixed

✅ **EmailForm Component**:
- Added comprehensive logging (with emojis)
- Added fallback download mechanism (downloads work even if email fails)
- Improved error handling and user feedback

✅ **SVG Path Errors**:
- Fixed MorphingLayout component to prevent undefined 'd' attributes

✅ **Infrastructure**:
- Updated Dockerfile with new environment variables
- Updated GitHub Actions workflow to pass environment variables to Docker build
- Updated Caddy configuration for exe file serving

## Deploy to Production

### Step 1: Update GCP Secret Manager

Your production environment variables are stored in GCP Secret Manager. You need to add the new variables:

```bash
# Connect to GCP
gcloud auth login
gcloud config set project nine-tones-bots-2025-468320

# Get current secret value
gcloud secrets versions access latest --secret="portfolio-cv" > temp-env.txt

# Edit the file and add these two lines:
# VITE_SUBSCRIBE_ENDPOINT=https://script.google.com/macros/s/AKfycbxmT4RSHtaCSb56nK1WUKzlByFy3raEioI8LvnRU7Ux6DLLpy6otU2eDeIloUh0iEsT/exec
# VITE_INSTALLER_PATH=/installers/RS-Waybill-MCP-Setup.exe

nano temp-env.txt  # or use your preferred editor

# Create new version of the secret
gcloud secrets versions add portfolio-cv --data-file=temp-env.txt

# Clean up
rm temp-env.txt
```

### Step 2: Commit and Push Changes

```bash
git add .
git commit -m "Fix email form with fallback download and comprehensive logging

- Add fallback download mechanism (works even if email fails)
- Add comprehensive logging to EmailForm component
- Fix SVG path errors in MorphingLayout
- Update Dockerfile with new environment variables
- Update GitHub Actions workflow
- Add CORS error detection and user-friendly messages
- Update Caddy config for exe file serving"

git push origin master
```

### Step 3: Monitor Deployment

The GitHub Actions workflow will automatically:
1. Build the Docker image with the new code
2. Push to Google Artifact Registry
3. Deploy to your GCP VM
4. Reload Caddy

Watch the deployment: https://github.com/YOUR_USERNAME/YOUR_REPO/actions

### Step 4: Test on Production

Once deployed, visit https://borissolomonia.com and:

1. Open browser console (F12)
2. Scroll to "RS.ge MCP Download"
3. Enter test email: `test@example.com`
4. Click "Download"
5. Watch the console output

**Expected Result**:
- Detailed logging with emoji indicators
- File downloads regardless of CORS status
- If CORS fails, you'll see helpful error messages
- If CORS succeeds, email is saved to Google Sheet

## Google Apps Script Fix (Optional)

To fix the CORS issue and enable email collection:

1. **Go to Google Apps Script**: https://script.google.com
2. **Open your script** (linked to your Google Sheet)
3. **Create NEW deployment**:
   - Click "Deploy" > "Manage deployments"
   - Click "+ Create deployment"  (NOT "Edit")
   - Type: Web app
   - **Execute as**: Me
   - **Who has access**: **Anyone** ⚠️ (NOT "Anyone with Google account")
   - Click "Deploy"
4. **Copy the NEW URL** and update Secret Manager:
   ```bash
   gcloud secrets versions add portfolio-cv --data-file=<(cat <<EOF
   # ... all your existing variables ...
   VITE_SUBSCRIBE_ENDPOINT=<your-new-url>
   EOF
   )
   ```
5. **Trigger redeployment** (push a commit or manually trigger workflow)

## Verification Checklist

After deployment, verify:

- [ ] SVG path errors are gone (check console)
- [ ] Download button works
- [ ] Exe file downloads (20MB file)
- [ ] Detailed console logging appears
- [ ] If email fails, download still works
- [ ] User sees clear error messages
- [ ] No JavaScript errors in console

## Rollback

If something goes wrong, the GitHub Actions workflow has automatic rollback. Or manually:

```bash
ssh your-vm-user@your-vm-host
cd /opt/Portfolio_Boris
docker compose -f secure-docker-setup/docker-compose.yml pull
sed -i 's/:COMMIT_SHA/:latest/g' secure-docker-setup/docker-compose.yml
docker compose -f secure-docker-setup/docker-compose.yml up -d --force-recreate portfolio-boris-app
docker exec caddy-caddy-1 caddy reload --config /etc/caddy/Caddyfile
```

## Support

If you encounter issues:
1. Check GitHub Actions logs
2. Check console output (with F12)
3. Read TESTING_GUIDE.md
4. Read GOOGLE_SHEETS_SETUP.md

The download WILL work even if email collection fails!
