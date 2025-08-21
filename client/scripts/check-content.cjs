// check-content.cjs
// Checks whether the three dashboard items exist in the database.
// Usage: set DATABASE_URL and run:
//   node scripts/check-content.cjs

const { Pool } = require('pg')

const DATABASE_URL = process.env.DATABASE_URL || null

const newsTitles = [
  'Nya öppettider från 1 januari',
  'Veckans speltips'
]
const campaignName = 'Julkampanj - 15% rabatt på godis'

async function checkPostgres(){
  const pool = new Pool({ connectionString: DATABASE_URL })
  const client = await pool.connect()
  try{
    console.log('Checking Postgres...')
    for(const t of newsTitles){
      const res = await client.query('SELECT id, title, created_at FROM news WHERE title = $1 LIMIT 1', [t])
      if(res.rows.length){
        console.log(`FOUND news: "${t}" (id=${res.rows[0].id}, created_at=${res.rows[0].created_at})`)
      } else {
        console.log(`MISSING news: "${t}"`)
      }
    }
    const cres = await client.query('SELECT id, name, created_at FROM campaigns WHERE name = $1 LIMIT 1', [campaignName])
    if(cres.rows.length){
      console.log(`FOUND campaign: "${campaignName}" (id=${cres.rows[0].id}, created_at=${cres.rows[0].created_at})`)
    } else {
      console.log(`MISSING campaign: "${campaignName}"`)
    }
  }catch(err){
    console.error('Postgres check failed:', err.message)
  }finally{
    client.release()
    await pool.end()
  }
}

async function main(){
  if(!DATABASE_URL){
    console.error('DATABASE_URL is required. Set DATABASE_URL and re-run.')
    console.error('Example (PowerShell):')
    console.error("$env:DATABASE_URL='postgresql://user:pass@localhost:5432/dbname' ; node scripts/check-content.cjs")
    process.exit(1)
  }
  await checkPostgres()
}

main()
