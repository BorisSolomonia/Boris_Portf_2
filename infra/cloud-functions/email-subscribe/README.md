# Email Subscribe Cloud Function

This Cloud Function (or Cloud Run service) exposes a CORS-enabled HTTP endpoint that accepts an email address and appends it to a Google Sheet using a Google Cloud service account. Use it instead of the Google Apps Script web app to avoid CORS limitations.

## Prerequisites

1. **Enable APIs**
   - `Google Sheets API`
   - `Cloud Functions API` (if using Cloud Functions) or `Cloud Run API`.

2. **Create a service account**
   - IAM → Service Accounts → “Create service account” (e.g. `sheets-writer`).
   - Grant it basic runtime permissions (`Cloud Functions Invoker` / `Cloud Run Invoker` is added automatically on deploy).
   - Generate a JSON key once (will be stored in Secret Manager or Cloud Functions secret).

3. **Share the spreadsheet**
   - Open the target sheet and share it with the service-account email (Editor permission).

4. **Store configuration securely**
   - Secret Manager entries:
     - `email-subscribe-service-account` → the JSON key.
     - Optionally `email-subscribe-env` with key/value style content for environment variables.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SHEETS_SPREADSHEET_ID` | Spreadsheet ID (the long ID in the sheet URL). |
| `SHEETS_RANGE` | Optional range for appends, defaults to `Sheet1!A:B`. |
| `ALLOWED_ORIGIN` | Frontend origin, e.g. `https://borissolomonia.com`. |

## Deploy (Cloud Functions – Gen 2)

```bash
cd infra/cloud-functions/email-subscribe

# Configure auth and project before running:
# gcloud auth login
# gcloud config set project YOUR_PROJECT_ID

export GOOGLE_CLOUD_REGION=us-central1

gcloud functions deploy emailSubscribe \
  --gen2 \
  --runtime=nodejs18 \
  --region=$GOOGLE_CLOUD_REGION \
  --entry-point=subscribe \
  --trigger-http \
  --allow-unauthenticated \
  --set-env-vars=SHEETS_SPREADSHEET_ID=10rTras24QgbsuvW9WHAqe7ajgCVXZZEWFMSwzpJzsws,ALLOWED_ORIGIN=https://borissolomonia.com \
  --set-secrets="GOOGLE_APPLICATION_CREDENTIALS=email-subscribe-service-account:latest"
```

> When deploying with a secret, Cloud Functions mounts the JSON at `/root/.secret/...`. Update the `GOOGLE_APPLICATION_CREDENTIALS` env var accordingly (see gcloud output). Alternatively, upload the JSON key as a build artifact and set `GOOGLE_APPLICATION_CREDENTIALS` to that path.

## Deploy (Cloud Run)

```bash
cd infra/cloud-functions/email-subscribe
export GOOGLE_CLOUD_REGION=us-central1
gcloud run deploy email-subscribe \
  --source=. \
  --region=$GOOGLE_CLOUD_REGION \
  --allow-unauthenticated \
  --set-env-vars=SHEETS_SPREADSHEET_ID=10rTras24QgbsuvW9WHAqe7ajgCVXZZEWFMSwzpJzsws,ALLOWED_ORIGIN=https://borissolomonia.com \
  --set-secrets="GOOGLE_APPLICATION_CREDENTIALS=email-subscribe-service-account:latest"
```

> Cloud Run uses the same entry point (`index.js`) because it automatically runs `npm start`. Adjust the `Dockerfile` or add a custom `package.json` script if you need more control.

## Testing

After deployment, call the endpoint:

```bash
curl -i -X POST \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}' \
  "https://YOUR_ENDPOINT_URL"
```

The response should include `Access-Control-Allow-Origin: https://borissolomonia.com`.

## Frontend Integration

Set `VITE_SUBSCRIBE_ENDPOINT` to the deployed URL (e.g. via Secret Manager). The React code sends a JSON POST to this endpoint and triggers the installer download upon success.
