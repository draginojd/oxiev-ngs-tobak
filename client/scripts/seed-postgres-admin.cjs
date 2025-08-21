// seed-postgres-admin.cjs
// Usage:
// npm install pg bcryptjs
// Set DATABASE_URL and ADMIN_PASSWORD in the environment before running.
// Example (interactive, do NOT commit the password):
//   read -s -p "Admin password: " ADMIN_PASSWORD; echo
//   export ADMIN_PASSWORD
//   export DATABASE_URL='postgresql://postgres:changeme@127.0.0.1:5432/postgres'
//   node scripts/seed-postgres-admin.cjs

const { Pool } = require('pg')
const bcrypt = require('bcryptjs')

const DATABASE_URL = process.env.DATABASE_URL || (() => {
  const host = process.env.PGHOST || '127.0.0.1'
  const port = process.env.PGPORT || '5432'
  const user = process.env.PGUSER || 'postgres'
  const pass = process.env.PGPASSWORD || 'changeme'
  const db = process.env.PGDATABASE || 'postgres'
  return `postgresql://${user}:${encodeURIComponent(pass)}@${host}:${port}/${db}`
})()

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'oxietobak@gmail.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  console.error('FEL: ADMIN_PASSWORD är inte satt. Sätt ADMIN_PASSWORD i miljön och kör igen (använd read -s för interaktiv input).')
  process.exit(1)
}

async function main(){
  const pool = new Pool({ connectionString: DATABASE_URL })
  const client = await pool.connect()
  try{
    console.log('Connected to Postgres at', DATABASE_URL.replace(/:\/\/.*@/, '://***@'))

    // Create admins table if not exists
    await client.query(`
      CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
      );
    `)
    console.log('Ensured table admins exists')

    // Hash password
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 10)

    // Upsert admin
    const res = await client.query(
      `INSERT INTO admins (email, password) VALUES ($1, $2)
       ON CONFLICT (email) DO UPDATE SET password = EXCLUDED.password
       RETURNING id, email, created_at`,
      [ADMIN_EMAIL, hash]
    )

    console.log('Upserted admin:', res.rows[0])
  }catch(err){
    console.error('Seed failed', err)
    process.exitCode = 1
  }finally{
    client.release()
    await pool.end()
  }
}

main()

