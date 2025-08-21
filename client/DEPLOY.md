Deployment checklist for Oxievångs Tobak (Ubuntu)

This file contains copy-paste commands and notes to host the app on an Ubuntu server.

1) Prep server

# update + essentials
sudo apt update && sudo apt upgrade -y
sudo apt install -y build-essential curl git nginx

# Node.js (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Database: Postgres (recommended)
# This project uses Postgres (Prisma). Install and run Postgres or use a managed Postgres provider.
# Example quickstart (Docker):
```
sudo mkdir -p /srv/pg-data
sudo chown 1000:1000 /srv/pg-data
sudo docker run -d --name oxie-postgres \
  -e POSTGRES_PASSWORD=changeme \
  -p 5432:5432 \
  -v /srv/pg-data:/var/lib/postgresql/data \
  postgres:15
```

2) Clone app and install deps

# On the server, clone your repo and install
cd /var/www
sudo git clone <your-repo-url> oxievangs-tobak
cd oxievangs-tobak/client
sudo npm ci

3) Seed Postgres & admin user

# Set a secure admin password via ADMIN_PASSWORD env var when running the seed.
# Example (replace with secure values):
DATABASE_URL='postgresql://postgres:changeme@127.0.0.1:5432/oxievangs_tobak' ADMIN_PASSWORD='S3cureP@ssw0rd' node scripts/seed-postgres-admin.cjs

4) Build client and serve static files with nginx

# Build client
npm run build

# By default Vite outputs to `dist` inside /client/dist
# Configure nginx to serve the `dist` folder and reverse proxy API to server.cjs

# Example nginx site config (replace server_name and paths):
sudo tee /etc/nginx/sites-available/oxie <<'NGINX'
server {
  listen 80;
  server_name your.domain.tld; # change

  root /var/www/oxievangs-tobak/client/dist;
  index index.html;

  location /api/ {
    proxy_pass http://127.0.0.1:4000/api/;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }

  location / {
    try_files $uri $uri/ /index.html;
  }
}
NGINX

sudo ln -s /etc/nginx/sites-available/oxie /etc/nginx/sites-enabled/oxie
sudo nginx -t && sudo systemctl reload nginx

# For SSL, use certbot or your chosen ACME client:
# sudo apt install certbot python3-certbot-nginx
# sudo certbot --nginx -d your.domain.tld

5) Run server.cjs as a systemd service (Node API)

# Create an env file (DATABASE_URL is required)
sudo tee /etc/oxie.env <<'ENV'
DATABASE_URL='postgresql://postgres:changeme@127.0.0.1:5432/oxievangs_tobak'
PORT=4000
ENV

# Systemd service unit (adjust User/Group and ExecStart path)
sudo tee /etc/systemd/system/oxievangs-tobak.service <<'SERVICE'
[Unit]
Description=Oxievangs Tobak Node API
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/oxievangs-tobak/client
EnvironmentFile=/etc/oxie.env
ExecStart=/usr/bin/node server.cjs
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
SERVICE

sudo systemctl daemon-reload
sudo systemctl enable --now oxievangs-tobak.service
sudo journalctl -u oxievangs-tobak.service -f

6) Security notes
- Change the seeded admin password immediately after first login. The seed script prints the ADMIN_PASSWORD used when run.
-- Use a managed Postgres provider or run Postgres locally in Docker; secure access with firewall rules.
- Keep secrets out of git; use `/etc/oxie.env` or a secret manager.

7) Alternatives & quick options
- If you previously used Mongo and want to migrate data to Postgres, use the migration script `scripts/migrate-mongo-to-postgres.cjs` before removing Mongo. (Note: that script may be removed in this repo if migration is complete.)
- Run Node process manager: `pm2 start server.cjs --name oxie --env production` (install pm2 globally: `npm i -g pm2`).

- 8) Troubleshooting
- If seed script fails: ensure Postgres is reachable (check `pg_isready` or Docker logs) and check firewall.
- If nginx returns 404 for client routes, ensure `try_files` fallback to `index.html` is present.

---

If you want, I can also:
- add a `systemd` unit file into the repo or create a `deploy.sh` to perform the steps,
- or modify `server.cjs` to serve the `dist` folder directly so you only run Node (skip nginx static serving).

Tell me which of those you'd like and I'll implement it.
