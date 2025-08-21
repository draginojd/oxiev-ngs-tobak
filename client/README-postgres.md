Postgres quickstart (development)

1. Start Postgres in Docker

```bash
sudo mkdir -p /srv/pg-data
sudo chown 1000:1000 /srv/pg-data
sudo docker run -d --name oxie-postgres \
  -e POSTGRES_PASSWORD=changeme \
  -p 5432:5432 \
  -v /srv/pg-data:/var/lib/postgresql/data \
  postgres:15
```

2. Install deps and run Prisma migrations (in client/)

```bash
cd client
npm install
npx prisma generate
npx prisma migrate dev --name init
```

3. Seed admin (or use the provided seed script)

```bash
export DATABASE_URL='postgresql://postgres:changeme@127.0.0.1:5432/postgres'
export ADMIN_EMAIL='oxietobak@gmail.com'
export ADMIN_PASSWORD='IWPeyESzUVx00Ks'
node scripts/seed-postgres-admin.cjs
```

4. Start server with pm2

```bash
npm install -g pm2
pm2 start ecosystem.config.js
pm2 save
```

Notes
- For production, use a managed Postgres in an EU region and set `DATABASE_URL` accordingly.
- Ensure backups and TLS are enabled on managed providers.
