#!/usr/bin/env bash
set -euo pipefail

# migrate-and-seed.sh
# Requirements: run from the 'client' folder. Ensure DATABASE_URL is set in the environment.
# Optional: set MONGO_URI if you want to migrate existing Mongo data before seeding.

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is not set. Export it and re-run. Example:" >&2
  echo "  export DATABASE_URL='postgresql://postgres:IWPeyESzUVx00Ks@127.0.0.1:5432/oxievangs_tobak'"
  exit 1
fi

echo "Installing Node deps (if needed)..."
if [ -f package.json ]; then
#!/bin/bash
# migrate-and-seed.sh
# Runs prisma push, optional mongo migration, and seeds for Postgres

set -e # exit on any error

echo "Installing Node deps (if needed)..."
npm install --quiet

echo "Generating Prisma client and pushing schema..."
npx prisma generate
# Using --accept-data-loss is fine for dev, be careful in prod
npx prisma db push --accept-data-loss

echo "Seeding admin user into Postgres..."
node ./scripts/seed-postgres-admin.cjs

echo "Seeding news & campaigns into Postgres..."
node ./scripts/seed-content.cjs

echo "Done. Verify with: curl -s http://localhost:4000/api/admin/news | jq '.'"
