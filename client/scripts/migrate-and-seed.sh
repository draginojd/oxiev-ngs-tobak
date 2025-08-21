#!/usr/bin/env bash
set -euo pipefail

# migrate-and-seed.sh
# Requirements: run from the 'client' folder. Ensure DATABASE_URL is set in the environment.
# Optional: set MONGO_URI if you want to migrate existing Mongo data before seeding.

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set. Export it and re-run. Example:" >&2
  echo "  export DATABASE_URL='postgresql://postgres:changeme@127.0.0.1:5432/oxievangs_tobak'"
  exit 1
fi

echo "Installing Node deps (if needed)..."
if [ -f package.json ]; then
  npm install --no-audit --no-fund >/dev/null 2>&1 || true
fi

echo "Generating Prisma client and pushing schema..."
if command -v npx >/dev/null 2>&1; then
  npx prisma generate || true
  # use db push for a safe, immediate schema push in dev
  npx prisma db push || true
else
  echo "npx not found; ensure Node.js is installed and try running prisma commands manually." >&2
fi

# If MONGO_URI exists, run migration script first
if [ -n "${MONGO_URI:-}" ]; then
  echo "MONGO_URI detected; migrating data from Mongo -> Postgres..."
  node ./scripts/migrate-mongo-to-postgres.cjs
else
  echo "No MONGO_URI set; skipping Mongo->Postgres migration."
fi

# Seed admin (if script exists) and content
if [ -f ./scripts/seed-postgres-admin.cjs ]; then
  echo "Seeding admin user into Postgres..."
  node ./scripts/seed-postgres-admin.cjs || true
fi

echo "Seeding news & campaigns into Postgres..."
node ./scripts/seed-content.cjs || true

echo "Done. Verify with: curl -s http://localhost:4000/api/admin/news | jq '.'  (or run the check script)"
