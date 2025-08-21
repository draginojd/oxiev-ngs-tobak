param(
  [string]$ContainerName = "oxie-postgres",
  [string]$Password = "changeme",
  [int]$Port = 5432,
  [string]$DbName = "oxievangs_tobak",
  [string]$DataDir = "C:\\data\\pg-data"
)

Write-Output "Creating Postgres container '$ContainerName' and database '$DbName' on port $Port"

# Ensure Docker is available
try{
  docker version > $null 2>&1
} catch {
  Write-Error "Docker does not appear to be available. Start Docker Desktop and retry."
  exit 1
}

# Stop and remove existing container if present
$exists = docker ps -a --format "{{.Names}}" | Select-String -Pattern "^$ContainerName$"
if ($exists) {
  Write-Output "Removing existing container $ContainerName..."
  docker rm -f $ContainerName | Out-Null
}

# Ensure data dir exists and create if needed
if (-not (Test-Path $DataDir)) {
  Write-Output "Creating data directory: $DataDir"
  New-Item -ItemType Directory -Path $DataDir -Force | Out-Null
}

# Run Postgres container
Write-Output "Starting Postgres container..."
$runCmd = "docker run -d --name $ContainerName -e POSTGRES_PASSWORD=$Password -p $Port:5432 -v $DataDir:/var/lib/postgresql/data postgres:15"
Invoke-Expression $runCmd | Out-Null

# Wait for Postgres to be ready
Write-Output "Waiting for Postgres to accept connections..."
$maxTries = 60
$try = 0
while ($try -lt $maxTries) {
  Start-Sleep -Seconds 1
  $rc = (docker exec $ContainerName pg_isready -U postgres) 2>&1
  if ($LASTEXITCODE -eq 0) { break }
  $try++
}
if ($try -ge $maxTries) {
  Write-Error "Postgres did not become ready within timeout. Check container logs: docker logs $ContainerName"
  exit 1
}

Write-Output "Postgres is ready. Checking database '$DbName'..."
# Check if DB exists
$check = docker exec $ContainerName psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='$DbName';" 2>&1
if ($check -match '1') {
  Write-Output "Database '$DbName' already exists."
} else {
  Write-Output "Creating database '$DbName'..."
  docker exec $ContainerName psql -U postgres -c "CREATE DATABASE \"$DbName\";" | Out-Null
  Write-Output "Database created."
}

$connection = "postgresql://postgres:$Password@127.0.0.1:$Port/$DbName"
Write-Output "Done. Use this connection string in PowerShell for the current session:"
Write-Output "`$env:DATABASE_URL = '$connection'"
Write-Output "Example:"
Write-Output "    `$env:DATABASE_URL = '$connection' ; node .\scripts\seed-content.cjs"
