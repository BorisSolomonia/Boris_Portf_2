# Portfolio Deployment Guide (Single Source of Truth)

This is the only deployment guide you need.
It combines the old deployment docs and the key lessons from our chat.
Follow steps in order. Each step is small.

## Quick facts (from our environment)

- Project: tastyapp-ff8b2
- VM: instance-20251229-203034 (user: borissolomonia)
- VM IP: 34.136.155.111
- Zone: us-central1-c
- Domain: borissolomonia.com (and www)
- Artifact Registry repo: us-central1-docker.pkg.dev/tastyapp-ff8b2/portfolio
- App container name: portfolio-boris-app
- App host port: 8090 (do not change)
- Caddy container name: caddy
- Caddyfile host path: /home/borissolomonia/apps/tasty-erp/Caddyfile.production
- Docker network used by Caddy: web

## Rule 0 (do not break other apps)

- Do not stop other containers.
- Do not restart Caddy. Only reload it.
- Keep this app on port 8090.
- Do not run docker system prune on this VM.

## Step 1: Use Cloud Shell for gcloud commands

If gcloud is missing on your Windows PC, use GCP Cloud Shell.
All gcloud commands in this guide work there.

## Step 2: Make sure GCP services exist

1) Artifact Registry repo "portfolio" exists in us-central1.

Cloud Shell:
```
gcloud artifacts repositories create portfolio \
  --repository-format=docker \
  --location=us-central1 \
  --project tastyapp-ff8b2
```

2) Secret Manager secret "portfolio-cv" exists.

## Step 3: GitHub Actions service account (build and push)

Use a dedicated deployer service account (recommended).
Cloud Shell:
```
PROJECT=tastyapp-ff8b2
SA=gha-portfolio-deployer@$PROJECT.iam.gserviceaccount.com

gcloud iam service-accounts create gha-portfolio-deployer \
  --project $PROJECT \
  --display-name "GitHub Actions deployer"

gcloud projects add-iam-policy-binding $PROJECT \
  --member=serviceAccount:$SA \
  --role=roles/artifactregistry.admin

gcloud projects add-iam-policy-binding $PROJECT \
  --member=serviceAccount:$SA \
  --role=roles/secretmanager.secretAccessor

gcloud iam service-accounts keys create /tmp/gha-portfolio-deployer.json \
  --iam-account $SA
```

Put the JSON from `/tmp/gha-portfolio-deployer.json` into GitHub secret `GCP_SA_KEY`.

If you already use another service account, ensure it has the roles above.
The earlier `firebase-adminsdk` account did not have Artifact Registry permissions.

## Step 4: VM service account permissions

The workflow runs `gcloud` on the VM to read Secret Manager and auth Docker.
The VM service account must have:
- roles/secretmanager.secretAccessor
- roles/artifactregistry.reader

Add these in IAM or in the VM details page.

Also make sure `gcloud` is installed on the VM.
If not, install it in the VM (Cloud Shell or `sudo apt-get install google-cloud-cli`).

## Step 5: Create the production .env in Secret Manager

The workflow reads secret `portfolio-cv` and writes it to `/opt/APP_NAME/secure-docker-setup/.env`.
Do not commit real secrets into git.

Minimal example:
```
VITE_APP_TITLE=Boris - Renaissance Fintech Visionary
VITE_APP_DESCRIPTION=Boris's Renaissance-inspired fintech portfolio
VITE_BASE_URL=/
VITE_MAX_FILE_SIZE_MB=50
VITE_UPLOAD_ENABLED=true
VITE_SUBSCRIBE_ENDPOINT=https://your-endpoint-here
VITE_INSTALLER_PATH=/installers/RS-Waybill-MCP-Setup.exe
NODE_ENV=production
```

Update the secret:
```
gcloud secrets versions add portfolio-cv \
  --project tastyapp-ff8b2 \
  --data-file .env
```

## Step 6: GitHub repo secrets (required)

Set these in GitHub:
- GCP_SA_KEY
- GCP_PROJECT_ID: tastyapp-ff8b2
- AR_REGION: us-central1
- AR_REPO_NAME: portfolio
- VM_HOST: 34.136.155.111
- VM_SSH_USER: borissolomonia
- VM_SSH_KEY: private SSH key content
- APP_NAME: optional (default Portfolio_Boris)

Note: the workflow reads these from Secrets, not Variables.

## Step 7: SSH key for GitHub Actions

You can create the key on Windows (simple) or on the VM.
Either way, GitHub needs the private key and the VM needs the public key.

Windows (PowerShell):
```
ssh-keygen -t ed25519 -f "C:\\Users\\Admin\\.ssh\\gh_portfolio_vm" -C "gh-actions-portfolio"
```
Press Enter twice for no passphrase.

Add the public key to the VM:
```
mkdir -p ~/.ssh
chmod 700 ~/.ssh
echo "ssh-ed25519 AAAA... gh-actions-portfolio" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

Put the private key content into GitHub secret `VM_SSH_KEY`:
```
Get-Content "C:\\Users\\Admin\\.ssh\\gh_portfolio_vm"
```

Tip: Do not paste private keys in chat. Rotate keys if they leaked.

## Step 8: Caddy config (reverse proxy)

The Caddyfile is mounted read-only inside the container.
Edit the host file:
`/home/borissolomonia/apps/tasty-erp/Caddyfile.production`

Add this block at the end (keep the existing :80 block):
```
borissolomonia.com, www.borissolomonia.com {
  reverse_proxy portfolio-boris-app:80
}
```

Reload Caddy (safe, no downtime):
```
docker exec caddy caddy validate --config /etc/caddy/Caddyfile
docker exec caddy caddy reload --config /etc/caddy/Caddyfile
```

## Step 9: Open HTTPS (port 443) in GCP firewall

If HTTPS times out, 443 is blocked.

Console method:
1) GCP Console -> Compute Engine -> VM instances
2) Click your VM -> Edit
3) Network tags -> add `https-server`
4) Save
5) Create or update firewall rule:
   - Ingress
   - Target tag: https-server
   - TCP 443
   - Source: 0.0.0.0/0

CLI method:
```
gcloud compute firewall-rules create allow-https \
  --project tastyapp-ff8b2 \
  --direction=INGRESS \
  --priority=1000 \
  --network=default \
  --action=ALLOW \
  --rules=tcp:443 \
  --source-ranges=0.0.0.0/0 \
  --target-tags=https-server
```

## Step 10: Cloudflare DNS

Create A records:
- @ -> 34.136.155.111
- www -> 34.136.155.111

Set them to DNS only until HTTPS works.
SSL or TLS mode: Full or Full (strict). Never use Flexible.

## Step 11: Deploy (GitHub Actions)

Push to main or master.
The workflow will:
- Build and push the image
- SSH to the VM
- Create `/opt/Portfolio_Boris/` with `secure-docker-setup/`
- Update `secure-docker-setup/docker-compose.yml`
- Deploy container `portfolio-boris-app` on port 8090
- Reload Caddy

Optional local test:
```
./deploy-local.sh
```

## Step 12: Verify

On the VM:
```
curl -I http://localhost:8090
curl -I -H "Host: borissolomonia.com" http://localhost
```

From your PC:
```
Test-NetConnection borissolomonia.com -Port 443
```

Expected: port 443 is open and https://borissolomonia.com loads.

## Step 13: Email collection (optional, pick one)

Option A: Google Forms (fast, no CORS)
- Create a Google Form with an email field.
- Get Form ID and entry ID.
- Update EmailForm to post to Google Forms.
- Emails go to the linked Sheet automatically.

Option B: Google Apps Script (simple)
- Create a Google Sheet.
- Add Apps Script web app with "Anyone" access.
- Set VITE_SUBSCRIBE_ENDPOINT to the web app URL.
- Update Secret Manager and redeploy.

Option C: Cloud Function (recommended, pro)
- Create a service account.
- Deploy function (gen2, nodejs20, allow unauth).
- Share the Sheet with the service account.
- Set VITE_SUBSCRIBE_ENDPOINT to the function URL.
- Update Secret Manager and redeploy.

If you skip email collection, the download still works.

## Step 14: Common problems (from our chat)

- HTTPS timeout: open firewall 443 and add tag.
- Caddy file read-only: edit host file and reload.
- Wrong Caddy container name: it is `caddy`.
- Artifact Registry permission denied: the GitHub SA is missing roles.
- Secret Manager access denied on VM: VM service account lacks secret access.
- Windows curl errors: use `curl.exe` or `Invoke-WebRequest`.

## Step 15: Keep other apps safe

- Do not run `docker compose down` on the ERP stack.
- Do not stop or restart Caddy; only reload.
- Keep this app on port 8090.
- Use the existing `web` docker network.

Done when https://borissolomonia.com loads without timeout.
