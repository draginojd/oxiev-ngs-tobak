#!/usr/bin/env bash
set -euo pipefail

# create-postgres-db.sh
# Usage: ./create-postgres-db.sh [containerName] [password] [port] [dbName] [dataDir]
# Example: ./create-postgres-db.sh oxie-postgres changeme 5432 oxievangs_tobak /srv/pg-data

CONTAINER_NAME=${1:-oxie-postgres}
PASSWORD=${2:-changeme}
PORT=${3:-5432}
DB_NAME=${4:-oxievangs_tobak}
DATA_DIR=${5:-/srv/pg-data}

echo "Creating Postgres container '$CONTAINER_NAME' and database '$DB_NAME' on port $PORT"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker not found. Install Docker and retry." >&2
  exit 1
fi

# remove existing container if present
if docker ps -a --format "{{.Names}}" | grep -q "^${CONTAINER_NAME}$"; then
  echo "Removing existing container ${CONTAINER_NAME}..."
  docker rm -f "${CONTAINER_NAME}" >/dev/null 2>&1 || true
fi

# ensure data dir
if [ ! -d "${DATA_DIR}" ]; then
  echo "Creating data directory: ${DATA_DIR}"
  sudo mkdir -p "${DATA_DIR}"
  sudo chown $(id -u):$(id -g) "${DATA_DIR}"
fi

# run postgres container
echo "Starting Postgres container..."
docker run -d --name "${CONTAINER_NAME}" -e POSTGRES_PASSWORD="${PASSWORD}" -p "${PORT}:5432" -v "${DATA_DIR}:/var/lib/postgresql/data" postgres:15 >/dev/null

# wait for postgres to be ready
echo "Waiting for Postgres to accept connections..."
TRIES=0
MAX=60
while [ $TRIES -lt $MAX ]; do
  if docker exec "${CONTAINER_NAME}" pg_isready -U postgres >/dev/null 2>&1; then
    break
  fi
  TRIES=$((TRIES+1))
  sleep 1
done
if [ $TRIES -ge $MAX ]; then
  echo "Postgres did not become ready in time. Check container logs: docker logs ${CONTAINER_NAME}" >&2
  exit 1
fi

# create database if not exists
DB_CHECK=$(docker exec "${CONTAINER_NAME}" psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${DB_NAME}';" || echo "")
if [ "${DB_CHECK}" = "1" ]; then
  echo "Database '${DB_NAME}' already exists."
else
  echo "Creating database '${DB_NAME}'..."
  docker exec "${CONTAINER_NAME}" psql -U postgres -c "CREATE DATABASE \"${DB_NAME}\";" >/dev/null
  echo "Database '${DB_NAME}' created."
fi

CONN="postgresql://postgres:${PASSWORD}@127.0.0.1:${PORT}/${DB_NAME}"
echo
echo "Done. Export this for the session before running migration/seeds:"
echo "export DATABASE_URL='${CONN}'"
echo
echo "Example:"
echo "  export DATABASE_URL='${CONN}'"
echo "  ./migrate-and-seed.sh"

# make scripts runnable
chmod +x ./migrate-and-seed.sh || true
chmod +x ./create-postgres-db.sh || true
